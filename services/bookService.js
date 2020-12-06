import BookModel from '../models/book.js';
import ErrorResponse from '../utility/errorResponse.js';
const { create, findAll, findById, findOne, findMultiple, updateBook } = new BookModel();

class BookService {
  addNewBook = async (data) => {
    const isBookPresent = await findOne({
      title: data.title,
    });

    if (isBookPresent) {
      throw new ErrorResponse('Book already exists', 409);
    }

    return create(data);
  };

  findAllBooks = async () => {
    const result = findAll
  }
}

export default BookService;
