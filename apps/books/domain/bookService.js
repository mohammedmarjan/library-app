const Book = require('../data-access/bookModel');
const { toBookDto } = require('../dto/bookDto');

async function addBook(data) {
  const book = await Book.create(data);
  return toBookDto(book);
}

async function listBooks() {
  const books = await Book.find();
  return books.map(toBookDto);
}

module.exports = { addBook, listBooks };
