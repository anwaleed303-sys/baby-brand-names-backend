// // const express = require("express");
// // const analyticsRoute = require("../routes/analytics");

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
// //   app.use("/", analyticsRoute);

// //   try {
// //     app(req, res);
// //   } catch (error) {
// //     console.error("Analytics API error:", error);
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
//     const analyticsService = require("../services/analyticsService");

//     if (req.method === "POST") {
//       const eventData = req.body;
//       await analyticsService.trackEvent(eventData);
//       res.json({ success: true });
//     } else if (req.method === "GET") {
//       const analytics = await analyticsService.getAnalytics();
//       res.json(analytics);
//     } else {
//       res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Analytics API error:", error);
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
      trackNameGeneration,
      getAnalytics,
      getAnalyticsForDateRange,
    } = require("../services/analyticsService");

    // Parse request body properly
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    if (req.method === "POST") {
      const eventData = {
        ...body,
        clientIP:
          req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
        timestamp: new Date().toISOString(),
      };

      console.log("Tracking analytics event:", {
        type: eventData.type,
        hasFormData: !!eventData.formData,
      });

      await trackNameGeneration(eventData);
      return res.json({
        success: true,
        message: "Event tracked successfully",
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === "GET") {
      const { startDate, endDate } = req.query;

      // Get analytics for date range if specified
      if (startDate && endDate) {
        const analytics = await getAnalyticsForDateRange(startDate, endDate);
        return res.json(analytics);
      }

      // Get general analytics
      const analytics = await getAnalytics();
      return res.json({
        ...analytics,
        message: "Analytics data retrieved successfully",
      });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Analytics API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
