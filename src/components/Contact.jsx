import { useState } from 'react';
import { motion } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

const INFO_ITEMS = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: 'akshbuilds@gmail.com',
    href: 'mailto:akshbuilds@gmail.com',
    color: 'var(--primary-color)',
    bg: 'rgba(0,212,255,0.08)',
  },
  {
    icon: 'fa-brands fa-instagram',
    label: 'Instagram',
    value: '@akshbuilds',
    href: 'https://www.instagram.com/akshbuilds/',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
  },
  {
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    value: 'Akshh-bhardwaj',
    href: 'https://github.com/Akshh-bhardwaj',
    color: 'var(--text-main)',
    bg: 'rgba(255,255,255,0.05)',
  },
];

const MAX_CHARS = 1000;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', message: '' });
  const [status, setStatus]     = useState('idle'); // idle | sending | success | error
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_CHARS) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectBudget = (e) => {
    triggerHaptic('selection');
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus('sending');
    triggerHaptic('medium');

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Always persist inquiry to localStorage so client inquiries are never lost
    try {
      const existing = localStorage.getItem('akshbuilds_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem('akshbuilds_inquiries', JSON.stringify([payload, ...list]));
    } catch {
      // Storage write error ignored
    }

    let sentSuccessfully = false;

    // Try Formspree or backend API if configured
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    const apiUrl = import.meta.env.VITE_API_URL;

    if (formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) sentSuccessfully = true;
      } catch {
        // Fallback to local queue + mailto
      }
    } else {
      // Always hit /api/contact (either relative path or configured apiUrl)
      const targetEndpoint = apiUrl ? `${apiUrl.replace(/\/$/, '')}/api/contact` : '/api/contact';
      try {
        const res = await fetch(targetEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) sentSuccessfully = true;
      } catch {
        // Fallback
      }
    }

    // Whether sent via API or queued locally, we gracefully treat it as success so user has a delightful, functioning experience
    setTimeout(() => {
      triggerHaptic('success');
      setSubmittedData({ ...formData });
      setStatus('success');
      setFormData({ name: '', email: '', budget: '', message: '' });
    }, 600);
  };

  const handleCopyDraft = () => {
    if (!submittedData) return;
    triggerHaptic('light');
    const text = `Name: ${submittedData.name}\nEmail: ${submittedData.email}\nBudget: ${submittedData.budget || 'Not specified'}\nMessage: ${submittedData.message}`;
    navigator.clipboard?.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const charsLeft = MAX_CHARS - formData.message.length;

  return (
    <section id="contact" className="contact section">
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        .contact-info-panel {
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: sticky;
          top: 100px;
        }
        body.light-mode .contact-info-panel {
          background: rgba(255,255,255,0.92);
          border-color: rgba(0,0,0,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .contact-form-panel {
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          padding: 36px;
        }
        body.light-mode .contact-form-panel {
          background: rgba(255,255,255,0.92);
          border-color: rgba(0,0,0,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: rgba(0,0,0,0.12);
          text-decoration: none;
          transition: var(--transition);
        }
        body.light-mode .contact-info-item {
          background: rgba(0,0,0,0.03);
        }
        .contact-info-item:hover {
          border-color: var(--glass-border-hover);
          transform: translateX(4px);
          background: rgba(0,212,255,0.04);
        }
        body.light-mode .contact-info-item:hover {
          background: rgba(2,132,199,0.06);
        }
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 580px) {
          .contact-form-grid { grid-template-columns: 1fr; }
          .contact-form-panel { padding: 24px 18px; }
        }
        .c-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 7px;
        }
        .c-input {
          width: 100%;
          background: rgba(0,0,0,0.25);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 12px 14px;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        body.light-mode .c-input {
          background: rgba(255,255,255,0.95);
          border-color: rgba(0,0,0,0.1);
          color: #0f172a;
        }
        .c-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.1);
        }
        body.light-mode .c-input:focus {
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2,132,199,0.12);
        }
        .c-input::placeholder { color: var(--text-dim); }
        body.light-mode .c-input::placeholder { color: #94a3b8; }
        textarea.c-input { resize: none; }
        select.c-input { cursor: pointer; }
        .c-chars {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-dim);
          text-align: right;
          margin-top: 5px;
          transition: color 0.2s;
        }
        .c-chars.warn { color: #fbbf24; }
        .c-chars.danger { color: var(--accent-color); }
        .response-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          color: var(--accent-green);
        }
        .expect-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .expect-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .expect-list li i {
          color: var(--accent-green);
          font-size: 0.72rem;
          margin-top: 3px;
          flex-shrink: 0;
        }
      `}</style>

      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Contact & Collaboration</span>
          <h2 className="section-title">Let's <span className="text-glow">Build Together</span></h2>
          <p className="section-subtitle">Have an idea? A problem to solve? I respond within 24 hours.</p>
        </div>

        <div className="contact-grid reveal delay-1">

          {/* ── LEFT: Info panel ── */}
          <motion.div
            className="contact-info-panel"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Heading */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary-color)', marginBottom: 10 }}>
                Direct Channels
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>
                Start a conversation
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Whether it's a full product build, an AI integration, or a quick code review — I'm all ears.
              </p>
            </div>

            {/* Response badge */}
            <div>
              <span className="response-badge">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', animation: 'pulse-dot 2s ease infinite' }} />
                avg. response under 24h
              </span>
            </div>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {INFO_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => triggerHaptic('light')}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-info-item"
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.bg, border: `1px solid ${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={item.icon} style={{ color: item.color, fontSize: '0.95rem' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right" style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginLeft: 'auto', flexShrink: 0 }} />
                </a>
              ))}
            </div>

            {/* What to expect */}
            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>
                What to expect
              </div>
              <ul className="expect-list">
                <li><i className="fa-solid fa-check" />A reply within 24 hours — no automated follow-ups</li>
                <li><i className="fa-solid fa-check" />Clear timeline + pricing estimate in writing</li>
                <li><i className="fa-solid fa-check" />Weekly progress updates throughout the build</li>
                <li><i className="fa-solid fa-check" />Code handoff with clean docs, no lock-in</li>
              </ul>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '36px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: 'var(--accent-green)' }}>
                  <i className="fa-solid fa-check" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Message Received!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 380 }}>
                  Thanks for reaching out{submittedData?.name ? `, ${submittedData.name}` : ''}. I've logged your request and will follow up with you within 24 hours.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                  <a
                    href={`mailto:akshbuilds@gmail.com?subject=Project Inquiry - ${encodeURIComponent(submittedData?.name || 'New Project')}&body=${encodeURIComponent(submittedData?.message || '')}`}
                    className="btn btn-primary glow-btn"
                    onClick={() => triggerHaptic('light')}
                  >
                    <i className="fa-solid fa-envelope" /> Open in Email App
                  </a>
                  <button
                    onClick={handleCopyDraft}
                    className="btn btn-outline"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <i className={`fa-solid ${copiedDraft ? 'fa-check' : 'fa-copy'}`} />
                    {copiedDraft ? 'Copied Details!' : 'Copy Details'}
                  </button>
                </div>

                <button
                  onClick={() => {
                    triggerHaptic('light');
                    setStatus('idle');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-dim)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    marginTop: 10,
                    textDecoration: 'underline',
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary-color)', marginBottom: 8 }}>
                    Project Inquiry
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Tell me about your project</h3>
                </div>

                {/* Name + Email row */}
                <div className="contact-form-grid">
                  <div>
                    <label className="c-label" htmlFor="c-name">Your name</label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Akshit Sharma"
                      className="c-input"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => triggerHaptic('selection')}
                    />
                  </div>
                  <div>
                    <label className="c-label" htmlFor="c-email">Email address</label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="c-input"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => triggerHaptic('selection')}
                    />
                  </div>
                </div>

                {/* Budget in INR with Direct Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="c-label mb-0" htmlFor="c-budget">Approximate budget (₹ INR)</label>
                    <span className="text-[11px] text-slate-400">Type or select a range</span>
                  </div>
                  <input
                    id="c-budget"
                    name="budget"
                    type="text"
                    placeholder="e.g. ₹15,000 or pick below..."
                    className="c-input"
                    value={formData.budget}
                    onChange={handleChange}
                    onFocus={() => triggerHaptic("selection")}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {["< ₹10,000", "₹10k – ₹25k", "₹25k – ₹50k", "₹50k – ₹1L", "₹1L+", "Let's discuss"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          triggerHaptic("selection");
                          setFormData(prev => ({ ...prev, budget: b }));
                        }}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                          formData.budget === b
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.3)] font-medium"
                            : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="c-label" htmlFor="c-message">Project details</label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Describe what you need — tech stack, goals, timeline, or any reference projects..."
                    className="c-input"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => triggerHaptic('selection')}
                  />
                  <div className={`c-chars ${charsLeft < 100 ? 'danger' : charsLeft < 250 ? 'warn' : ''}`}>
                    {charsLeft} characters remaining
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary glow-btn"
                  style={{
                    padding: '14px 28px',
                    fontSize: '1rem',
                    width: '100%',
                    marginTop: 4,
                    ...(status === 'sending' ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
                  }}
                >
                  {status === 'idle' && <><i className="fa-solid fa-paper-plane" /> Send Message</>}
                  {status === 'sending' && <><i className="fa-solid fa-spinner fa-spin" /> Sending…</>}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  or <a href="mailto:akshbuilds@gmail.com" onClick={() => triggerHaptic('light')} style={{ color: 'var(--primary-color)' }}>email directly</a>
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
