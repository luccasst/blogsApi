const jwt = require('jsonwebtoken');
require('dotenv').config();

function getUser(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    
    try {
        jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
        res.status(401).json({ message: 'Expired or invalid token' });
    }
    return next();
}

module.exports = getUser;