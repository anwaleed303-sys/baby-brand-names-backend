const { validationResult } = require("express-validator");

/**
 * Handle validation errors middleware
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
        value: error.value,
      })),
    });
  }

  next();
}

/**
 * Validate API key (if implementing API key auth)
 */
function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  const validApiKeys = (process.env.VALID_API_KEYS || "")
    .split(",")
    .filter(Boolean);

  // Skip validation if no API keys configured (development mode)
  if (validApiKeys.length === 0) {
    return next();
  }

  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res.status(401).json({
      success: false,
      error: "Invalid or missing API key",
    });
  }

  next();
}

/**
 * Rate limiting by IP
 */
function createRateLimiter(windowMs = 15 * 60 * 1000, max = 100) {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Clean up old requests
    for (const [clientIP, data] of requests) {
      if (now - data.firstRequest > windowMs) {
        requests.delete(clientIP);
      }
    }

    // Check current IP
    const clientData = requests.get(ip) || { count: 0, firstRequest: now };

    if (now - clientData.firstRequest > windowMs) {
      // Reset window
      clientData.count = 1;
      clientData.firstRequest = now;
    } else {
      clientData.count++;
    }

    requests.set(ip, clientData);

    if (clientData.count > max) {
      return res.status(429).json({
        success: false,
        error: "Too many requests",
        retryAfter: Math.ceil(
          (windowMs - (now - clientData.firstRequest)) / 1000
        ),
      });
    }

    // Add rate limit headers
    res.set({
      "X-RateLimit-Limit": max,
      "X-RateLimit-Remaining": Math.max(0, max - clientData.count),
      "X-RateLimit-Reset": new Date(
        clientData.firstRequest + windowMs
      ).toISOString(),
    });

    next();
  };
}

/**
 * Sanitize input data
 */
function sanitizeInput(req, res, next) {
  // Remove any potentially harmful characters
  const sanitize = (obj) => {
    if (typeof obj === "string") {
      return obj
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }

    if (obj && typeof obj === "object") {
      const sanitized = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitize(value);
      }
      return sanitized;
    }

    return obj;
  };

  if (req.body) {
    req.body = sanitize(req.body);
  }

  if (req.query) {
    req.query = sanitize(req.query);
  }

  next();
}

/**
 * Validate request size
 */
function validateRequestSize(maxSize = 1024 * 1024) {
  // 1MB default
  return (req, res, next) => {
    const contentLength = parseInt(req.headers["content-length"] || "0");

    if (contentLength > maxSize) {
      return res.status(413).json({
        success: false,
        error: "Request too large",
        maxSize: `${maxSize / 1024 / 1024}MB`,
      });
    }

    next();
  };
}

/**
 * CORS validation for specific origins
 */
function validateOrigin(req, res, next) {
  const origin = req.headers.origin;
  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS || "http://localhost:3000"
  ).split(",");

  if (process.env.NODE_ENV === "development") {
    return next(); // Allow all origins in development
  }

  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      error: "Origin not allowed",
    });
  }

  next();
}

/**
 * Log request details
 */
function logRequest(req, res, next) {
  const start = Date.now();

  // Log request
  console.log(`📨 ${req.method} ${req.originalUrl} - ${req.ip}`);

  // Log response when finished
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `📤 ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = {
  handleValidationErrors,
  validateApiKey,
  createRateLimiter,
  sanitizeInput,
  validateRequestSize,
  validateOrigin,
  logRequest,
};
