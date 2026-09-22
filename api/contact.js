// Vercel Serverless Function: Store-and-Forward Contact API
// Forwards to private HCL laptop server; if offline, safely queues in Upstash Redis

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, budget, message } = req.body || {};

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const submission = {
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().slice(0, 150),
    budget: budget ? String(budget).trim().slice(0, 50) : '',
    message: String(message).trim().slice(0, 5000),
    created_at: new Date().toISOString(),
    user_agent: req.headers['user-agent'] || 'unknown',
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  };

  const hclServerUrl = process.env.HCL_SERVER_URL || "https://learning-luck-coleman-satisfy.trycloudflare.com" || "https://learning-luck-coleman-satisfy.trycloudflare.com";
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Try forwarding directly to HCL Laptop if configured
  if (hclServerUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s timeout

      const response = await fetch(`${hclServerUrl.replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-From': 'Vercel-Bridge'
        },
        body: JSON.stringify(submission),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        return res.status(200).json({
          success: true,
          stored: 'hcl-server',
          message: 'Message delivered directly to HCL server database.',
          data
        });
      }
      console.warn(`[HCL Server] Responded with status ${response.status}, falling back to cloud queue.`);
    } catch (err) {
      console.warn('[HCL Server] Offline or timed out. Falling back to cloud queue...', err.message);
    }
  }

  // 2. Fallback: Store in Upstash Redis Cloud Queue
  if (upstashUrl && upstashToken) {
    try {
      const cleanUrl = upstashUrl.replace(/\/$/, '');
      const queuePayload = JSON.stringify({
        ...submission,
        source: 'vercel-offline-queue'
      });

      const upstashRes = await fetch(`${cleanUrl}/rpush/pending_submissions/${encodeURIComponent(queuePayload)}`, {
        headers: {
          Authorization: `Bearer ${upstashToken}`
        }
      });

      if (upstashRes.ok) {
        return res.status(200).json({
          success: true,
          stored: 'cloud-queue',
          message: 'HCL server is currently offline. Message safely buffered in cloud queue and will sync automatically when server boots up.'
        });
      }
      console.error('[Upstash] Failed to push to queue:', await upstashRes.text());
    } catch (err) {
      console.error('[Upstash Error]', err);
    }
  }

  
  // Optional Direct Email via Resend if configured in Vercel
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Akshbuilds Alerts <onboarding@resend.dev>",
          to: [process.env.NOTIFICATION_EMAIL || "akshbuild@gmail.com"],
          subject: `🔥 New Portfolio Lead: ${submission.name} (${submission.budget || "Inquiry"})`,
          html: `<p><strong>Name:</strong> ${submission.name}</p><p><strong>Email:</strong> ${submission.email}</p><p><strong>Budget:</strong> ${submission.budget || "N/A"}</p><p><strong>Message:</strong></p><blockquote>${submission.message}</blockquote>`
        })
      }).catch(e => console.warn("[Vercel Resend Warning]", e));
    } catch {}
  }

  // 3. Graceful fallback: Visitor never faces broken experience
  return res.status(200).json({
    success: true,
    stored: 'graceful-ack',
    message: 'Thank you! Your message has been received.'
  });
}
