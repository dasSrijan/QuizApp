const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token and get user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    //  req.user = decoded.user; // Assuming the user ID is in decoded.user
    req.user = decoded;
    next(); // Move to the next middleware
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;