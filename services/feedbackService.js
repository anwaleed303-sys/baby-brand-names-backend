// In-memory storage for feedback (replace with database in production)
const feedbackData = {
  submissions: [],
  stats: {
    totalSubmissions: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    feedbackTypes: { bug: 0, feature: 0, improvement: 0, general: 0 },
  },
};

/**
 * Submit feedback
 * @param {Object} feedback - Feedback data
 */
async function submitFeedback(feedback) {
  try {
    console.log("📝 Submitting feedback:", {
      rating: feedback.rating,
      type: feedback.type,
    });

    // Create feedback record
    const record = {
      id: Date.now() + Math.random(),
      rating: feedback.rating,
      message: feedback.message || "",
      type: feedback.type || "general",
      name: feedback.name || "Anonymous",
      email: feedback.email || null,
      metadata: {
        clientIP: hashIP(feedback.clientIP),
        userAgent: feedback.userAgent,
        timestamp: feedback.timestamp || new Date().toISOString(),
        processed: false,
      },
    };

    // Store feedback
    feedbackData.submissions.push(record);

    // Update statistics
    updateFeedbackStats(record);

    // Keep only last 1000 feedback submissions
    if (feedbackData.submissions.length > 1000) {
      feedbackData.submissions = feedbackData.submissions.slice(-1000);
    }

    console.log("✅ Feedback submitted successfully");

    // In production, you might want to:
    // - Send email notification to admin
    // - Store in database
    // - Trigger alerts for low ratings
    await processFeedback(record);

    return {
      success: true,
      id: record.id,
      message: "Feedback submitted successfully",
    };
  } catch (error) {
    console.error("❌ Feedback submission error:", error);
    throw new Error(`Failed to submit feedback: ${error.message}`);
  }
}

/**
 * Update feedback statistics
 * @param {Object} record - Feedback record
 */
function updateFeedbackStats(record) {
  const stats = feedbackData.stats;

  // Update total submissions
  stats.totalSubmissions++;

  // Update rating distribution
  stats.ratingDistribution[record.rating]++;

  // Calculate new average rating
  const totalRating = Object.entries(stats.ratingDistribution).reduce(
    (sum, [rating, count]) => sum + parseInt(rating) * count,
    0
  );
  stats.averageRating = (totalRating / stats.totalSubmissions).toFixed(2);

  // Update feedback type distribution
  stats.feedbackTypes[record.type]++;

  console.log("📊 Feedback stats updated:", {
    total: stats.totalSubmissions,
    average: stats.averageRating,
  });
}

/**
 * Process feedback (send notifications, etc.)
 * @param {Object} record - Feedback record
 */
async function processFeedback(record) {
  try {
    // Mark as processed
    record.metadata.processed = true;

    // Send admin notification for low ratings
    if (record.rating <= 2) {
      console.log("🚨 Low rating alert:", {
        rating: record.rating,
        message: record.message.substring(0, 100),
      });

      // In production, send email/slack notification
      await sendLowRatingAlert(record);
    }

    // Send admin notification for bug reports
    if (record.type === "bug") {
      console.log("🐛 Bug report received:", {
        message: record.message.substring(0, 100),
      });

      // In production, create issue in bug tracking system
      await createBugReport(record);
    }
  } catch (error) {
    console.error("Error processing feedback:", error);
  }
}

/**
 * Send low rating alert (placeholder)
 * @param {Object} record - Feedback record
 */
async function sendLowRatingAlert(record) {
  // In production, implement email/Slack notification
  console.log("📧 Would send low rating alert to admin");

  // Example implementation:
  // await emailService.send({
  //   to: 'admin@yourapp.com',
  //   subject: `Low Rating Alert: ${record.rating}/5`,
  //   body: `User gave ${record.rating}/5 rating with message: "${record.message}"`
  // });
}

/**
 * Create bug report (placeholder)
 * @param {Object} record - Feedback record
 */
async function createBugReport(record) {
  // In production, create issue in GitHub/Jira/etc.
  console.log("🐛 Would create bug report in tracking system");

  // Example implementation:
  // await bugTracker.createIssue({
  //   title: `Bug Report from User Feedback`,
  //   description: record.message,
  //   labels: ['bug', 'user-feedback'],
  //   priority: record.rating <= 2 ? 'high' : 'medium'
  // });
}

/**
 * Get feedback statistics
 * @returns {Object} - Feedback statistics
 */
async function getFeedbackStats() {
  try {
    const stats = { ...feedbackData.stats };

    // Convert Maps to Objects for JSON serialization
    const recentFeedback = feedbackData.submissions
      .slice(-10)
      .map((record) => ({
        id: record.id,
        rating: record.rating,
        type: record.type,
        timestamp: record.metadata.timestamp,
        hasMessage: !!record.message,
      }));

    return {
      ...stats,
      recentFeedback,
      totalFeedback: feedbackData.submissions.length,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting feedback stats:", error);
    throw error;
  }
}

/**
 * Get all feedback (admin function)
 * @param {Object} options - Query options
 * @returns {Array} - Feedback records
 */
async function getAllFeedback(options = {}) {
  try {
    const {
      limit = 50,
      offset = 0,
      rating,
      type,
      startDate,
      endDate,
    } = options;

    let filtered = [...feedbackData.submissions];

    // Apply filters
    if (rating) {
      filtered = filtered.filter((f) => f.rating === parseInt(rating));
    }

    if (type) {
      filtered = filtered.filter((f) => f.type === type);
    }

    if (startDate) {
      filtered = filtered.filter((f) => f.metadata.timestamp >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((f) => f.metadata.timestamp <= endDate);
    }

    // Sort by timestamp (newest first)
    filtered.sort(
      (a, b) => new Date(b.metadata.timestamp) - new Date(a.metadata.timestamp)
    );

    // Apply pagination
    const paginated = filtered.slice(offset, offset + limit);

    return {
      feedback: paginated,
      total: filtered.length,
      hasMore: filtered.length > offset + limit,
      filters: { rating, type, startDate, endDate },
      pagination: { limit, offset },
    };
  } catch (error) {
    console.error("Error getting feedback:", error);
    throw error;
  }
}

/**
 * Hash IP address for privacy
 * @param {string} ip - IP address
 * @returns {string} - Hashed IP
 */
function hashIP(ip) {
  if (!ip) return "unknown";

  // Simple hash for privacy
  return ip
    .split(".")
    .map((part) => parseInt(part).toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Clean up old feedback data
 */
function cleanupOldFeedback() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const cutoffDate = sixMonthsAgo.toISOString();

  const originalLength = feedbackData.submissions.length;
  feedbackData.submissions = feedbackData.submissions.filter(
    (record) => record.metadata.timestamp >= cutoffDate
  );

  const removedCount = originalLength - feedbackData.submissions.length;
  if (removedCount > 0) {
    console.log(`🧹 Cleaned up ${removedCount} old feedback records`);
  }
}

// Auto cleanup every 24 hours
setInterval(cleanupOldFeedback, 24 * 60 * 60 * 1000);

module.exports = {
  submitFeedback,
  getFeedbackStats,
  getAllFeedback,
};
