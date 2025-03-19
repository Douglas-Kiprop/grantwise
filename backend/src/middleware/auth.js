const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug line

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error); // Debug line
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { protect };