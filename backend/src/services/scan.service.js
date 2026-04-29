// src/services/scan.service.js
//
// ═══════════════════════════════════════════════════════════
//  THE MEDIATOR — Dev 2's contribution to the shared service
// ═══════════════════════════════════════════════════════════
//
//  This service is the central coordinator for a scan request.
//  It owns steps 1 and 2 of the scan pipeline:
//
//  FULL PIPELINE (all devs):
//
//  [POST /api/scan/barcode/:code]
//         │
//         ▼
//  Step 1 ── getProductData()          ← DEV 2 (YOU) — this file
//         │   Gets nutrition data from cache/OFF API
//         │
//  Step 2 ── getUserProfile()          ← DEV 2 (YOU) — this file
//         │   Gets user's allergies, conditions, health goals
//         │
//  Step 3 ── scoringService.score()    ← DEV 3 — scoring.service.js
//         │   Computes 0-100 score + Red/Yellow/Green flag
//         │
//  Step 4 ── aiService.explain()       ← DEV 3 — ai.service.js
//         │   Generates explanation + alternatives
//         │
//  Step 5 ── saveScanHistory()         ← DEV 3 — ScanHistory model
//         │   Persists the scan to MongoDB
//         │
//  Step 6 ── return assembled result   ← scan.controller.js (shared)
//
// ═══════════════════════════════════════════════════════════
//
//  HOW DEV 3 PLUGS IN:
//  This file exports runScan() which calls two placeholder
//  functions: scoringService.score() and aiService.explain().
//  Dev 3 just needs to build those two functions with the
//  exact signatures documented below — this file will call
//  them automatically once they exist.
//
// ═══════════════════════════════════════════════════════════

const cacheService = require('./productCache.service');
const Profile      = require('../models/Profile');

// ── Dev 3 plug-in points ───────────────────────────────────
// These are imported lazily inside runScan() so the server
// doesn't crash if Dev 3's files don't exist yet.
// Once Dev 3 creates these files, they will be used automatically.
const loadScoringService = () => {
  try {
    return require('./scoring.service');
  } catch {
    return null; // Dev 3 hasn't built this yet
  }
};

const loadAiService = () => {
  try {
    return require('./ai.service');
  } catch {
    return null; // Dev 3 hasn't built this yet
  }
};

// ══════════════════════════════════════════════════════════
//  STEP 1: getProductData
//  Fetches nutrition data using the cache service.
//  Returns the normalised product or a structured error.
//
//  INPUT:  barcode string (e.g. "3017620422003")
//  OUTPUT: { success, product } or { success: false, error }
// ══════════════════════════════════════════════════════════
const getProductData = async (barcode) => {
  const result = await cacheService.getByBarcode(barcode);

  if (!result.success) {
    return {
      success:    false,
      error:      result.error,
      statusCode: result.statusCode || 404,
    };
  }

  return {
    success: true,
    product: result.data,        // full normalised product from cache
    fromCache:  result.fromCache,
    cacheLevel: result.cacheLevel,
  };
};

// ══════════════════════════════════════════════════════════
//  STEP 2: getUserProfile
//  Fetches the user's health profile from MongoDB.
//  The profile contains allergies, conditions, and health
//  goals that personalise the scoring and alerts.
//
//  INPUT:  userId (MongoDB ObjectId from req.user._id)
//  OUTPUT: { success, profile } or { success, profile: null }
//          — null profile is NOT an error; guest/new users
//            simply get non-personalised scoring
// ══════════════════════════════════════════════════════════
const getUserProfile = async (userId) => {
  try {
    // .lean() for performance — we only read, never save
    const profile = await Profile.findOne({ userId }).lean();

    return {
      success: true,
      // Return the profile or safe defaults if none exists yet
      profile: profile || {
        allergies:   [],
        conditions:  [],
        healthGoals: [],
        age:         null,
        gender:      null,
        weight:      null,
        height:      null,
        activityLevel: null,
      },
      hasProfile: !!profile, // tells scoring whether to personalise
    };
  } catch (err) {
    console.error('[ScanService] getUserProfile error:', err.message);
    // DB error — return safe defaults so scan still works
    return {
      success:    true, // not a fatal error for the scan
      profile:    { allergies: [], conditions: [], healthGoals: [] },
      hasProfile: false,
    };
  }
};

// ══════════════════════════════════════════════════════════
//  STEP 3 (inline fallback): checkAllergens
//  Compares product allergens against the user's registered
//  allergens from their profile.
//
//  This gives allergen alerts even before Dev 3's AI service
//  is built. Dev 3's ai.service can override this later.
//
//  INPUT:  productAllergens  — string[] e.g. ["milk","nuts"]
//          userAllergies     — string[] from Profile.allergies
//  OUTPUT: alert objects array
// ══════════════════════════════════════════════════════════
const checkAllergens = (productAllergens = [], userAllergies = []) => {
  if (!userAllergies.length || !productAllergens.length) return [];

  const userSet = new Set(userAllergies.map(a => a.toLowerCase().trim()));

  return productAllergens
    .filter(a => userSet.has(a.toLowerCase().trim()))
    .map(allergen => ({
      allergen,
      severity: 'high',   // all matched allergens are high severity
      message:  `⚠️ Contains ${allergen} — matches your allergy profile`,
    }));
};

// ══════════════════════════════════════════════════════════
//  MAIN EXPORT: runScan
//  Orchestrates all steps and assembles the final result.
//  This is what scan.controller.js calls.
//
//  INPUT:
//    barcode  — string
//    userId   — MongoDB ObjectId (from req.user._id)
//
//  OUTPUT: {
//    success,
//    product,          ← normalised nutrition data (Dev 2)
//    profile,          ← user health context (Dev 2)
//    allergenAlerts,   ← matched allergens (Dev 2)
//    score,            ← 0-100 health score (Dev 3, or placeholder)
//    colorFlag,        ← 'green'|'yellow'|'red' (Dev 3, or placeholder)
//    explanation,      ← AI text (Dev 3, or placeholder)
//    alternatives,     ← healthier products (Dev 3, or placeholder)
//    fromCache,
//    cacheLevel,
//  }
// ══════════════════════════════════════════════════════════
const runScan = async (barcode, userId) => {

  // ── Steps 1 & 2 run in parallel (no dependency on each other)
  const [productResult, profileResult] = await Promise.all([
    getProductData(barcode),
    getUserProfile(userId),
  ]);

  // Product fetch failed — cannot continue
  if (!productResult.success) {
    return {
      success:    false,
      error:      productResult.error,
      statusCode: productResult.statusCode,
    };
  }

  const { product, fromCache, cacheLevel } = productResult;
  const { profile, hasProfile }            = profileResult;

  // ── Step 2b: Allergen check (Dev 2 contribution)
  const allergenAlerts = checkAllergens(
    product.allergens,
    profile.allergies
  );

  // ── Step 3: Scoring (Dev 3's scoring.service)
  // ─────────────────────────────────────────────
  // INTERFACE FOR DEV 3:
  // scoring.service.js must export a function:
  //
  //   score({ product, profile }) => {
  //     score:     Number (0-100),
  //     colorFlag: 'green' | 'yellow' | 'red',
  //     breakdown: { ... }   ← optional detail
  //   }
  //
  let scoreResult = null;
  const scoringService = loadScoringService();
  if (scoringService) {
    try {
      scoreResult = await scoringService.score({ product, profile });
    } catch (err) {
      console.error('[ScanService] scoring.service error:', err.message);
    }
  }

  // Placeholder until Dev 3 builds scoring.service.js
  if (!scoreResult) {
    scoreResult = {
      score:     null,
      colorFlag: null,
      breakdown: null,
      _placeholder: true,
    };
  }

  // ── Step 4: AI Explanation (Dev 3's ai.service)
  // ────────────────────────────────────────────────
  // INTERFACE FOR DEV 3:
  // ai.service.js must export a function:
  //
  //   explain({ product, profile, score, allergenAlerts }) => {
  //     explanation:  String,
  //     alternatives: Array<{ name, reason }>
  //   }
  //
  let aiResult = null;
  const aiService = loadAiService();
  if (aiService) {
    try {
      aiResult = await aiService.explain({
        product,
        profile,
        score:         scoreResult.score,
        allergenAlerts,
      });
    } catch (err) {
      console.error('[ScanService] ai.service error:', err.message);
    }
  }

  // Placeholder until Dev 3 builds ai.service.js
  if (!aiResult) {
    aiResult = {
      explanation:  null,
      alternatives: [],
      _placeholder: true,
    };
  }

  // ── Assemble final result ──────────────────────────────
  return {
    success: true,

    // ── Product data (Dev 2) ────────────────────────────
    product: {
      barcode:         product.barcode,
      name:            product.name,
      brand:           product.brand,
      category:        product.category,
      imageUrl:        product.imageUrl,
      nutrition:       product.nutrition,
      ingredientsText: product.ingredientsText,
      additives:       product.additives,
      allergens:       product.allergens,
      nutriscoreGrade: product.nutriscoreGrade,
      isManualEntry:   product.isManualEntry,
    },

    // ── User context (Dev 2) ────────────────────────────
    profile: {
      hasProfile,
      healthGoals: profile.healthGoals,
      conditions:  profile.conditions,
      allergies:   profile.allergies,
    },

    // ── Allergen alerts (Dev 2) ─────────────────────────
    allergenAlerts,

    // ── Scoring (Dev 3) ─────────────────────────────────
    score:     scoreResult.score,
    colorFlag: scoreResult.colorFlag,
    breakdown: scoreResult.breakdown,

    // ── AI output (Dev 3) ────────────────────────────────
    explanation:  aiResult.explanation,
    alternatives: aiResult.alternatives,

    // ── Cache metadata ───────────────────────────────────
    fromCache,
    cacheLevel,
    dataCompleteness: product.dataCompleteness,
  };
};

module.exports = {
  runScan,
  getProductData,   // exported so scan.controller can use individually
  getUserProfile,   // exported so Dev 1 can use in profile flows
  checkAllergens,   // exported so Dev 3 can use in scoring
};
