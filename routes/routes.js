import express from 'express';
const router = express.Router();
import UserController from '../controllers/users.js';
import { verifyEmail } from '../middleware/emailVerification.js';

const { registerUser, logInUser, emailVerification } = new UserController();

router.post('/registration', registerUser);
router.post('/login', verifyEmail, logInUser);
router.get('/book-store/verify-email/:token', emailVerification);

export default router;
