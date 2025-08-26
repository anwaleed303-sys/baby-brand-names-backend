// // Import your existing route logic
// const express = require("express");
// const router = express.Router();

// // Import your existing routes file to reuse logic
// const namesRoute = require("../routes/names");

// module.exports = async (req, res) => {
//   // CORS headers
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }

//   // Create a mini express app to reuse your existing route logic
//   const app = express();
//   app.use(express.json());
//   app.use("/", namesRoute);

//   // Simulate the request through your existing route
//   try {
//     app(req, res);
//   } catch (error) {
//     console.error("Names API error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const express = require("express");

module.exports = async (req, res) => {
  // CORS headers for all requests
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Import your existing route logic
    const nameService = require("../services/nameService");

    if (req.method === "POST") {
      const { type, action, ...formData } = req.body;

      // Handle different actions
      if (action === "suggestions") {
        // Get name suggestions
        const { query, type } = req.body;
        // Your suggestion logic here
        const suggestions = await nameService.getSuggestions(query, type);
        return res.json({ suggestions });
      }

      if (action === "details") {
        // Get name details
        const { name, type } = req.body;
        // Your details logic here
        const details = await nameService.getNameDetails(name, type);
        return res.json(details);
      }

      // Default: Generate names
      if (!type) {
        return res.status(400).json({ error: "Name type is required" });
      }

      // Generate names based on type
      if (type === "baby") {
        const names = await nameService.generateBabyNames(formData);
        return res.json({ names });
      } else if (type === "brand") {
        const names = await nameService.generateBrandNames(formData);
        return res.json({ names });
      } else {
        return res.status(400).json({ error: "Invalid name type" });
      }
    } else if (req.method === "GET") {
      // Return available endpoints info
      res.json({
        message: "Names API endpoint",
        methods: ["POST"],
        supportedTypes: ["baby", "brand"],
        supportedActions: ["generate", "suggestions", "details"],
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Names API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
