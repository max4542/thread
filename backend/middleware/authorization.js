const jwt = require('jsonwebtoken');
const ResponseTrait = require('../traits/responseTrait');

const authenticateToken = async (req, res, next) => {
    try {
      // Get token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return ResponseTrait.error(res, 'Authorization token is required', 401);
      }

      // Extract token
      const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"
      if (!token) {
        return ResponseTrait.error(res, 'Token not found in the Authorization header', 401);
      }

      // Verify token
      const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
      const decoded = jwt.verify(token, secretKey);

      // Attach user information to the request object
      req.user = decoded;

      // Call the next middleware or route handler
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return ResponseTrait.error(res, 'Invalid token', 403);
      }
      if (error.name === 'TokenExpiredError') {
        return ResponseTrait.error(res, 'Token expired', 403);
      }
      return ResponseTrait.error(res, 'Authorization failed', 401);
    }
  };

module.exports = authenticateToken;
