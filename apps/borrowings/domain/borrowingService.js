const Borrowing = require('../data-access/borrowingModel');
const { toBorrowingDto } = require('../dto/borrowingDto');
const Book = require('../../books/data-access/bookModel');
const { BORROW_DAYS } = require('../../shared/constants');

async function borrowBook(userId, bookId) {
  const book = await Book.findById(bookId);

  if (!book || book.availableCopies < 1) {
    throw new Error('Book not available');
  }

  const borrowedAt = new Date();
  const dueDate = new Date(borrowedAt);
  dueDate.setDate(dueDate.getDate() + BORROW_DAYS); // 2 weeks later

  const borrowing = await Borrowing.create({
    userId,
    bookId,
    borrowedAt,
    dueDate,
  });

  // Decrease availableCopies
  book.availableCopies -= 1;
  await book.save();

  return toBorrowingDto(borrowing);
}

async function returnBook(borrowingId) {
  const borrowing = await Borrowing.findById(borrowingId);
  if (!borrowing || borrowing.returnedAt) {
    throw new Error('Borrowing not found or already returned');
  }

  borrowing.returnedAt = new Date();
  await borrowing.save();

  const Book = require('../../books/data-access/bookModel');
  const book = await Book.findById(borrowing.bookId);
  book.availableCopies += 1;
  await book.save();

  return toBorrowingDto(borrowing);
}

async function getAllBorrowings() {
  const all = await Borrowing.find({ returnedAt: null });
  return all.map(toBorrowingDto);
}

async function getBorrowingsByUserId(userId) {
  const records = await Borrowing.find({ userId, returnedAt: null }).populate('bookId');
  return records.map((b) => ({
    ...toBorrowingDto(b),
    book: b.bookId, // populated book object
  }));
}

async function getBorrowingsByBookId(bookId) {
  const records = await Borrowing.find({ bookId, returnedAt: null }).populate('userId');
  return records.map((b) => ({
    ...toBorrowingDto(b),
    user: b.userId, // populated user object
  }));
}

async function getBorrowingHistory() {
  const all = await Borrowing.find().populate('userId bookId');
  return all.map(toBorrowingDto);
}

async function getOverdueBorrowings() {
  const now = new Date();
  const overdue = await Borrowing.find({
    dueDate: { $lt: now },
    returnedAt: null,
  }).populate('userId bookId');

  return overdue.map(toBorrowingDto);
}

async function getTotalActiveFineByUser(userId) {
  const borrowings = await Borrowing.find({
    userId,
    returnedAt: null,
  });

  const totalFine = borrowings.reduce((sum, b) => {
    const fine = toBorrowingDto(b).fineAmount;
    return sum + fine;
  }, 0);

  return totalFine;
}

async function getUserBorrowingHistory(userId) {
  const records = await Borrowing.find({ userId }).populate('bookId');
  return records.map((b) => ({
    ...toBorrowingDto(b),
    book: b.bookId,
  }));
}

async function getBookBorrowingHistory(bookId) {
  const records = await Borrowing.find({ bookId }).populate('userId');
  return records.map((b) => ({
    ...toBorrowingDto(b),
    user: b.userId,
  }));
}

module.exports = {
  borrowBook,
  returnBook,
  getAllBorrowings,
  getBorrowingsByUserId,
  getBorrowingsByBookId,
  getBorrowingHistory,
  getOverdueBorrowings,
  getTotalActiveFineByUser,
  getUserBorrowingHistory,
  getBookBorrowingHistory,
};
