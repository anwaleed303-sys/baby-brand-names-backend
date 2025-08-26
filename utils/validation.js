/**
 * Validate name generation request
 * @param {Object} formData - Form data to validate
 * @param {string} type - Type of generation (baby/brand)
 */
function validateNameRequest(formData, type) {
  const errors = [];

  if (type === "baby") {
    // Validate baby name request
    if (
      formData.gender &&
      !["boy", "girl", "unisex"].includes(formData.gender)
    ) {
      errors.push("Invalid gender specified");
    }

    if (
      formData.religion &&
      ![
        "islamic",
        "hindu",
        "buddhist",
        "christian",
        "jewish",
        "sikh",
        "modern",
      ].includes(formData.religion)
    ) {
      errors.push("Invalid religion specified");
    }

    if (
      formData.keywords &&
      Array.isArray(formData.keywords) &&
      formData.keywords.length > 10
    ) {
      errors.push("Too many keywords (maximum 10)");
    }

    if (formData.meaning && formData.meaning.length > 200) {
      errors.push("Meaning description too long (maximum 200 characters)");
    }

    if (formData.startsWith && formData.startsWith.length > 5) {
      errors.push("StartsWith must be 5 characters or less");
    }

    if (formData.endsWith && formData.endsWith.length > 5) {
      errors.push("EndsWith must be 5 characters or less");
    }
  } else if (type === "brand") {
    // Validate brand name request
    if (
      formData.industry &&
      ![
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
      ].includes(formData.industry)
    ) {
      errors.push("Invalid industry specified");
    }

    if (
      formData.style &&
      ![
        "professional",
        "creative",
        "playful",
        "luxury",
        "minimal",
        "bold",
        "elegant",
        "modern",
      ].includes(formData.style)
    ) {
      errors.push("Invalid brand style specified");
    }

    if (formData.description && formData.description.length > 500) {
      errors.push("Business description too long (maximum 500 characters)");
    }

    if (formData.targetAudience && formData.targetAudience.length > 200) {
      errors.push(
        "Target audience description too long (maximum 200 characters)"
      );
    }

    if (
      formData.keywords &&
      Array.isArray(formData.keywords) &&
      formData.keywords.length > 10
    ) {
      errors.push("Too many keywords (maximum 10)");
    }
  }

  // Common validations
  if (
    formData.length &&
    !["short", "medium", "long"].includes(formData.length)
  ) {
    errors.push("Invalid length specified");
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
}

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @param {number} maxLength - Maximum length
 * @returns {string} - Sanitized string
 */
function sanitizeString(input, maxLength = 100) {
  if (!input || typeof input !== "string") return "";

  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags
    .replace(/[<>]/g, "") // Remove angle brackets
    .substring(0, maxLength);
}

/**
 * Sanitize array input
 * @param {Array} input - Array to sanitize
 * @param {number} maxItems - Maximum number of items
 * @param {number} maxItemLength - Maximum length per item
 * @returns {Array} - Sanitized array
 */
function sanitizeArray(input, maxItems = 10, maxItemLength = 50) {
  if (!Array.isArray(input)) return [];

  return input
    .slice(0, maxItems)
    .map((item) => sanitizeString(item, maxItemLength))
    .filter((item) => item.length > 0);
}

/**
 * Validate domain name format
 * @param {string} domain - Domain to validate
 * @returns {boolean} - True if valid
 */
function isValidDomain(domain) {
  if (!domain || typeof domain !== "string") return false;

  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain) && domain.length <= 253;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Check if string contains only allowed characters for names
 * @param {string} name - Name to check
 * @returns {boolean} - True if valid
 */
function isValidNameCharacters(name) {
  if (!name || typeof name !== "string") return false;

  // Allow letters, spaces, hyphens, apostrophes, and common diacritics
  const validChars =
    /^[a-zA-ZÀ-ÿĀ-žА-я\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0900-\u097F\s'-]+$/;
  return validChars.test(name);
}

/**
 * Validate request rate limiting data
 * @param {Object} req - Express request object
 * @returns {Object} - Client info for rate limiting
 */
function getClientInfo(req) {
  return {
    ip: req.ip || req.connection.remoteAddress || "unknown",
    userAgent: req.get("User-Agent") || "unknown",
    origin: req.get("Origin") || req.get("Referer") || "unknown",
  };
}

/**
 * Validate JSON structure
 * @param {string} jsonString - JSON string to validate
 * @returns {Object} - Parsed JSON or null
 */
function validateJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Check if request is from allowed origin
 * @param {string} origin - Request origin
 * @returns {boolean} - True if allowed
 */
function isAllowedOrigin(origin) {
  if (!origin) return true; // Allow requests without origin (mobile apps, etc.)

  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS || "http://localhost:3000"
  ).split(",");
  return (
    allowedOrigins.includes(origin) || process.env.NODE_ENV === "development"
  );
}

/**
 * Validate file upload (if implementing file uploads)
 * @param {Object} file - Uploaded file object
 * @returns {boolean} - True if valid
 */
function validateFileUpload(file) {
  if (!file) return false;

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "text/plain"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return allowedTypes.includes(file.mimetype) && file.size <= maxSize;
}

/**
 * Clean and validate form data
 * @param {Object} formData - Raw form data
 * @param {string} type - Type of form (baby/brand)
 * @returns {Object} - Cleaned form data
 */
function cleanFormData(formData, type) {
  const cleaned = {};

  if (type === "baby") {
    cleaned.gender = sanitizeString(formData.gender, 10);
    cleaned.religion = sanitizeString(formData.religion, 20);
    cleaned.origin = sanitizeString(formData.origin, 100);
    cleaned.keywords = sanitizeArray(formData.keywords, 10, 30);
    cleaned.meaning = sanitizeString(formData.meaning, 200);
    cleaned.startsWith = sanitizeString(formData.startsWith, 5);
    cleaned.endsWith = sanitizeString(formData.endsWith, 5);
    cleaned.length = sanitizeString(formData.length, 10);
  } else if (type === "brand") {
    cleaned.industry = sanitizeString(formData.industry, 20);
    cleaned.style = sanitizeString(formData.style, 20);
    cleaned.keywords = sanitizeArray(formData.keywords, 10, 30);
    cleaned.description = sanitizeString(formData.description, 500);
    cleaned.targetAudience = sanitizeString(formData.targetAudience, 200);
    cleaned.length = sanitizeString(formData.length, 10);
    cleaned.checkDomain = Boolean(formData.checkDomain);
    cleaned.avoidNumbers = Boolean(formData.avoidNumbers);
  }

  // Remove empty strings and null values
  Object.keys(cleaned).forEach((key) => {
    if (
      cleaned[key] === "" ||
      cleaned[key] === null ||
      cleaned[key] === undefined
    ) {
      delete cleaned[key];
    }
  });

  return cleaned;
}

module.exports = {
  validateNameRequest,
  sanitizeString,
  sanitizeArray,
  isValidDomain,
  isValidEmail,
  isValidNameCharacters,
  getClientInfo,
  validateJSON,
  isAllowedOrigin,
  validateFileUpload,
  cleanFormData,
};
