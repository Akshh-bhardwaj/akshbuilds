import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });

  return transporter;
}

export async function sendLeadNotification(lead) {
  const mailer = getTransporter();
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'akshbuild@gmail.com';
  const { name, email, budget, message, ip, created_at } = lead;

  const timeStr = created_at ? new Date(created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString();

  const htmlContent = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f1f5f9; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
    <div style="background: linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%); padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">🚀 New Inquiry on Akshbuilds!</h1>
      <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">A potential client or collaborator sent you a message</p>
    </div>
    
    <div style="padding: 24px;">
      <div style="background: #131b2e; border: 1px solid #23314d; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 100px;"><strong>Client Name:</strong></td>
            <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00d4ff; text-decoration: none; font-size: 15px;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Budget:</strong></td>
            <td style="padding: 8px 0; color: #10b981; font-weight: 600; font-size: 15px;">${budget || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Received:</strong></td>
            <td style="padding: 8px 0; color: #cbd5e1; font-size: 13px;">${timeStr} IST</td>
          </tr>
        </table>
      </div>

      <div style="background: #131b2e; border: 1px solid #23314d; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
        <p style="margin: 0; color: #e2e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${email}?subject=Re:%20Akshbuilds%20Inquiry" style="display: inline-block; background: #00d4ff; color: #0b0f19; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">Reply to ${name}</a>
      </div>
    </div>

    <div style="background: #070a12; padding: 14px 24px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
      Sent automatically by your HCL Private Server &bull; IP: ${ip || 'N/A'}
    </div>
  </div>
  `;

  if (!mailer) {
    console.log(`[Email Mock] ✉️ SMTP not configured. Lead details: Name: "${name}", Email: "${email}", Budget: "${budget}"`);
    return { success: true, mocked: true };
  }

  try {
    const info = await mailer.sendMail({
      from: `"Akshbuilds Server" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `🔥 New Akshbuilds Lead: ${name} (${budget || 'Project Inquiry'})`,
      html: htmlContent
    });
    console.log('[Email] ✅ Lead notification delivered. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[Email Error] Failed to send lead notification:', err);
    return { success: false, error: err.message };
  }
}

export async function sendVisitorAcknowledgement(lead) {
  const mailer = getTransporter();
  const { name, email } = lead;

  if (!mailer) return { success: true, mocked: true };

  const htmlContent = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f1f5f9; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
    <div style="background: linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%); padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Thanks for reaching out, ${name}!</h1>
    </div>
    <div style="padding: 24px; line-height: 1.6; color: #cbd5e1; font-size: 15px;">
      <p>Hey ${name},</p>
      <p>I received your message through my portfolio. Thank you for connecting!</p>
      <p>I usually respond within <strong>24 hours</strong>. In the meantime, feel free to check out my free engineering & DSA notes catalog or latest builds.</p>
      <div style="margin: 24px 0; text-align: center;">
        <a href="https://akshbuilds.tech/#notes" style="display: inline-block; background: #1e293b; color: #00d4ff; border: 1px solid #00d4ff; font-weight: 600; padding: 10px 22px; border-radius: 6px; text-decoration: none; margin-right: 10px;">Explore Notes (60+ PDFs)</a>
        <a href="https://akshbuilds.tech/#projects" style="display: inline-block; background: #00d4ff; color: #0b0f19; font-weight: 700; padding: 10px 22px; border-radius: 6px; text-decoration: none;">View Projects</a>
      </div>
      <p style="margin-top: 30px; font-size: 14px; color: #94a3b8;">
        Best regards,<br/>
        <strong style="color: #ffffff;">Akshat Bhardwaj</strong><br/>
        Creator of Akshbuilds &bull; Full-Stack & Systems Developer
      </p>
    </div>
  </div>
  `;

  try {
    await mailer.sendMail({
      from: `"Akshat Bhardwaj" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out to Akshbuilds, ${name}!`,
      html: htmlContent
    });
    console.log(`[Email] ✅ Visitor auto-reply sent to ${email}`);
    return { success: true };
  } catch (err) {
    console.warn('[Email Warning] Visitor auto-reply failed:', err.message);
    return { success: false, error: err.message };
  }
}
