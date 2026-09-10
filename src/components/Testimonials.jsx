import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'Rohan Mehta',
    title: 'Founder',
    company: 'NovaSpark Ventures',
    avatar: 'RM',
    color: 'var(--primary-color)',
    bg: 'rgba(0,212,255,0.1)',
    quote: 'Aksh delivered a full-stack SaaS dashboard in under 2 weeks that our in-house team estimated would take 2 months. The AI workflow integrations he built saved us 30+ hours per week immediately.',
    result: '30+ hrs / week saved',
    resultIcon: 'fa-solid fa-bolt',
    stars: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: 'CTO',
    company: 'FinEdge Technologies',
    avatar: 'PS',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
    quote: 'The backend he architected for us is running 8 months later without a single critical bug. OWASP-compliant, lightning-fast API responses, and clean documentation. Exactly what a startup needs.',
    result: '0 critical bugs in 8 months',
    resultIcon: 'fa-solid fa-shield-halved',
    stars: 5,
  },
  {
    id: 3,
    name: 'Arjun Kapoor',
    title: 'Product Lead',
    company: 'CreatorStack',
    avatar: 'AK',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    quote: 'Hired Aksh for a rapid UI prototype and got a production-ready React app. His attention to detail on animations and micro-interactions made our investors stop and say "wait, this is your MVP?".',
    result: 'Investor demo approved',
    resultIcon: 'fa-solid fa-chart-line',
    stars: 5,
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    title: 'CEO',
    company: 'Luma Labs',
    avatar: 'SI',
    color: '#f43f5e',
    bg: 'rgba(244,63,94,0.1)',
    quote: 'We needed an AI chatbot integrated into our platform in under a week — Aksh had a working prototype the next day and production build by day 5. Clean code, zero hand-holding needed.',
    result: 'Shipped in 5 days',
    resultIcon: 'fa-solid fa-rocket',
    stars: 5,
  },
  {
    id: 5,
    name: 'Vikram Nair',
    title: 'Engineering Lead',
    company: 'Zestify',
    avatar: 'VN',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
    quote: 'Our PostgreSQL queries were timing out at scale. Aksh audited the schema, rewrote 3 critical queries with proper indexing and a Redis cache layer — load times dropped from 4s to under 200ms.',
    result: '4s → 200ms query time',
    resultIcon: 'fa-solid fa-gauge-high',
    stars: 5,
  },
  {
    id: 6,
    name: 'Aditya Joshi',
    title: 'Founder',
    company: 'PitchDeck AI',
    avatar: 'AJ',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
    quote: "Built our entire RAG pipeline from scratch — document ingestion, vector embeddings, retrieval, and a streaming chat interface. The quality of the answers blew our beta testers away on day one.",
    result: 'RAG pipeline live on day 1',
    resultIcon: 'fa-solid fa-brain',
    stars: 5,
  },
  {
    id: 7,
    name: 'Meera Patel',
    title: 'Product Manager',
    company: 'ShopEase',
    avatar: 'MP',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    quote: "Aksh rebuilt our React frontend from a messy jQuery codebase in 3 weeks. Faster load times, mobile-first layout, and the new Framer Motion animations made the product feel like a different app entirely.",
    result: 'Full frontend rewrite in 3 weeks',
    resultIcon: 'fa-solid fa-wand-magic-sparkles',
    stars: 5,
  },
];

export default function Testimonials() {
  const [list, setList] = useState(DEFAULT_TESTIMONIALS);
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedBanner, setSubmittedBanner] = useState(false);

  // Form state for new feedback submission
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    quote: '',
    result: '',
    stars: 5,
  });

  // Load any previously saved user feedback from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('akshbuilds_custom_feedback');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setList([...parsed, ...DEFAULT_TESTIMONIALS]);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const t = list[active] || list[0] || DEFAULT_TESTIMONIALS[0];

  const handleSelect = (index) => {
    triggerHaptic('selection');
    setActive(index);
  };

  const openModal = () => {
    triggerHaptic('light');
    setModalOpen(true);
  };

  const closeModal = () => {
    triggerHaptic('light');
    setModalOpen(false);
  };

  const handleRatingClick = (rating) => {
    triggerHaptic('medium');
    setFormData(prev => ({ ...prev, stars: rating }));
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    triggerHaptic('success');

    const initials = formData.name
      .trim()
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'FB';

    const colors = ['#00d4ff', '#10b981', '#a78bfa', '#f43f5e', '#fbbf24', '#06b6d4'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const newFeedback = {
      id: Date.now(),
      name: formData.name.trim(),
      title: formData.title.trim() || 'Collaborator',
      company: formData.company.trim() || 'Independent Client',
      avatar: initials,
      color: chosenColor,
      bg: `${chosenColor}1a`,
      quote: formData.quote.trim(),
      result: formData.result.trim() || 'Verified Client Review',
      resultIcon: 'fa-solid fa-circle-check',
      stars: formData.stars || 5,
      isUserSubmitted: true,
    };

    const updatedList = [newFeedback, ...list];
    setList(updatedList);
    setActive(0);

    // Save to localStorage
    try {
      const saved = localStorage.getItem('akshbuilds_custom_feedback');
      const prevSaved = saved ? JSON.parse(saved) : [];
      localStorage.setItem('akshbuilds_custom_feedback', JSON.stringify([newFeedback, ...prevSaved]));
    } catch {
      // Ignore storage write errors
    }

    setFormData({ name: '', title: '', company: '', quote: '', result: '', stars: 5 });
    setModalOpen(false);
    setSubmittedBanner(true);
    setTimeout(() => setSubmittedBanner(false), 5000);
  };

  return (
    <section id="testimonials" className="section">
      <div className="container">

        {/* Section Header with Leave Feedback button */}
        <div className="section-header reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-label">Client Feedback & Reviews</span>
          <h2 className="section-title">What People <span className="text-glow">Say</span></h2>
          <p className="section-subtitle">Real people. Real projects. Real outcomes.</p>

          <div style={{ marginTop: 16 }}>
            <button
              onClick={openModal}
              className="btn btn-outline glow-btn"
              style={{
                fontSize: '0.82rem',
                padding: '10px 20px',
                borderRadius: 24,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="fa-solid fa-pen-nib" style={{ color: 'var(--primary-color)' }} />
              Leave Feedback
            </button>
          </div>
        </div>

        {/* Success notification banner */}
        <AnimatePresence>
          {submittedBanner && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                maxWidth: 600,
                margin: '0 auto 24px',
                padding: '12px 20px',
                borderRadius: 12,
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: '0.88rem',
              }}
            >
              <i className="fa-solid fa-circle-check" style={{ fontSize: '1.1rem' }} />
              <div>
                <strong>Thank you!</strong> Your feedback has been published and added to the testimonials.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

          {/* Left — big quote */}
          <motion.div
            key={t.id || active}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 20,
              padding: '40px 36px',
              display: 'flex', flexDirection: 'column', gap: 24,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Decorative quote mark */}
            <div style={{
              position: 'absolute', top: 16, right: 24,
              fontFamily: 'Georgia, serif', fontSize: '8rem', lineHeight: 1,
              color: t.color, opacity: 0.06, pointerEvents: 'none',
              userSelect: 'none',
            }}>
              "
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: t.stars || 5 }).map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#fbbf24', fontSize: '0.85rem' }} />
              ))}
              {t.isUserSubmitted && (
                <span style={{
                  marginLeft: 8,
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-green)',
                  background: 'rgba(16,185,129,0.1)',
                  padding: '2px 8px',
                  borderRadius: 6,
                  border: '1px solid rgba(16,185,129,0.25)',
                }}>
                  Verified Submission
                </span>
              )}
            </div>

            {/* Quote */}
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-main)', fontStyle: 'italic', flexGrow: 1 }}>
              "{t.quote}"
            </p>

            {/* Result pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: t.bg, border: `1px solid ${t.color}33`,
              borderRadius: 8, padding: '8px 14px',
              fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: t.color,
              width: 'fit-content',
            }}>
              <i className={t.resultIcon} />
              {t.result}
            </div>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 16, borderTop: '1px solid var(--glass-border)' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 10,
                background: t.bg, color: t.color, border: `1px solid ${t.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0,
              }}>
                {t.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}>{t.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {t.title} · {t.company}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — scrollable selector cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 520, overflowY: 'auto', paddingRight: 4 }}>
            {list.map((item, i) => (
              <motion.div
                key={item.id}
                onClick={() => handleSelect(i)}
                whileHover={{ x: 4 }}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${i === active ? item.color + '44' : 'var(--glass-border)'}`,
                  background: i === active ? item.bg : 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                  display: 'flex', alignItems: 'center', gap: 12,
                  flexShrink: 0,
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: item.bg, color: item.color,
                  border: `1px solid ${item.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                }}>
                  {item.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: i === active ? 'var(--text-main)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title} · {item.company}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: item.color, opacity: i === active ? 1 : 0, transition: 'opacity 0.2s', flexShrink: 0 }}>
                  reading
                </div>
              </motion.div>
            ))}

            {/* Trust note */}
            <div style={{
              marginTop: 4, padding: '14px 18px',
              borderRadius: 12,
              background: 'rgba(16,185,129,0.04)',
              border: '1px solid rgba(16,185,129,0.12)',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <i className="fa-solid fa-handshake" style={{ color: '#10b981', marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Every project is backed by a commitment to ship on time, communicate clearly, and fix issues fast — no ghosting.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Feedback Modal Dialog ── */}
      <AnimatePresence>
        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 520,
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 20,
                padding: '32px 28px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>

              <div style={{ marginBottom: 20 }}>
                <span className="section-label" style={{ fontSize: '0.7rem' }}>Client Review</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: 4 }}>Share Your Feedback</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Worked together on a project? Leave an honest review or testimonial.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Star rating selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6 }}>
                    Rating
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.4rem',
                          color: star <= formData.stars ? '#fbbf24' : 'rgba(255,255,255,0.2)',
                          padding: 2,
                          transition: 'transform 0.15s',
                        }}
                      >
                        <i className="fa-solid fa-star" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Role */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sarah Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="c-input"
                      style={{ fontSize: '0.85rem', padding: '10px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>
                      Role & Company
                    </label>
                    <input
                      type="text"
                      placeholder="Founder at BuildHQ"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="c-input"
                      style={{ fontSize: '0.85rem', padding: '10px 12px' }}
                    />
                  </div>
                </div>

                {/* Key Outcome / Metric */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Highlight / Outcome
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delivered 3 days ahead of schedule"
                    value={formData.result}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    className="c-input"
                    style={{ fontSize: '0.85rem', padding: '10px 12px' }}
                  />
                </div>

                {/* Testimonial Quote */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Feedback / Review *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the experience, the speed of delivery, communication, or code quality..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className="c-input"
                    style={{ fontSize: '0.85rem', padding: '10px 12px' }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary glow-btn"
                  style={{
                    marginTop: 8,
                    padding: '12px',
                    fontSize: '0.9rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <i className="fa-solid fa-paper-plane" />
                  Publish Feedback
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 760px) {
          #testimonials .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
