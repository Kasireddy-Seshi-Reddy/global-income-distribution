import express from 'express';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyAdmin); // All routes in this file require Admin access

// GET /api/admin/stats (Dashboard Overview KPIs)
router.get('/stats', async (req, res) => {
    try {
        const db = req.db;

        const totalUsers = await db.get('SELECT COUNT(*) as count FROM Users');
        const totalSessions = await db.get('SELECT COUNT(*) as count FROM UserSessions');
        const avgSessionTime = await db.get('SELECT AVG(SessionDuration) as avgTime FROM UserSessions WHERE SessionDuration IS NOT NULL');
        const active24hrs = await db.get(`SELECT COUNT(*) as count FROM Users WHERE LastActiveTimestamp >= datetime('now', '-15 minutes')`);

        const mostVisitedRow = await db.get(`SELECT PageName, COUNT(*) as visits FROM PageActivity GROUP BY PageName ORDER BY visits DESC LIMIT 1`);
        const totalQueries = await db.get('SELECT COUNT(*) as count FROM UserQueries');

        res.status(200).json({
            success: true,
            data: {
                totalUsers: totalUsers.count,
                activeUsers: active24hrs.count,
                totalSessions: totalSessions.count,
                avgSessionTime: avgSessionTime.avgTime ? Math.round(avgSessionTime.avgTime) : 0,
                mostVisitedPage: mostVisitedRow ? mostVisitedRow.PageName : 'N/A',
                totalQueries: totalQueries.count
            }
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch admin statistics' });
    }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
    try {
        const db = req.db;
        const users = await db.all(`
            SELECT u.UserID, u.FullName, u.Email, u.Role, u.SignupDate, u.LastLoginTime, u.AccountStatus, 
            (SELECT COALESCE(SUM(DurationSpent), 0) FROM PageActivity WHERE UserID = u.UserID) as TotalTimeSpentOnWebsite, 
            u.TotalSessions 
            FROM Users u
        `);
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

// POST /api/admin/users/:id/moderate
router.post('/users/:id/moderate', async (req, res) => {
    try {
        const { id } = req.params;
        const { action, reason, duration, notes } = req.body;
        const db = req.db;

        let newStatus = 'Active';
        if (action === 'Ban') newStatus = 'Banned';
        if (action === 'Suspend') newStatus = 'Suspended';

        await db.run(`
            INSERT INTO UserModerationLogs (UserID, ActionTaken, Reason, AdminEmail, Duration, Notes)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [id, action, reason, req.user.email, duration, notes]);

        await db.run(`UPDATE Users SET AccountStatus = ? WHERE UserID = ?`, [newStatus, id]);

        res.status(200).json({ success: true, message: `${action} successful against user` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to moderate user' });
    }
});

// POST /api/admin/users/:id/reset-password
router.post('/users/:id/reset-password', async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        const db = req.db;
        
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.default.hash(newPassword, 10);

        await db.run('UPDATE Users SET Password = ? WHERE UserID = ?', [hashedPassword, id]);

        await db.run(`
            INSERT INTO UserModerationLogs (UserID, ActionTaken, Reason, AdminEmail, Notes)
            VALUES (?, 'Password Reset', 'Admin manually reset password', ?, 'User requested via Forgot Password flow')
        `, [id, req.user.email]);

        res.status(200).json({ success: true, message: 'User password updated successfully.' });
    } catch (error) {
        console.error('Admin password reset error:', error);
        res.status(500).json({ success: false, message: 'Failed to reset password.' });
    }
});

// GET /api/admin/queries
router.get('/queries', async (req, res) => {
    try {
        const queries = await req.db.all('SELECT * FROM UserQueries ORDER BY SubmittedDate DESC');
        res.status(200).json({ success: true, data: queries });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch queries' });
    }
});

// POST /api/admin/queries/:id/resolve
router.post('/queries/:id/resolve', async (req, res) => {
    try {
        const { id } = req.params;
        const { adminResponse } = req.body;
        await req.db.run(`
            UPDATE UserQueries 
            SET ResponseStatus = 'Responded', AdminResponse = ?, ResponseDate = CURRENT_TIMESTAMP
            WHERE QueryID = ?
        `, [adminResponse, id]);
        res.status(200).json({ success: true, message: 'Query marked as resolved' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to resolve query' });
    }
});

// GET /api/admin/sessions
router.get('/sessions', async (req, res) => {
    try {
        const db = req.db;
        const sessions = await db.all(`
            SELECT s.SessionID, s.UserID, u.FullName, u.Email, s.LoginTime, s.LogoutTime, s.SessionDuration, s.PagesVisited, s.DeviceType, s.IP_Address 
            FROM UserSessions s
            LEFT JOIN Users u ON s.UserID = u.UserID
            ORDER BY s.LoginTime DESC
            LIMIT 100
        `);
        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        console.error('Fetch sessions error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch sessions' });
    }
});

// GET /api/admin/moderation-logs
router.get('/moderation-logs', async (req, res) => {
    try {
        const db = req.db;
        const logs = await db.all(`
            SELECT m.LogID, m.UserID, u.FullName, u.Email as UserEmail, m.ActionTaken, m.Reason, m.AdminEmail, m.ActionDate, m.Notes
            FROM UserModerationLogs m
            LEFT JOIN Users u ON m.UserID = u.UserID
            ORDER BY m.ActionDate DESC
        `);
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.error('Fetch moderation logs error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch moderation logs' });
    }
});

export default router;
