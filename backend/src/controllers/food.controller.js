// src/controllers/food.controller.js
//
// Thin layer between the HTTP routes and the cache service.
// Controllers must not contain business logic — they only:
//   1. Pull validated data out of req
//   2. Call the appropriate service function
//   3. Shape the response envelope and set the HTTP status

const cacheService = require('../services/productCache.service');
const ProductCache = require('../models/ProductCache');

// ══════════════════════════════════════════════════════════
//  getByBarcode   GET /api/food/barcode/:code
// ══════════════════════════════════════════════════════════
exports.getByBarcode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const result   = await cacheService.getByBarcode(code);

    if (!result.success) {
      return res.status(result.statusCode || 500).json({
        success: false,
        message: result.error,
        barcode: code,
      });
    }

    const { data, fromCache, cacheLevel } = result;

    return res.status(200).json({
      success: true,
      message: fromCache
        ? `Product retrieved from ${cacheLevel} cache.`
        : 'Product fetched from Open Food Facts and cached.',
      data: {
        barcode:          data.barcode,
        name:             data.name,
        brand:            data.brand,
        category:         data.category,
        imageUrl:         data.imageUrl,
        nutrition:        data.nutrition,
        ingredientsText:  data.ingredientsText,
        additives:        data.additives,
        allergens:        data.allergens,
        nutriscoreGrade:  data.nutriscoreGrade,
        isManualEntry:    data.isManualEntry,
      },
      meta: {
        fromCache,
        cacheLevel,
        dataSource:       data.source,
        dataCompleteness: data.dataCompleteness,
        // If data is very sparse, tell the frontend to offer manual entry (FR3)
        needsManualEntry: data.dataCompleteness < 40,
        cachedAt:         data.cachedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ══════════════════════════════════════════════════════════
//  searchProducts   GET /api/food/search?q=...
// ══════════════════════════════════════════════════════════
exports.searchProducts = async (req, res, next) => {
  try {
    const { q, page = 1, pageSize = 10 } = req.query;
    const result = await cacheService.searchProducts(q, page, pageSize);

    if (!result.success) {
      return res.status(result.statusCode || 500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.data.length > 0
        ? `Found ${result.data.length} result(s) for "${q}".`
        : `No results found for "${q}". Try manual entry.`,
      data: result.data.map(p => ({
        barcode:          p.barcode,
        name:             p.name,
        brand:            p.brand,
        category:         p.category,
        imageUrl:         p.imageUrl,
        nutrition:        p.nutrition,
        allergens:        p.allergens,
        nutriscoreGrade:  p.nutriscoreGrade,
        dataCompleteness: p.dataCompleteness,
      })),
      meta: {
        query:     q,
        page:      result.page,
        pageSize:  result.pageSize,
        total:     result.total,
        hasMore:   result.total > result.page * result.pageSize,
        fromCache: result.fromCache,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ══════════════════════════════════════════════════════════
//  saveManualEntry   POST /api/food/manual
//  FR3: called when user fills in nutrition form because
//  their product was not found in Open Food Facts.
// ══════════════════════════════════════════════════════════
exports.saveManualEntry = async (req, res, next) => {
  try {
    // If no barcode provided, generate a placeholder so the
    // entry can still be cached and referenced downstream
    const barcode = req.body.barcode || `MANUAL-${Date.now()}`;

    const result = await cacheService.saveManualEntry(barcode, req.body);

    if (!result.success) {
      return res.status(result.statusCode || 500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Manual product saved. Ready for AI scoring.',
      data: {
        barcode:       result.data.barcode,
        name:          result.data.name,
        brand:         result.data.brand,
        nutrition:     result.data.nutrition,
        allergens:     result.data.allergens,
        isManualEntry: true,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ══════════════════════════════════════════════════════════
//  getCacheStats   GET /api/food/cache/stats
//  Diagnostic endpoint — useful during development.
//  In production, protect this with authorize('admin').
// ══════════════════════════════════════════════════════════
exports.getCacheStats = async (req, res, next) => {
  try {
    const memStats = cacheService.getCacheStats();
    const dbTotal  = await ProductCache.countDocuments();
    const dbManual = await ProductCache.countDocuments({ isManualEntry: true });
    const aggResult = await ProductCache.aggregate([
      { $group: { _id: null, avg: { $avg: '$dataCompleteness' } } },
    ]);

    return res.status(200).json({
      success: true,
      cache: {
        memory: {
          keysAlive: memStats.keys,
          hits:      memStats.memory.hits,
          misses:    memStats.memory.misses,
        },
        mongodb: {
          totalProducts:    dbTotal,
          manualEntries:    dbManual,
          avgCompleteness:  aggResult[0]?.avg?.toFixed(1) ?? 'N/A',
          ttlDays:          7,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
