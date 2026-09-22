import { Router } from 'express';
import os from 'os';
import { dbPromise } from '../db.js';

const router = Router();

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.ADMIN_SECRET_KEY || 'Aksh@1234';

  if (!token || token !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized access. Valid admin token required.' });
  }
  next();
};

router.use(authenticateAdmin);

// GET /api/admin/messages - List inquiries
router.get('/messages', async (req, res) => {
  try {
    const { unreadOnly } = req.query;
    const db = await dbPromise;

    let query = 'SELECT * FROM messages';
    if (unreadOnly === '1' || unreadOnly === 'true') {
      query += ' WHERE is_read = 0';
    }
    query += ' ORDER BY created_at DESC';

    const messages = await db.all(query);
    const unreadCount = await db.get('SELECT COUNT(*) as count FROM messages WHERE is_read = 0');

    res.json({
      success: true,
      count: messages.length,
      unreadCount: unreadCount?.count || 0,
      messages
    });
  } catch (err) {
    console.error('[Admin Messages Error]', err);
    res.status(500).json({ error: 'Failed to retrieve inquiries.' });
  }
});

// PATCH /api/admin/messages/:id/read - Mark message read/unread
router.patch('/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read = 1 } = req.body;
    const db = await dbPromise;

    await db.run('UPDATE messages SET is_read = ? WHERE id = ?', [is_read ? 1 : 0, id]);
    res.json({ success: true, message: `Message marked as ${is_read ? 'read' : 'unread'}.` });
  } catch (err) {
    console.error('[Admin Read Error]', err);
    res.status(500).json({ error: 'Failed to update message status.' });
  }
});

// DELETE /api/admin/messages/:id - Delete an inquiry
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;

    const result = await db.run('DELETE FROM messages WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    console.error('[Admin Delete Error]', err);
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// GET /api/admin/stats - High level overview
router.get('/stats', async (req, res) => {
  try {
    const db = await dbPromise;

    const totalMessages = await db.get('SELECT COUNT(*) as count FROM messages');
    const unreadMessages = await db.get('SELECT COUNT(*) as count FROM messages WHERE is_read = 0');
    const totalProjects = await db.get('SELECT COUNT(*) as count FROM projects');
    const totalNotes = await db.get('SELECT COUNT(*) as count FROM notes');
    const totalDownloads = await db.get('SELECT SUM(downloads) as total FROM notes');

    res.json({
      success: true,
      stats: {
        totalInquiries: totalMessages?.count || 0,
        unreadInquiries: unreadMessages?.count || 0,
        totalProjects: totalProjects?.count || 0,
        totalNotes: totalNotes?.count || 0,
        totalDownloads: totalDownloads?.total || 0,
        serverUptimeHours: (os.uptime() / 3600).toFixed(2),
        systemPlatform: `${os.type()} ${os.release()}`
      }
    });
  } catch (err) {
    console.error('[Admin Stats Error]', err);
    res.status(500).json({ error: 'Failed to fetch admin stats.' });
  }
});

export default router;
