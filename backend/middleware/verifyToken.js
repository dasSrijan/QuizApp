const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  // Extract the token (after 'Bearer ')
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assuming decoded token contains the user's ID
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = verifyToken;