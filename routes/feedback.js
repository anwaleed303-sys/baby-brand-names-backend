const express = require("express");
const { body } = require("express-validator");
const { submitFeedback } = require("../services/feedbackService");
const { handleValidationErrors } = require("../middleware/validation");

const router = express.Router();

// Submit feedback
router.post(
  "/",
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("message")
      .optional()
      .isString()
      .isLength({ max: 1000 })
      .withMessage("Message too long (max 1000 characters)"),
    body("type")
      .optional()
      .isIn(["bug", "feature", "improvement", "general"])
      .withMessage("Invalid feedback type"),
    body("name")
      .optional()
      .isString()
      .isLength({ max: 100 })
      .withMessage("Name too long"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const feedbackData = {
        ...req.body,
        clientIP: req.ip || req.connection.remoteAddress,
        userAgent: req.get("User-Agent"),
        timestamp: new Date().toISOString(),
      };

      await submitFeedback(feedbackData);

      res.json({
        success: true,
        message: "Thank you for your feedback! We appreciate your input.",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
