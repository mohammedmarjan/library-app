// Import core modules
const express = require('express');

// Import wrapper function that applies async error handling to all routes
const wrapRouter = require('../../../../utils/wrapRouter');

const {
  borrowBook,
  returnBook,
  getAllBorrowings,
  getBorrowingsByUserId,
  getBorrowingsByBookId,
  getBorrowingHistory,
  getOverdueBorrowings,
  getTotalActiveFineByUser,
  getBookBorrowingHistory,
  getUserBorrowingHistory,
} = require('../../domain/borrowingService');

// Create a base router
const baseRouter = express.Router();

// Wrap it with asyncHandler automatically for all routes
const router = wrapRouter(baseRouter);

// ---------------------------------------------
// All routes below are now automatically protected
// by asyncHandler. No need for try/catch!
// ---------------------------------------------

// Get all borrowings (active, non-returned)
router.get('/', async (req, res) => {
  const results = await getAllBorrowings();
  res.json(results);
});

// Borrow a book
router.post('/borrow', async (req, res) => {
  const { userId, bookId } = req.body;
  const result = await borrowBook(userId, bookId);
  res.json(result);
});

// Return a borrowed book
router.post('/return/:borrowingId', async (req, res) => {
  const { borrowingId } = req.params;
  const result = await returnBook(borrowingId);
  res.json(result);
});

// List current borrowings by a specific user
router.get('/user/:userId', async (req, res) => {
  const results = await getBorrowingsByUserId(req.params.userId);
  res.json(results);
});

// Get active fine total for a user
router.get('/user/:userId/fine', async (req, res) => {
  const total = await getTotalActiveFineByUser(req.params.userId);
  res.json({ userId: req.params.userId, totalFine: total });
});

// List current borrowings of a specific book
router.get('/book/:bookId', async (req, res) => {
  const results = await getBorrowingsByBookId(req.params.bookId);
  res.json(results);
});

// Get all borrowing history (includes returned)
router.get('/history', async (req, res) => {
  const results = await getBorrowingHistory();
  res.json(results);
});

// List all overdue borrowings
router.get('/overdue', async (req, res) => {
  const results = await getOverdueBorrowings();
  res.json(results);
});

// Get borrowing history of a user (returned + not returned)
router.get('/user/:userId/history', async (req, res) => {
  const result = await getUserBorrowingHistory(req.params.userId);
  res.json(result);
});

// Get borrowing history of a book (returned + not returned)
router.get('/book/:bookId/history', async (req, res) => {
  const result = await getBookBorrowingHistory(req.params.bookId);
  res.json(result);
});

// Export the wrapped router
module.exports = router;
