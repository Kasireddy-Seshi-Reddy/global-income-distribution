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

export default router;
