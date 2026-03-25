import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/queries/my-queries (Fetch history for logged-in user)
router.get('/my-queries', verifyToken, async (req, res) => {
    try {
        const db = req.db;
        const queries = await db.all(`
            SELECT * FROM UserQueries 
            WHERE UserID = ? 
            ORDER BY SubmittedDate DESC
        `, [req.user.id]);
        res.status(200).json({ success: true, data: queries });
    } catch (error) {
        console.error('Fetch my-queries error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch your queries' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const db = req.db;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Missing fields' });
        }

        let userId = null;
        // Robust Optional Authentication: Link to user account if logged in
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            try {
                // Use the same secret and logic as our main auth middleware
                const JWT_SECRET = process.env.JWT_SECRET || 'global_inequality_super_secret_key_2026';
                const decoded = jwt.verify(token, JWT_SECRET);
                userId = decoded.id;
                console.log(`Liking query to authenticated UserID: ${userId}`);
            } catch (e) {
                console.warn('Query submitted with invalid token, treating as guest:', e.message);
            }
        }

        await db.run(`
            INSERT INTO UserQueries (UserID, UserName, UserEmail, Subject, Message)
            VALUES (?, ?, ?, ?, ?)
        `, [userId, name, email, subject || 'General Inquiry', message]);

        res.status(201).json({ success: true, message: 'Query submitted successfully' });
    } catch (error) {
        console.error('Submit query error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
