import express from 'express';
const router = express.Router();
import UserController from '../controllers/users.js';

const { registerUser } = new UserController();

router.post('/registration', registerUser);

export default router;
