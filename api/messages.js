// Vercel Serverless Function: Proxy Admin Messages to HCL Server

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.ADMIN_SECRET_KEY || 'Aksh@1234';

  if (!token || token !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  const hclServerUrl = process.env.HCL_SERVER_URL || "https://akshserver.tail2bbfc6.ts.net";
  if (!hclServerUrl) {
    return res.status(200).json([]);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const backendRes = await fetch(`${hclServerUrl.replace(/\/$/, '')}/api/admin/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (backendRes.ok) {
      const data = await backendRes.json();
      return res.status(200).json(data.messages || data);
    }
    return res.status(backendRes.status).json({ error: 'Failed to fetch from HCL backend.' });
  } catch (err) {
    console.warn('[HCL Server Offline]', err.message);
    return res.status(200).json([]);
  }
}
