// services/ai.service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API Key from your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.explain = async ({ product, profile, score, allergenAlerts }) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // 1. Construct a highly structured prompt
  const prompt = `
    You are an expert nutritionist AI. Analyze this product for a user:
    - Product: ${product.name}
    - Score: ${score}/100
    - User Goals: ${profile.healthGoals.join(", ")}
    - User Allergies: ${profile.allergies.join(", ")}
    - Detected Allergen Risks: ${allergenAlerts.join(", ")}
    - Nutrients (per 100g): Sugar: ${product.nutrition?.sugar}g, Sodium: ${product.nutrition?.sodium}g

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
    // Strip markdown code blocks if the model wrapped the JSON in \`\`\`json ... \`\`\`
    const cleanText = text.replace(/^```json/im, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleanText);
    
    // Fetch images and barcodes for the alternatives from Open Food Facts
    if (parsed.alternatives && Array.isArray(parsed.alternatives)) {
      const offService = require('./openFoodFacts.service');
      // Run searches in parallel for speed
      await Promise.all(parsed.alternatives.map(async (alt) => {
        try {
          // Search for the alternative name, get the top result
          const searchRes = await offService.searchByName(alt.name, 1, 1);
          if (searchRes.success && searchRes.data && searchRes.data.length > 0) {
            alt.imageUrl = searchRes.data[0].imageUrl || null;
            alt.barcode = searchRes.data[0].barcode || null;
          }
        } catch (e) {
          console.error("Failed to fetch image for alternative:", alt.name);
        }
      }));
    }
    
    return parsed;
  } catch (err) {
    console.error("AI Service Error:", err);
    // Fallback if AI fails so the app doesn't crash
    return {
      explanation: `This product has a score of ${score}/100. Please consult the nutritional table for details.`,
      alternatives: []
    };
  }
};