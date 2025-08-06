const express = require('express');
const wrapRouter = require('../../../../utils/wrapRouter');
const { addBook, listBooks } = require('../../domain/bookService');

const baseRouter = express.Router();
const router = wrapRouter(baseRouter); 

router.post('/', async (req, res) => {
  const book = await addBook(req.body);
  res.json(book);
});

router.get('/', async (req, res) => {
  const books = await listBooks();
  res.json(books);
});

module.exports = router;
