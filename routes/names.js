const express = require("express");
const { body, query, validationResult } = require("express-validator");
const {
  generateBabyNames,
  generateBrandNames,
  getNameSuggestions,
  getNameDetails,
} = require("../services/nameService");
const { handleValidationErrors } = require("../middleware/validation");

const router = express.Router();

// Validation rules for baby name generation
const babyNameValidation = [
  body("gender")
    .optional()
    .isIn(["boy", "girl", "unisex"])
    .withMessage("Invalid gender"),
  body("religion")
    .optional()
    .isIn([
      "islamic",
      "hindu",
      "buddhist",
      "christian",
      "jewish",
      "sikh",
      "modern",
    ])
    .withMessage("Invalid religion"),
  body("origin")
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage("Origin too long"),
  body("keywords")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Too many keywords"),
  body("meaning")
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage("Meaning too long"),
  body("startsWith")
    .optional()
    .isString()
    .isLength({ max: 5 })
    .withMessage("StartsWith too long"),
  body("endsWith")
    .optional()
    .isString()
    .isLength({ max: 5 })
    .withMessage("EndsWith too long"),
  body("length")
    .optional()
    .isIn(["short", "medium", "long"])
    .withMessage("Invalid length"),
];

// Validation rules for brand name generation
const brandNameValidation = [
  body("industry")
    .optional()
    .isIn([
      "technology",
      "healthcare",
      "finance",
      "education",
      "food",
      "fashion",
      "travel",
      "consulting",
      "entertainment",
      "fitness",
      "real-estate",
      "automotive",
    ])
    .withMessage("Invalid industry"),
  body("style")
    .optional()
    .isIn([
      "professional",
      "creative",
      "playful",
      "luxury",
      "minimal",
      "bold",
      "elegant",
      "modern",
    ])
    .withMessage("Invalid style"),
  body("keywords")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Too many keywords"),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Description too long"),
  body("targetAudience")
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage("Target audience too long"),
  body("length")
    .optional()
    .isIn(["short", "medium", "long"])
    .withMessage("Invalid length"),
  body("checkDomain")
    .optional()
    .isBoolean()
    .withMessage("CheckDomain must be boolean"),
  body("avoidNumbers")
    .optional()
    .isBoolean()
    .withMessage("AvoidNumbers must be boolean"),
];

// Generate baby names
router.post(
  "/baby",
  babyNameValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      console.log("Baby name generation request:", req.body);

      const names = await generateBabyNames(req.body);

      res.json({
        success: true,
        count: names.length,
        names: names,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
);

// Generate brand names
router.post(
  "/brand",
  brandNameValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      console.log("Brand name generation request:", req.body);

      const names = await generateBrandNames(req.body);

      res.json({
        success: true,
        count: names.length,
        names: names,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get name suggestions (autocomplete)
router.get(
  "/suggestions",
  [
    query("q")
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage("Query required and must be 1-50 characters"),
    query("type")
      .isIn(["baby", "brand"])
      .withMessage("Type must be baby or brand"),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { q: query, type } = req.query;

      const suggestions = await getNameSuggestions(query, type);

      res.json({
        success: true,
        query: query,
        type: type,
        suggestions: suggestions,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get detailed name information
router.get(
  "/details",
  [
    query("name")
      .isString()
      .isLength({ min: 1, max: 100 })
      .withMessage("Name required and must be 1-100 characters"),
    query("type")
      .isIn(["baby", "brand"])
      .withMessage("Type must be baby or brand"),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { name, type } = req.query;

      const details = await getNameDetails(name, type);

      res.json({
        success: true,
        name: name,
        type: type,
        details: details,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
