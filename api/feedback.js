// const express = require("express");
// const feedbackRoute = require("../routes/feedback");

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

//   const app = express();
//   app.use(express.json());
//   app.use("/", feedbackRoute);

//   try {
//     app(req, res);
//   } catch (error) {
//     console.error("Feedback API error:", error);
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
    const feedbackService = require("../services/feedbackService");

    if (req.method === "POST") {
      const feedbackData = req.body;

      if (!feedbackData.message) {
        return res.status(400).json({ error: "Feedback message is required" });
      }

      await feedbackService.saveFeedback(feedbackData);
      res.json({ success: true, message: "Feedback saved successfully" });
    } else if (req.method === "GET") {
      const feedback = await feedbackService.getFeedback();
      res.json(feedback);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Feedback API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
