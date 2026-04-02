import express from 'express';
import cors from 'cors';
import { dbPromise, setupDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB
setupDatabase();

// --- API ROUTES ---

// Health Check
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
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
app.get('/api/messages', async (req, res) => {
  try {
    const db = await dbPromise;
    const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(messages);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});
