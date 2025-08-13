const ROLES = {
  USER: 'user',
  LIBRARIAN: 'librarian',
  ADMIN: 'admin',
  SUPER_ADMIN: 'superadmin',
};

// Time in days a user can borrow a book
const BORROW_DAYS = 14;

// Fine (in ₹) charged per day after due date
const FINE_PER_DAY = 1;

// Borrowing statuses
const STATUS = {
  ACTIVE: 'Active',
  RETURNED: 'Returned',
  OVERDUE: 'Overdue',
};

module.exports = {
  BORROW_DAYS,
  FINE_PER_DAY,
  STATUS,
  ROLES,
};
