/**
 * Global error handling middleware
 */
function errorHandler(err, req, res, next) {
  console.error("❌ Error occurred:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  // Default error response
  let statusCode = 500;
  let errorResponse = {
    success: false,
    error: "Internal server error",
    message: "Something went wrong. Please try again later.",
    timestamp: new Date().toISOString(),
  };

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    errorResponse.error = "Validation error";
    errorResponse.message = err.message;
  } else if (err.name === "CastError") {
    statusCode = 400;
    errorResponse.error = "Invalid data format";
    errorResponse.message = "Invalid data provided";
  } else if (err.code === "ECONNREFUSED") {
    statusCode = 503;
    errorResponse.error = "Service unavailable";
    errorResponse.message = "External service temporarily unavailable";
  } else if (err.code === "ENOTFOUND") {
    statusCode = 503;
    errorResponse.error = "Network error";
    errorResponse.message = "Unable to connect to external service";
  } else if (err.message.includes("timeout")) {
    statusCode = 504;
    errorResponse.error = "Request timeout";
    errorResponse.message = "Request took too long to complete";
  } else if (err.message.includes("Rate limit")) {
    statusCode = 429;
    errorResponse.error = "Rate limit exceeded";
    errorResponse.message = err.message;
  } else if (err.message.includes("Invalid OpenRouter API key")) {
    statusCode = 500;
    errorResponse.error = "Configuration error";
    errorResponse.message =
      "Service configuration issue. Please contact support.";
  } else if (err.message.includes("credits exhausted")) {
    statusCode = 503;
    errorResponse.error = "Service temporarily unavailable";
    errorResponse.message =
      "Name generation service temporarily unavailable. Please try again later.";
  }

  // Add error ID for tracking
  errorResponse.errorId =
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Include stack trace in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
    errorResponse.details = {
      name: err.name,
      code: err.code,
      originalMessage: err.message,
    };
  }

  // Log error for monitoring
  logError(err, req, errorResponse.errorId);

  res.status(statusCode).json(errorResponse);
}

/**
 * Log error for monitoring and debugging
 */
function logError(err, req, errorId) {
  const errorLog = {
    errorId,
    timestamp: new Date().toISOString(),
    error: {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      body: sanitizeLogData(req.body),
      query: req.query,
      params: req.params,
    },
  };

  // In production, send to logging service (e.g., Winston, Datadog, Sentry)
  console.error("🚨 Error Log:", JSON.stringify(errorLog, null, 2));

  // Example: Send to external logging service
  // await loggerService.error(errorLog);
}

/**
 * Sanitize sensitive data from logs
 */
function sanitizeLogData(data) {
  if (!data || typeof data !== "object") return data;

  const sanitized = { ...data };
  const sensitiveFields = ["password", "apiKey", "token", "secret"];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = "[REDACTED]";
    }
  });

  return sanitized;
}

/**
 * Handle 404 errors
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    message: `The endpoint ${req.originalUrl} does not exist.`,
    availableEndpoints: [
      "/api/names/baby",
      "/api/names/brand",
      "/api/domain/check",
      "/api/analytics/generation",
      "/api/feedback",
      "/health",
    ],
    timestamp: new Date().toISOString(),
  });
}

/**
 * Handle async errors in routes
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Create custom error
 */
class AppError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  AppError,
  logError,
};
