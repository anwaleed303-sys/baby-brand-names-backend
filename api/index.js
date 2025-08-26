module.exports = (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

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
    documentation: "https://github.com/your-username/name-generator-api",
  });
};
