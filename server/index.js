import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupDatabase } from './db.js';

// Modular route imports
import contactRoutes from './routes/contact.js';
import notesRoutes from './routes/notes.js';
import projectsRoutes from './routes/projects.js';
import adminRoutes from './routes/admin.js';
import systemRoutes from './routes/system.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Security & Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim().toLowerCase())
  : ['http://localhost:5173', 'http://localhost:3000', 'https://akshbuilds.vercel.app', 'https://akshbuilds.tech'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*')) return callback(null, true);

    const normalized = origin.toLowerCase().replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(allowed => {
      const clean = allowed.replace(/\/$/, '');
      return normalized === clean || (clean.startsWith('*.') && normalized.endsWith(clean.slice(1)));
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS Blocked] Origin not allowed: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Forwarded-From']
}));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path !== '/api/status' && req.path !== '/api/system/metrics') {
      console.log(`[HTTP] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Base Health Check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    service: 'akshbuilds-private-cloud'
  });
});

// Mount Modular Routes
app.use('/api/contact', contactRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/system', systemRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

// Initialize Database & Start Server
setupDatabase()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Akshbuilds Complete Backend running at http://${HOST}:${PORT}`);
      console.log(`🔒 Active Allowed Origins: ${allowedOrigins.join(', ')}`);
      console.log(`📚 Notes API: http://${HOST}:${PORT}/api/notes`);
      console.log(`💻 System Metrics: http://${HOST}:${PORT}/api/system/metrics`);
    });
  })
  .catch(err => {
    console.error('Fatal Database Startup Error:', err);
    process.exit(1);
  });
