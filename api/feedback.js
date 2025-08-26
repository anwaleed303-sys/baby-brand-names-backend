const express = require("express");
const feedbackRoute = require("../routes/feedback");

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
    res.status(200).end();
    return;
  }

  const app = express();
  app.use(express.json());
  app.use("/", feedbackRoute);

  try {
    app(req, res);
  } catch (error) {
    console.error("Feedback API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
