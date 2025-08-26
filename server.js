require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Import routes
const nameRoutes = require("./routes/names");
const domainRoutes = require("./routes/domain");
console.log("domainRoutes value:", domainRoutes);
const analyticsRoutes = require("./routes/analytics");
const feedbackRoutes = require("./routes/feedback");

// Import middleware
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const { validateApiKey } = require("./middleware/validation");

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for rate limiting
app.set("trust proxy", 1);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = (
      process.env.ALLOWED_ORIGINS || "http://localhost:3000"
    ).split(",");

    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      process.env.NODE_ENV === "development"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/names", nameRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/feedback", feedbackRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Baby & Brand Name Generator API",
    version: "1.0.0",
    endpoints: {
      names: "/api/names",
      domain: "/api/domain",
      analytics: "/api/analytics",
      feedback: "/api/feedback",
      health: "/health",
    },
    documentation: "https://github.com/your-username/name-generator-api",
  });
});

// 404 handler
app.use("*", notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}`);
  console.log(
    `🌍 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
  );

  // Validate environment variables
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn(
      "⚠️  WARNING: OPENROUTER_API_KEY not set. Name generation will not work."
    );
  } else {
    console.log("✅ OpenRouter API key configured");
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

module.exports = app;
