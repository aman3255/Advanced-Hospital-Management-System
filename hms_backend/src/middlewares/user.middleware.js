const jwt = require('jsonwebtoken');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'DEV';
const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`];

const userLoginOrNot = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header missing or malformed (use Bearer <token>)'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token missing after Bearer'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // Attach userId and email to req.user
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Invalid or expired token: ${error.message}`
        });
    }
};

module.exports = { userLoginOrNot };