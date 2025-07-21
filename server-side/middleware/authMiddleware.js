const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');

const authMiddleware = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token not found.' });

    try {
        const decoded = jwt.verify(token, 'secret123');
        const user = 
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = authMiddleware;