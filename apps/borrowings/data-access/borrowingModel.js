const mongoose = require('mongoose');

const BorrowingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrowedAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returnedAt: { type: Date, default: null },
});

const Borrowing = mongoose.model('Borrowing', BorrowingSchema);

module.exports = Borrowing;
