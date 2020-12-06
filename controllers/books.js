import BookService from '../services/bookService.js';
import ErrorResponse from '../utility/errorResponse.js';
import Validation from '../middleware/validation.js';
import logger from '../config/logger.js';

const { validateBook } = new Validation();
const { addNewBook, findAllBooks } = new BookService();

class BookController {
  /**
   * @description Validates request body and creates books
   * @route POST /add-book
   * @param {Object} req
   * @param {Object} res
   */
  addBook = async (req, res) => {
    const responseData = {};
    try {
      const bookObject = {
        author: req.body.author,
        title: req.body.title,
        image: req.body.image,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
      };
      const { error } = await validateBook(bookObject);
      if (error) {
        throw new Error(error);
      }
      const result = await addNewBook(bookObject);
      responseData.success = true;
      responseData.message = 'Successfully Added Book!';
      responseData.data = result;
      logger.info(responseData.message);
      res.status(200).send(responseData);
    } catch (error) {
      responseData.success = false;
      responseData.message = error.message;
      logger.error(error.message);
      res.status(error.statusCode || 500).send(responseData);
    }
  };

  /**
   * @description Gets all the books from the db
   * @route GET /get-all-books
   * @param {Object} req
   * @param {Object} res
   */
  getAllBooks = async (req, res) => {
    const responseData = {};
    try {
      const result = await findAllBooks();
      if (!result || result === null || result.length === 0) {
        throw new ErrorResponse('There are no books in the store', '400');
      }
      responseData.success = true;
      responseData.message = 'Displaying all Books';
      responseData.data = result;
      logger.info(responseData.message);
      res.status(200).send(responseData);
    } catch (error) {
      responseData.success = false;
      responseData.message = error.message;
      logger.error(error.message);
      res.status(error.statusCode || 500).send(responseData);
    }
  };
}

export default BookController;
