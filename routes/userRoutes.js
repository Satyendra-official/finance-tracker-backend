// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers); // optional
router.delete('/:id', deleteUser); // optional


module.exports = router;
