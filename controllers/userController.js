const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    return res.status(400).json({ success: 'no', message: 'All fields are required' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ success: 'no', message: 'User already exists' });
  }

  // Create new user
  const user = await User.create({ email, password, userName });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      email: user.email
    });
  } else {
    return res.status(400).json({ success: 'no', message: 'Invalid user data' });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email }).select('-password, -_id');

  console.log("user", user);
  
  if (user && (await user.matchPassword(password))) {
    return res.json({
      email: user.email,
      token: generateToken(user._id, user.email, user.userName),
    });
  } else {
    return res.status(401).json({ success: 'no', message: 'Invalid email or password' });
  }
});

module.exports = { registerUser, authUser };
