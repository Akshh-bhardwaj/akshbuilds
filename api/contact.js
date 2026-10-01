import nodemailer from 'nodemailer';

// Email Transporter for direct cloud delivery
const getTransporter = () => {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || 'akshbuild@gmail.com';
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || 'mwhdwbkjhtbgyrpn';
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
};

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

  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'akshbuild@gmail.com';
  let emailDispatched = false;

  // 1. Direct Email Notification to Owner via Gmail SMTP
  try {
    const transporter = getTransporter();
    const timeStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const ownerHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f1f5f9; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%); padding: 24px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">🚀 New Inquiry on AkshBuilds!</h1>
          <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">A potential client or collaborator sent you a message</p>
        </div>
        <div style="padding: 24px;">
          <div style="background: #131b2e; border: 1px solid #23314d; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 100px;"><strong>Client Name:</strong></td>
                <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${submission.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${submission.email}" style="color: #00d4ff; text-decoration: none; font-size: 15px;">${submission.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Budget:</strong></td>
                <td style="padding: 8px 0; color: #10b981; font-weight: 600; font-size: 15px;">${submission.budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Received:</strong></td>
                <td style="padding: 8px 0; color: #cbd5e1; font-size: 13px;">${timeStr} IST</td>
              </tr>
            </table>
          </div>
          <div style="background: #131b2e; border: 1px solid #23314d; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 14px; text-transform: uppercase;">Message</h3>
            <p style="margin: 0; color: #e2e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${submission.message}</p>
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${submission.email}?subject=Re:%20AkshBuilds%20Inquiry" style="display: inline-block; background: #00d4ff; color: #0b0f19; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">Reply to ${submission.name}</a>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"AkshBuilds Website" <${recipient}>`,
      to: recipient,
      replyTo: submission.email,
      subject: `🔥 New AkshBuilds Lead: ${submission.name} (${submission.budget || 'Inquiry'})`,
      html: ownerHtml
    });

    emailDispatched = true;
    console.log('[Vercel Email] ✅ Delivered to owner inbox. Message ID:', info.messageId);

    // Auto-reply to visitor (non-blocking)
    const visitorHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f1f5f9; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%); padding: 24px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Thanks for reaching out, ${submission.name}!</h1>
        </div>
        <div style="padding: 24px; line-height: 1.6; color: #cbd5e1; font-size: 15px;">
          <p>Hey <strong>${submission.name}</strong>,</p>
          <p>I received your message through my portfolio. Thank you for connecting!</p>
          <p>I usually respond within <strong>24 hours</strong>. In the meantime, feel free to explore my latest projects or free engineering notes.</p>
          <p style="margin-top: 30px; font-size: 14px; color: #94a3b8;">
            Best regards,<br/>
            <strong style="color: #ffffff;">Akshit Bhardwaj</strong><br/>
            Creator of AkshBuilds &bull; Full-Stack & Systems Developer
          </p>
        </div>
      </div>
    `;

    transporter.sendMail({
      from: `"Akshit Bhardwaj | AkshBuilds" <${recipient}>`,
      to: submission.email,
      subject: `Thanks for reaching out to AkshBuilds, ${submission.name}! 🚀`,
      html: visitorHtml
    }).catch(vErr => console.warn('[Vercel Email] Visitor auto-reply skipped:', vErr.message));

  } catch (mailErr) {
    console.error('[Vercel Email Error] Failed to send via Nodemailer:', mailErr.message);
  }

  // 2. Optionally forward to local server if online
  const hclServerUrl = process.env.HCL_SERVER_URL;
  if (hclServerUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      await fetch(`${hclServerUrl.replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-From': 'Vercel-Bridge'
        },
        body: JSON.stringify(submission),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch {}
  }

  // Return success to visitor
  return res.status(200).json({
    success: true,
    stored: emailDispatched ? 'email-delivered' : 'graceful-ack',
    message: 'Thank you! Your message has been received.'
  });
}
