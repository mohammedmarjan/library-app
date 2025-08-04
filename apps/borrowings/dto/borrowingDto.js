function calculateFine(dueDate, returnedAt) {
  const today = returnedAt ? new Date(returnedAt) : new Date();
  const overdueDays = Math.max(0, Math.ceil((today - new Date(dueDate)) / (1000 * 60 * 60 * 24)));
  return overdueDays;
}

function toBorrowingDto(borrowing) {
  return {
    id: borrowing._id,
    userId: borrowing.userId,
    bookId: borrowing.bookId,
    borrowedAt: borrowing.borrowedAt,
    dueDate: borrowing.dueDate,
    returnedAt: borrowing.returnedAt,
    fineAmount: calculateFine(borrowing.dueDate, borrowing.returnedAt),
  };
}

module.exports = { toBorrowingDto };
