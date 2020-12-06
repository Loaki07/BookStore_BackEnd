import express from 'express';
const router = express.Router();
import UserController from '../controllers/users.js';
import BookController from '../controllers/books.js';
import { verifyEmail } from '../middleware/emailVerification.js';

const { registerUser, logInUser, emailVerification } = new UserController();
const { addBook, getAllBooks } = new BookController();

// User Routes
router.post('/registration', registerUser);
router.post('/login', verifyEmail, logInUser);
router.get('/book-store/verify-email/:token', emailVerification);

// Book Routes
router.post('/add-book', addBook);
router.get('/get-all-books', getAllBooks);

export default router;
