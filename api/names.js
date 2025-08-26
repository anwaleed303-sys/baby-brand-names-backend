// Import your existing route logic
const express = require("express");
const router = express.Router();

// Import your existing routes file to reuse logic
const namesRoute = require("../routes/names");

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Create a mini express app to reuse your existing route logic
  const app = express();
  app.use(express.json());
  app.use("/", namesRoute);

  // Simulate the request through your existing route
  try {
    app(req, res);
  } catch (error) {
    console.error("Names API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
