import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');

let dbInstance = null;

export const initDb = async () => {
    if (dbInstance) return dbInstance;

    dbInstance = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS Users (
            UserID INTEGER PRIMARY KEY AUTOINCREMENT,
            FullName TEXT NOT NULL,
            Email TEXT UNIQUE NOT NULL,
            PasswordHash TEXT NOT NULL,
            Role TEXT DEFAULT 'User',
            SignupDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            LastLoginTime DATETIME,
            AccountStatus TEXT DEFAULT 'Active',
            Country TEXT,
            DeviceType TEXT,
            Browser TEXT,
            IP_Address TEXT,
            ProfilePicture TEXT,
            TotalTimeSpentOnWebsite INTEGER DEFAULT 0,
            TotalSessions INTEGER DEFAULT 0,
            LastActiveTimestamp DATETIME,
            EmailVerified BOOLEAN DEFAULT 0,
            ResetCode TEXT
        );

        CREATE TABLE IF NOT EXISTS UserSessions (
            SessionID INTEGER PRIMARY KEY AUTOINCREMENT,
            UserID INTEGER,
            LoginTime DATETIME DEFAULT CURRENT_TIMESTAMP,
            LogoutTime DATETIME,
            SessionDuration INTEGER,
            PagesVisited INTEGER DEFAULT 0,
            DeviceType TEXT,
            IP_Address TEXT,
            Location TEXT,
            FOREIGN KEY(UserID) REFERENCES Users(UserID)
        );

        CREATE TABLE IF NOT EXISTS PageActivity (
            ActivityID INTEGER PRIMARY KEY AUTOINCREMENT,
            UserID INTEGER,
            PageName TEXT,
            PageURL TEXT,
            TimeEntered DATETIME DEFAULT CURRENT_TIMESTAMP,
            TimeExited DATETIME,
            DurationSpent INTEGER,
            FOREIGN KEY(UserID) REFERENCES Users(UserID)
        );

        CREATE TABLE IF NOT EXISTS UserQueries (
            QueryID INTEGER PRIMARY KEY AUTOINCREMENT,
            UserID INTEGER,
            UserName TEXT,
            UserEmail TEXT NOT NULL,
            Subject TEXT,
            Message TEXT NOT NULL,
            QueryCategory TEXT,
            SubmittedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            ResponseStatus TEXT DEFAULT 'Pending',
            AdminResponse TEXT,
            ResponseDate DATETIME,
            Attachment TEXT,
            FOREIGN KEY(UserID) REFERENCES Users(UserID)
        );

        CREATE TABLE IF NOT EXISTS UserModerationLogs (
            LogID INTEGER PRIMARY KEY AUTOINCREMENT,
            UserID INTEGER NOT NULL,
            ActionTaken TEXT NOT NULL,
            Reason TEXT,
            AdminEmail TEXT NOT NULL,
            ActionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            Duration TEXT,
            Notes TEXT,
            FOREIGN KEY(UserID) REFERENCES Users(UserID)
        );
    `);

    try {
        await dbInstance.exec('ALTER TABLE Users ADD COLUMN ResetCode TEXT;');
    } catch (e) {
        // Column probably already exists, which is fine
    }

    // Bootstrap Admin User if missing
    try {
        const ADMIN_EMAIL = 'infosysteam@gmail.com';
        const adminExists = await dbInstance.get('SELECT * FROM Users WHERE Email = ?', [ADMIN_EMAIL]);
        if (!adminExists) {
            console.warn('⚠️ DATABASE RESET DETECTED: Bootstrapping default Admin account...');
            const bcrypt = await import('bcryptjs');
            const salt = await bcrypt.default.genSalt(10);
            const hashedPassword = await bcrypt.default.hash('Infosys@2026', salt);
            
            await dbInstance.run(`
                INSERT INTO Users (FullName, Email, PasswordHash, Role, AccountStatus) 
                VALUES (?, ?, ?, ?, ?)
            `, ['System Administrator', ADMIN_EMAIL, hashedPassword, 'Admin', 'Active']);
            console.log('✅ Admin account recovered via bootstrap.');
        } else {
            console.log('✅ Integrity Check: Admin account verified.');
        }
    } catch (e) {
        console.error('❌ Bootstrap failure:', e.message);
    }

    console.log('Database initialized successfully with all tables and bootstrap completed.');
    return dbInstance;
};

export const getDb = async () => {
    if (!dbInstance) {
        return await initDb();
    }
    return dbInstance;
};
