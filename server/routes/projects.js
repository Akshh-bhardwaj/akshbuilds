import { Router } from 'express';
import { dbPromise } from '../db.js';

const router = Router();

// Middleware to authenticate Admin
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.ADMIN_SECRET_KEY || 'Aksh@1234';

  if (!token || token !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }
  next();
};

// GET /api/projects - List all projects
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const db = await dbPromise;

    let query = 'SELECT * FROM projects';
    const params = [];

    if (featured === '1' || featured === 'true') {
      query += ' WHERE featured = 1';
    }

    query += ' ORDER BY featured DESC, id DESC';
    const projects = await db.all(query, params);

    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (err) {
    console.error('[Projects API Error]', err);
    res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
});

// POST /api/projects - Add new project (Admin)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, tags = '', link = '', github_url = '', image_url = '', featured = 0 } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO projects (title, description, tags, link, github_url, image_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, tags, link, github_url, image_url, featured ? 1 : 0]
    );

    res.status(201).json({
      success: true,
      id: result.lastID,
      message: 'Project created successfully!'
    });
  } catch (err) {
    console.error('[Projects Create Error]', err);
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

// DELETE /api/projects/:id - Delete project (Admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;
    const result = await db.run('DELETE FROM projects WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    console.error('[Projects Delete Error]', err);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

export default router;
