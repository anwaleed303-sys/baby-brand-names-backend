// const express = require("express");
// const domainRoute = require("../routes/domain");

// module.exports = async (req, res) => {
//   // CORS headers
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
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
//   app.use("/", domainRoute);

//   try {
//     app(req, res);
//   } catch (error) {
//     console.error("Domain API error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

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
    res.status(200).end();
    return;
  }

  try {
    const domainService = require("../services/domainService");

    if (req.method === "POST") {
      const { domain } = req.body;

      if (!domain) {
        return res.status(400).json({ error: "Domain is required" });
      }

      const availability = await domainService.checkDomain(domain);
      res.json(availability);
    } else if (req.method === "GET") {
      res.json({ message: "Domain API endpoint" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Domain API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
