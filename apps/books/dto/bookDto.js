function toBookDto(book) {
  return {
    id: book._id,
    title: book.title,
    author: book.author,
    availableCopies: book.availableCopies,
  };
}

module.exports = { toBookDto };
