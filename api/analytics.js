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
    // Since you don't have the analyticsService, we'll create a simple mock implementation
    const mockAnalyticsService = {
      trackNameGeneration: async (eventData) => {
        console.log("Mock analytics tracking:", {
          type: eventData.type,
          timestamp: eventData.timestamp,
          ip: eventData.clientIP?.substring(0, 8) + "...",
        });
        return { success: true, id: Date.now() };
      },
      getAnalytics: async () => {
        return {
          totalRequests: 150,
          babyNameRequests: 90,
          brandNameRequests: 60,
          topCountries: ["US", "UK", "CA"],
          dailyRequests: [
            { date: "2025-08-20", count: 25 },
            { date: "2025-08-21", count: 30 },
            { date: "2025-08-22", count: 35 },
          ],
        };
      },
      getAnalyticsForDateRange: async (startDate, endDate) => {
        return {
          totalRequests: 75,
          dateRange: { startDate, endDate },
          breakdown: {
            baby: 45,
            brand: 30,
          },
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
      console.error("Analytics body parse error:", parseError);
      return res.status(400).json({
        error: "Invalid JSON in request body",
        message: parseError.message,
      });
    }

    if (req.method === "POST") {
      const eventData = {
        ...body,
        clientIP:
          req.headers["x-forwarded-for"] ||
          req.connection?.remoteAddress ||
          "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
        timestamp: new Date().toISOString(),
      };

      console.log("Tracking analytics event:", {
        type: eventData.type,
        hasFormData: !!eventData.formData,
        ip: eventData.clientIP?.substring(0, 8) + "...",
      });

      await mockAnalyticsService.trackNameGeneration(eventData);
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
        const analytics = await mockAnalyticsService.getAnalyticsForDateRange(
          startDate,
          endDate
        );
        return res.json({
          success: true,
          ...analytics,
          message: "Date range analytics retrieved successfully",
        });
      }

      // Get general analytics
      const analytics = await mockAnalyticsService.getAnalytics();
      return res.json({
        success: true,
        ...analytics,
        message: "Analytics data retrieved successfully",
      });
    }

    res.status(405).json({
      error: "Method not allowed",
      allowed: ["GET", "POST", "OPTIONS"],
      received: req.method,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
