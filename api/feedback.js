// // // const express = require("express");
// // // const feedbackRoute = require("../routes/feedback");

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
// // //     res.status(200).end();
// // //     return;
// // //   }

// // //   const app = express();
// // //   app.use(express.json());
// // //   app.use("/", feedbackRoute);

// // //   try {
// // //     app(req, res);
// // //   } catch (error) {
// // //     console.error("Feedback API error:", error);
// // //     res.status(500).json({ error: "Internal server error" });
// // //   }
// // // };

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

// //   try {
// //     const feedbackService = require("../services/feedbackService");

// //     if (req.method === "POST") {
// //       const feedbackData = req.body;

// //       if (!feedbackData.message) {
// //         return res.status(400).json({ error: "Feedback message is required" });
// //       }

// //       await feedbackService.saveFeedback(feedbackData);
// //       res.json({ success: true, message: "Feedback saved successfully" });
// //     } else if (req.method === "GET") {
// //       const feedback = await feedbackService.getFeedback();
// //       res.json(feedback);
// //     } else {
// //       res.status(405).json({ error: "Method not allowed" });
// //     }
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
//     const {
//       submitFeedback,
//       getFeedbackStats,
//       getAllFeedback,
//     } = require("../services/feedbackService");

//     // Parse request body properly
//     let body = req.body;
//     if (typeof body === "string") {
//       body = JSON.parse(body);
//     }

//     if (req.method === "POST") {
//       const feedbackData = {
//         ...body,
//         clientIP:
//           req.headers["x-forwarded-for"] || req.connection.remoteAddress,
//         userAgent: req.headers["user-agent"],
//         timestamp: new Date().toISOString(),
//       };

//       console.log("Submitting feedback:", {
//         rating: feedbackData.rating,
//         type: feedbackData.type,
//         hasMessage: !!feedbackData.message,
//       });

//       if (!feedbackData.message && !feedbackData.rating) {
//         return res.status(400).json({
//           error: "Either feedback message or rating is required",
//           received: body,
//         });
//       }

//       const result = await submitFeedback(feedbackData);
//       return res.json({
//         success: true,
//         message: "Feedback submitted successfully",
//         id: result.id,
//         timestamp: new Date().toISOString(),
//       });
//     }

//     if (req.method === "GET") {
//       const { action } = req.query;

//       if (action === "stats") {
//         const stats = await getFeedbackStats();
//         return res.json(stats);
//       }

//       if (action === "all") {
//         // Admin function - you might want to add auth here
//         const options = {
//           limit: parseInt(req.query.limit) || 50,
//           offset: parseInt(req.query.offset) || 0,
//           rating: req.query.rating,
//           type: req.query.type,
//           startDate: req.query.startDate,
//           endDate: req.query.endDate,
//         };

//         const feedback = await getAllFeedback(options);
//         return res.json(feedback);
//       }

//       // Default: return basic stats
//       const stats = await getFeedbackStats();
//       return res.json({
//         message: "Feedback API endpoint",
//         methods: ["GET", "POST"],
//         actions: ["stats", "all"],
//         stats: {
//           total: stats.totalSubmissions,
//           average: stats.averageRating,
//         },
//       });
//     }

//     res.status(405).json({ error: "Method not allowed" });
//   } catch (error) {
//     console.error("Feedback API error:", error);
//     res.status(500).json({
//       error: "Internal server error",
//       message: error.message,
//       timestamp: new Date().toISOString(),
//     });
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
    return res.status(200).end();
  }

  try {
    // Mock feedback service since you don't have the actual service
    const mockFeedbackService = {
      submitFeedback: async (feedbackData) => {
        console.log("Mock feedback submission:", {
          rating: feedbackData.rating,
          type: feedbackData.type,
          messageLength: feedbackData.message?.length || 0,
          timestamp: feedbackData.timestamp,
        });

        return {
          id: Date.now(),
          status: "submitted",
          message: "Feedback received successfully",
        };
      },

      getFeedbackStats: async () => {
        return {
          totalSubmissions: 245,
          averageRating: 4.2,
          ratingDistribution: {
            1: 5,
            2: 10,
            3: 25,
            4: 85,
            5: 120,
          },
          recentFeedback: [
            {
              id: 1,
              rating: 5,
              message: "Great service!",
              type: "baby",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              id: 2,
              rating: 4,
              message: "Very helpful",
              type: "brand",
              timestamp: new Date(Date.now() - 172800000).toISOString(),
            },
          ],
        };
      },

      getAllFeedback: async (options = {}) => {
        const {
          limit = 50,
          offset = 0,
          rating,
          type,
          startDate,
          endDate,
        } = options;

        // Mock feedback data
        const mockFeedbacks = [
          {
            id: 1,
            rating: 5,
            message: "Excellent name suggestions!",
            type: "baby",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            clientIP: "192.168.xxx.xxx",
          },
          {
            id: 2,
            rating: 4,
            message: "Good variety of options",
            type: "brand",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            clientIP: "10.0.xxx.xxx",
          },
          {
            id: 3,
            rating: 5,
            message: "Very creative names",
            type: "baby",
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            clientIP: "172.16.xxx.xxx",
          },
        ];

        // Apply filters
        let filtered = mockFeedbacks;
        if (rating) {
          filtered = filtered.filter((f) => f.rating === parseInt(rating));
        }
        if (type) {
          filtered = filtered.filter((f) => f.type === type);
        }
        if (startDate) {
          filtered = filtered.filter(
            (f) => new Date(f.timestamp) >= new Date(startDate)
          );
        }
        if (endDate) {
          filtered = filtered.filter(
            (f) => new Date(f.timestamp) <= new Date(endDate)
          );
        }

        // Apply pagination
        const paginatedResults = filtered.slice(offset, offset + limit);

        return {
          feedback: paginatedResults,
          total: filtered.length,
          limit,
          offset,
          hasMore: offset + limit < filtered.length,
        };
      },
    };

    // Parse request body properly
    let body = {};
    try {
      if (req.body) {
        if (typeof req.body === "string") {
          body = JSON.parse(req.body);
        } else {
          body = req.body;
        }
      }
    } catch (parseError) {
      console.error("Feedback body parse error:", parseError);
      return res.status(400).json({
        error: "Invalid JSON in request body",
        message: parseError.message,
      });
    }

    if (req.method === "POST") {
      const feedbackData = {
        ...body,
        clientIP:
          req.headers["x-forwarded-for"] ||
          req.connection?.remoteAddress ||
          "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting feedback:", {
        rating: feedbackData.rating,
        type: feedbackData.type,
        hasMessage: !!feedbackData.message,
        messageLength: feedbackData.message?.length || 0,
      });

      if (!feedbackData.message && !feedbackData.rating) {
        return res.status(400).json({
          error: "Either feedback message or rating is required",
          received: body,
          expected: {
            message: "Your feedback message",
            rating: "1-5",
            type: "baby or brand",
          },
        });
      }

      const result = await mockFeedbackService.submitFeedback(feedbackData);
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
        console.log("Getting feedback stats");
        const stats = await mockFeedbackService.getFeedbackStats();
        return res.json({
          success: true,
          ...stats,
          message: "Feedback stats retrieved successfully",
        });
      }

      if (action === "all") {
        console.log("Getting all feedback with filters");
        // Admin function - you might want to add auth here
        const options = {
          limit: parseInt(req.query.limit) || 50,
          offset: parseInt(req.query.offset) || 0,
          rating: req.query.rating,
          type: req.query.type,
          startDate: req.query.startDate,
          endDate: req.query.endDate,
        };

        const feedback = await mockFeedbackService.getAllFeedback(options);
        return res.json({
          success: true,
          ...feedback,
          message: "All feedback retrieved successfully",
        });
      }

      // Default: return basic stats
      const stats = await mockFeedbackService.getFeedbackStats();
      return res.json({
        success: true,
        message: "Feedback API endpoint",
        methods: ["GET", "POST"],
        actions: ["stats", "all"],
        stats: {
          total: stats.totalSubmissions,
          average: stats.averageRating,
        },
        examples: {
          submit: {
            message: "Great service!",
            rating: 5,
            type: "baby",
          },
          getStats: "GET /api/feedback?action=stats",
          getAll: "GET /api/feedback?action=all&limit=10",
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.status(405).json({
      error: "Method not allowed",
      allowed: ["GET", "POST", "OPTIONS"],
      received: req.method,
    });
  } catch (error) {
    console.error("Feedback API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
