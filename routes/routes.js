import express from 'express';
const router = express.Router();
import UserController from '../controllers/users.js';
import BookController from '../controllers/books.js';
import { verifyEmail } from '../middleware/emailVerification.js';

const { registerUser, logInUser, emailVerification } = new UserController();
const { addBook } = new BookController();

router.post('/registration', registerUser);
router.post('/login', verifyEmail, logInUser);
router.get('/book-store/verify-email/:token', emailVerification);

router.post('/add-book', addBook);

export default router;
