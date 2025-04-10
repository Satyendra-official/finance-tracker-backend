// routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers); // optional
router.delete('/:id', deleteUser); // optional

export default router;
