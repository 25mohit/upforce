const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find the user associated with the token
      console.log(decoded);
      
      req.user = await User.findById(decoded.id).select('-password');
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      return res.status(401).json({ m: 'Not authorized, token failed' }); // Send JSON error response
    }
  }

  // If no token is found, send a JSON error response
  if (!token) {
    return res.status(401).json({ m: 'Not authorized, no token' });
  }
});

module.exports = { protect };
