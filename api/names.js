// // // // // // // Import your existing route logic
// // // // // // const express = require("express");
// // // // // // const router = express.Router();

// // // // // // // Import your existing routes file to reuse logic
// // // // // // const namesRoute = require("../routes/names");

// // // // // // module.exports = async (req, res) => {
// // // // // //   // CORS headers
// // // // // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // // // // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // // // // //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
// // // // // //   res.setHeader(
// // // // // //     "Access-Control-Allow-Headers",
// // // // // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // // // // //   );

// // // // // //   if (req.method === "OPTIONS") {
// // // // // //     res.status(200).end();
// // // // // //     return;
// // // // // //   }

// // // // // //   // Create a mini express app to reuse your existing route logic
// // // // // //   const app = express();
// // // // // //   app.use(express.json());
// // // // // //   app.use("/", namesRoute);

// // // // // //   // Simulate the request through your existing route
// // // // // //   try {
// // // // // //     app(req, res);
// // // // // //   } catch (error) {
// // // // // //     console.error("Names API error:", error);
// // // // // //     res.status(500).json({ error: "Internal server error" });
// // // // // //   }
// // // // // // };

// // // // // const express = require("express");

// // // // // module.exports = async (req, res) => {
// // // // //   // CORS headers for all requests
// // // // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // // // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // // // //   res.setHeader(
// // // // //     "Access-Control-Allow-Methods",
// // // // //     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
// // // // //   );
// // // // //   res.setHeader(
// // // // //     "Access-Control-Allow-Headers",
// // // // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // // // //   );

// // // // //   // Handle preflight OPTIONS request
// // // // //   if (req.method === "OPTIONS") {
// // // // //     res.status(200).end();
// // // // //     return;
// // // // //   }

// // // // //   try {
// // // // //     // Import your existing route logic
// // // // //     const nameService = require("../services/nameService");

// // // // //     if (req.method === "POST") {
// // // // //       const { type, action, ...formData } = req.body;

// // // // //       // Handle different actions
// // // // //       if (action === "suggestions") {
// // // // //         // Get name suggestions
// // // // //         const { query, type } = req.body;
// // // // //         // Your suggestion logic here
// // // // //         const suggestions = await nameService.getSuggestions(query, type);
// // // // //         return res.json({ suggestions });
// // // // //       }

// // // // //       if (action === "details") {
// // // // //         // Get name details
// // // // //         const { name, type } = req.body;
// // // // //         // Your details logic here
// // // // //         const details = await nameService.getNameDetails(name, type);
// // // // //         return res.json(details);
// // // // //       }

// // // // //       // Default: Generate names
// // // // //       if (!type) {
// // // // //         return res.status(400).json({ error: "Name type is required" });
// // // // //       }

// // // // //       // Generate names based on type
// // // // //       if (type === "baby") {
// // // // //         const names = await nameService.generateBabyNames(formData);
// // // // //         return res.json({ names });
// // // // //       } else if (type === "brand") {
// // // // //         const names = await nameService.generateBrandNames(formData);
// // // // //         return res.json({ names });
// // // // //       } else {
// // // // //         return res.status(400).json({ error: "Invalid name type" });
// // // // //       }
// // // // //     } else if (req.method === "GET") {
// // // // //       // Return available endpoints info
// // // // //       res.json({
// // // // //         message: "Names API endpoint",
// // // // //         methods: ["POST"],
// // // // //         supportedTypes: ["baby", "brand"],
// // // // //         supportedActions: ["generate", "suggestions", "details"],
// // // // //       });
// // // // //     } else {
// // // // //       res.status(405).json({ error: "Method not allowed" });
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("Names API error:", error);
// // // // //     res.status(500).json({
// // // // //       error: "Internal server error",
// // // // //       message: error.message,
// // // // //     });
// // // // //   }
// // // // // };

// // // // module.exports = async (req, res) => {
// // // //   // CORS headers
// // // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // // //   res.setHeader(
// // // //     "Access-Control-Allow-Methods",
// // // //     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
// // // //   );
// // // //   res.setHeader(
// // // //     "Access-Control-Allow-Headers",
// // // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // // //   );

// // // //   if (req.method === "OPTIONS") {
// // // //     res.status(200).end();
// // // //     return;
// // // //   }

// // // //   try {
// // // //     const nameService = require("../services/nameService");

// // // //     // ✅ ensure body is parsed
// // // //     let body = req.body;
// // // //     if (!body || Object.keys(body).length === 0) {
// // // //       const buffers = [];
// // // //       for await (const chunk of req) {
// // // //         buffers.push(chunk);
// // // //       }
// // // //       body = JSON.parse(Buffer.concat(buffers).toString());
// // // //     }

// // // //     if (req.method === "POST") {
// // // //       const { type, action, ...formData } = body;

// // // //       if (action === "suggestions") {
// // // //         const { query, type } = body;
// // // //         const suggestions = await nameService.getSuggestions(query, type);
// // // //         return res.json({ suggestions });
// // // //       }

// // // //       if (action === "details") {
// // // //         const { name, type } = body;
// // // //         const details = await nameService.getNameDetails(name, type);
// // // //         return res.json(details);
// // // //       }

// // // //       if (!type) {
// // // //         return res.status(400).json({ error: "Name type is required" });
// // // //       }

// // // //       if (type === "baby") {
// // // //         const names = await nameService.generateBabyNames(formData);
// // // //         return res.json({ names });
// // // //       } else if (type === "brand") {
// // // //         const names = await nameService.generateBrandNames(formData);
// // // //         return res.json({ names });
// // // //       } else {
// // // //         return res.status(400).json({ error: "Invalid name type" });
// // // //       }
// // // //     }

// // // //     if (req.method === "GET") {
// // // //       return res.json({
// // // //         message: "Names API endpoint",
// // // //         methods: ["POST"],
// // // //         supportedTypes: ["baby", "brand"],
// // // //         supportedActions: ["generate", "suggestions", "details"],
// // // //       });
// // // //     }

// // // //     res.status(405).json({ error: "Method not allowed" });
// // // //   } catch (error) {
// // // //     console.error("Names API error:", error);
// // // //     res.status(500).json({
// // // //       error: "Internal server error",
// // // //       message: error.message,
// // // //     });
// // // //   }
// // // // };

// // // const axios = require("axios");

// // // // Environment variables
// // // const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// // // const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// // // // Mock fallback data
// // // const mockBabyNames = [
// // //   {
// // //     id: 1,
// // //     name: "Aisha",
// // //     meaning: "Living, prosperous",
// // //     origin: "Arabic",
// // //     pronunciation: "AH-ee-shah",
// // //     category: "Traditional",
// // //     popularity: "Popular",
// // //     description: "A beautiful name meaning 'alive' or 'living one'",
// // //     culturalSignificance: "Aisha was the name of Prophet Muhammad's wife",
// // //     historicalFigures: ["Aisha bint Abu Bakr"],
// // //     variations: ["Ayesha", "Aishah"],
// // //     type: "baby",
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Fatima",
// // //     meaning: "Captivating, abstainer",
// // //     origin: "Arabic",
// // //     pronunciation: "FAH-ti-mah",
// // //     category: "Traditional",
// // //     popularity: "Popular",
// // //     description: "A revered name in Islamic culture",
// // //     culturalSignificance: "Name of Prophet Muhammad's daughter",
// // //     historicalFigures: ["Fatima al-Zahra"],
// // //     variations: ["Fatimah", "Fatma"],
// // //     type: "baby",
// // //   },
// // // ];

// // // const mockBrandNames = [
// // //   {
// // //     id: 1,
// // //     name: "Nexura",
// // //     meaning: "Next-generation solutions",
// // //     category: "Technology",
// // //     description: "A modern, tech-forward name",
// // //     domainAvailable: true,
// // //     variations: ["Nexur", "Nexura.io"],
// // //     targetAudience: "Tech professionals",
// // //     type: "brand",
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Innovex",
// // //     meaning: "Innovation and excellence",
// // //     category: "Business",
// // //     description: "Combines innovation with excellence",
// // //     domainAvailable: true,
// // //     variations: ["Innovex.co", "Innovex.app"],
// // //     targetAudience: "Modern businesses",
// // //     type: "brand",
// // //   },
// // // ];

// // // // Generate prompt for AI
// // // function generatePrompt(type, formData) {
// // //   if (type === "baby") {
// // //     return `Generate 10 authentic ${
// // //       formData.gender || "unisex"
// // //     } baby names with ${formData.religion || "various"} cultural background.
// // //     Return as JSON array with format: [{"name": "...", "meaning": "...", "origin": "...", "pronunciation": "...", "category": "...", "popularity": "...", "description": "...", "culturalSignificance": "...", "historicalFigures": [], "variations": []}]`;
// // //   } else {
// // //     return `Generate 10 creative ${
// // //       formData.industry || "business"
// // //     } brand names with ${formData.style || "modern"} style.
// // //     Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
// // //   }
// // // }

// // // // Call OpenRouter API
// // // async function callAI(prompt) {
// // //   if (!OPENROUTER_API_KEY) {
// // //     throw new Error("API key not configured");
// // //   }

// // //   const response = await axios.post(
// // //     `${OPENROUTER_BASE_URL}/chat/completions`,
// // //     {
// // //       model: "mistralai/mistral-7b-instruct:free",
// // //       messages: [
// // //         {
// // //           role: "system",
// // //           content: "You are a name generation expert. Return only valid JSON.",
// // //         },
// // //         { role: "user", content: prompt },
// // //       ],
// // //       temperature: 0.7,
// // //       max_tokens: 2000,
// // //     },
// // //     {
// // //       headers: {
// // //         Authorization: `Bearer ${OPENROUTER_API_KEY}`,
// // //         "Content-Type": "application/json",
// // //         "HTTP-Referer": "https://namegenai.vercel.app",
// // //         "X-Title": "Name Generator API",
// // //       },
// // //       timeout: 25000,
// // //     }
// // //   );

// // //   return response.data.choices[0].message.content;
// // // }

// // // // Parse AI response
// // // function parseAIResponse(content, type) {
// // //   try {
// // //     // Clean the response
// // //     const cleaned = content
// // //       .replace(/```json/g, "")
// // //       .replace(/```/g, "")
// // //       .trim();
// // //     const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

// // //     if (!jsonMatch) {
// // //       throw new Error("No JSON array found");
// // //     }

// // //     const parsed = JSON.parse(jsonMatch[0]);

// // //     // Add IDs and type
// // //     return parsed.map((item, index) => ({
// // //       id: Date.now() + index,
// // //       type,
// // //       ...item,
// // //     }));
// // //   } catch (error) {
// // //     console.error("Parse error:", error);
// // //     throw new Error("Failed to parse AI response");
// // //   }
// // // }

// // // // Main serverless function
// // // module.exports = async (req, res) => {
// // //   // CORS headers
// // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
// // //   res.setHeader(
// // //     "Access-Control-Allow-Headers",
// // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // //   );

// // //   if (req.method === "OPTIONS") {
// // //     return res.status(200).end();
// // //   }

// // //   try {
// // //     console.log("API endpoint hit:", req.method, req.url);
// // //     console.log("Headers:", req.headers);

// // //     // Parse body
// // //     let body = req.body;
// // //     if (typeof body === "string") {
// // //       body = JSON.parse(body);
// // //     }

// // //     console.log("Request body:", body);

// // //     if (req.method === "POST") {
// // //       const { type, action, ...formData } = body;

// // //       // Handle suggestions
// // //       if (action === "suggestions") {
// // //         const { query, type } = body;
// // //         return res.json({
// // //           suggestions: [
// // //             { name: query + "1", reason: "Similar sound" },
// // //             { name: query + "2", reason: "Similar meaning" },
// // //           ],
// // //         });
// // //       }

// // //       // Handle details
// // //       if (action === "details") {
// // //         const { name, type } = body;
// // //         return res.json({
// // //           etymology: `Rich historical background for ${name}`,
// // //           culturalSignificance: "Significant cultural meaning",
// // //           famousPeople: [`Famous ${name}`],
// // //           interestingFacts: [`Interesting fact about ${name}`],
// // //           modernUsage: "Popular in contemporary usage",
// // //         });
// // //       }

// // //       // Generate names
// // //       if (!type) {
// // //         return res.status(400).json({ error: "Type is required" });
// // //       }

// // //       let names;

// // //       try {
// // //         // Try AI first
// // //         const prompt = generatePrompt(type, formData);
// // //         console.log(
// // //           "Calling AI with prompt:",
// // //           prompt.substring(0, 100) + "..."
// // //         );

// // //         const aiResponse = await callAI(prompt);
// // //         console.log("AI Response:", aiResponse.substring(0, 200) + "...");

// // //         names = parseAIResponse(aiResponse, type);
// // //         console.log("Parsed names count:", names.length);
// // //       } catch (aiError) {
// // //         console.error("AI failed, using fallback:", aiError.message);

// // //         // Fallback to mock data
// // //         if (type === "baby") {
// // //           names = mockBabyNames.map((name, index) => ({
// // //             ...name,
// // //             id: Date.now() + index,
// // //           }));
// // //         } else {
// // //           names = mockBrandNames.map((name, index) => ({
// // //             ...name,
// // //             id: Date.now() + index,
// // //           }));
// // //         }
// // //       }

// // //       console.log("Returning names:", names.length);
// // //       return res.json({
// // //         success: true,
// // //         names,
// // //         count: names.length,
// // //         type,
// // //       });
// // //     }

// // //     if (req.method === "GET") {
// // //       return res.json({
// // //         message: "Names API is working",
// // //         timestamp: new Date().toISOString(),
// // //         env: {
// // //           hasApiKey: !!OPENROUTER_API_KEY,
// // //           nodeEnv: process.env.NODE_ENV,
// // //         },
// // //       });
// // //     }

// // //     return res.status(405).json({ error: "Method not allowed" });
// // //   } catch (error) {
// // //     console.error("API Error:", error);
// // //     return res.status(500).json({
// // //       error: "Internal server error",
// // //       message: error.message,
// // //       timestamp: new Date().toISOString(),
// // //     });
// // //   }
// // // };

// // const axios = require("axios");

// // // Environment variables
// // const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// // const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

// // // Mock fallback data
// // const mockBabyNames = [
// //   {
// //     id: 1,
// //     name: "Aisha",
// //     meaning: "Living, prosperous",
// //     origin: "Arabic",
// //     pronunciation: "AH-ee-shah",
// //     category: "Traditional",
// //     popularity: "Popular",
// //     description: "A beautiful name meaning 'alive' or 'living one'",
// //     culturalSignificance: "Aisha was the name of Prophet Muhammad's wife",
// //     historicalFigures: ["Aisha bint Abu Bakr"],
// //     variations: ["Ayesha", "Aishah"],
// //     type: "baby",
// //   },
// //   {
// //     id: 2,
// //     name: "Fatima",
// //     meaning: "Captivating, abstainer",
// //     origin: "Arabic",
// //     pronunciation: "FAH-ti-mah",
// //     category: "Traditional",
// //     popularity: "Popular",
// //     description: "A revered name in Islamic culture",
// //     culturalSignificance: "Name of Prophet Muhammad's daughter",
// //     historicalFigures: ["Fatima al-Zahra"],
// //     variations: ["Fatimah", "Fatma"],
// //     type: "baby",
// //   },
// //   {
// //     id: 3,
// //     name: "Omar",
// //     meaning: "Flourishing, thriving",
// //     origin: "Arabic",
// //     pronunciation: "OH-mar",
// //     category: "Traditional",
// //     popularity: "Popular",
// //     description: "A strong name meaning prosperity",
// //     culturalSignificance: "Name of the second Caliph",
// //     historicalFigures: ["Omar ibn al-Khattab"],
// //     variations: ["Umar", "Omer"],
// //     type: "baby",
// //   },
// // ];

// // const mockBrandNames = [
// //   {
// //     id: 1,
// //     name: "Nexura",
// //     meaning: "Next-generation solutions",
// //     category: "Technology",
// //     description: "A modern, tech-forward name",
// //     domainAvailable: true,
// //     variations: ["Nexur", "Nexura.io"],
// //     targetAudience: "Tech professionals",
// //     type: "brand",
// //   },
// //   {
// //     id: 2,
// //     name: "Innovex",
// //     meaning: "Innovation and excellence",
// //     category: "Business",
// //     description: "Combines innovation with excellence",
// //     domainAvailable: true,
// //     variations: ["Innovex.co", "Innovex.app"],
// //     targetAudience: "Modern businesses",
// //     type: "brand",
// //   },
// //   {
// //     id: 3,
// //     name: "TechFlow",
// //     meaning: "Seamless technology experience",
// //     category: "Technology",
// //     description: "Modern flow-based solutions",
// //     domainAvailable: true,
// //     variations: ["TechFlow.ai", "TechFlowPro"],
// //     targetAudience: "Tech startups",
// //     type: "brand",
// //   },
// // ];

// // // Generate prompt for AI
// // function generatePrompt(type, formData) {
// //   if (type === "baby") {
// //     return `Generate 10 authentic ${
// //       formData.gender || "unisex"
// //     } baby names with ${formData.religion || "various"} cultural background.
// //     Return as JSON array with format: [{"name": "...", "meaning": "...", "origin": "...", "pronunciation": "...", "category": "...", "popularity": "...", "description": "...", "culturalSignificance": "...", "historicalFigures": [], "variations": []}]`;
// //   } else {
// //     return `Generate 10 creative ${
// //       formData.industry || "business"
// //     } brand names with ${formData.style || "modern"} style.
// //     Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
// //   }
// // }

// // // Call OpenRouter API
// // async function callAI(prompt) {
// //   if (!OPENROUTER_API_KEY) {
// //     throw new Error("API key not configured");
// //   }

// //   const response = await axios.post(
// //     `${OPENROUTER_BASE_URL}/chat/completions`,
// //     {
// //       model: "mistralai/mistral-7b-instruct:free",
// //       messages: [
// //         {
// //           role: "system",
// //           content: "You are a name generation expert. Return only valid JSON.",
// //         },
// //         { role: "user", content: prompt },
// //       ],
// //       temperature: 0.7,
// //       max_tokens: 2000,
// //     },
// //     {
// //       headers: {
// //         Authorization: `Bearer ${OPENROUTER_API_KEY}`,
// //         "Content-Type": "application/json",
// //         "HTTP-Referer": "https://namegenai.vercel.app",
// //         "X-Title": "Name Generator API",
// //       },
// //       timeout: 25000,
// //     }
// //   );

// //   return response.data.choices[0].message.content;
// // }

// // // Parse AI response
// // function parseAIResponse(content, type) {
// //   try {
// //     // Clean the response
// //     const cleaned = content
// //       .replace(/```json/g, "")
// //       .replace(/```/g, "")
// //       .trim();
// //     const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

// //     if (!jsonMatch) {
// //       throw new Error("No JSON array found");
// //     }

// //     const parsed = JSON.parse(jsonMatch[0]);

// //     // Add IDs and type
// //     return parsed.map((item, index) => ({
// //       id: Date.now() + index,
// //       type,
// //       ...item,
// //     }));
// //   } catch (error) {
// //     console.error("Parse error:", error);
// //     throw new Error("Failed to parse AI response");
// //   }
// // }

// // // Main serverless function
// // module.exports = async (req, res) => {
// //   // CORS headers
// //   res.setHeader("Access-Control-Allow-Credentials", true);
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
// //   res.setHeader(
// //     "Access-Control-Allow-Headers",
// //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// //   );

// //   if (req.method === "OPTIONS") {
// //     return res.status(200).end();
// //   }

// //   try {
// //     console.log("Names API endpoint hit:", req.method, req.url);
// //     console.log("Headers:", JSON.stringify(req.headers, null, 2));

// //     // Parse body safely
// //     let body = {};
// //     try {
// //       if (req.body) {
// //         if (typeof req.body === "string") {
// //           body = JSON.parse(req.body);
// //         } else {
// //           body = req.body;
// //         }
// //       }
// //     } catch (parseError) {
// //       console.error("Body parse error:", parseError);
// //       return res.status(400).json({
// //         error: "Invalid JSON in request body",
// //         message: parseError.message,
// //       });
// //     }

// //     console.log("Request body:", JSON.stringify(body, null, 2));

// //     if (req.method === "POST") {
// //       const { type, action, ...formData } = body;

// //       // Handle suggestions
// //       if (action === "suggestions") {
// //         const { query, type: suggestionType } = body;
// //         console.log("Handling suggestions for:", query, suggestionType);

// //         return res.json({
// //           success: true,
// //           suggestions: [
// //             { name: query + "Pro", reason: "Professional variant" },
// //             { name: query + "X", reason: "Modern variant" },
// //             { name: query + "Plus", reason: "Enhanced version" },
// //           ],
// //         });
// //       }

// //       // Handle details
// //       if (action === "details") {
// //         const { name, type: detailType } = body;
// //         console.log("Handling details for:", name, detailType);

// //         return res.json({
// //           success: true,
// //           etymology: `Rich historical background for ${name}`,
// //           culturalSignificance: "Significant cultural meaning",
// //           famousPeople: [`Famous person named ${name}`],
// //           interestingFacts: [`Interesting fact about ${name}`],
// //           modernUsage: "Popular in contemporary usage",
// //         });
// //       }

// //       // Generate names
// //       if (!type) {
// //         return res.status(400).json({
// //           error: "Type is required",
// //           received: body,
// //           expected: { type: "baby" },
// //         });
// //       }

// //       let names;

// //       try {
// //         // Try AI first if API key is available
// //         if (OPENROUTER_API_KEY) {
// //           const prompt = generatePrompt(type, formData);
// //           console.log(
// //             "Calling AI with prompt:",
// //             prompt.substring(0, 100) + "..."
// //           );

// //           const aiResponse = await callAI(prompt);
// //           console.log("AI Response:", aiResponse.substring(0, 200) + "...");

// //           names = parseAIResponse(aiResponse, type);
// //           console.log("Parsed AI names count:", names.length);
// //         } else {
// //           throw new Error("No API key available, using fallback");
// //         }
// //       } catch (aiError) {
// //         console.error("AI failed, using fallback:", aiError.message);

// //         // Fallback to mock data
// //         if (type === "baby") {
// //           names = mockBabyNames.map((name, index) => ({
// //             ...name,
// //             id: Date.now() + index,
// //           }));
// //         } else {
// //           names = mockBrandNames.map((name, index) => ({
// //             ...name,
// //             id: Date.now() + index,
// //           }));
// //         }
// //         console.log("Using fallback data, count:", names.length);
// //       }

// //       console.log("Returning names:", names.length);
// //       return res.json({
// //         success: true,
// //         names,
// //         count: names.length,
// //         type,
// //         timestamp: new Date().toISOString(),
// //       });
// //     }

// //     if (req.method === "GET") {
// //       return res.json({
// //         success: true,
// //         message: "Names API is working",
// //         timestamp: new Date().toISOString(),
// //         env: {
// //           hasApiKey: !!OPENROUTER_API_KEY,
// //           nodeEnv: process.env.NODE_ENV,
// //         },
// //         endpoints: {
// //           POST: "Generate names",
// //           "POST with action=suggestions": "Get name suggestions",
// //           "POST with action=details": "Get name details",
// //         },
// //       });
// //     }

// //     return res.status(405).json({
// //       error: "Method not allowed",
// //       allowed: ["GET", "POST", "OPTIONS"],
// //       received: req.method,
// //     });
// //   } catch (error) {
// //     console.error("API Error:", error);
// //     return res.status(500).json({
// //       error: "Internal server error",
// //       message: error.message,
// //       timestamp: new Date().toISOString(),
// //       stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
// //     });
// //   }
// // };

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
//           "HTTP-Referer": "https://baby-brand-names-frontend.vercel.app/",
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
//   {
//     id: 4,
//     name: "Hassan",
//     meaning: "Handsome, good",
//     origin: "Arabic",
//     pronunciation: "HAH-san",
//     category: "Traditional",
//     popularity: "Popular",
//     description: "A name meaning handsome or good",
//     culturalSignificance: "Name of Prophet Muhammad's grandson",
//     historicalFigures: ["Hassan ibn Ali"],
//     variations: ["Hasan", "Hassaan"],
//     type: "baby",
//   },
//   {
//     id: 5,
//     name: "Zainab",
//     meaning: "Fragrant flower",
//     origin: "Arabic",
//     pronunciation: "ZAY-nab",
//     category: "Traditional",
//     popularity: "Popular",
//     description: "A name meaning fragrant flower",
//     culturalSignificance: "Name of Prophet Muhammad's daughter",
//     historicalFigures: ["Zainab bint Muhammad"],
//     variations: ["Zaynab", "Zeinab"],
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
//   {
//     id: 4,
//     name: "BrandVibe",
//     meaning: "Strong brand energy",
//     category: "Marketing",
//     description: "A name that captures brand energy",
//     domainAvailable: true,
//     variations: ["BrandVibe.co", "VibeCore"],
//     targetAudience: "Creative agencies",
//     type: "brand",
//   },
//   {
//     id: 5,
//     name: "Synaptix",
//     meaning: "Connected intelligence",
//     category: "AI/Tech",
//     description: "Perfect for AI and tech companies",
//     domainAvailable: true,
//     variations: ["Synaptix.ai", "SynapCore"],
//     targetAudience: "AI companies",
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
//           "HTTP-Referer": "https://baby-brand-names-frontend.vercel.app/",
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

//     // FIXED: Improved body parsing
//     let body = {};

//     if (req.method === "POST") {
//       try {
//         // Handle both string and object body
//         if (typeof req.body === "string") {
//           const trimmed = req.body.trim();
//           if (trimmed) {
//             body = JSON.parse(trimmed);
//           }
//         } else if (req.body && typeof req.body === "object") {
//           body = req.body;
//         }
//       } catch (parseError) {
//         console.error("Body parse error:", parseError);
//         return res.status(400).json({
//           success: false,
//           error: "Invalid JSON in request body",
//           message: parseError.message,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       console.log("Parsed request body:", JSON.stringify(body, null, 2));

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
//             { name: "Super" + query, reason: "Empowered version" },
//             { name: query + "Max", reason: "Maximum potential" },
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
//       if (!type || !["baby", "brand"].includes(type)) {
//         return res.status(400).json({
//           success: false,
//           error: "Valid type is required (baby or brand)",
//           received: { type },
//           timestamp: new Date().toISOString(),
//         });
//       }

//       console.log("Processing name generation request:", { type, formData });

//       let names = [];

//       try {
//         // Try AI first if API key is available
//         if (OPENROUTER_API_KEY) {
//           console.log("Attempting AI generation...");

//           const prompt = generatePrompt(type, formData);
//           console.log("Generated prompt:", prompt.substring(0, 100) + "...");

//           const aiResponse = await callAI(prompt);
//           console.log("AI Response received, length:", aiResponse.length);

//           names = parseAIResponse(aiResponse, type);
//           console.log("Successfully parsed AI names:", names.length);
//         } else {
//           console.log("No API key, using fallback data");
//           throw new Error("No API key available, using fallback");
//         }
//       } catch (aiError) {
//         console.error("AI failed, using fallback:", aiError.message);

//         // FIXED: Fallback to proper mock data
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

//       // FIXED: Ensure response structure
//       const response = {
//         success: true,
//         names: names,
//         count: names.length,
//         type: type,
//         language: formData.language || "english",
//         timestamp: new Date().toISOString(),
//       };

//       console.log("Sending response:", {
//         success: response.success,
//         count: response.count,
//         type: response.type,
//         namesPreview: names.slice(0, 2).map((n) => n.name),
//       });

//       return res.status(200).json(response);
//     }

//     // GET request - API info
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
//         example: {
//           baby: { type: "baby", gender: "girl", religion: "islamic" },
//           brand: { type: "brand", industry: "technology", style: "modern" },
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

const {
  generateBabyNames,
  generateBrandNames,
  testOpenRouterConnection,
} = require("../services/openRouterService");

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
  {
    id: 2,
    name: "Fatima",
    meaning: "Captivating, abstainer",
    origin: "Arabic",
    pronunciation: "FAH-ti-mah",
    category: "Traditional",
    popularity: "Popular",
    description: "A revered name in Islamic culture",
    culturalSignificance: "Name of Prophet Muhammad's daughter",
    historicalFigures: ["Fatima al-Zahra"],
    variations: ["Fatimah", "Fatma"],
    type: "baby",
  },
];

const mockBrandNames = [
  {
    id: 1,
    name: "Nexura",
    meaning: "Next-generation solutions",
    category: "Technology",
    description: "A modern, tech-forward name",
    domainAvailable: true,
    variations: ["Nexur", "Nexura.io"],
    targetAudience: "Tech professionals",
    type: "brand",
  },
  {
    id: 2,
    name: "Innovex",
    meaning: "Innovation and excellence",
    category: "Business",
    description: "Combines innovation with excellence",
    domainAvailable: true,
    variations: ["Innovex.co", "Innovex.app"],
    targetAudience: "Modern businesses",
    type: "brand",
  },
];

// Main serverless function
module.exports = async (req, res) => {
  // Set CORS headers for all requests
  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    console.log("Names API endpoint hit:", req.method, req.url);
    console.log("Request headers:", JSON.stringify(req.headers, null, 2));

    // Parse body safely with better error handling
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

    console.log("Request body:", JSON.stringify(body, null, 2));

    if (req.method === "POST") {
      const { type, action, ...formData } = body;

      // Handle suggestions
      if (action === "suggestions") {
        const { query, type: suggestionType } = body;
        console.log("Handling suggestions for:", query, suggestionType);

        return res.status(200).json({
          success: true,
          suggestions: [
            { name: query + "Pro", reason: "Professional variant" },
            { name: query + "X", reason: "Modern variant" },
            { name: query + "Plus", reason: "Enhanced version" },
          ],
          timestamp: new Date().toISOString(),
        });
      }

      // Handle details
      if (action === "details") {
        const { name, type: detailType } = body;
        console.log("Handling details for:", name, detailType);

        return res.status(200).json({
          success: true,
          etymology: `Rich historical background for ${name}`,
          culturalSignificance: "Significant cultural meaning",
          famousPeople: [`Famous person named ${name}`],
          interestingFacts: [`Interesting fact about ${name}`],
          modernUsage: "Popular in contemporary usage",
          timestamp: new Date().toISOString(),
        });
      }

      // Validate required fields for name generation
      if (!type) {
        return res.status(400).json({
          success: false,
          error: "Type is required",
          received: body,
          expected: { type: "baby or brand" },
          timestamp: new Date().toISOString(),
        });
      }

      console.log(`Starting ${type} name generation with data:`, formData);

      let result;

      try {
        // Call the appropriate service
        if (type === "baby") {
          console.log("Calling generateBabyNames...");
          result = await generateBabyNames(formData);
        } else if (type === "brand") {
          console.log("Calling generateBrandNames...");
          result = await generateBrandNames(formData);
        } else {
          return res.status(400).json({
            success: false,
            error: "Invalid type",
            received: type,
            expected: "baby or brand",
            timestamp: new Date().toISOString(),
          });
        }

        console.log("Service result:", {
          success: result?.success,
          count: result?.names?.length || 0,
          source: result?.source,
        });

        // Check if we got a valid result
        if (!result) {
          throw new Error("No result returned from name service");
        }

        // If service returned success=false, handle as error
        if (result.success === false) {
          throw new Error(
            result.message || result.error || "Name generation failed"
          );
        }

        // Validate that we have names
        if (
          !result.names ||
          !Array.isArray(result.names) ||
          result.names.length === 0
        ) {
          console.warn("No names in result, using mock data");
          const mockNames = type === "baby" ? mockBabyNames : mockBrandNames;
          result = {
            success: true,
            names: mockNames,
            count: mockNames.length,
            source: "mock",
            message: `${type} names generated successfully (mock data)`,
          };
        }

        console.log(`Returning ${result.names.length} ${type} names`);

        return res.status(200).json({
          success: true,
          names: result.names,
          count: result.names.length,
          type,
          language: formData.language || "english",
          source: result.source || "api",
          message: result.message || `${type} names generated successfully`,
          timestamp: new Date().toISOString(),
        });
      } catch (serviceError) {
        console.error(`${type} name generation service error:`, serviceError);

        // Fallback to mock data
        console.log("Using mock data as fallback");
        const mockNames = type === "baby" ? mockBabyNames : mockBrandNames;
        const processedMockNames = mockNames.map((name, index) => ({
          ...name,
          id: Date.now() + index,
        }));

        return res.status(200).json({
          success: true,
          names: processedMockNames,
          count: processedMockNames.length,
          type,
          language: formData.language || "english",
          source: "mock",
          message: `${type} names generated successfully (fallback)`,
          warning: "AI service unavailable, using fallback data",
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (req.method === "GET") {
      // Test endpoint
      if (req.query.test === "true") {
        console.log("Running connection test...");
        const testResult = await testOpenRouterConnection();

        return res.status(200).json({
          success: true,
          message: "Names API connection test",
          test: testResult,
          timestamp: new Date().toISOString(),
          env: {
            hasApiKey: !!process.env.OPENROUTER_API_KEY,
            nodeEnv: process.env.NODE_ENV || "development",
          },
        });
      }

      return res.status(200).json({
        success: true,
        message: "Names API is working",
        timestamp: new Date().toISOString(),
        env: {
          hasApiKey: !!process.env.OPENROUTER_API_KEY,
          nodeEnv: process.env.NODE_ENV || "development",
        },
        endpoints: {
          POST: "Generate names",
          "POST with action=suggestions": "Get name suggestions",
          "POST with action=details": "Get name details",
          "GET with ?test=true": "Test API connection",
        },
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      allowed: ["GET", "POST", "OPTIONS"],
      received: req.method,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
