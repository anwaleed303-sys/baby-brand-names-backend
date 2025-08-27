// // module.exports = (req, res) => {
// //   // CORS headers
// //   res.setHeader("Access-Control-Allow-Credentials", true);
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
// //   );
// //   res.setHeader(
// //     "Access-Control-Allow-Headers",
// //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// //   );

// //   if (req.method === "OPTIONS") {
// //     res.status(200).end();
// //     return;
// //   }

// //   res.json({
// //     message: "Baby & Brand Name Generator API",
// //     version: "1.0.0",
// //     endpoints: {
// //       names: "/api/names",
// //       domain: "/api/domain",
// //       analytics: "/api/analytics",
// //       feedback: "/api/feedback",
// //       health: "/api/health",
// //     },
// //     documentation: "https://github.com/your-username/name-generator-api",
// //   });
// // };

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
//     // documentation: "https://github.com/your-username/name-generator-api",
//   });
// };

const express = require("express");
const namesRouter = require("../routes/names"); // Import your names router

const app = express();

// Middleware
app.use(express.json());

// CORS middleware (instead of manual headers)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  next();
});

// Handle OPTIONS requests
app.options("*", (req, res) => {
  res.status(200).end();
});

// Mount the names router
app.use("/api/names", namesRouter);

// Default route
app.get("/api", (req, res) => {
  res.json({
    message: "Baby & Brand Name Generator API",
    version: "1.0.0",
    endpoints: {
      names: "/api/names",
      domain: "/api/domain",
      analytics: "/api/analytics",
      feedback: "/api/feedback",
      health: "/api/health",
    },
  });
});

// Export the Express app
module.exports = app;
