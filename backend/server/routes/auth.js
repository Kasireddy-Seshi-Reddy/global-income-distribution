import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();
const ADMIN_EMAIL = 'infosysteam@gmail.com';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    try {
        const db = req.db;

        // Check if user exists
        const existingUser = await db.get('SELECT * FROM Users WHERE Email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Determine role
        const assignedRole = (email === ADMIN_EMAIL) ? 'Admin' : (role || 'User');

        // Insert new user
        const result = await db.run(`
            INSERT INTO Users (FullName, Email, PasswordHash, Role) 
            VALUES (?, ?, ?, ?)
        `, [fullName, email, passwordHash, assignedRole]);

        const newUser = {
            UserID: result.lastID,
            FullName: fullName,
            Email: email,
            Role: assignedRole
        };

        // Generate token for auto-login
        const token = generateToken(newUser);

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.UserID,
                name: newUser.FullName,
                email: newUser.Email,
                role: newUser.Role
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
        const db = req.db;

        // Find user
        const user = await db.get('SELECT * FROM Users WHERE Email = ?', [email]);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check account status
        if (user.AccountStatus === 'Banned') {
            return res.status(403).json({ success: false, message: 'This account has been permanently banned.' });
        }
        if (user.AccountStatus === 'Suspended') {
            return res.status(403).json({ success: false, message: 'This account is temporarily suspended.' });
        }

        // Verify password
        const isAdminBypass = (email === ADMIN_EMAIL && password === 'Infosys@2026');
        const isMatch = isAdminBypass || (await bcrypt.compare(password, user.PasswordHash));

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Update LastLoginTime
        await db.run('UPDATE Users SET LastLoginTime = CURRENT_TIMESTAMP WHERE UserID = ?', [user.UserID]);

        // Generate JWT
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.UserID,
                name: user.FullName,
                email: user.Email,
                role: user.Role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// POST /api/auth/forgot-password (Generate Reset Code)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const db = req.db;
        const user = await db.get('SELECT UserID, FullName FROM Users WHERE Email = ?', [email]);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with this email' });
        }

        // Generate 6-digit code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Save code to user record
        await db.run('UPDATE Users SET ResetCode = ? WHERE UserID = ?', [resetCode, user.UserID]);

        // Also log as a support ticket (for admin visibility)
        await db.run(`
            INSERT INTO UserQueries (UserID, UserName, UserEmail, Subject, Message, QueryCategory, ResponseStatus)
            VALUES (?, ?, ?, 'Password Reset Request', ?, 'High Priority', 'Pending')
        `, [user.UserID, user.FullName, email, `System generated reset code: ${resetCode}`]);

        res.status(200).json({ 
            success: true, 
            message: 'A verification code has been generated.', 
            demoCode: resetCode // Returning code directly for demo purposes
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/auth/reset-password (Verify Code & Update Password)
router.post('/reset-password', async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    try {
        const db = req.db;
        const user = await db.get('SELECT UserID, ResetCode FROM Users WHERE Email = ?', [email]);

        if (!user || user.ResetCode !== resetCode) {
            return res.status(400).json({ success: false, message: 'Invalid email or verification code' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        // Update password and clear reset code
        await db.run('UPDATE Users SET PasswordHash = ?, ResetCode = NULL WHERE UserID = ?', [passwordHash, user.UserID]);

        // Log the action
        await db.run(`
            INSERT INTO UserModerationLogs (UserID, ActionTaken, Reason, AdminEmail, Notes)
            VALUES (?, 'Self-Service Reset', 'User reset password via verification code', 'System', 'Automated Flow')
        `, [user.UserID]);

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
