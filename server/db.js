import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dbPromise = open({
  filename: path.join(__dirname, 'database.sqlite'),
  driver: sqlite3.Database
});

export async function setupDatabase() {
  const db = await dbPromise;

  // 1. Messages Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      budget TEXT DEFAULT '',
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      ip TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  try {
    const tableInfo = await db.all("PRAGMA table_info(messages)");
    const cols = tableInfo.map(c => c.name);
    if (!cols.includes('budget')) {
      await db.exec("ALTER TABLE messages ADD COLUMN budget TEXT DEFAULT ''");
    }
    if (!cols.includes('is_read')) {
      await db.exec("ALTER TABLE messages ADD COLUMN is_read INTEGER DEFAULT 0");
    }
    if (!cols.includes('ip')) {
      await db.exec("ALTER TABLE messages ADD COLUMN ip TEXT DEFAULT ''");
    }
  } catch (err) {
    console.warn('[DB Messages Migration Warning]', err.message);
  }

  // 2. Notes Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      badge TEXT DEFAULT '',
      pages TEXT DEFAULT '',
      size TEXT DEFAULT '',
      desc TEXT DEFAULT '',
      filename TEXT NOT NULL,
      path TEXT NOT NULL,
      downloads INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Projects Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tags TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      link TEXT DEFAULT '',
      github_url TEXT DEFAULT '',
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  try {
    const projInfo = await db.all("PRAGMA table_info(projects)");
    const projCols = projInfo.map(c => c.name);
    if (!projCols.includes('tags')) {
      await db.exec("ALTER TABLE projects ADD COLUMN tags TEXT DEFAULT ''");
    }
    if (!projCols.includes('github_url')) {
      await db.exec("ALTER TABLE projects ADD COLUMN github_url TEXT DEFAULT ''");
    }
    if (!projCols.includes('featured')) {
      await db.exec("ALTER TABLE projects ADD COLUMN featured INTEGER DEFAULT 0");
    }
  } catch (err) {
    console.warn('[DB Projects Migration Warning]', err.message);
  }

  // 4. Site Stats Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS site_stats (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed Notes from Manifest if table is empty
  const noteCount = await db.get("SELECT COUNT(*) as count FROM notes");
  if (noteCount && noteCount.count === 0) {
    const manifestPath = path.join(__dirname, 'data', 'notesManifest.json');
    if (fs.existsSync(manifestPath)) {
      try {
        const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        console.log(`[DB] Seeding ${manifestData.length} notes into SQLite database...`);
        const stmt = await db.prepare(`
          INSERT OR IGNORE INTO notes (slug, title, category, badge, pages, size, desc, filename, path)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const item of manifestData) {
          await stmt.run([
            item.id,
            item.title,
            item.category,
            item.badge || '',
            item.pages || '',
            item.size || '',
            item.desc || '',
            item.filename,
            item.path
          ]);
        }
        await stmt.finalize();
        console.log(`[DB] ✅ Successfully seeded ${manifestData.length} notes!`);
      } catch (err) {
        console.error('[DB] Failed to seed notes manifest:', err);
      }
    }
  }

  // Seed default featured projects if empty
  const projectCount = await db.get("SELECT COUNT(*) as count FROM projects");
  if (projectCount && projectCount.count === 0) {
    await db.run(`
      INSERT INTO projects (title, description, tags, link, github_url, featured)
      VALUES 
      ('Akshbuilds Portfolio', 'Modern responsive developer portfolio with private cloud backend and notes repository.', 'React,Vite,Tailwind,Node,SQLite', 'https://akshbuilds.vercel.app', 'https://github.com/Akshh-bhardwaj/akshbuilds', 1),
      ('DSA Java Playground', 'Handcrafted data structures and algorithm solutions with visual walkthroughs.', 'Java,DSA,LeetCode', 'https://akshbuilds.vercel.app/#notes', '', 1),
      ('Jarvis Air Draw', 'Hand gesture controlled computer vision air canvas built with OpenCV and Python.', 'Python,OpenCV,MediaPipe', '', '', 1)
    `);
    console.log('[DB] ✅ Seeded default projects.');
  }

  console.log('✅ SQLite Database initialized and checked.');
}
