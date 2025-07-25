const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

/**
 * Unified authentication middleware for user/employee/team member.
 * @param {Object} options
 * @param {'user'|'employee'} [options.requireType] - Restrict to a specific type.
 * @param {string} [options.attachAs='user'] - Property to attach the user/employee to on req.
 */
function authMiddleware({ requireType, attachAs = 'user' } = {}) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token not found.' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded.id).select('-password');
      let type = 'user';
      if (!user) {
        user = await Employee.findById(decoded.id).select('-password');
        type = user ? 'employee' : null;
      }
      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }
      if (requireType && type !== requireType) {
        return res.status(403).json({ message: `Not a ${requireType} account` });
      }
      req[attachAs] = user;
      req.userType = type;
      next();
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }
      return res.status(401).json({ message: err.message || 'Invalid token' });
    }
  };
}

module.exports = authMiddleware;