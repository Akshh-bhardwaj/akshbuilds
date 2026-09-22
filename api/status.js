// Vercel Serverless Function: Check HCL server health and queue status

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hclServerUrl = process.env.HCL_SERVER_URL || "https://learning-luck-coleman-satisfy.trycloudflare.com" || "https://learning-luck-coleman-satisfy.trycloudflare.com";
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  let hclStatus = { online: false, responseTimeMs: null, error: null };
  let queueCount = 0;

  // 1. Check HCL status
  if (hclServerUrl) {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const ping = await fetch(`${hclServerUrl.replace(/\/$/, '')}/api/status`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (ping.ok) {
        hclStatus.online = true;
        hclStatus.responseTimeMs = Date.now() - start;
      } else {
        hclStatus.error = `HTTP ${ping.status}`;
      }
    } catch (e) {
      hclStatus.error = e.message;
    }
  } else {
    hclStatus.error = 'HCL_SERVER_URL not configured';
  }

  // 2. Check Queue length in Upstash
  if (upstashUrl && upstashToken) {
    try {
      const cleanUrl = upstashUrl.replace(/\/$/, '');
      const queueRes = await fetch(`${cleanUrl}/llen/pending_submissions`, {
        headers: { Authorization: `Bearer ${upstashToken}` }
      });
      if (queueRes.ok) {
        const data = await queueRes.json();
        queueCount = Number(data.result) || 0;
      }
    } catch (e) {
      console.error('[Status] Queue check failed:', e);
    }
  }

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hclServer: hclStatus,
    cloudQueue: {
      active: Boolean(upstashUrl && upstashToken),
      pendingMessages: queueCount
    }
  });
}
