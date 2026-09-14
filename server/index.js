import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { dbPromise, setupDatabase } from './db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim().toLowerCase())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    // If wildcard '*' is in allowed origins, allow all
    if (allowedOrigins.includes('*')) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.toLowerCase().replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(allowed => {
      const cleanAllowed = allowed.replace(/\/$/, '');
      return normalizedOrigin === cleanAllowed || (cleanAllowed.startsWith('*.') && normalizedOrigin.endsWith(cleanAllowed.slice(1)));
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS Blocked] Origin not allowed: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!secretKey) {
    console.error('ADMIN_SECRET_KEY is not set in environment variables.');
    return res.status(503).json({ error: 'Admin access not configured.' });
  }

  if (!token || token !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }
  next();
};

// Rate limiter — 5 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again in 15 minutes.' },
});

// Email format validator
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Initialize DB
setupDatabase();

// --- API ROUTES ---

// Health Check
app.get('/api/status', (req, res) => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  res.json({ status: 'ok', environment: nodeEnv });
});

// Submit Contact Form
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Presence check
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Format checks
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
      return res.status(400).json({ error: 'Message must be between 10 and 1000 characters.' });
    }

    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.status(201).json({ 
      success: true, 
      id: result.lastID,
      message: 'Message saved successfully!'
    });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Internal server error while saving message.' });
  }
});

// Fetch upcoming Projects
app.get('/api/projects', async (req, res) => {
  try {
    const db = await dbPromise;
    const projects = await db.all('SELECT * FROM projects ORDER BY id DESC');
    res.json(projects);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
});

// Fetch Contact Messages
app.get('/api/messages', authenticateAdmin, async (req, res) => {
  try {
    const db = await dbPromise;
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(messages);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 API Server running on http://${HOST}:${PORT}`);
  console.log(`🔒 Allowed Origins: ${allowedOrigins.join(', ') || 'None'}`);
});
