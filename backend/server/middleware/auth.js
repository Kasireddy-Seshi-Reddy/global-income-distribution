import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'global_inequality_super_secret_key_2026';
const ADMIN_EMAIL = 'infosysteam@gmail.com';

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Invalid or expired token' });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ success: false, message: 'Authentication required' });
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.email === ADMIN_EMAIL) {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Admin access required' });
        }
    });
};

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.UserID, email: user.Email, role: user.Role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};
