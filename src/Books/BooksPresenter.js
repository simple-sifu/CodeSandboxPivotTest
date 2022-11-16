import booksRepository from "./BooksRepository.js";

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return {
          bookId: bookPm.bookId,
          name: bookPm.name,
          author: bookPm.author,
          ownerId: bookPm.ownerId,
        };
      });
      callback(booksVm);
    });
  };

  addBook = async (name, author) => {
    const bookProgrammerModel = {
      name: name,
      author: author,
    };
    await booksRepository.addBook(bookProgrammerModel);
  };

  deleteBook = async (bookId) => {
    const bookProgrammerModel = {
      bookId: bookId,
    };
    console.log("BookPresenter.deleteBook =", bookProgrammerModel);
    await booksRepository.deleteBook(bookProgrammerModel);
  };
}
