// const axios = require("axios");

// // Environment variables
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// // Enhanced CORS headers function
// function setCorsHeaders(res) {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin"
//   );
// }

// // Mock fallback data
// const mockBabyNames = [
//   {
//     id: 1,
//     name: "Aisha",
//     meaning: "Living, prosperous",
//     origin: "Arabic",
//     pronunciation: "AH-ee-shah",
//     category: "Traditional",
//     popularity: "Popular",
//     description: "A beautiful name meaning 'alive' or 'living one'",
//     culturalSignificance: "Aisha was the name of Prophet Muhammad's wife",
//     historicalFigures: ["Aisha bint Abu Bakr"],
//     variations: ["Ayesha", "Aishah"],
//     type: "baby",
//   },
// ];

// const mockBrandNames = [
//   {
//     id: 1,
//     name: "EduNova",
//     meaning: "Educational innovation",
//     category: "Education",
//     description: "A modern name for educational technology",
//     domainAvailable: true,
//     variations: ["EduNov", "EduNova.io"],
//     targetAudience: "Educators and students",
//     type: "brand",
//   },
// ];

// // Generate prompt for AI
// function generatePrompt(type, formData) {
//   if (type === "baby") {
//     const {
//       gender = "unisex",
//       religion = "modern",
//       origin,
//       keywords = [],
//       meaning,
//       startsWith,
//       endsWith,
//       length = "medium",
//     } = formData;

//     return `Generate 20 authentic ${gender} baby names with ${religion} cultural background.
//     ${origin ? `Specific origin: ${origin}. ` : ""}
//     ${keywords.length ? `Keywords: ${keywords.join(", ")}. ` : ""}
//     ${meaning ? `Meaning: ${meaning}. ` : ""}
//     ${startsWith ? `Start with: ${startsWith}. ` : ""}
//     ${endsWith ? `End with: ${endsWith}. ` : ""}
//     Length: ${length}.

//     Return as JSON array with format: [{"name": "...", "meaning": "...", "origin": "...", "pronunciation": "...", "category": "...", "popularity": "...", "description": "...", "culturalSignificance": "...", "historicalFigures": [], "variations": []}]`;
//   } else {
//     const {
//       industry = "business",
//       style = "modern",
//       keywords = [],
//       description,
//       targetAudience,
//       length = "medium",
//       avoidNumbers = true,
//     } = formData;

//     return `Generate 20 creative ${industry} brand names with ${style} style.
//     ${keywords.length ? `Keywords: ${keywords.join(", ")}. ` : ""}
//     ${description ? `Description: ${description}. ` : ""}
//     ${targetAudience ? `Target audience: ${targetAudience}. ` : ""}
//     Length: ${length}.
//     ${avoidNumbers ? "Avoid numbers in names. " : ""}

//     Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
//   }
// }

// // Call OpenRouter API
// async function callAI(prompt) {
//   if (!OPENROUTER_API_KEY) {
//     throw new Error("API key not configured");
//   }

//   try {
//     const response = await axios.post(
//       `${OPENROUTER_BASE_URL}/chat/completions`,
//       {
//         model: "mistralai/mistral-7b-instruct:free",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a name generation expert. Return only valid JSON array. Do not include any markdown formatting or additional text.",
//           },
//           { role: "user", content: prompt },
//         ],
//         temperature: 0.7,
//         max_tokens: 2000,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://baby-brand-names-backend.vercel.app",
//           "X-Title": "Name Generator API",
//         },
//         timeout: 25000,
//       }
//     );

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error(
//       "OpenRouter API Error:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// // Parse AI response
// function parseAIResponse(content, type) {
//   try {
//     let cleaned = content.trim();
//     cleaned = cleaned.replace(/```json\s*/g, "").replace(/```\s*/g, "");

//     const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
//     if (!jsonMatch) {
//       throw new Error("No JSON array found in response");
//     }

//     const parsed = JSON.parse(jsonMatch[0]);

//     if (!Array.isArray(parsed)) {
//       throw new Error("Response is not an array");
//     }

//     return parsed.map((item, index) => ({
//       id: Date.now() + index,
//       type,
//       name: item.name || `Name ${index + 1}`,
//       meaning: item.meaning || "Unknown meaning",
//       origin: item.origin || "Unknown origin",
//       category: item.category || "General",
//       description: item.description || "No description available",
//       ...item,
//     }));
//   } catch (error) {
//     console.error("Parse error:", error);
//     throw new Error(`Failed to parse AI response: ${error.message}`);
//   }
// }

// // Main serverless function
// module.exports = async (req, res) => {
//   // Set CORS headers
//   setCorsHeaders(res);

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     // Parse request body
//     let body = {};
//     try {
//       if (req.body) {
//         if (typeof req.body === "string") {
//           const trimmed = req.body.trim();
//           if (trimmed) {
//             body = JSON.parse(trimmed);
//           }
//         } else {
//           body = req.body;
//         }
//       }
//     } catch (parseError) {
//       console.error("Body parse error:", parseError);
//       return res.status(400).json({
//         success: false,
//         error: "Invalid JSON in request body",
//         message: parseError.message,
//         timestamp: new Date().toISOString(),
//       });
//     }

//     console.log("Request received:", { method: req.method, body });

//     if (req.method === "POST") {
//       const { type, action, ...formData } = body;

//       // Handle name generation
//       if (!action) {
//         if (!type) {
//           return res.status(400).json({
//             success: false,
//             error: "Type is required (baby or brand)",
//             timestamp: new Date().toISOString(),
//           });
//         }

//         let names = [];

//         try {
//           if (OPENROUTER_API_KEY) {
//             const prompt = generatePrompt(type, formData);
//             console.log(
//               "Calling AI with prompt:",
//               prompt.substring(0, 100) + "..."
//             );

//             const aiResponse = await callAI(prompt);
//             names = parseAIResponse(aiResponse, type);
//           } else {
//             throw new Error("No API key available");
//           }
//         } catch (aiError) {
//           console.error("AI failed:", aiError.message);
//           // Use mock data as fallback
//           names = type === "baby" ? mockBabyNames : mockBrandNames;
//         }

//         return res.status(200).json({
//           success: true,
//           names,
//           count: names.length,
//           type,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       // Handle other actions
//       return res.status(200).json({
//         success: true,
//         message: `Action ${action} processed`,
//         timestamp: new Date().toISOString(),
//       });
//     }

//     if (req.method === "GET") {
//       return res.status(200).json({
//         success: true,
//         message: "Names API is working",
//         timestamp: new Date().toISOString(),
//         endpoints: {
//           POST: "Generate names",
//           "POST with action=suggestions": "Get name suggestions",
//           "POST with action=details": "Get name details",
//         },
//       });
//     }

//     return res.status(405).json({
//       success: false,
//       error: "Method not allowed",
//       allowed: ["GET", "POST", "OPTIONS"],
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       message: error.message,
//       timestamp: new Date().toISOString(),
//     });
//   }
// };

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

    return `Generate 20 authentic ${gender} baby names with ${religion} cultural background. 
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

    return `Generate 20 creative ${industry} brand names with ${style} style.
    ${keywords.length ? `Keywords: ${keywords.join(", ")}. ` : ""}
    ${description ? `Description: ${description}. ` : ""}
    ${targetAudience ? `Target audience: ${targetAudience}. ` : ""}
    Length: ${length}.
    ${avoidNumbers ? "Avoid numbers in names. " : ""}
    
    Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
  }
}

// Call OpenRouter API with retry logic
async function callAI(prompt, retries = 2) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("API key not configured");
  }

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

      const response = await axios.post(
        `${OPENROUTER_BASE_URL}/chat/completions`,
        {
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are a name generation expert. Return only valid JSON array. Do not include any markdown formatting or additional text. Ensure the response is a complete JSON array.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1500, // Reduced to prevent memory issues
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://baby-brand-names-backend.vercel.app",
            "X-Title": "Name Generator API",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid API response structure");
      }

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(
        `OpenRouter API Error (attempt ${attempt}):`,
        error.response?.data || error.message
      );

      if (attempt === retries + 1) {
        throw error;
      }

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Parse AI response with better error handling
function parseAIResponse(content, type) {
  try {
    if (!content || typeof content !== "string") {
      throw new Error("Empty or invalid response content");
    }

    let cleaned = content.trim();

    // Remove markdown formatting
    cleaned = cleaned.replace(/```json\s*/g, "").replace(/```\s*/g, "");

    // Remove any text before and after JSON
    const jsonStart = cleaned.indexOf("[");
    const jsonEnd = cleaned.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1 || jsonStart >= jsonEnd) {
      throw new Error("No valid JSON array found in response");
    }

    const jsonString = cleaned.substring(jsonStart, jsonEnd + 1);

    // Validate JSON structure
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      throw new Error("Invalid JSON format in AI response");
    }

    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array");
    }

    if (parsed.length === 0) {
      throw new Error("Empty array returned from AI");
    }

    // Generate unique IDs using timestamp and random number
    const baseTime = Date.now();

    return parsed
      .slice(0, 20)
      .map((item, index) => {
        if (!item || typeof item !== "object") {
          console.warn(`Invalid item at index ${index}:`, item);
          return null;
        }

        return {
          id: baseTime + index + Math.floor(Math.random() * 1000),
          type,
          name: item.name || `Name ${index + 1}`,
          meaning: item.meaning || "Unknown meaning",
          origin: item.origin || "Unknown origin",
          category: item.category || "General",
          description: item.description || "No description available",
          ...item,
        };
      })
      .filter(Boolean); // Remove null items
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
    // Parse request body with better error handling
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
        if (!type || (type !== "baby" && type !== "brand")) {
          return res.status(400).json({
            success: false,
            error: "Type is required and must be 'baby' or 'brand'",
            timestamp: new Date().toISOString(),
          });
        }

        let names = [];
        let usedFallback = false;

        try {
          if (OPENROUTER_API_KEY) {
            const prompt = generatePrompt(type, formData);
            console.log(
              "Calling AI with prompt:",
              prompt.substring(0, 100) + "..."
            );

            const aiResponse = await callAI(prompt);
            names = parseAIResponse(aiResponse, type);

            // Ensure we have at least some names
            if (!names || names.length === 0) {
              throw new Error("No valid names generated from AI");
            }
          } else {
            throw new Error("No API key available");
          }
        } catch (aiError) {
          console.error("AI failed:", aiError.message);
          // Use mock data as fallback
          names = type === "baby" ? [...mockBabyNames] : [...mockBrandNames];
          usedFallback = true;

          // Generate multiple mock entries
          const baseNames = [...names];
          for (let i = 1; i < 10; i++) {
            names.push({
              ...baseNames[0],
              id: Date.now() + i + Math.floor(Math.random() * 1000),
              name: `${baseNames[0].name}${i}`,
            });
          }
        }

        return res.status(200).json({
          success: true,
          names: names.slice(0, 20), // Ensure max 20 names
          count: Math.min(names.length, 20),
          type,
          usedFallback,
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
