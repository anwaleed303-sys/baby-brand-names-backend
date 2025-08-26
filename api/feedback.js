// // const express = require("express");
// // const feedbackRoute = require("../routes/feedback");

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
// //     res.status(200).end();
// //     return;
// //   }

// //   const app = express();
// //   app.use(express.json());
// //   app.use("/", feedbackRoute);

// //   try {
// //     app(req, res);
// //   } catch (error) {
// //     console.error("Feedback API error:", error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // };

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

//   try {
//     const feedbackService = require("../services/feedbackService");

//     if (req.method === "POST") {
//       const feedbackData = req.body;

//       if (!feedbackData.message) {
//         return res.status(400).json({ error: "Feedback message is required" });
//       }

//       await feedbackService.saveFeedback(feedbackData);
//       res.json({ success: true, message: "Feedback saved successfully" });
//     } else if (req.method === "GET") {
//       const feedback = await feedbackService.getFeedback();
//       res.json(feedback);
//     } else {
//       res.status(405).json({ error: "Method not allowed" });
//     }
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
    const {
      submitFeedback,
      getFeedbackStats,
      getAllFeedback,
    } = require("../services/feedbackService");

    // Parse request body properly
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    if (req.method === "POST") {
      const feedbackData = {
        ...body,
        clientIP:
          req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting feedback:", {
        rating: feedbackData.rating,
        type: feedbackData.type,
        hasMessage: !!feedbackData.message,
      });

      if (!feedbackData.message && !feedbackData.rating) {
        return res.status(400).json({
          error: "Either feedback message or rating is required",
          received: body,
        });
      }

      const result = await submitFeedback(feedbackData);
      return res.json({
        success: true,
        message: "Feedback submitted successfully",
        id: result.id,
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === "GET") {
      const { action } = req.query;

      if (action === "stats") {
        const stats = await getFeedbackStats();
        return res.json(stats);
      }

      if (action === "all") {
        // Admin function - you might want to add auth here
        const options = {
          limit: parseInt(req.query.limit) || 50,
          offset: parseInt(req.query.offset) || 0,
          rating: req.query.rating,
          type: req.query.type,
          startDate: req.query.startDate,
          endDate: req.query.endDate,
        };

        const feedback = await getAllFeedback(options);
        return res.json(feedback);
      }

      // Default: return basic stats
      const stats = await getFeedbackStats();
      return res.json({
        message: "Feedback API endpoint",
        methods: ["GET", "POST"],
        actions: ["stats", "all"],
        stats: {
          total: stats.totalSubmissions,
          average: stats.averageRating,
        },
      });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Feedback API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
