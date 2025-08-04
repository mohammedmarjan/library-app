const express = require('express');
const router = express.Router();
const { addBook, listBooks } = require('../../domain/bookService');

router.post('/', async (req, res) => {
  try {
    const book = await addBook(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
