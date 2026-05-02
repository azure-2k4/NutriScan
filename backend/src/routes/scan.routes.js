// src/routes/scan.routes.js
//
// Shared route — all three devs contribute to what happens
// when these endpoints are called, via scan.service.js.
//
// ROUTES:
//   POST /api/scan/barcode/:code   → full scan pipeline
//   POST /api/scan/search          → search then scan first result
//   POST /api/scan/manual          → scan a manually entered product
//   GET  /api/scan/history         → placeholder for Dev 3

const express    = require('express');
const Joi        = require('joi');
const router     = express.Router();
const controller = require('../controllers/scan.controller');
const { protect } = require('../middleware/auth.middleware');

// ── Reusable Joi validation middleware ─────────────────────
const validate = (schema, target = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[target], { abortEarly: false });
  if (error) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(d => ({
        field:   d.context?.key || 'unknown',
        message: d.message.replace(/['"]/g, ''),
      })),
    });
  }
  req[target] = value;
  next();
};

// ── Schemas ────────────────────────────────────────────────
const barcodeSchema = Joi.object({
  code: Joi.string()
    .pattern(/^\d{8,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Barcode must be 8–14 digits.',
      'any.required':        'Barcode is required.',
    }),
});

const searchSchema = Joi.object({
  q: Joi.string().min(2).max(100).required().messages({
    'string.min':   'Search query must be at least 2 characters.',
    'any.required': 'Query q is required.',
  }),
});

const manualSchema = Joi.object({
  barcode: Joi.string().pattern(/^\d{8,14}$/).optional(),
  name:    Joi.string().max(200).optional().allow('', null),
  brand:   Joi.string().max(100).optional().allow('', null),
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
  allergens: Joi.array().items(Joi.string()).optional().default([]),
});

// ══════════════════════════════════════════════════════════
//  POST /api/scan/barcode/:code
//  The main scan endpoint — full pipeline.
//  Called by the frontend barcode scanner (FR3/FR4).
// ══════════════════════════════════════════════════════════
// CHANGE: protect middleware added here so Dev 2 can test with auth. Dev 3 can remove if needed.
router.post(
  '/barcode/:code',
  protect,
  validate(barcodeSchema, 'params'),
  controller.scanByBarcode
);

// router.post(
//   '/barcode/:code',
//   validate(barcodeSchema, 'params'),
//   controller.scanByBarcode
// );
// ══════════════════════════════════════════════════════════
//  POST /api/scan/search
//  Search by name and scan the first/chosen result.
//  Body: { q: "nutella" }
// ══════════════════════════════════════════════════════════
router.post(
  '/search',
  protect,
  validate(searchSchema, 'body'),
  controller.scanBySearch
);

// ══════════════════════════════════════════════════════════
//  POST /api/scan/manual
//  Scan a manually entered product (FR3).
//  Called when user fills in nutrition form.
// ══════════════════════════════════════════════════════════
router.post(
  '/manual',
  protect,
  validate(manualSchema, 'body'),
  controller.scanManual
);

// ══════════════════════════════════════════════════════════
//  GET /api/scan/history
//  Placeholder — Dev 3 implements ScanHistory model & logic.
//  Route is registered here so the endpoint exists and
//  returns a clear message rather than 404.
// ══════════════════════════════════════════════════════════
router.get(
  '/history',
  protect,
  controller.getScanHistory
);

router.get(
  '/history/:id',
  protect,
  controller.getScanHistoryItem
);

module.exports = router;
