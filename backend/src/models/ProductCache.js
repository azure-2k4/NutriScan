// src/models/ProductCache.js

const mongoose = require('mongoose');

// ── Sub-schema: Nutrition per 100g ────────────────────────
// All values stored per 100g so every product is comparable
// regardless of serving size. Maps directly to the SRS ER
// diagram "Food" entity fields.
const NutritionSchema = new mongoose.Schema({
  calories:      { type: Number, default: null }, // kcal
  protein:       { type: Number, default: null }, // g
  carbohydrates: { type: Number, default: null }, // g
  sugar:         { type: Number, default: null }, // g
  fat:           { type: Number, default: null }, // g
  saturatedFat:  { type: Number, default: null }, // g
  fibre:         { type: Number, default: null }, // g
  sodium:        { type: Number, default: null }, // mg
  salt:          { type: Number, default: null }, // g
}, { _id: false });

// ── Main Schema ────────────────────────────────────────────
const ProductCacheSchema = new mongoose.Schema({

  // Primary key for all lookups
  barcode: {
    type:     String,
    required: true,
    unique:   true,
    index:    true,
    trim:     true,
  },

  // Product identity — maps to SRS Product entity
  name:     { type: String, default: null, trim: true },
  brand:    { type: String, default: null, trim: true },
  category: { type: String, default: null, trim: true },
  imageUrl: { type: String, default: null },

  // Core nutrition data (per 100g)
  nutrition: {
    type:    NutritionSchema,
    default: () => ({}),
  },

  // Ingredients & processing
  ingredientsText: { type: String,   default: null },
  additives:       { type: [String], default: []   },

  // Allergen tags — e.g. ["gluten", "peanuts", "milk"]
  // Matched against Profile.allergies for FR4 alerts
  allergens: { type: [String], default: [] },

  // Nutri-Score grade from Open Food Facts (a–e)
  nutriscoreGrade: {
    type:    String,
    enum:    ['a', 'b', 'c', 'd', 'e', null],
    default: null,
  },

  // 0–100: how complete the OFF data was at cache time.
  // If < 40, the API sets needsManualEntry:true so the
  // frontend (FR3) can prompt the user to fill in gaps.
  dataCompleteness: { type: Number, min: 0, max: 100, default: 0 },

  // Was this entry created via the manual entry form (FR3)?
  isManualEntry: { type: Boolean, default: false },

  // Which external source populated this entry
  source: {
    type:    String,
    enum:    ['open_food_facts', 'manual'],
    default: 'open_food_facts',
  },

  // ── TTL field ─────────────────────────────────────────
  // MongoDB's TTL monitor checks this field every 60 s and
  // deletes the document once:
  //   cachedAt + 604800 seconds  <  now
  // 604800 = 60 × 60 × 24 × 7  =  7 days
  cachedAt: {
    type:     Date,
    default:  Date.now,
    required: true,
  },

}, {
  timestamps:  true,  // adds createdAt, updatedAt
  versionKey:  false, // removes __v
});

// ── 7-Day TTL Index ────────────────────────────────────────
// This is the only thing required to enable auto-expiry.
// MongoDB handles deletion automatically — no cron jobs needed.
ProductCacheSchema.index(
  { cachedAt: 1 },
  { expireAfterSeconds: 604800, name: 'cache_ttl_7days' }
);

module.exports = mongoose.model('ProductCache', ProductCacheSchema);
