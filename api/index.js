// module.exports = (req, res) => {
//   // CORS headers
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }

//   res.json({
//     message: "Baby & Brand Name Generator API",
//     version: "1.0.0",
//     endpoints: {
//       names: "/api/names",
//       domain: "/api/domain",
//       analytics: "/api/analytics",
//       feedback: "/api/feedback",
//       health: "/api/health",
//     },
//   });
// };

const express = require("express");
const namesHandler = require("./names");

const app = express();

app.use(express.json({ limit: "10mb" }));

// Route for names API
app.all("/api/names", async (req, res) => {
  await namesHandler(req, res);
});

// Other routes...
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

module.exports = app;
