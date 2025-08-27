// In-memory storage for analytics (replace with database in production)
const analyticsData = {
  generations: [],
  dailyStats: new Map(),
  popularPreferences: new Map(),
};

/**
 * Track name generation event
 * @param {Object} eventData - Analytics event data
 */
// fffff;

async function trackNameGeneration(eventData) {
  try {
    const { type, formData, clientIP, userAgent, timestamp } = eventData;

    // Create analytics record
    const record = {
      id: Date.now() + Math.random(),
      type,
      preferences: {
        gender: formData.gender,
        religion: formData.religion,
        industry: formData.industry,
        style: formData.style,
        keywords: formData.keywords || [],
        length: formData.length,
      },
      metadata: {
        clientIP: hashIP(clientIP), // Hash IP for privacy
        userAgent,
        timestamp,
        date: new Date(timestamp).toISOString().split("T")[0],
      },
    };

    // Store the record
    analyticsData.generations.push(record);

    // Update daily stats
    const date = record.metadata.date;
    const currentDayStats = analyticsData.dailyStats.get(date) || {
      date,
      totalGenerations: 0,
      babyNames: 0,
      brandNames: 0,
      topReligions: new Map(),
      topIndustries: new Map(),
    };

    currentDayStats.totalGenerations++;
    if (type === "baby") {
      currentDayStats.babyNames++;
      if (formData.religion) {
        const religionCount =
          currentDayStats.topReligions.get(formData.religion) || 0;
        currentDayStats.topReligions.set(formData.religion, religionCount + 1);
      }
    } else if (type === "brand") {
      currentDayStats.brandNames++;
      if (formData.industry) {
        const industryCount =
          currentDayStats.topIndustries.get(formData.industry) || 0;
        currentDayStats.topIndustries.set(formData.industry, industryCount + 1);
      }
    }

    analyticsData.dailyStats.set(date, currentDayStats);

    // Update popular preferences
    updatePopularPreferences(type, formData);

    // Keep only last 30 days of data
    cleanupOldData();

    console.log(`📊 Analytics tracked: ${type} name generation`);
  } catch (error) {
    console.error("Analytics tracking error:", error);
    // Don't throw error - analytics shouldn't break the main flow
  }
}

/**
 * Update popular preferences tracking
 * @param {string} type - Type of generation
 * @param {Object} formData - Form data from request
 */
function updatePopularPreferences(type, formData) {
  const key = `${type}_preferences`;
  const current = analyticsData.popularPreferences.get(key) || {};

  // Track each preference
  Object.entries(formData).forEach(([field, value]) => {
    if (value && value !== "") {
      if (!current[field]) current[field] = new Map();

      if (Array.isArray(value)) {
        // Handle arrays (keywords)
        value.forEach((item) => {
          const count = current[field].get(item) || 0;
          current[field].set(item, count + 1);
        });
      } else {
        // Handle single values
        const count = current[field].get(value) || 0;
        current[field].set(value, count + 1);
      }
    }
  });

  analyticsData.popularPreferences.set(key, current);
}

/**
 * Get analytics summary
 * @returns {Object} - Analytics summary
 */
async function getAnalytics() {
  try {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const yesterday = new Date(now.setDate(now.getDate() - 1))
      .toISOString()
      .split("T")[0];

    // Calculate summary stats
    const totalGenerations = analyticsData.generations.length;
    const todayStats = analyticsData.dailyStats.get(today) || {
      totalGenerations: 0,
      babyNames: 0,
      brandNames: 0,
    };
    const yesterdayStats = analyticsData.dailyStats.get(yesterday) || {
      totalGenerations: 0,
      babyNames: 0,
      brandNames: 0,
    };

    // Get top preferences
    const babyPrefs =
      analyticsData.popularPreferences.get("baby_preferences") || {};
    const brandPrefs =
      analyticsData.popularPreferences.get("brand_preferences") || {};

    // Convert Maps to Objects for JSON serialization
    const topReligions = getTopEntries(babyPrefs.religion, 5);
    const topIndustries = getTopEntries(brandPrefs.industry, 5);
    const topBrandStyles = getTopEntries(brandPrefs.style, 5);

    // Recent activity (last 7 days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayStats = analyticsData.dailyStats.get(dateStr) || {
        totalGenerations: 0,
        babyNames: 0,
        brandNames: 0,
      };

      last7Days.push({
        date: dateStr,
        totalGenerations: dayStats.totalGenerations,
        babyNames: dayStats.babyNames,
        brandNames: dayStats.brandNames,
      });
    }

    return {
      summary: {
        totalGenerations,
        totalBabyNames: analyticsData.generations.filter(
          (g) => g.type === "baby"
        ).length,
        totalBrandNames: analyticsData.generations.filter(
          (g) => g.type === "brand"
        ).length,
        today: todayStats.totalGenerations,
        yesterday: yesterdayStats.totalGenerations,
        growth: todayStats.totalGenerations - yesterdayStats.totalGenerations,
      },
      trends: {
        topReligions,
        topIndustries,
        topBrandStyles,
        dailyActivity: last7Days,
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting analytics:", error);
    return {
      summary: {
        totalGenerations: 0,
        totalBabyNames: 0,
        totalBrandNames: 0,
        today: 0,
        yesterday: 0,
        growth: 0,
      },
      trends: {
        topReligions: [],
        topIndustries: [],
        topBrandStyles: [],
        dailyActivity: [],
      },
      lastUpdated: new Date().toISOString(),
      error: error.message,
    };
  }
}

/**
 * Get top entries from a Map
 * @param {Map} map - Map to get entries from
 * @param {number} limit - Number of top entries to return
 * @returns {Array} - Array of {key, count} objects
 */
function getTopEntries(map, limit = 5) {
  if (!map || !(map instanceof Map)) return [];

  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
}

/**
 * Hash IP address for privacy
 * @param {string} ip - IP address to hash
 * @returns {string} - Hashed IP
 */
function hashIP(ip) {
  if (!ip) return "unknown";

  // Simple hash for privacy (use crypto.createHash('sha256') for production)
  return ip
    .split(".")
    .map((part) => parseInt(part).toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Clean up old analytics data (keep last 30 days)
 */
function cleanupOldData() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const cutoffDate = thirtyDaysAgo.toISOString().split("T")[0];

  // Clean up daily stats
  for (const [date] of analyticsData.dailyStats) {
    if (date < cutoffDate) {
      analyticsData.dailyStats.delete(date);
    }
  }

  // Clean up generation records
  analyticsData.generations = analyticsData.generations.filter(
    (record) => record.metadata.date >= cutoffDate
  );

  console.log("🧹 Analytics data cleanup completed");
}

/**
 * Get analytics for specific date range
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Object} - Analytics for date range
 */
async function getAnalyticsForDateRange(startDate, endDate) {
  try {
    const filteredGenerations = analyticsData.generations.filter(
      (record) =>
        record.metadata.date >= startDate && record.metadata.date <= endDate
    );

    const summary = {
      totalGenerations: filteredGenerations.length,
      babyNames: filteredGenerations.filter((g) => g.type === "baby").length,
      brandNames: filteredGenerations.filter((g) => g.type === "brand").length,
    };

    return {
      summary,
      generations: filteredGenerations,
      dateRange: { startDate, endDate },
    };
  } catch (error) {
    console.error("Error getting analytics for date range:", error);
    throw error;
  }
}

/**
 * Reset analytics data (admin function)
 */
function resetAnalytics() {
  analyticsData.generations = [];
  analyticsData.dailyStats.clear();
  analyticsData.popularPreferences.clear();
  console.log("🔄 Analytics data reset");
}

module.exports = {
  trackNameGeneration,
  getAnalytics,
  getAnalyticsForDateRange,
  resetAnalytics,
};
