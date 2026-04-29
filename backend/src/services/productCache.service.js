// src/services/productCache.service.js
//
// Implements the Cache-Aside pattern with two storage levels:
//
//   L1  node-cache (RAM)   < 1 ms    1 hour TTL     lost on restart
//   L2  MongoDB            ~ 5 ms    7 day TTL       survives restarts
//
// Flow for every barcode lookup:
//   1. Check L1 (memory)   → HIT: return immediately
//   2. Check L2 (MongoDB)  → HIT: backfill L1, return
//   3. Call OFF API        → normalise → save L2 → backfill L1 → return
//
// Nothing outside this file calls the OFF service or touches
// the ProductCache model directly. All food data flows through
// getByBarcode() or searchProducts().

const NodeCache    = require('node-cache');
const ProductCache = require('../models/ProductCache');
const offService   = require('./openFoodFacts.service');

// ── L1: in-memory cache ────────────────────────────────────
// stdTTL:      3600 s = 1 hour
// checkperiod: 120 s  = eviction sweep every 2 minutes
const memCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

// Namespaced key builders keep barcode and search results
// in separate key-spaces so they never collide
const KEY = {
  barcode: (code)  => `barcode:${code}`,
  search:  (q, sz) => `search:${q.toLowerCase().trim()}:${sz}`,
};

// ══════════════════════════════════════════════════════════
//  getByBarcode
//  Main entry point for all barcode-based product lookups.
//  Called by the barcode route handler.
// ══════════════════════════════════════════════════════════
const getByBarcode = async (barcode) => {
  const cacheKey = KEY.barcode(barcode);

  // ── L1 check ──────────────────────────────────────────
  const memHit = memCache.get(cacheKey);
  if (memHit) {
    console.log(`[Cache] L1 HIT: ${barcode}`);
    return { success: true, data: memHit, fromCache: true, cacheLevel: 'memory' };
  }

  // ── L2 check ──────────────────────────────────────────
  // .lean() returns a plain JS object — faster for read-only ops
  let dbDoc = null;
  try {
    dbDoc = await ProductCache.findOne({ barcode }).lean();
  } catch (dbErr) {
    // DB read failed — don't crash, fall through to API
    console.warn(`[Cache] MongoDB read error for ${barcode}:`, dbErr.message);
  }

  if (dbDoc) {
    console.log(`[Cache] L2 HIT: ${barcode}`);
    memCache.set(cacheKey, dbDoc);           // backfill L1
    return { success: true, data: dbDoc, fromCache: true, cacheLevel: 'mongodb' };
  }

  // ── MISS: call Open Food Facts ─────────────────────────
  console.log(`[Cache] MISS — calling OFF: ${barcode}`);
  const offResult = await offService.fetchByBarcode(barcode);

  // Do NOT cache failures — product might be added to OFF soon
  if (!offResult.success) return offResult;

  // ── Save to MongoDB (upsert) ───────────────────────────
  // findOneAndUpdate with upsert:true is race-condition-safe.
  // If two simultaneous requests both miss the cache and call
  // OFF, only one document is ever written per barcode because
  // the unique index + upsert guarantee idempotency.
  let savedDoc = null;
  try {
    savedDoc = await ProductCache.findOneAndUpdate(
      { barcode },
      { ...offResult.data, cachedAt: new Date() },
      { upsert: true, new: true, runValidators: true }
    ).lean();
    console.log(`[Cache] Saved to MongoDB: ${barcode}`);
  } catch (saveErr) {
    // Save failed — still return the live data, just uncached
    console.error(`[Cache] MongoDB save failed for ${barcode}:`, saveErr.message);
    return {
      success:   true,
      data:      offResult.data,
      fromCache: false,
      cacheLevel: 'none',
      warning:   'Live data returned but could not be cached.',
    };
  }

  // Backfill L1 so the next request within 1 hour is instant
  memCache.set(cacheKey, savedDoc);

  return { success: true, data: savedDoc, fromCache: false, cacheLevel: 'api' };
};

// ══════════════════════════════════════════════════════════
//  searchProducts
//  Wraps the OFF text search with L1 memory caching only.
//  Search results are NOT persisted to MongoDB because they
//  change frequently as OFF adds new products.
//  However, each returned product IS saved to MongoDB cache
//  in the background so future barcode lookups are fast.
// ══════════════════════════════════════════════════════════
const searchProducts = async (query, page = 1, pageSize = 10) => {
  const cacheKey   = KEY.search(query, pageSize);
  const isFirstPg  = parseInt(page) === 1;

  // Only cache page 1 (most common case)
  if (isFirstPg) {
    const memHit = memCache.get(cacheKey);
    if (memHit) {
      console.log(`[Cache] L1 HIT search: "${query}"`);
      return { ...memHit, fromCache: true };
    }
  }

  const result = await offService.searchByName(query, page, pageSize);
  if (!result.success) return result;

  // Background-cache each returned product in MongoDB so that
  // if the user later scans one of these barcodes, it's instant.
  if (result.data?.length > 0) {
    setImmediate(async () => {
      for (const product of result.data) {
        if (!product.barcode) continue;
        try {
          const exists = await ProductCache.exists({ barcode: product.barcode });
          if (!exists) {
            await ProductCache.create(product);
          }
        } catch { /* silent — background best-effort */ }
      }
    });
  }

  if (isFirstPg) memCache.set(cacheKey, result);

  return { ...result, fromCache: false };
};

// ══════════════════════════════════════════════════════════
//  saveManualEntry  (FR3 — Manual Entry)
//  Saves user-entered nutrition data as a cache document.
//  Skips OFF entirely. Used when a product is not found.
// ══════════════════════════════════════════════════════════
const saveManualEntry = async (barcode, data) => {
  const doc = {
    barcode:         String(barcode).trim(),
    name:            data.name             || null,
    brand:           data.brand            || null,
    nutrition:       data.nutrition        || {},
    ingredientsText: data.ingredientsText  || null,
    allergens:       data.allergens        || [],
    additives:       [],
    isManualEntry:   true,
    source:          'manual',
    dataCompleteness: 70,  // manual assumed reasonably complete
    cachedAt:        new Date(),
  };

  try {
    const saved = await ProductCache.findOneAndUpdate(
      { barcode: doc.barcode },
      doc,
      { upsert: true, new: true, runValidators: true }
    ).lean();

    // Bust L1 cache so fresh data is returned next request
    memCache.del(KEY.barcode(doc.barcode));

    return { success: true, data: saved };
  } catch (err) {
    return { success: false, error: `Failed to save: ${err.message}`, statusCode: 500 };
  }
};

// Exposed for the cache/stats diagnostic endpoint
const getCacheStats = () => ({
  memory: memCache.getStats(),
  keys:   memCache.keys().length,
});

module.exports = { getByBarcode, searchProducts, saveManualEntry, getCacheStats };
