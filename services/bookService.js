import BookModel from '../models/book.js';
import ErrorResponse from '../utility/errorResponse.js';
const { create, findAll, findById, findOne, findMultiple, updateBook, count, findAllPagination } = new BookModel();

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
    try {
      return await findAll();    
    } catch (error) {
      throw new ErrorResponse(error.message, error.statusCode);
    }
  };
  
  findAllBooksPagination = async (pageSize, page) => {
    try {
      return await findAllPagination(pageSize, page);    
    } catch (error) {
      throw new ErrorResponse(error.message, error.statusCode);
    }
  };

  countDocuments = async () => {
    try {
      return await count();
    } catch (error) {
      throw new ErrorResponse(error.message, error.statusCode);
    }
  }
}

export default BookService;
