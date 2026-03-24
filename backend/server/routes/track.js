import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/track/session/start
router.post('/session/start', verifyToken, async (req, res) => {
    try {
        const { deviceType, ipAddress, location } = req.body;
        const userId = req.user.id;
        const db = req.db;

        const result = await db.run(`
            INSERT INTO UserSessions (UserID, DeviceType, IP_Address, Location)
            VALUES (?, ?, ?, ?)
        `, [userId, deviceType, ipAddress, location]);

        // Increment total sessions for user
        await db.run(`UPDATE Users SET TotalSessions = TotalSessions + 1 WHERE UserID = ?`, [userId]);

        res.status(201).json({ success: true, sessionId: result.lastID });
    } catch (error) {
        console.error('Session start tracking error:', error);
        res.status(500).json({ success: false, message: 'Failed to start tracking session' });
    }
});

// POST /api/track/session/end
router.post('/session/end', verifyToken, async (req, res) => {
    try {
        const { sessionId, pagesVisited } = req.body;
        const db = req.db;

        // Finalize session
        const sessionInfo = await db.get('SELECT LoginTime FROM UserSessions WHERE SessionID = ?', [sessionId]);
        if (!sessionInfo) return res.status(404).json({ success: false });

        const loginTimeMs = new Date(sessionInfo.LoginTime).getTime();
        const logoutTimeMs = Date.now();
        const durationSeconds = Math.floor((logoutTimeMs - loginTimeMs) / 1000);

        await db.run(`
            UPDATE UserSessions 
            SET LogoutTime = CURRENT_TIMESTAMP, SessionDuration = ?, PagesVisited = ?
            WHERE SessionID = ?
        `, [durationSeconds, pagesVisited, sessionId]);

        // Update User's cumulative time
        await db.run(`
            UPDATE Users 
            SET TotalTimeSpentOnWebsite = TotalTimeSpentOnWebsite + ?, LastActiveTimestamp = CURRENT_TIMESTAMP
            WHERE UserID = ?
        `, [durationSeconds, req.user.id]);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Session end tracking error:', error);
        res.status(500).json({ success: false });
    }
});

// POST /api/track/page
router.post('/page', verifyToken, async (req, res) => {
    try {
        const { pageName, pageUrl, durationSpent, sessionId } = req.body;
        const db = req.db;

        await db.run(`
            INSERT INTO PageActivity (UserID, PageName, PageURL, DurationSpent)
            VALUES (?, ?, ?, ?)
        `, [req.user.id, pageName, pageUrl, durationSpent]);

        // If a specific sessionId is provided, update that session. 
        // Otherwise fallback to the latest one (multi-login support).
        let sessionToUpdate;
        if (sessionId) {
            sessionToUpdate = { SessionID: sessionId };
        } else {
            sessionToUpdate = await db.get(`SELECT SessionID FROM UserSessions WHERE UserID = ? ORDER BY LoginTime DESC LIMIT 1`, [req.user.id]);
        }
        
        if (sessionToUpdate) {
            await db.run(`
                UPDATE UserSessions 
                SET SessionDuration = COALESCE(SessionDuration, 0) + ?, 
                    PagesVisited = COALESCE(PagesVisited, 0) + 1,
                    LogoutTime = CURRENT_TIMESTAMP
                WHERE SessionID = ?
            `, [durationSpent, sessionToUpdate.SessionID]);
        }

        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Page tracking error:', error);
        res.status(500).json({ success: false });
    }
});

export default router;
