// // // // const express = require("express");
// // // // const domainRoute = require("../routes/domain");

// // // // module.exports = async (req, res) => {
// // // //   // CORS headers
// // // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // // //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
// // // //   res.setHeader(
// // // //     "Access-Control-Allow-Headers",
// // // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // // //   );

// // // //   if (req.method === "OPTIONS") {
// // // //     res.status(200).end();
// // // //     return;
// // // //   }

// // // //   // Create a mini express app to reuse your existing route logic
// // // //   const app = express();
// // // //   app.use(express.json());
// // // //   app.use("/", domainRoute);

// // // //   try {
// // // //     app(req, res);
// // // //   } catch (error) {
// // // //     console.error("Domain API error:", error);
// // // //     res.status(500).json({ error: "Internal server error" });
// // // //   }
// // // // };

// // // module.exports = async (req, res) => {
// // //   // CORS headers
// // //   res.setHeader("Access-Control-Allow-Credentials", true);
// // //   res.setHeader("Access-Control-Allow-Origin", "*");
// // //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
// // //   res.setHeader(
// // //     "Access-Control-Allow-Headers",
// // //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// // //   );

// // //   if (req.method === "OPTIONS") {
// // //     res.status(200).end();
// // //     return;
// // //   }

// // //   try {
// // //     const domainService = require("../services/domainService");

// // //     if (req.method === "POST") {
// // //       const { domain } = req.body;

// // //       if (!domain) {
// // //         return res.status(400).json({ error: "Domain is required" });
// // //       }

// // //       const availability = await domainService.checkDomain(domain);
// // //       res.json(availability);
// // //     } else if (req.method === "GET") {
// // //       res.json({ message: "Domain API endpoint" });
// // //     } else {
// // //       res.status(405).json({ error: "Method not allowed" });
// // //     }
// // //   } catch (error) {
// // //     console.error("Domain API error:", error);
// // //     res.status(500).json({ error: "Internal server error" });
// // //   }
// // // };

// // module.exports = async (req, res) => {
// //   // CORS headers
// //   res.setHeader("Access-Control-Allow-Credentials", true);
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
// //   res.setHeader(
// //     "Access-Control-Allow-Headers",
// //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// //   );

// //   if (req.method === "OPTIONS") {
// //     res.status(200).end();
// //     return;
// //   }

// //   try {
// //     const {
// //       checkDomainAvailability,
// //       generateDomainSuggestions,
// //       bulkCheckDomains,
// //     } = require("../services/domainService");

// //     // Parse request body properly
// //     let body = req.body;
// //     if (typeof body === "string") {
// //       body = JSON.parse(body);
// //     }

// //     if (req.method === "POST") {
// //       const { domain, domains, action } = body;

// //       console.log("Domain API request:", { domain, domains, action });

// //       // Handle bulk domain check
// //       if (action === "bulk" && domains && Array.isArray(domains)) {
// //         const results = await bulkCheckDomains(domains);
// //         return res.json({ results });
// //       }

// //       // Handle domain suggestions
// //       if (action === "suggestions" && domain) {
// //         const suggestions = generateDomainSuggestions(domain);
// //         const checkedSuggestions = await bulkCheckDomains(suggestions);
// //         return res.json({ suggestions: checkedSuggestions });
// //       }

// //       // Handle single domain check
// //       if (!domain) {
// //         return res.status(400).json({
// //           error: "Domain is required",
// //           example: { domain: "example.com" },
// //         });
// //       }

// //       const availability = await checkDomainAvailability(domain);
// //       return res.json({
// //         domain,
// //         ...availability,
// //         timestamp: new Date().toISOString(),
// //       });
// //     }

// //     if (req.method === "GET") {
// //       return res.json({
// //         message: "Domain API endpoint",
// //         methods: ["POST"],
// //         actions: ["check", "bulk", "suggestions"],
// //         example: {
// //           check: { domain: "example.com" },
// //           bulk: { action: "bulk", domains: ["example1.com", "example2.com"] },
// //           suggestions: { action: "suggestions", domain: "mycompany" },
// //         },
// //       });
// //     }

// //     res.status(405).json({ error: "Method not allowed" });
// //   } catch (error) {
// //     console.error("Domain API error:", error);
// //     res.status(500).json({
// //       error: "Internal server error",
// //       message: error.message,
// //       timestamp: new Date().toISOString(),
// //     });
// //   }
// // };

// module.exports = async (req, res) => {
//   // CORS headers
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   try {
//     // Mock domain service since you don't have the actual service
//     const mockDomainService = {
//       checkDomainAvailability: async (domain) => {
//         // Simple mock logic - randomly determine availability
//         const isAvailable = Math.random() > 0.5;
//         const price = isAvailable ? Math.floor(Math.random() * 50) + 10 : null;

//         return {
//           available: isAvailable,
//           price: price ? `$${price}/year` : null,
//           registrar: isAvailable ? "Namecheap" : null,
//           status: isAvailable ? "available" : "taken",
//           checkedAt: new Date().toISOString(),
//         };
//       },

//       generateDomainSuggestions: (baseName) => {
//         const extensions = [".com", ".net", ".org", ".io", ".co", ".app"];
//         const prefixes = ["get", "my", "the", ""];
//         const suffixes = ["app", "pro", "hub", "lab", ""];

//         const suggestions = [];

//         // Generate combinations
//         for (const prefix of prefixes.slice(0, 2)) {
//           for (const suffix of suffixes.slice(0, 2)) {
//             for (const ext of extensions.slice(0, 3)) {
//               const suggestion = `${prefix}${baseName}${suffix}${ext}`;
//               if (
//                 suggestion !== baseName &&
//                 !suggestions.includes(suggestion)
//               ) {
//                 suggestions.push(suggestion);
//               }
//             }
//           }
//         }

//         return suggestions.slice(0, 10);
//       },

//       bulkCheckDomains: async (domains) => {
//         const results = [];
//         for (const domain of domains) {
//           const availability = await mockDomainService.checkDomainAvailability(
//             domain
//           );
//           results.push({
//             domain,
//             ...availability,
//           });
//         }
//         return results;
//       },
//     };

//     // Parse request body properly
//     let body = {};
//     try {
//       if (req.body) {
//         if (typeof req.body === "string") {
//           body = JSON.parse(req.body);
//         } else {
//           body = req.body;
//         }
//       }
//     } catch (parseError) {
//       console.error("Domain body parse error:", parseError);
//       return res.status(400).json({
//         error: "Invalid JSON in request body",
//         message: parseError.message,
//       });
//     }

//     if (req.method === "POST") {
//       const { domain, domains, action } = body;

//       console.log("Domain API request:", { domain, domains, action });

//       // Handle bulk domain check
//       if (action === "bulk" && domains && Array.isArray(domains)) {
//         console.log(
//           "Processing bulk domain check for:",
//           domains.length,
//           "domains"
//         );
//         const results = await mockDomainService.bulkCheckDomains(domains);
//         return res.json({
//           success: true,
//           results,
//           count: results.length,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       // Handle domain suggestions
//       if (action === "suggestions" && domain) {
//         console.log("Generating domain suggestions for:", domain);
//         const suggestions = mockDomainService.generateDomainSuggestions(domain);
//         const checkedSuggestions = await mockDomainService.bulkCheckDomains(
//           suggestions
//         );
//         return res.json({
//           success: true,
//           suggestions: checkedSuggestions,
//           baseDomain: domain,
//           count: checkedSuggestions.length,
//           timestamp: new Date().toISOString(),
//         });
//       }

//       // Handle single domain check
//       if (!domain) {
//         return res.status(400).json({
//           error: "Domain is required",
//           example: { domain: "example.com" },
//           received: body,
//         });
//       }

//       console.log("Checking single domain:", domain);
//       const availability = await mockDomainService.checkDomainAvailability(
//         domain
//       );
//       return res.json({
//         success: true,
//         domain,
//         ...availability,
//         timestamp: new Date().toISOString(),
//       });
//     }

//     if (req.method === "GET") {
//       return res.json({
//         success: true,
//         message: "Domain API endpoint",
//         methods: ["POST"],
//         actions: ["check", "bulk", "suggestions"],
//         examples: {
//           check: { domain: "example.com" },
//           bulk: { action: "bulk", domains: ["example1.com", "example2.com"] },
//           suggestions: { action: "suggestions", domain: "mycompany" },
//         },
//         timestamp: new Date().toISOString(),
//       });
//     }

//     res.status(405).json({
//       error: "Method not allowed",
//       allowed: ["GET", "POST", "OPTIONS"],
//       received: req.method,
//     });
//   } catch (error) {
//     console.error("Domain API error:", error);
//     res.status(500).json({
//       error: "Internal server error",
//       message: error.message,
//       timestamp: new Date().toISOString(),
//     });
//   }
// };

// Enhanced CORS headers function
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin"
  );
}

module.exports = async (req, res) => {
  // Set CORS headers for all requests
  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Mock domain service with improved functionality
    const mockDomainService = {
      checkDomainAvailability: async (domain) => {
        // More realistic mock logic
        const isAvailable = Math.random() > 0.4;
        const price = isAvailable ? Math.floor(Math.random() * 50) + 10 : null;

        return {
          available: isAvailable,
          price: price ? `$${price}/year` : null,
          registrar: isAvailable ? "Namecheap" : null,
          status: isAvailable ? "available" : "taken",
          checkedAt: new Date().toISOString(),
          domain: domain,
        };
      },

      generateDomainSuggestions: (baseName) => {
        const extensions = [
          ".com",
          ".net",
          ".org",
          ".io",
          ".co",
          ".app",
          ".dev",
          ".tech",
        ];
        const prefixes = ["get", "my", "the", "try", "use", ""];
        const suffixes = ["app", "pro", "hub", "lab", "tech", "online", ""];

        const suggestions = [];

        // Generate more diverse combinations
        for (const prefix of prefixes.slice(0, 3)) {
          for (const suffix of suffixes.slice(0, 3)) {
            for (const ext of extensions.slice(0, 4)) {
              const suggestion = `${prefix}${baseName}${suffix}${ext}`;
              if (
                suggestion !== baseName &&
                !suggestions.includes(suggestion)
              ) {
                suggestions.push(suggestion);
              }
            }
          }
        }

        return suggestions
          .slice(0, 15)
          .filter((s) => s.length > baseName.length);
      },

      bulkCheckDomains: async (domains) => {
        const results = [];
        for (const domain of domains) {
          const availability = await mockDomainService.checkDomainAvailability(
            domain
          );
          results.push({
            domain,
            ...availability,
          });
        }
        return results;
      },
    };

    // Parse request body with better error handling
    let body = {};
    try {
      if (req.body) {
        if (typeof req.body === "string") {
          const trimmed = req.body.trim();
          if (trimmed) {
            body = JSON.parse(trimmed);
          }
        } else {
          body = req.body;
        }
      }
    } catch (parseError) {
      console.error("Domain body parse error:", parseError);
      return res.status(400).json({
        success: false,
        error: "Invalid JSON in request body",
        message: parseError.message,
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === "POST") {
      const { domain, domains, action } = body;

      console.log("Domain API request:", { domain, domains, action });

      // Handle bulk domain check
      if (action === "bulk" && domains && Array.isArray(domains)) {
        console.log(
          "Processing bulk domain check for:",
          domains.length,
          "domains"
        );

        if (domains.length === 0) {
          return res.status(400).json({
            success: false,
            error: "Domains array cannot be empty",
            timestamp: new Date().toISOString(),
          });
        }

        const results = await mockDomainService.bulkCheckDomains(domains);
        return res.status(200).json({
          success: true,
          results,
          count: results.length,
          timestamp: new Date().toISOString(),
        });
      }

      // Handle domain suggestions
      if (action === "suggestions" && domain) {
        console.log("Generating domain suggestions for:", domain);

        if (!domain.trim()) {
          return res.status(400).json({
            success: false,
            error: "Domain name cannot be empty",
            timestamp: new Date().toISOString(),
          });
        }

        const suggestions = mockDomainService.generateDomainSuggestions(
          domain.trim()
        );
        const checkedSuggestions = await mockDomainService.bulkCheckDomains(
          suggestions
        );

        return res.status(200).json({
          success: true,
          suggestions: checkedSuggestions,
          baseDomain: domain,
          count: checkedSuggestions.length,
          timestamp: new Date().toISOString(),
        });
      }

      // Handle single domain check
      if (!domain) {
        return res.status(400).json({
          success: false,
          error: "Domain is required",
          example: { domain: "example.com" },
          received: body,
          timestamp: new Date().toISOString(),
        });
      }

      // Validate domain format
      const domainRegex =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
      if (!domainRegex.test(domain.trim())) {
        return res.status(400).json({
          success: false,
          error: "Invalid domain format",
          domain: domain,
          timestamp: new Date().toISOString(),
        });
      }

      console.log("Checking single domain:", domain);
      const availability = await mockDomainService.checkDomainAvailability(
        domain.trim()
      );

      return res.status(200).json({
        success: true,
        domain,
        ...availability,
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        message: "Domain API endpoint",
        version: "1.0.0",
        methods: ["POST"],
        actions: ["check", "bulk", "suggestions"],
        examples: {
          check: { domain: "example.com" },
          bulk: { action: "bulk", domains: ["example1.com", "example2.com"] },
          suggestions: { action: "suggestions", domain: "mycompany" },
        },
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      allowed: ["GET", "POST", "OPTIONS"],
      received: req.method,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Domain API error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
