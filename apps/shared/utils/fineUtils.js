const { FINE_PER_DAY } = require('../constants');

/**
 * Calculate the overdue fine amount between dueDate and return date
 */
function calculateFine(dueDate, returnedAt) {
  const today = returnedAt ? new Date(returnedAt) : new Date();
  const overdueDays = Math.max(0, Math.ceil((today - new Date(dueDate)) / (1000 * 60 * 60 * 24)));
  return overdueDays * FINE_PER_DAY;
}

module.exports = { calculateFine };
