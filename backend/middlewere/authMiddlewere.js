const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token provided or malformed authorization header');
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(' ')[1];

    // Basic token format validation: JWTs have 3 parts separated by dots
    if (token.split('.').length !== 3) {
        console.log('Malformed token detected');
        return res.status(401).json({ message: "Not authorized, malformed token" });
    }

    try {
        console.log('Token received:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        req.user = await User.findById(decoded.id).select('-password');
        console.log('User fetched from DB:', req.user);

        if (!req.user) {
            console.log('No user found for this token');
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Not authorized, token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Not authorized, malformed token" });
        } else {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
};
