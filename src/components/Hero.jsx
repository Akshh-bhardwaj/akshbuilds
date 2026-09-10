import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WORDS = ['web apps', 'AI tools', 'SaaS products', 'APIs', 'dashboards'];

const METRICS = [
  { value: '40+',  label: 'Projects' },
  { value: '19',   label: 'Repos' },
  { value: '30+',  label: 'Stars' },
  { value: '73',   label: 'Followers' },
];

export default function Hero() {
  const [wIdx, setWIdx] = useState(0);
  const [text, setText] = useState('');
  const [del,  setDel]  = useState(false);

  // Typewriter effect
  useEffect(() => {
    const word = WORDS[wIdx];
    let t;
    if (!del && text.length < word.length)
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), 85);
    else if (!del && text.length === word.length)
      t = setTimeout(() => setDel(true), 2000);
    else if (del && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 40);
    else if (del && text.length === 0) {
      t = setTimeout(() => {
        setDel(false);
        setWIdx(i => (i + 1) % WORDS.length);
      }, 300);
    }
    return () => clearTimeout(t);
  }, [text, del, wIdx]);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-center-container">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            letterSpacing: '0.06em',
            color: 'var(--accent-green)',
            border: '1px solid rgba(16,185,129,0.25)',
            background: 'rgba(16,185,129,0.06)',
            padding: '6px 14px', borderRadius: 6,
            marginBottom: 24,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)', animation: 'pulse-dot 2s ease infinite', display: 'inline-block' }} />
          Available for hire · Remote
        </motion.div>

        {/* Headline — Centered */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 20 }}
        >
          I build<br />
          <span style={{
            backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 45%, #ff3355 100%)',
            backgroundSize: '200%',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease infinite',
          }}>
            {text}
          </span>
          <span className="typewriter-cursor" />
          <br />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.52em', fontWeight: 500, letterSpacing: '-0.01em' }}>
            that scale.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}
        >
          Full-stack engineer specialising in React, Node.js, and LLM integrations.
          I turn complex requirements into fast, secure, production-ready systems.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}
        >
          <a
            href="#projects"
            className="btn btn-primary glow-btn"
            style={{
              padding: '12px 26px', fontSize: '0.92rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
              boxShadow: '0 4px 20px rgba(0, 212, 255, 0.25)',
              borderColor: 'rgba(0, 212, 255, 0.4)',
              color: '#ffffff',
            }}
          >
            <i className="fa-solid fa-rocket" /> View Projects
          </a>

          <a
            href="#contact"
            className="btn btn-outline glow-hover"
            style={{ padding: '12px 26px', fontSize: '0.92rem' }}
          >
            <i className="fa-solid fa-paper-plane" /> Start a Project
          </a>

          <a href="https://github.com/Akshh-bhardwaj" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '12px 16px' }} title="GitHub Profile">
            <i className="fa-brands fa-github" />
          </a>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--glass-border)', paddingTop: 24, maxWidth: 520, width: '100%' }}
        >
          {METRICS.map((m, i) => {
            const colors = ['#00d4ff', '#a855f7', '#ff3355', '#10b981'];
            return (
              <div key={m.label} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < METRICS.length - 1 ? '1px solid var(--glass-border)' : 'none',
                padding: '0 14px',
              }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: colors[i], lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{m.label}</div>
              </div>
            );
          })}
        </motion.div>

      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 85vh;
          padding-top: 110px;
          padding-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        .hero-center-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          position: relative;
          overflow: visible;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding-top: 90px;
            padding-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
}
