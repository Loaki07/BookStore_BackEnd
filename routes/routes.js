import express from 'express';
const router = express.Router();
import UserController from '../controllers/users.js';

const { registerUser, logInUser } = new UserController();

router.post('/registration', registerUser);
router.post('/login', logInUser);

export default router;
