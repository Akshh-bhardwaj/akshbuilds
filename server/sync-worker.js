import dotenv from 'dotenv';
import { dbPromise, setupDatabase } from './db.js';
import { sendLeadNotification } from './email.js';

dotenv.config();

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const SYNC_INTERVAL_MS = parseInt(process.env.SYNC_INTERVAL_MS || '30000', 10);

async function syncPendingMessages() {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    console.log('[Sync Worker] Upstash Redis credentials not configured. Waiting...');
    return;
  }

  const cleanUrl = UPSTASH_URL.replace(/\/$/, '');

  try {
    const res = await fetch(`${cleanUrl}/lpop/pending_submissions/20`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`
      }
    });

    if (!res.ok) {
      console.warn(`[Sync Worker] Upstash responded with HTTP ${res.status}`);
      return;
    }

    const data = await res.json();
    let rawItems = data.result;

    if (!rawItems) return;

    if (!Array.isArray(rawItems)) {
      rawItems = [rawItems];
    }

    if (rawItems.length === 0) return;

    console.log(`[Sync Worker] 📥 Found ${rawItems.length} messages buffered while server was offline!`);
    const db = await dbPromise;

    for (const raw of rawItems) {
      try {
        const item = typeof raw === 'string' ? JSON.parse(raw) : raw;
        const name = item.name || 'Anonymous';
        const email = item.email || 'no-email@provided.com';
        const budget = item.budget || '';
        const msg = item.message || '';
        const ip = item.ip || 'offline-queue';
        const createdAt = item.created_at || new Date().toISOString();

        const result = await db.run(
          'INSERT INTO messages (name, email, budget, message, ip, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [name, email, budget, msg, ip, createdAt]
        );

        console.log(`[Sync Worker] ✅ Synced offline message from "${name}" <${email}> into local SQLite (ID: ${result.lastID}).`);

        // Send email alert for the recovered message
        sendLeadNotification({
          id: result.lastID,
          name,
          email,
          budget,
          message: `[Recovered from Offline Queue]\n${msg}`,
          ip,
          created_at: createdAt
        }).catch(e => console.warn('[Sync Worker Email Warning]', e.message));

      } catch (err) {
        console.error('[Sync Worker] Failed to process queued message:', err);
      }
    }
  } catch (err) {
    console.warn('[Sync Worker] Connection check error (will retry):', err.message);
  }
}

async function startWorker() {
  console.log('🔄 Starting Akshbuilds Offline Sync Worker...');
  await setupDatabase();
  await syncPendingMessages();
  setInterval(syncPendingMessages, SYNC_INTERVAL_MS);
}

startWorker().catch(console.error);
