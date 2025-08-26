// // // // Import your existing route logic
// // // const express = require("express");
// // // const router = express.Router();

// // // // Import your existing routes file to reuse logic
// // // const namesRoute = require("../routes/names");

// // // module.exports = async (req, res) => {
// // //   // CORS headers
// // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
// // //   res.setHeader(
// // //     "Access-Control-Allow-Headers",
// // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // //   );

// // //   if (req.method === "OPTIONS") {
// // //     res.status(200).end();
// // //     return;
// // //   }

// // //   // Create a mini express app to reuse your existing route logic
// // //   const app = express();
// // //   app.use(express.json());
// // //   app.use("/", namesRoute);

// // //   // Simulate the request through your existing route
// // //   try {
// // //     app(req, res);
// // //   } catch (error) {
// // //     console.error("Names API error:", error);
// // //     res.status(500).json({ error: "Internal server error" });
// // //   }
// // // };

// // const express = require("express");

// // module.exports = async (req, res) => {
// //   // CORS headers for all requests
// //   res.setHeader("Access-Control-Allow-Credentials", true);
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
// //   );
// //   res.setHeader(
// //     "Access-Control-Allow-Headers",
// //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// //   );

// //   // Handle preflight OPTIONS request
// //   if (req.method === "OPTIONS") {
// //     res.status(200).end();
// //     return;
// //   }

// //   try {
// //     // Import your existing route logic
// //     const nameService = require("../services/nameService");

// //     if (req.method === "POST") {
// //       const { type, action, ...formData } = req.body;

// //       // Handle different actions
// //       if (action === "suggestions") {
// //         // Get name suggestions
// //         const { query, type } = req.body;
// //         // Your suggestion logic here
// //         const suggestions = await nameService.getSuggestions(query, type);
// //         return res.json({ suggestions });
// //       }

// //       if (action === "details") {
// //         // Get name details
// //         const { name, type } = req.body;
// //         // Your details logic here
// //         const details = await nameService.getNameDetails(name, type);
// //         return res.json(details);
// //       }

// //       // Default: Generate names
// //       if (!type) {
// //         return res.status(400).json({ error: "Name type is required" });
// //       }

// //       // Generate names based on type
// //       if (type === "baby") {
// //         const names = await nameService.generateBabyNames(formData);
// //         return res.json({ names });
// //       } else if (type === "brand") {
// //         const names = await nameService.generateBrandNames(formData);
// //         return res.json({ names });
// //       } else {
// //         return res.status(400).json({ error: "Invalid name type" });
// //       }
// //     } else if (req.method === "GET") {
// //       // Return available endpoints info
// //       res.json({
// //         message: "Names API endpoint",
// //         methods: ["POST"],
// //         supportedTypes: ["baby", "brand"],
// //         supportedActions: ["generate", "suggestions", "details"],
// //       });
// //     } else {
// //       res.status(405).json({ error: "Method not allowed" });
// //     }
// //   } catch (error) {
// //     console.error("Names API error:", error);
// //     res.status(500).json({
// //       error: "Internal server error",
// //       message: error.message,
// //     });
// //   }
// // };

// module.exports = async (req, res) => {
//   // CORS headers
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }

//   try {
//     const nameService = require("../services/nameService");

//     // ✅ ensure body is parsed
//     let body = req.body;
//     if (!body || Object.keys(body).length === 0) {
//       const buffers = [];
//       for await (const chunk of req) {
//         buffers.push(chunk);
//       }
//       body = JSON.parse(Buffer.concat(buffers).toString());
//     }

//     if (req.method === "POST") {
//       const { type, action, ...formData } = body;

//       if (action === "suggestions") {
//         const { query, type } = body;
//         const suggestions = await nameService.getSuggestions(query, type);
//         return res.json({ suggestions });
//       }

//       if (action === "details") {
//         const { name, type } = body;
//         const details = await nameService.getNameDetails(name, type);
//         return res.json(details);
//       }

//       if (!type) {
//         return res.status(400).json({ error: "Name type is required" });
//       }

//       if (type === "baby") {
//         const names = await nameService.generateBabyNames(formData);
//         return res.json({ names });
//       } else if (type === "brand") {
//         const names = await nameService.generateBrandNames(formData);
//         return res.json({ names });
//       } else {
//         return res.status(400).json({ error: "Invalid name type" });
//       }
//     }

//     if (req.method === "GET") {
//       return res.json({
//         message: "Names API endpoint",
//         methods: ["POST"],
//         supportedTypes: ["baby", "brand"],
//         supportedActions: ["generate", "suggestions", "details"],
//       });
//     }

//     res.status(405).json({ error: "Method not allowed" });
//   } catch (error) {
//     console.error("Names API error:", error);
//     res.status(500).json({
//       error: "Internal server error",
//       message: error.message,
//     });
//   }
// };

const axios = require("axios");

// Environment variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

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

// Generate prompt for AI
function generatePrompt(type, formData) {
  if (type === "baby") {
    return `Generate 10 authentic ${
      formData.gender || "unisex"
    } baby names with ${formData.religion || "various"} cultural background. 
    Return as JSON array with format: [{"name": "...", "meaning": "...", "origin": "...", "pronunciation": "...", "category": "...", "popularity": "...", "description": "...", "culturalSignificance": "...", "historicalFigures": [], "variations": []}]`;
  } else {
    return `Generate 10 creative ${
      formData.industry || "business"
    } brand names with ${formData.style || "modern"} style. 
    Return as JSON array with format: [{"name": "...", "meaning": "...", "category": "...", "description": "...", "domainAvailable": true, "variations": [], "targetAudience": "..."}]`;
  }
}

// Call OpenRouter API
async function callAI(prompt) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("API key not configured");
  }

  const response = await axios.post(
    `${OPENROUTER_BASE_URL}/chat/completions`,
    {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are a name generation expert. Return only valid JSON.",
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
        "HTTP-Referer": "https://namegenai.vercel.app",
        "X-Title": "Name Generator API",
      },
      timeout: 25000,
    }
  );

  return response.data.choices[0].message.content;
}

// Parse AI response
function parseAIResponse(content, type) {
  try {
    // Clean the response
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      throw new Error("No JSON array found");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Add IDs and type
    return parsed.map((item, index) => ({
      id: Date.now() + index,
      type,
      ...item,
    }));
  } catch (error) {
    console.error("Parse error:", error);
    throw new Error("Failed to parse AI response");
  }
}

// Main serverless function
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    console.log("API endpoint hit:", req.method, req.url);
    console.log("Headers:", req.headers);

    // Parse body
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    console.log("Request body:", body);

    if (req.method === "POST") {
      const { type, action, ...formData } = body;

      // Handle suggestions
      if (action === "suggestions") {
        const { query, type } = body;
        return res.json({
          suggestions: [
            { name: query + "1", reason: "Similar sound" },
            { name: query + "2", reason: "Similar meaning" },
          ],
        });
      }

      // Handle details
      if (action === "details") {
        const { name, type } = body;
        return res.json({
          etymology: `Rich historical background for ${name}`,
          culturalSignificance: "Significant cultural meaning",
          famousPeople: [`Famous ${name}`],
          interestingFacts: [`Interesting fact about ${name}`],
          modernUsage: "Popular in contemporary usage",
        });
      }

      // Generate names
      if (!type) {
        return res.status(400).json({ error: "Type is required" });
      }

      let names;

      try {
        // Try AI first
        const prompt = generatePrompt(type, formData);
        console.log(
          "Calling AI with prompt:",
          prompt.substring(0, 100) + "..."
        );

        const aiResponse = await callAI(prompt);
        console.log("AI Response:", aiResponse.substring(0, 200) + "...");

        names = parseAIResponse(aiResponse, type);
        console.log("Parsed names count:", names.length);
      } catch (aiError) {
        console.error("AI failed, using fallback:", aiError.message);

        // Fallback to mock data
        if (type === "baby") {
          names = mockBabyNames.map((name, index) => ({
            ...name,
            id: Date.now() + index,
          }));
        } else {
          names = mockBrandNames.map((name, index) => ({
            ...name,
            id: Date.now() + index,
          }));
        }
      }

      console.log("Returning names:", names.length);
      return res.json({
        success: true,
        names,
        count: names.length,
        type,
      });
    }

    if (req.method === "GET") {
      return res.json({
        message: "Names API is working",
        timestamp: new Date().toISOString(),
        env: {
          hasApiKey: !!OPENROUTER_API_KEY,
          nodeEnv: process.env.NODE_ENV,
        },
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
