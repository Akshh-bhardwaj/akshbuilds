import { Router } from 'express';
import { dbPromise } from '../db.js';

const router = Router();

// GET /api/notes - List notes with filtering & search
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'default', limit = 100 } = req.query;
    const db = await dbPromise;

    let query = 'SELECT * FROM notes WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(String(category).toLowerCase());
    }

    if (search) {
      query += ' AND (title LIKE ? OR desc LIKE ? OR badge LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (sort === 'popular') {
      query += ' ORDER BY downloads DESC';
    } else if (sort === 'latest') {
      query += ' ORDER BY created_at DESC';
    } else if (sort === 'title') {
      query += ' ORDER BY title ASC';
    } else {
      query += ' ORDER BY id ASC';
    }

    query += ' LIMIT ?';
    params.push(parseInt(limit, 10));

    const notes = await db.all(query, params);
    res.json({
      success: true,
      count: notes.length,
      notes
    });
  } catch (err) {
    console.error('[Notes API Error]', err);
    res.status(500).json({ error: 'Failed to retrieve notes catalog.' });
  }
});

// GET /api/notes/categories - Categories breakdown
router.get('/categories', async (req, res) => {
  try {
    const db = await dbPromise;
    const categories = await db.all(`
      SELECT category, COUNT(*) as count, SUM(downloads) as total_downloads
      FROM notes
      GROUP BY category
      ORDER BY count DESC
    `);
    res.json({ success: true, categories });
  } catch (err) {
    console.error('[Notes Categories Error]', err);
    res.status(500).json({ error: 'Failed to retrieve note categories.' });
  }
});

// GET /api/notes/stats - Total statistics
router.get('/stats', async (req, res) => {
  try {
    const db = await dbPromise;
    const totalNotes = await db.get('SELECT COUNT(*) as count FROM notes');
    const totalDownloads = await db.get('SELECT SUM(downloads) as total FROM notes');
    const topNotes = await db.all('SELECT slug, title, category, downloads FROM notes ORDER BY downloads DESC LIMIT 5');

    res.json({
      success: true,
      totalNotes: totalNotes?.count || 0,
      totalDownloads: totalDownloads?.total || 0,
      topNotes
    });
  } catch (err) {
    console.error('[Notes Stats Error]', err);
    res.status(500).json({ error: 'Failed to retrieve note statistics.' });
  }
});

// POST /api/notes/:id/download - Track download
router.post('/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;

    const note = await db.get('SELECT * FROM notes WHERE slug = ? OR id = ?', [id, id]);
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    await db.run('UPDATE notes SET downloads = downloads + 1 WHERE id = ?', [note.id]);

    res.json({
      success: true,
      downloads: note.downloads + 1,
      downloadUrl: note.path
    });
  } catch (err) {
    console.error('[Notes Download Error]', err);
    res.status(500).json({ error: 'Failed to track download.' });
  }
});

export default router;
