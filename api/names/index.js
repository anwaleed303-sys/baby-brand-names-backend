const axios = require("axios");

// Environment variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// Enhanced CORS headers function
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin"
  );
}

// Mock fallback data
const mockBabyNames = [
  {
    id: 1,
    name: "Aisha",
    meaning: "Living, prosperous",
    origin: "Arabic",
    pronunciation: "AH-ee-shah",
    category: "Traditional",
    popularity: "Popular",
    description: "A beautiful name meaning 'alive' or 'living one'",
    culturalSignificance: "Aisha was the name of Prophet Muhammad's wife",
    historicalFigures: ["Aisha bint Abu Bakr"],
    variations: ["Ayesha", "Aishah"],
    type: "baby",
  },
];

const mockBrandNames = [
  {
    id: 1,
    name: "EduNova",
    meaning: "Educational innovation",
    category: "Education",
    description: "A modern name for educational technology",
    domainAvailable: true,
    variations: ["EduNov", "EduNova.io"],
    targetAudience: "Educators and students",
    type: "brand",
  },
];

// Generate prompt for AI
function generatePrompt(type, formData) {
  if (type === "baby") {
    const {
      gender = "unisex",
      religion = "modern",
      origin,
      keywords = [],
      meaning,
      startsWith,
      endsWith,
      length = "medium",
    } = formData;

    return `Generate 10 authentic ${gender} baby names with ${religion} cultural background. 
    ${origin ? `Specific origin: ${origin}. ` : ""}
    ${keywords.length ? `Keywords: ${keywords.join(", ")}. ` : ""}
    ${meaning ? `Meaning: ${meaning}. ` : ""}
    ${startsWith ? `Start with: ${startsWith}. ` : ""}
    ${endsWith ? `End with: ${endsWith}. ` : ""}
    Length: ${length}.
    
    Return as JSON array with format: [{"name": "...", "meaning": "...", "origin": "...", "pronunciation": "...", "category": "...", "popularity": "...", "description": "...", "culturalSignificance": "...", "historicalFigures": [], "variations": []}]`;
  } else {
    const {
      industry = "business",
      style = "modern",
      keywords = [],
      description,
      targetAudience,
      length = "medium",
      avoidNumbers = true,
    } = formData;

    return `Generate 10 creative ${industry} brand names with ${style} style.
    ${keywords.length ? `Keywords: ${keywords.join(", ")}. ` : ""}
    ${description ? `Description: ${description}. ` : ""}
    ${targetAudience ? `Target audience: ${targetAudience}. ` : ""}
    Length: ${length}.
    ${avoidNumbers ? "Avoid numbers in names. " : ""}
    
    Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
  }
}

// Call OpenRouter API
async function callAI(prompt) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a name generation expert. Return only valid JSON array. Do not include any markdown formatting or additional text.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://baby-brand-names-backend.vercel.app",
          "X-Title": "Name Generator API",
        },
        timeout: 25000,
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenRouter API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Parse AI response
function parseAIResponse(content, type) {
  try {
    let cleaned = content.trim();
    cleaned = cleaned.replace(/```json\s*/g, "").replace(/```\s*/g, "");

    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array");
    }

    return parsed.map((item, index) => ({
      id: Date.now() + index,
      type,
      name: item.name || `Name ${index + 1}`,
      meaning: item.meaning || "Unknown meaning",
      origin: item.origin || "Unknown origin",
      category: item.category || "General",
      description: item.description || "No description available",
      ...item,
    }));
  } catch (error) {
    console.error("Parse error:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}

// Main serverless function
module.exports = async (req, res) => {
  // Set CORS headers
  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Parse request body
    let body = {};
    try {
      if (req.body) {
        if (typeof req.body === "string") {
          const trimmed = req.body.trim();
          if (trimmed) {
            body = JSON.parse(trimmed);
          }
        } else {
          body = req.body;
        }
      }
    } catch (parseError) {
      console.error("Body parse error:", parseError);
      return res.status(400).json({
        success: false,
        error: "Invalid JSON in request body",
        message: parseError.message,
        timestamp: new Date().toISOString(),
      });
    }

    console.log("Request received:", { method: req.method, body });

    if (req.method === "POST") {
      const { type, action, ...formData } = body;

      // Handle name generation
      if (!action) {
        if (!type) {
          return res.status(400).json({
            success: false,
            error: "Type is required (baby or brand)",
            timestamp: new Date().toISOString(),
          });
        }

        let names = [];

        try {
          if (OPENROUTER_API_KEY) {
            const prompt = generatePrompt(type, formData);
            console.log(
              "Calling AI with prompt:",
              prompt.substring(0, 100) + "..."
            );

            const aiResponse = await callAI(prompt);
            names = parseAIResponse(aiResponse, type);
          } else {
            throw new Error("No API key available");
          }
        } catch (aiError) {
          console.error("AI failed:", aiError.message);
          // Use mock data as fallback
          names = type === "baby" ? mockBabyNames : mockBrandNames;
        }

        return res.status(200).json({
          success: true,
          names,
          count: names.length,
          type,
          timestamp: new Date().toISOString(),
        });
      }

      // Handle other actions
      return res.status(200).json({
        success: true,
        message: `Action ${action} processed`,
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        message: "Names API is working",
        timestamp: new Date().toISOString(),
        endpoints: {
          POST: "Generate names",
          "POST with action=suggestions": "Get name suggestions",
          "POST with action=details": "Get name details",
        },
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      allowed: ["GET", "POST", "OPTIONS"],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
