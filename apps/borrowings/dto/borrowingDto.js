const { calculateFine } = require('../../shared/utils/fineUtils');

function toBorrowingDto(borrowing) {
  return {
    id: borrowing._id?.toString(),
    userId: borrowing.userId,
    bookId: borrowing.bookId,
    borrowedAt: borrowing.borrowedAt,
    dueDate: borrowing.dueDate,
    returnedAt: borrowing.returnedAt || null,
    fineAmount: calculateFine(borrowing.dueDate, borrowing.returnedAt),
  };
}

module.exports = { toBorrowingDto };
