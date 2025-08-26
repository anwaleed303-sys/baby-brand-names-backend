const axios = require("axios");
const dns = require("dns").promises;

/**
 * Check if a domain is available
 * @param {string} domain - Domain to check (e.g., 'example.com')
 * @returns {Promise<{available: boolean, checked: boolean}>}
 */
async function checkDomainAvailability(domain) {
  try {
    console.log(`🔍 Checking domain availability: ${domain}`);

    // First, try DNS lookup (fast but not 100% accurate for availability)
    const dnsResult = await checkDomainDNS(domain);

    // If DNS fails, domain might be available
    if (!dnsResult.exists) {
      console.log(`📋 Domain ${domain} appears available (no DNS record)`);
      return {
        available: true,
        checked: true,
        method: "dns",
      };
    }

    // If DNS exists, domain is likely taken
    console.log(`📋 Domain ${domain} appears taken (DNS record exists)`);
    return {
      available: false,
      checked: true,
      method: "dns",
    };
  } catch (error) {
    console.error(`❌ Domain check error for ${domain}:`, error.message);

    // Return random availability as fallback
    const randomAvailability = Math.random() > 0.4;
    return {
      available: randomAvailability,
      checked: false,
      method: "random",
      error: error.message,
    };
  }
}

/**
 * Check domain DNS record
 * @param {string} domain - Domain to check
 * @returns {Promise<{exists: boolean, records: any}>}
 */
async function checkDomainDNS(domain) {
  try {
    // Try to resolve A record
    const addresses = await dns.resolve4(domain);
    return {
      exists: true,
      records: addresses,
      type: "A",
    };
  } catch (error) {
    if (error.code === "ENOTFOUND" || error.code === "ENODATA") {
      // Domain doesn't exist or no A record
      try {
        // Try CNAME record
        const cnames = await dns.resolveCname(domain);
        return {
          exists: true,
          records: cnames,
          type: "CNAME",
        };
      } catch (cnameError) {
        // No DNS records found - likely available
        return {
          exists: false,
          records: null,
          error: error.code,
        };
      }
    }

    // Other DNS errors
    throw error;
  }
}

/**
 * Generate domain suggestions for a brand name
 * @param {string} brandName - Base brand name
 * @returns {Array<string>} - Array of domain suggestions
 */
function generateDomainSuggestions(brandName) {
  const cleanName = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
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
  const modifiers = [
    "get",
    "my",
    "the",
    "app",
    "hub",
    "pro",
    "co",
    "go",
    "use",
  ];

  const suggestions = [];

  // Basic domains with different extensions
  extensions.forEach((ext) => {
    suggestions.push(cleanName + ext);
  });

  // With modifiers
  modifiers.forEach((modifier) => {
    suggestions.push(modifier + cleanName + ".com");
    suggestions.push(cleanName + modifier + ".com");
  });

  // With separators
  if (cleanName.length > 6) {
    const mid = Math.floor(cleanName.length / 2);
    const firstPart = cleanName.substring(0, mid);
    const secondPart = cleanName.substring(mid);

    suggestions.push(`${firstPart}-${secondPart}.com`);
    suggestions.push(`${firstPart}.${secondPart}.com`);
  }

  // Return unique suggestions, limited to 15
  return [...new Set(suggestions)].slice(0, 15);
}

/**
 * Bulk check multiple domains
 * @param {Array<string>} domains - Array of domains to check
 * @returns {Promise<Array<{domain: string, available: boolean, checked: boolean}>>}
 */
async function bulkCheckDomains(domains) {
  const results = await Promise.allSettled(
    domains.map(async (domain) => {
      const result = await checkDomainAvailability(domain);
      return {
        domain,
        ...result,
      };
    })
  );

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        domain: domains[index],
        available: null,
        checked: false,
        error: result.reason.message,
      };
    }
  });
}

/**
 * Advanced domain availability check using external API
 * @param {string} domain - Domain to check
 * @returns {Promise<{available: boolean, checked: boolean}>}
 */
async function checkDomainWithAPI(domain) {
  try {
    // You can integrate with services like:
    // - Namecheap API
    // - GoDaddy API
    // - WhoisJSON API
    // - Domain.com API

    const DOMAIN_API_KEY = process.env.DOMAIN_API_KEY;

    if (!DOMAIN_API_KEY) {
      // Fallback to DNS check
      return await checkDomainAvailability(domain);
    }

    // Example with a hypothetical domain API
    const response = await axios.get(`https://api.example.com/domain/check`, {
      params: { domain },
      headers: { Authorization: `Bearer ${DOMAIN_API_KEY}` },
      timeout: 10000,
    });

    return {
      available: response.data.available,
      checked: true,
      method: "api",
      price: response.data.price || null,
    };
  } catch (error) {
    console.error("Domain API check failed:", error);
    // Fallback to DNS check
    return await checkDomainAvailability(domain);
  }
}

module.exports = {
  checkDomainAvailability,
  checkDomainDNS,
  generateDomainSuggestions,
  bulkCheckDomains,
  checkDomainWithAPI,
};
