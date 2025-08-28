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

// // Mock fallback data with proper structure
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
//   {
//     id: 2,
//     name: "Fatima",
//     meaning: "Captivating, abstainer",
//     origin: "Arabic",
//     pronunciation: "FAH-ti-mah",
//     category: "Traditional",
//     popularity: "Popular",
//     description: "A revered name in Islamic culture",
//     culturalSignificance: "Name of Prophet Muhammad's daughter",
//     historicalFigures: ["Fatima al-Zahra"],
//     variations: ["Fatimah", "Fatma"],
//     type: "baby",
//   },
//   {
//     id: 3,
//     name: "Omar",
//     meaning: "Flourishing, thriving",
//     origin: "Arabic",
//     pronunciation: "OH-mar",
//     category: "Traditional",
//     popularity: "Popular",
//     description: "A strong name meaning prosperity",
//     culturalSignificance: "Name of the second Caliph",
//     historicalFigures: ["Omar ibn al-Khattab"],
//     variations: ["Umar", "Omer"],
//     type: "baby",
//   },
// ];

// const mockBrandNames = [
//   {
//     id: 1,
//     name: "Nexura",
//     meaning: "Next-generation solutions",
//     category: "Technology",
//     description: "A modern, tech-forward name",
//     domainAvailable: true,
//     variations: ["Nexur", "Nexura.io"],
//     targetAudience: "Tech professionals",
//     type: "brand",
//   },
//   {
//     id: 2,
//     name: "Innovex",
//     meaning: "Innovation and excellence",
//     category: "Business",
//     description: "Combines innovation with excellence",
//     domainAvailable: true,
//     variations: ["Innovex.co", "Innovex.app"],
//     targetAudience: "Modern businesses",
//     type: "brand",
//   },
//   {
//     id: 3,
//     name: "TechFlow",
//     meaning: "Seamless technology experience",
//     category: "Technology",
//     description: "Modern flow-based solutions",
//     domainAvailable: true,
//     variations: ["TechFlow.ai", "TechFlowPro"],
//     targetAudience: "Tech startups",
//     type: "brand",
//   },
// ];

// // Generate prompt for AI with language support
// function generatePrompt(type, formData) {
//   const language = formData.language || "english";

//   if (type === "baby") {
//     return `Generate 10 authentic ${
//       formData.gender || "unisex"
//     } baby names with ${
//       formData.religion || "various"
//     } cultural background in ${language} language.
//     Return as JSON array with format: [{"name": "...", "meaning": "...", "origin": "...", "pronunciation": "...", "category": "...", "popularity": "...", "description": "...", "culturalSignificance": "...", "historicalFigures": [], "variations": []}]
//     Make sure all text fields are in ${language} language.`;
//   } else {
//     return `Generate 10 creative ${
//       formData.industry || "business"
//     } brand names with ${
//       formData.style || "modern"
//     } style in ${language} language.
//     Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]
//     Make sure all text fields are in ${language} language.`;
//   }
// }

// // Call OpenRouter API with better error handling
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
//           "HTTP-Referer": "https://namegenai.vercel.app",
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

// // Parse AI response with better error handling
// function parseAIResponse(content, type) {
//   try {
//     // Clean the response more thoroughly
//     let cleaned = content.trim();

//     // Remove markdown code blocks
//     cleaned = cleaned.replace(/```json\s*/g, "").replace(/```\s*/g, "");

//     // Find JSON array
//     const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
//     if (!jsonMatch) {
//       throw new Error("No JSON array found in response");
//     }

//     const parsed = JSON.parse(jsonMatch[0]);

//     if (!Array.isArray(parsed)) {
//       throw new Error("Response is not an array");
//     }

//     // Add IDs and type, ensure proper structure
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
//   // Set CORS headers for all requests
//   setCorsHeaders(res);

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     console.log("Names API endpoint hit:", req.method, req.url);

//     // Parse body safely with better error handling
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

//     console.log("Request body:", body);

//     if (req.method === "POST") {
//       const { type, action, ...formData } = body;

//       // Handle suggestions
//       if (action === "suggestions") {
//         const { query, type: suggestionType } = body;
//         console.log("Handling suggestions for:", query, suggestionType);

//         return res.status(200).json({
//           success: true,
//           suggestions: [
//             { name: query + "Pro", reason: "Professional variant" },
//             { name: query + "X", reason: "Modern variant" },
//             { name: query + "Plus", reason: "Enhanced version" },
//           ],
//           timestamp: new Date().toISOString(),
//         });
//       }

//       // Handle details
//       if (action === "details") {
//         const { name, type: detailType } = body;
//         console.log("Handling details for:", name, detailType);

//         return res.status(200).json({
//           success: true,
//           etymology: `Rich historical background for ${name}`,
//           culturalSignificance: "Significant cultural meaning",
//           famousPeople: [`Famous person named ${name}`],
//           interestingFacts: [`Interesting fact about ${name}`],
//           modernUsage: "Popular in contemporary usage",
//           timestamp: new Date().toISOString(),
//         });
//       }

//       // Validate required fields for name generation
//       if (!type) {
//         return res.status(400).json({
//           success: false,
//           error: "Type is required",
//           received: body,
//           expected: { type: "baby or brand" },
//           timestamp: new Date().toISOString(),
//         });
//       }

//       let names = [];

//       try {
//         // Try AI first if API key is available
//         if (OPENROUTER_API_KEY) {
//           const prompt = generatePrompt(type, formData);
//           console.log(
//             "Calling AI with prompt:",
//             prompt.substring(0, 100) + "..."
//           );

//           const aiResponse = await callAI(prompt);
//           console.log("AI Response received, length:", aiResponse.length);

//           names = parseAIResponse(aiResponse, type);
//           console.log("Parsed AI names count:", names.length);
//         } else {
//           throw new Error("No API key available, using fallback");
//         }
//       } catch (aiError) {
//         console.error("AI failed, using fallback:", aiError.message);

//         // Fallback to mock data
//         if (type === "baby") {
//           names = mockBabyNames.map((name, index) => ({
//             ...name,
//             id: Date.now() + index,
//           }));
//         } else if (type === "brand") {
//           names = mockBrandNames.map((name, index) => ({
//             ...name,
//             id: Date.now() + index,
//           }));
//         }
//         console.log("Using fallback data, count:", names.length);
//       }

//       console.log("Returning names:", names.length);
//       return res.status(200).json({
//         success: true,
//         names,
//         count: names.length,
//         type,
//         language: formData.language || "english",
//         timestamp: new Date().toISOString(),
//       });
//     }

//     if (req.method === "GET") {
//       return res.status(200).json({
//         success: true,
//         message: "Names API is working",
//         timestamp: new Date().toISOString(),
//         env: {
//           hasApiKey: !!OPENROUTER_API_KEY,
//           nodeEnv: process.env.NODE_ENV || "development",
//         },
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
//       received: req.method,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       message: error.message,
//       timestamp: new Date().toISOString(),
//       stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//     });
//   }
// };
