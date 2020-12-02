import BookModel from '../models/book.js';
import ErrorResponse from '../utility/errorResponse.js';
const { create, findAll, findById, findOne, findMultiple, updateBook } = new BookModel();

class BookService {
  addNewBook = (data) => {
    findOne({
      title: data.title,
    })
      .then((isBookPresent) => {
        if (isBookPresent) {
          throw new ErrorResponse('Book already present', 409);
        }
      })
      .catch((error) => error);

    return create(data);
  };
}

export default BookService;
