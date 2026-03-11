import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import trackRoutes from './routes/track.js';
import adminRoutes from './routes/admin.js';
import queriesRoutes from './routes/queries.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database connection
let db;
initDb().then(database => {
    db = database;
    // Share database connection with routes via middleware
    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    // Mount API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/track', trackRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/queries', queriesRoutes);

    app.listen(PORT, () => {
        console.log(`Backend API Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
