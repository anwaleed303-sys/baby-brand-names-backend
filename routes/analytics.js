const express = require("express");
const { body } = require("express-validator");
const {
  trackNameGeneration,
  getAnalytics,
} = require("../services/analyticsService");
const { handleValidationErrors } = require("../middleware/validation");

const router = express.Router();

// Track name generation
router.post(
  "/generation",
  [
    body("type")
      .isIn(["baby", "brand"])
      .withMessage("Type must be baby or brand"),
    body("formData").isObject().withMessage("Form data required"),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { type, formData } = req.body;
      const clientIP = req.ip || req.connection.remoteAddress;
      const userAgent = req.get("User-Agent");

      await trackNameGeneration({
        type,
        formData,
        clientIP,
        userAgent,
        timestamp: new Date().toISOString(),
      });

      res.json({
        success: true,
        message: "Analytics tracked successfully",
      });
    } catch (error) {
      // Don't fail the request if analytics fails
      console.error("Analytics tracking error:", error);
      res.json({
        success: false,
        message: "Analytics tracking failed",
        error: error.message,
      });
    }
  }
);

// Get analytics data (optional - for admin dashboard)
router.get("/stats", async (req, res, next) => {
  try {
    const stats = await getAnalytics();

    res.json({
      success: true,
      stats: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
