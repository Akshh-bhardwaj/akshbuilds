import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { dbPromise } from '../db.js';
import { sendLeadNotification, sendVisitorAcknowledgement } from '../email.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this IP. Please try again after 15 minutes.' }
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, budget, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanBudget = budget ? String(budget).trim() : '';
    const cleanMessage = String(message).trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
    }
    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 254) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (cleanMessage.length < 5 || cleanMessage.length > 5000) {
      return res.status(400).json({ error: 'Message must be between 5 and 5000 characters.' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const db = await dbPromise;

    const result = await db.run(
      'INSERT INTO messages (name, email, budget, message, ip) VALUES (?, ?, ?, ?, ?)',
      [cleanName, cleanEmail, cleanBudget, cleanMessage, ip]
    );

    const leadData = {
      id: result.lastID,
      name: cleanName,
      email: cleanEmail,
      budget: cleanBudget,
      message: cleanMessage,
      ip,
      created_at: new Date().toISOString()
    };

    // Fire emails asynchronously without blocking HTTP response
    Promise.allSettled([
      sendLeadNotification(leadData),
      sendVisitorAcknowledgement(leadData)
    ]).catch(err => console.error('[Contact Route Email Error]', err));

    return res.status(201).json({
      success: true,
      id: result.lastID,
      message: 'Inquiry saved and notifications queued successfully!'
    });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return res.status(500).json({ error: 'Internal server error while processing inquiry.' });
  }
});

export default router;
