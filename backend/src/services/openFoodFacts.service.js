// src/services/openFoodFacts.service.js
//
// Single responsibility: ALL communication with the Open Food
// Facts API lives here. Nothing else in the app calls OFF
// directly — every lookup goes through fetchByBarcode() or
// searchByName(). This makes it trivial to swap to USDA later.

const axios = require('axios');

// ── Shared axios instance ──────────────────────────────────
// One instance = one place to set timeouts, base URL, headers.
const offClient = axios.create({
  baseURL: 'https://world.openfoodfacts.org',
  timeout: 8000, // 8 s — OFF can be slow on cold requests
  headers: {
    // OFF asks developers to identify their app. A real
    // User-Agent avoids being lumped in with scrapers.
    'User-Agent': process.env.OFF_USER_AGENT || 'NutriScan/1.0',
    'Accept':     'application/json',
  },
});

// ══════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════

// safeNum — converts any OFF nutrition value to a clean float
// OFF sends values as numbers, strings like "12g", "< 0.5",
// "traces", or just leaves the field undefined. We always
// return a usable number or null — never crash on bad input.
const safeNum = (val) => {
  if (val === null || val === undefined || val === '') return null;
  if (typeof val === 'number') return Math.round(val * 100) / 100;

  const str = String(val).toLowerCase().trim();
  if (str === 'traces') return 0;

  // Strip units (g, mg, %) and comparison operators (< >)
  const cleaned = str.replace(/[a-z%]/g, '').replace(/[<>]/g, '').trim();
  const parsed  = parseFloat(cleaned);
  return isNaN(parsed) ? null : Math.round(parsed * 100) / 100;
};

// extractAllergens — OFF stores allergens in two overlapping
// fields with language prefixes like "en:gluten". We merge
// both, strip the prefix, and deduplicate.
const extractAllergens = (product) => {
  const tags = [
    ...(product.allergens_tags      || []),
    ...(product.allergens_hierarchy || []),
  ];
  return [...new Set(
    tags
      .map(t => t.replace(/^[a-z]{2}:/, '').toLowerCase().trim())
      .filter(Boolean)
  )];
};

// extractAdditives — keep only the E-number part
// "en:e471-mono-and-diglycerides"  →  "E471"
const extractAdditives = (product) => {
  return (product.additives_tags || [])
    .map(t => {
      const m = t.match(/:(e\d+[a-z]?)/i);
      return m ? m[1].toUpperCase() : null;
    })
    .filter(Boolean);
};

// calcCompleteness — 0-100 score for how useful the OFF data
// is. Drives the needsManualEntry flag in the API response.
// Weighting: nutrition (60 pts) > ingredients (20) > meta (20)
const calcCompleteness = (doc) => {
  const fields = ['calories','protein','carbohydrates','sugar','fat','saturatedFat','fibre','sodium'];
  const nutritionHits = fields.filter(f => doc.nutrition[f] !== null).length;
  const nutritionPct  = (nutritionHits / fields.length) * 60;
  const ingPct        = doc.ingredientsText ? 20 : 0;
  const namePct       = doc.name  ? 10 : 0;
  const brandPct      = doc.brand ? 10 : 0;
  return Math.round(nutritionPct + ingPct + namePct + brandPct);
};

// ══════════════════════════════════════════════════════════
//  normalizeProduct
//  Heart of this file. Converts messy OFF JSON into our
//  strict schema shape. Output is ALWAYS the same structure
//  — nulls where data is absent. Every other layer depends
//  on this contract.
// ══════════════════════════════════════════════════════════
const normalizeProduct = (offProduct, barcode) => {
  const n = offProduct.nutriments || {};

  const nutrition = {
    calories:      safeNum(n['energy-kcal_100g'] ?? n['energy_100g']),
    protein:       safeNum(n['proteins_100g']),
    carbohydrates: safeNum(n['carbohydrates_100g']),
    sugar:         safeNum(n['sugars_100g']),
    fat:           safeNum(n['fat_100g']),
    saturatedFat:  safeNum(n['saturated-fat_100g']),
    // OFF uses both "fiber" (US) and "fibre" (UK) spellings
    fibre:         safeNum(n['fiber_100g'] ?? n['fibre_100g']),
    // OFF gives sodium in grams — convert to milligrams
    sodium:        n['sodium_100g'] != null ? safeNum(n['sodium_100g'] * 1000) : null,
    salt:          safeNum(n['salt_100g']),
  };

  // Name: try English-specific field first, then generic
  const name = (
    offProduct.product_name_en ||
    offProduct.product_name    ||
    offProduct.abbreviated_product_name ||
    null
  )?.trim() || null;

  // Brand: may be a comma-separated list — take first only
  const brand = offProduct.brands
    ? offProduct.brands.split(',')[0].trim()
    : null;

  // Category: take the most specific English tag available
  const categoryTags = offProduct.categories_tags || [];
  const enCat = categoryTags.filter(t => t.startsWith('en:')).pop();
  const category = enCat
    ? enCat.replace('en:', '').replace(/-/g, ' ')
    : (offProduct.categories || null);

  const doc = {
    barcode:         String(barcode).trim(),
    name,
    brand,
    category,
    imageUrl:        offProduct.image_url || offProduct.image_front_url || null,
    nutrition,
    ingredientsText: offProduct.ingredients_text_en || offProduct.ingredients_text || null,
    additives:       extractAdditives(offProduct),
    allergens:       extractAllergens(offProduct),
    nutriscoreGrade: offProduct.nutriscore_grade || null,
    source:          'open_food_facts',
    cachedAt:        new Date(),
  };

  doc.dataCompleteness = calcCompleteness(doc);
  return doc;
};

// ══════════════════════════════════════════════════════════
//  fetchByBarcode
//  GET /api/v0/product/{barcode}.json
//
//  Returns: { success: true, data: normalizedDoc }
//        or { success: false, error, statusCode }
//
//  Never throws — all errors are caught and returned as a
//  structured object so the cache layer can handle them.
// ══════════════════════════════════════════════════════════
const fetchByBarcode = async (barcode) => {
  const clean = String(barcode).trim().replace(/\s+/g, '');

  // Validate before hitting the network
  if (!/^\d{8,14}$/.test(clean)) {
    return {
      success:    false,
      error:      'Invalid barcode. Expected 8–14 digit numeric string.',
      statusCode: 400,
    };
  }

  try {
    const { data } = await offClient.get(`/api/v0/product/${clean}.json`);

    // OFF returns status:0 when the product is unknown
    if (!data || data.status === 0) {
      return {
        success:    false,
        error:      `Barcode ${clean} not found in Open Food Facts.`,
        statusCode: 404,
        barcode:    clean,
      };
    }

    return {
      success: true,
      data:    normalizeProduct(data.product, clean),
    };

  } catch (err) {
    if (err.response) {
      return {
        success:    false,
        error:      `Open Food Facts returned HTTP ${err.response.status}`,
        statusCode: 502,
        barcode:    clean,
      };
    }
    if (err.code === 'ECONNABORTED') {
      return {
        success:    false,
        error:      'Request to Open Food Facts timed out.',
        statusCode: 504,
        barcode:    clean,
      };
    }
    console.error('[OFF] fetchByBarcode error:', err.message);
    return {
      success:    false,
      error:      'Could not reach Open Food Facts. Please try again.',
      statusCode: 503,
      barcode:    clean,
    };
  }
};

// ══════════════════════════════════════════════════════════
//  searchByName
//  GET /cgi/search.pl?search_terms=...&json=1
//
//  Returns normalised products array filtered to those with
//  at least 30% data completeness (useless stubs excluded).
// ══════════════════════════════════════════════════════════
const searchByName = async (query, page = 1, pageSize = 10) => {
  if (!query || query.trim().length < 2) {
    return {
      success:    false,
      error:      'Search query must be at least 2 characters.',
      statusCode: 400,
    };
  }

  const size = Math.min(Math.max(parseInt(pageSize) || 10, 1), 24);
  const pg   = Math.max(parseInt(page) || 1, 1);

  try {
    const { data } = await offClient.get('/cgi/search.pl', {
      params: {
        search_terms:  query.trim(),
        search_simple: 1,
        action:        'process',
        json:          1,
        page:          pg,
        page_size:     size,
        // Request only the fields we use — cuts response size ~80%
        fields: [
          'code','product_name','product_name_en','brands',
          'categories_tags','image_url','nutriments',
          'ingredients_text','ingredients_text_en',
          'allergens_tags','allergens_hierarchy',
          'additives_tags','nutriscore_grade',
        ].join(','),
      },
    });

    if (!data || !Array.isArray(data.products)) {
      return {
        success:    false,
        error:      'Unexpected response from Open Food Facts search.',
        statusCode: 502,
      };
    }

    const results = data.products
      .filter(p => p && p.code)
      .map(p    => normalizeProduct(p, p.code))
      .filter(p => p.dataCompleteness >= 30); // skip useless stubs

    return {
      success:  true,
      data:     results,
      total:    data.count || results.length,
      page:     pg,
      pageSize: size,
      query:    query.trim(),
    };

  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      return { success: false, error: 'Search timed out.', statusCode: 504 };
    }
    console.error('[OFF] searchByName error:', err.message);
    return { success: false, error: 'Could not reach Open Food Facts.', statusCode: 503 };
  }
};

module.exports = { fetchByBarcode, searchByName };
