// services/scoring.service.js

/**
 * Logic for calculating the 0-100 Health Score
 * @param {Object} product - Raw food data from food.service
 * @param {Object} profile - User health profile from profile model
 */
exports.score = async ({ product, profile }) => {
  let score = 100;
  const deductions = [];

  const nutrients = product.nutrition || {};
  const goals = profile.healthGoals || [];

  // 1. SUGAR DEDUCTIONS (Impacts Weight Loss & Diabetes)
  const sugar = nutrients.sugar || 0;
  if (sugar > 10) {
    const penalty = goals.includes('Diabetes Management') ? 30 : 15;
    score -= penalty;
    deductions.push({ type: 'Sugar', value: sugar, penalty });
  }

  // 2. SODIUM DEDUCTIONS (Impacts Heart Health)
  const sodium = nutrients.sodium || 0;
  if (sodium > 0.5) {
    score -= 15;
    deductions.push({ type: 'Sodium', value: sodium, penalty: 15 });
  }

  // 3. PROTEIN/FIBRE BONUSES (Reward healthy components)
  const protein = nutrients.protein || 0;
  const fibre = nutrients.fibre || 0;
  if (protein > 10 || fibre > 5) {
    score += 10; // Positive reinforcement
  }

  // Ensure score stays within 0-100
  const finalScore = Math.max(0, Math.min(100, score));

  // Determine Color Flag
  let colorFlag = 'green';
  if (finalScore < 40) colorFlag = 'red';
  else if (finalScore < 75) colorFlag = 'yellow';

  return {
    score: finalScore,
    colorFlag,
    breakdown: {
      deductions,
      nutrientsFound: { sugar, sodium, protein, fibre }
    }
  };
};