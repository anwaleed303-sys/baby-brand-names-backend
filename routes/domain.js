const express = require("express");
const { query, body } = require("express-validator");
const { checkDomainAvailability } = require("../services/domainService");
const { handleValidationErrors } = require("../middleware/validation");

const router = express.Router();

// Check domain availability
router.get(
  "/check",
  [
    query("domain")
      .isString()
      .isLength({ min: 1, max: 100 })
      .matches(/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/)
      .withMessage("Valid domain required (e.g., example.com)"),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { domain } = req.query;

      console.log("Domain check request:", domain);

      const availability = await checkDomainAvailability(domain);

      res.json({
        success: true,
        domain: domain,
        available: availability.available,
        checked: availability.checked,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
);

// Bulk domain check
router.post(
  "/check-bulk",
  [
    body("domains")
      .isArray({ min: 1, max: 10 })
      .withMessage("Domains array required (max 10 domains)"),
    body("domains.*")
      .isString()
      .matches(/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/)
      .withMessage("Each domain must be valid"),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { domains } = req.body;

      console.log("Bulk domain check request:", domains);

      const results = await Promise.all(
        domains.map(async (domain) => {
          try {
            const availability = await checkDomainAvailability(domain);
            return {
              domain,
              available: availability.available,
              checked: availability.checked,
              error: null,
            };
          } catch (error) {
            return {
              domain,
              available: null,
              checked: false,
              error: error.message,
            };
          }
        })
      );

      res.json({
        success: true,
        results: results,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
