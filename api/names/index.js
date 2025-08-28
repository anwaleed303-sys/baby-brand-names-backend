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

// Religion-specific name generation prompts
function generateReligionSpecificPrompt(type, formData) {
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

  // Handle different gender formats
  let genderText = gender;
  if (gender === "girl" || gender === "female") {
    genderText = "girl";
  } else if (gender === "boy" || gender === "male") {
    genderText = "boy";
  } else {
    genderText = "unisex";
  }

  // Religion-specific contexts and requirements
  const religionContexts = {
    islamic: {
      context: "Islamic/Muslim",
      origin: "Arabic, Persian, Turkish, Urdu",
      culturalNote:
        "with Islamic religious significance, following Islamic naming traditions",
      examples: "like Muhammad, Aisha, Omar, Fatima, Ali, Khadija",
      significance: "with meanings from Quran, Hadith, or Islamic history",
    },
    hindu: {
      context: "Hindu/Sanskrit",
      origin: "Sanskrit, Hindi, Tamil, Telugu, Bengali",
      culturalNote:
        "with Hindu religious significance, from Sanskrit literature",
      examples: "like Krishna, Lakshmi, Arjun, Priya, Vishnu, Saraswati",
      significance: "with meanings from Vedas, Puranas, or Hindu mythology",
    },
    christian: {
      context: "Christian/Biblical",
      origin: "Hebrew, Greek, Latin, English",
      culturalNote: "with Christian religious significance, biblical origins",
      examples: "like Matthew, Mary, John, Grace, David, Sarah",
      significance: "with meanings from Bible or Christian tradition",
    },
    jewish: {
      context: "Jewish/Hebrew",
      origin: "Hebrew, Yiddish, Aramaic",
      culturalNote: "with Jewish religious significance, Hebrew origins",
      examples: "like Moses, Rachel, Isaac, Leah, Abraham, Miriam",
      significance: "with meanings from Torah or Jewish tradition",
    },
    buddhist: {
      context: "Buddhist",
      origin: "Sanskrit, Pali, Tibetan, Thai, Chinese",
      culturalNote: "with Buddhist religious significance, dharmic tradition",
      examples: "like Buddha, Tara, Karma, Bodhi, Metta, Sangha",
      significance:
        "with meanings related to Buddhist teachings or enlightenment",
    },
    sikh: {
      context: "Sikh/Punjabi",
      origin: "Punjabi, Gurmukhi, Sanskrit",
      culturalNote: "with Sikh religious significance, Punjabi tradition",
      examples: "like Gurpreet, Simran, Harpreet, Jaspreet, Manpreet",
      significance: "with meanings from Guru Granth Sahib or Sikh tradition",
    },
    modern: {
      context: "Modern/Contemporary",
      origin: "Various international origins",
      culturalNote: "modern, trendy, and culturally diverse",
      examples: "like Emma, Liam, Aria, Noah, Luna, Kai",
      significance: "with contemporary meanings and global appeal",
    },
  };

  const religionInfo =
    religionContexts[religion.toLowerCase()] || religionContexts.modern;

  if (type === "baby") {
    let prompt = `Generate exactly 15 authentic ${genderText} baby names with ${religionInfo.context} ${religionInfo.culturalNote}.`;

    // Add specific requirements
    if (origin) {
      prompt += ` Origin should be ${origin}`;
    } else {
      prompt += ` Origin should be ${religionInfo.origin}`;
    }

    if (keywords.length > 0)
      prompt += `. Include names related to: ${keywords.join(", ")}`;
    if (meaning)
      prompt += `. Names should have meanings related to: ${meaning}`;
    if (startsWith) prompt += `. Names must start with "${startsWith}"`;
    if (endsWith) prompt += `. Names must end with "${endsWith}"`;

    // Length preferences
    if (length === "short") prompt += `. Prefer short names (3-5 letters)`;
    if (length === "long") prompt += `. Prefer longer names (6+ letters)`;

    // Add religion-specific guidance
    prompt += ` ${religionInfo.significance}.`;

    // Gender-specific instructions
    if (genderText === "boy") {
      prompt += ` Focus on traditionally masculine names suitable for boys`;
    } else if (genderText === "girl") {
      prompt += ` Focus on traditionally feminine names suitable for girls`;
    } else {
      prompt += ` Focus on gender-neutral names suitable for any child`;
    }

    // Add examples for context
    prompt += ` ${religionInfo.examples}.`;

    prompt += `\n\nCRITICAL: Return ONLY a valid JSON array. No text before or after. Format:
[
  {
    "name": "Name Here",
    "meaning": "Detailed meaning and significance",
    "origin": "${religionInfo.origin.split(",")[0].trim()}",
    "pronunciation": "phonetic guide",
    "category": "${religionInfo.context}",
    "popularity": "Popular/Moderate/Rare",
    "description": "Brief name description",
    "culturalSignificance": "Religious/cultural importance",
    "historicalFigures": ["Notable people with this name"],
    "variations": ["Alternative spellings"]
  }
]

Generate exactly 15 ${genderText} ${
      religionInfo.context
    } names. Return only JSON.`;

    return prompt;
  } else {
    // Brand names logic remains the same
    const {
      industry = "business",
      style = "modern",
      keywords = [],
      description,
      targetAudience,
      length = "medium",
      avoidNumbers = true,
    } = formData;

    return `Generate 15 creative ${industry} brand names with ${style} style.
    ${keywords.length ? `Keywords: ${keywords.join(", ")}. ` : ""}
    ${description ? `Description: ${description}. ` : ""}
    ${targetAudience ? `Target audience: ${targetAudience}. ` : ""}
    Length: ${length}.
    ${avoidNumbers ? "Avoid numbers in names. " : ""}

    Return ONLY JSON array: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
  }
}

// Optimized AI call with better error handling
async function callAI(prompt) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY environment variable is not set");
  }

  const controllers = [];
  const timeoutId = setTimeout(() => {
    controllers.forEach((controller) => controller.abort());
  }, 25000); // 25 second timeout

  try {
    const controller = new AbortController();
    controllers.push(controller);

    // Use a faster, more reliable model
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: "mistralai/mistral-7b-instruct:free", // Keep free model but optimize settings
        messages: [
          {
            role: "system",
            content: `You are an expert name generator with deep knowledge of names from all world religions and cultures. 
            
CRITICAL INSTRUCTIONS:
- Return ONLY valid JSON array, no markdown, no extra text
- Be culturally accurate and respectful
- Include authentic pronunciation guides
- Provide meaningful cultural context
- Generate exactly the requested number of names
- Each name must be real and authentic to its cultural/religious tradition`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7, // Slightly lower for more consistent results
        max_tokens: 2500, // Reduced for faster response
        top_p: 0.8, // Reduced for more focused results
        frequency_penalty: 0.3, // Reduce repetition
        presence_penalty: 0.1, // Encourage diversity
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://baby-brand-names-backend.vercel.app",
          "X-Title": "Religious Name Generator API",
        },
        timeout: 25000, // 25 seconds
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);
    return response.data.choices[0].message.content;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      throw new Error(
        "Request timed out. The AI service is taking too long to respond. Please try again."
      );
    }

    if (error.response?.status === 429) {
      throw new Error(
        "Rate limit exceeded. Please wait a moment and try again."
      );
    }

    if (error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenRouter API configuration."
      );
    }

    console.error(
      "OpenRouter API Error:",
      error.response?.data || error.message
    );
    throw new Error(
      `AI service error: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
}

// Enhanced response parser
function parseAIResponse(content, type) {
  try {
    let cleaned = content.trim();

    // Remove any markdown formatting
    cleaned = cleaned.replace(/```json\s*/g, "").replace(/```\s*/g, "");
    cleaned = cleaned.replace(/^```/g, "").replace(/```$/g, "");
    cleaned = cleaned.replace(/^json\s*/g, "");

    // Extract JSON array
    let jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      // Try to find object array pattern
      jsonMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/);
    }

    if (!jsonMatch) {
      console.error(
        "No JSON array found in AI response:",
        cleaned.substring(0, 500)
      );
      throw new Error("Invalid AI response format - no JSON array found");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(parsed)) {
      throw new Error("AI response is not an array");
    }

    if (parsed.length === 0) {
      throw new Error("AI returned empty array");
    }

    // Validate and format the response
    return parsed.map((item, index) => {
      if (!item.name) {
        throw new Error(`Missing name field in item ${index + 1}`);
      }

      const baseItem = {
        id: Date.now() + index + Math.floor(Math.random() * 1000),
        type,
        name: item.name.trim(),
        meaning: item.meaning || "Meaning not specified",
        category: item.category || "General",
        description: item.description || `${item.name} is a beautiful name`,
      };

      if (type === "baby") {
        return {
          ...baseItem,
          origin: item.origin || "Origin not specified",
          pronunciation: item.pronunciation || item.name,
          popularity: item.popularity || "Moderate",
          culturalSignificance:
            item.culturalSignificance || "Cultural significance varies",
          historicalFigures: Array.isArray(item.historicalFigures)
            ? item.historicalFigures
            : [],
          variations: Array.isArray(item.variations) ? item.variations : [],
        };
      } else {
        return {
          ...baseItem,
          domainAvailable: item.domainAvailable !== false,
          variations: Array.isArray(item.variations) ? item.variations : [],
          targetAudience: item.targetAudience || "General audience",
        };
      }
    });
  } catch (error) {
    console.error("Parse error:", error.message);
    console.error(
      "Raw AI content (first 1000 chars):",
      content.substring(0, 1000)
    );
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

    console.log("Request received:", {
      method: req.method,
      body: { ...body, timestamp: new Date().toISOString() },
    });

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

        // Validate required parameters for baby names
        if (type === "baby" && !formData.religion) {
          return res.status(400).json({
            success: false,
            error: "Religion is required for baby name generation",
            availableReligions: [
              "islamic",
              "hindu",
              "christian",
              "jewish",
              "buddhist",
              "sikh",
              "modern",
            ],
            timestamp: new Date().toISOString(),
          });
        }

        try {
          const prompt = generateReligionSpecificPrompt(type, formData);
          console.log(
            "Generated prompt for",
            type,
            "with religion",
            formData.religion,
            ":",
            prompt.substring(0, 300) + "..."
          );

          const aiResponse = await callAI(prompt);
          console.log("AI Response received (length):", aiResponse.length);

          const names = parseAIResponse(aiResponse, type);
          console.log("Successfully parsed names count:", names.length);

          return res.status(200).json({
            success: true,
            names,
            count: names.length,
            type,
            religion: formData.religion || "modern",
            gender: formData.gender || "unisex",
            timestamp: new Date().toISOString(),
          });
        } catch (apiError) {
          console.error("API Error:", apiError.message);

          // Return proper error without fallback to static data
          return res.status(500).json({
            success: false,
            error: "Failed to generate names from AI service",
            message: apiError.message,
            type,
            religion: formData.religion || "unknown",
            timestamp: new Date().toISOString(),
            suggestion:
              "Please try again. If the problem persists, the AI service may be temporarily unavailable.",
          });
        }
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
        message: "Religious Names API is working",
        timestamp: new Date().toISOString(),
        supportedReligions: {
          islamic:
            "Islamic/Muslim names from Arabic, Persian, Turkish traditions",
          hindu: "Hindu/Sanskrit names from Vedic and Puranic traditions",
          christian:
            "Christian/Biblical names from Hebrew, Greek, Latin origins",
          jewish: "Jewish/Hebrew names from Torah and Jewish traditions",
          buddhist: "Buddhist names from Sanskrit, Pali, Tibetan traditions",
          sikh: "Sikh/Punjabi names from Gurmukhi and Sikh traditions",
          modern: "Modern contemporary names from various cultures",
        },
        endpoints: {
          "POST /api/names":
            "Generate names (requires type: 'baby'|'brand', religion for baby names)",
          "GET /api/names": "API status and documentation",
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
    console.error("Unexpected API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// // Minimal fallback data - only used when AI fails completely
// const mockBabyNames = [
//   {
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
//   },
// ];

// const mockBrandNames = [
//   {
//     name: "EduNova",
//     meaning: "Educational innovation",
//     category: "Education",
//     description: "A modern name for educational technology",
//     domainAvailable: true,
//     variations: ["EduNov", "EduNova.io"],
//     targetAudience: "Educators and students",
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

// // Call OpenRouter API with retry logic
// async function callAI(prompt, retries = 1) {
//   if (!OPENROUTER_API_KEY) {
//     console.error("No OpenRouter API key found");
//     throw new Error("API key not configured");
//   }

//   console.log("Calling OpenRouter API...");

//   for (let attempt = 1; attempt <= retries + 1; attempt++) {
//     try {
//       const response = await axios.post(
//         `${OPENROUTER_BASE_URL}/chat/completions`,
//         {
//           model: "mistralai/mistral-7b-instruct:free",
//           messages: [
//             {
//               role: "system",
//               content:
//                 'You are a name generation expert. Return only a valid JSON array with exactly 20 names. Format: [{"name":"...","meaning":"...","origin":"..."}]. No markdown, no extra text.',
//             },
//             { role: "user", content: prompt },
//           ],
//           temperature: 0.7,
//           max_tokens: 2000,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json",
//             "HTTP-Referer": "https://baby-brand-names-backend.vercel.app",
//             "X-Title": "Name Generator API",
//           },
//           timeout: 15000,
//         }
//       );

//       console.log("OpenRouter response status:", response.status);

//       if (!response.data?.choices?.[0]?.message?.content) {
//         console.error("Invalid API response structure:", response.data);
//         throw new Error("Invalid API response structure");
//       }

//       const content = response.data.choices[0].message.content;
//       console.log("AI Response received, length:", content.length);
//       return content;
//     } catch (error) {
//       console.error(`OpenRouter API Error (attempt ${attempt}):`, {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });

//       if (attempt === retries + 1) {
//         throw error;
//       }

//       // Wait before retry
//       await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
//     }
//   }
// }

// // Parse AI response with better error handling
// function parseAIResponse(content, type) {
//   console.log(
//     "Parsing AI response, content preview:",
//     content.substring(0, 200)
//   );

//   try {
//     if (!content || typeof content !== "string") {
//       console.error("Invalid content:", typeof content, content?.length);
//       throw new Error("Empty or invalid response content");
//     }

//     let cleaned = content.trim();

//     // Remove markdown formatting
//     cleaned = cleaned.replace(/```json\s*/gi, "").replace(/```\s*/g, "");

//     // Find JSON array
//     let jsonStart = cleaned.indexOf("[");
//     let jsonEnd = cleaned.lastIndexOf("]");

//     // If no brackets found, try to find object array pattern
//     if (jsonStart === -1) {
//       console.log("No brackets found, looking for objects...");
//       const objectPattern = /{[^}]*}/g;
//       const objects = cleaned.match(objectPattern);
//       if (objects && objects.length > 0) {
//         cleaned = "[" + objects.join(",") + "]";
//         jsonStart = 0;
//         jsonEnd = cleaned.length - 1;
//       }
//     }

//     if (jsonStart === -1 || jsonEnd === -1 || jsonStart >= jsonEnd) {
//       console.error(
//         "No valid JSON structure found in:",
//         cleaned.substring(0, 300)
//       );
//       throw new Error("No valid JSON array found in response");
//     }

//     const jsonString = cleaned.substring(jsonStart, jsonEnd + 1);
//     console.log("Extracted JSON string:", jsonString.substring(0, 200));

//     let parsed;
//     try {
//       parsed = JSON.parse(jsonString);
//     } catch (parseError) {
//       console.error("JSON parse error:", parseError.message);
//       console.error("Failed JSON:", jsonString.substring(0, 500));
//       throw new Error("Invalid JSON format in AI response");
//     }

//     if (!Array.isArray(parsed)) {
//       console.error("Parsed result is not array:", typeof parsed);
//       throw new Error("Response is not an array");
//     }

//     if (parsed.length === 0) {
//       console.error("Empty array returned");
//       throw new Error("Empty array returned from AI");
//     }

//     console.log("Successfully parsed", parsed.length, "items");

//     // Generate unique IDs
//     const baseTime = Date.now();

//     const result = parsed
//       .slice(0, 20)
//       .map((item, index) => {
//         if (!item || typeof item !== "object") {
//           console.warn(`Invalid item at index ${index}:`, item);
//           return null;
//         }

//         return {
//           id: baseTime + index + Math.floor(Math.random() * 1000),
//           type,
//           name: item.name || `Name ${index + 1}`,
//           meaning: item.meaning || "Unknown meaning",
//           origin: item.origin || "Unknown origin",
//           category: item.category || "General",
//           description: item.description || "No description available",
//           ...item,
//         };
//       })
//       .filter(Boolean);

//     console.log("Final parsed result count:", result.length);
//     return result;
//   } catch (error) {
//     console.error("Parse error details:", error.message);
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
//     // Parse request body with better error handling
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
//         if (!type || (type !== "baby" && type !== "brand")) {
//           return res.status(400).json({
//             success: false,
//             error: "Type is required and must be 'baby' or 'brand'",
//             timestamp: new Date().toISOString(),
//           });
//         }

//         let names = [];
//         let usedFallback = false;

//         console.log("Starting name generation for type:", type);
//         console.log("Form data received:", formData);

//         try {
//           if (OPENROUTER_API_KEY) {
//             console.log("API key available, generating prompt...");
//             const prompt = generatePrompt(type, formData);
//             console.log("Generated prompt:", prompt.substring(0, 150) + "...");

//             const aiResponse = await callAI(prompt);
//             console.log("AI response received, parsing...");
//             names = parseAIResponse(aiResponse, type);

//             if (!names || names.length === 0) {
//               console.error("No valid names generated from AI, using fallback");
//               throw new Error("No valid names generated from AI");
//             }

//             console.log(
//               "Successfully generated",
//               names.length,
//               "names from AI"
//             );
//           } else {
//             console.error("No API key available, using fallback");
//             throw new Error("No API key available");
//           }
//         } catch (aiError) {
//           console.error("AI generation failed:", aiError.message);
//           console.error("Full error:", aiError);

//           // Only use basic fallback when AI completely fails
//           const mockData = type === "baby" ? mockBabyNames : mockBrandNames;
//           usedFallback = true;

//           names = mockData.map((item, index) => ({
//             id: Date.now() + index + Math.floor(Math.random() * 1000),
//             type,
//             ...item,
//           }));

//           console.log("Using fallback data, generated", names.length, "names");
//         }

//         console.log(
//           "Returning response with",
//           names.length,
//           "names, usedFallback:",
//           usedFallback
//         );

//         return res.status(200).json({
//           success: true,
//           names: names.slice(0, 20), // Ensure max 20 names
//           count: Math.min(names.length, 20),
//           type,
//           usedFallback,
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
