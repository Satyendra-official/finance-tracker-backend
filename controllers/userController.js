// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Hide password in response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Hide password in response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (for testing/admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};