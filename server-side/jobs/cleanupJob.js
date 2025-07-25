// jobs/cleanupJob.js
// const TeamMember = require('../models/TeamMember');
const Employee = require("../models/Employee");

// This function deletes employees who never set their password in time
async function cleanupExpiredEmployees() {
  const now = new Date();
  try {
    const result = await Employee.deleteMany({
      mustChangePassword: true,
      passwordExpiresAt: { $lt: now },
    });
    if (result.deletedCount > 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `[CleanupJob] Deleted ${
            result.deletedCount
          } expired employee(s) at ${now.toISOString()}`
        );
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("[CleanupJob] Error deleting expired employees:", err);
    }
  }
}

// Run every minute
setInterval(cleanupExpiredEmployees, 60 * 1000);

module.exports = cleanupExpiredEmployees;
