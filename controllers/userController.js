const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: 'no', message: 'All fields are required' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ success: 'no', message: 'User already exists' });
  }

  // Create new user
  const user = await User.create({ email, password });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ success: 'no', message: 'Invalid user data' });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ success: 'no', message: 'Invalid email or password' });
  }
});

module.exports = { registerUser, authUser };
