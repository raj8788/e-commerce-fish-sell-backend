import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;


export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

/**
 * Middleware to authorize admin users
 */
export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
