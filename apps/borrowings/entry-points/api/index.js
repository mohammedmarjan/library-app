const express = require('express');
const router = express.Router();
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

router.get('/', async (req, res) => {
  try {
    const results = await getAllBorrowings();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/borrow', async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const result = await borrowBook(userId, bookId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/return/:borrowingId', async (req, res) => {
  const { borrowingId } = req.params;

  try {
    const result = await returnBook(borrowingId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const results = await getBorrowingsByUserId(req.params.userId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:userId/fine', async (req, res) => {
  try {
    const total = await getTotalActiveFineByUser(req.params.userId);
    res.json({ userId: req.params.userId, totalFine: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/book/:bookId', async (req, res) => {
  try {
    const results = await getBorrowingsByBookId(req.params.bookId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const results = await getBorrowingHistory();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/overdue', async (req, res) => {
  try {
    const results = await getOverdueBorrowings();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:userId/history', async (req, res) => {
  try {
    const result = await getUserBorrowingHistory(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/book/:bookId/history', async (req, res) => {
  try {
    const result = await getBookBorrowingHistory(req.params.bookId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
