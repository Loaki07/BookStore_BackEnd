import BookService from '../services/bookService.js';
import ErrorResponse from '../utility/errorResponse.js';
import Validation from '../middleware/validation.js';
import logger from '../config/logger.js';

const { validateBook } = new Validation();
const { addNewBook } = new BookService();

class BookController {
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
      responseData.message = 'Successfully Created Note!';
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
