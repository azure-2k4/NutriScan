// src/routes/food.routes.js
//
// Defines all /api/food/* endpoints.
// Uses Joi for validation — matching the existing project
// convention (Joi is already in package.json).
//
// ROUTES:
//   GET  /api/food/barcode/:code   → look up by barcode
//   GET  /api/food/search          → search by name
//   POST /api/food/manual          → save manual entry (FR3)
//   GET  /api/food/cache/stats     → diagnostics

const express    = require('express');
const Joi        = require('joi');
const router     = express.Router();
const controller = require('../controllers/food.controller');
const { protect } = require('../middleware/auth.middleware');

// ── Reusable Joi validation middleware factory ─────────────
// Validates the specified part of the request (params/query/body)
// against a Joi schema. Returns 422 with clean error messages
// on failure — same pattern as other routes in this project.
const validate = (schema, target = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[target], { abortEarly: false });
  if (error) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  error.details.map(d => ({
        field:   d.context?.key || 'unknown',
        message: d.message.replace(/['"]/g, ''),
      })),
    });
  }
  // Attach validated + coerced values back to the request
  req[target] = value;
  next();
};

// ── Joi Schemas ────────────────────────────────────────────

const barcodeSchema = Joi.object({
  code: Joi.string()
    .pattern(/^\d{8,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Barcode must be 8–14 digits (EAN-8, EAN-13, UPC-A).',
      'any.required':        'Barcode is required.',
    }),
});

const searchSchema = Joi.object({
  q: Joi.string().min(2).max(100).required().messages({
    'string.min':    'Search query must be at least 2 characters.',
    'any.required':  'Query parameter q is required.',
  }),
  page:     Joi.number().integer().min(1).max(100).default(1),
  pageSize: Joi.number().integer().min(1).max(24).default(10),
});

const manualEntrySchema = Joi.object({
  barcode: Joi.string().pattern(/^\d{8,14}$/).optional().messages({
    'string.pattern.base': 'If provided, barcode must be 8–14 digits.',
  }),
  name:  Joi.string().max(200).optional().allow('', null),
  brand: Joi.string().max(100).optional().allow('', null),
  nutrition: Joi.object({
    calories:      Joi.number().min(0).max(9000).allow(null).optional(),
    protein:       Joi.number().min(0).max(100).allow(null).optional(),
    carbohydrates: Joi.number().min(0).max(100).allow(null).optional(),
    sugar:         Joi.number().min(0).max(100).allow(null).optional(),
    fat:           Joi.number().min(0).max(100).allow(null).optional(),
    saturatedFat:  Joi.number().min(0).max(100).allow(null).optional(),
    fibre:         Joi.number().min(0).max(100).allow(null).optional(),
    sodium:        Joi.number().min(0).max(10000).allow(null).optional(),
  }).optional().default({}),
  ingredientsText: Joi.string().max(2000).optional().allow('', null),
  allergens:       Joi.array().items(Joi.string()).optional().default([]),
});

// ══════════════════════════════════════════════════════════
//  ROUTES
// ══════════════════════════════════════════════════════════

// GET /api/food/barcode/:code
// Protected — requires a valid JWT. The frontend sends the
// barcode from the camera scanner (FR3) or manual input here.
/// -----------------------------------------------------------------------------------------
////---------------------------- CHANGE -------------------------------------------------
router.get(
  '/barcode/:code',
  protect,
  validate(barcodeSchema, 'params'),
  controller.getByBarcode
);
// For development/testing, we can skip authentication to make it easier to test with Postman.
// In production, add protect back in after validate. 
// router.get(
//   '/barcode/:code',
//   validate(barcodeSchema, 'params'),
//   controller.getByBarcode
// );

/// -----------------------------------------------------------------------------------------

// GET /api/food/search?q=oats&page=1&pageSize=10
// Protected — used by the dashboard name-search tab.
router.get(
  '/search',
  protect,
  validate(searchSchema, 'query'),
  controller.searchProducts
);

// POST /api/food/manual
// Protected — saves a manually-entered product (FR3).
// Called when the user fills in the nutrition form because
// the product was not found via barcode or name search.
router.post(
  '/manual',
  protect,
  validate(manualEntrySchema, 'body'),
  controller.saveManualEntry
);

// GET /api/food/cache/stats
// Admin-only diagnostic. For development, protect is enough.
// In production, add authorize('admin') after protect.
router.get(
  '/cache/stats',
  protect,
  controller.getCacheStats
);

module.exports = router;
