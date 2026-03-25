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

    // Auto-migration for existing databases
    try {
        await dbInstance.exec('ALTER TABLE Users ADD COLUMN ResetCode TEXT;');
    } catch (e) {
        // Column probably already exists, which is fine
    }

    console.log('Database initialized successfully with all tables.');
    return dbInstance;
};

export const getDb = async () => {
    if (!dbInstance) {
        return await initDb();
    }
    return dbInstance;
};
