// services/ai.service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API Key from your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.explain = async ({ product, profile, score, allergenAlerts }) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 1. Construct a highly structured prompt
  const prompt = `
    You are an expert nutritionist AI. Analyze this product for a user:
    - Product: ${product.product_name}
    - Score: ${score}/100
    - User Goals: ${profile.healthGoals.join(", ")}
    - User Allergies: ${profile.allergies.join(", ")}
    - Detected Allergen Risks: ${allergenAlerts.join(", ")}
    - Nutrients (per 100g): Sugar: ${product.nutriments?.sugars_100g}g, Sodium: ${product.nutriments?.sodium_100g}g

    Task:
    1. Provide a 2-3 sentence explanation of why this product got this score based on their specific goals.
    2. Suggest 3 healthier alternatives that are safe for their allergies.
    
    Return ONLY a JSON object with this structure:
    {
      "explanation": "string",
      "alternatives": [{"name": "string", "reason": "string"}]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON from the LLM response
    // (Note: In production, add a regex or JSON.parse safety check here)
    return JSON.parse(text);
  } catch (err) {
    console.error("AI Service Error:", err);
    // Fallback if AI fails so the app doesn't crash
    return {
      explanation: `This product has a score of ${score}/100. Please consult the nutritional table for details.`,
      alternatives: []
    };
  }
};