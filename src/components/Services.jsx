import { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    num: '01',
    icon: 'fa-solid fa-layer-group',
    title: 'Full-Stack Web Apps',
    tagline: 'From idea to live product.',
    color: 'var(--primary-color)',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.2)',
    desc: 'I build complete web products — React frontends, Node.js APIs, PostgreSQL databases — designed to handle real traffic from day one.',
    deliverables: ['Responsive UI', 'REST / WebSocket API', 'Auth + RBAC', 'Deployed & monitored'],
    timeline: '2 – 4 weeks',
    cta: 'Get a Quote',
  },
  {
    num: '02',
    icon: 'fa-solid fa-microchip',
    title: 'AI Integration',
    tagline: 'Make your product smarter.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.12)',
    border: 'rgba(167,139,250,0.2)',
    desc: 'I plug LLMs, RAG pipelines, and AI agents directly into your existing product or build one from scratch using OpenAI, Groq, or LangChain.',
    deliverables: ['Custom chatbot', 'Document Q&A', 'Automated workflows', 'Vector search'],
    timeline: '1 – 3 weeks',
    cta: 'Explore AI',
  },
  {
    num: '03',
    icon: 'fa-solid fa-pen-ruler',
    title: 'UI / UX Design & Prototype',
    tagline: 'Designs that convert.',
    color: 'var(--accent-color)',
    glow: 'rgba(244,63,94,0.12)',
    border: 'rgba(244,63,94,0.2)',
    desc: 'Pixel-perfect interfaces built in React with smooth animations. I prototype fast so you can show investors or users within days.',
    deliverables: ['Component library', 'Framer Motion animations', 'Mobile-first', 'Figma handoff'],
    timeline: '3 – 7 days',
    cta: 'See Samples',
  },
  {
    num: '04',
    icon: 'fa-solid fa-shield-halved',
    title: 'Security & Code Audit',
    tagline: 'Sleep at night.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.2)',
    desc: 'OWASP Top 10 audit, JWT hardening, input sanitisation, rate limiting — I find the holes before attackers do.',
    deliverables: ['Vulnerability report', 'Auth hardening', 'Rate limiting', 'Dependency audit'],
    timeline: '3 – 5 days',
    cta: 'Secure My App',
  },
];

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="section">
      <div className="container">

        <div className="section-header reveal">
          <span className="section-label">// services.available</span>
          <h2 className="section-title">What I <span className="text-glow">Build</span></h2>
          <p className="section-subtitle">
            Four things I do exceptionally well. Pick one, or let's figure out what you need.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 16,
                border: `1px solid ${hovered === i ? s.border : 'var(--glass-border)'}`,
                background: hovered === i ? s.glow : 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', gap: 16,
                cursor: 'pointer',
                transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.25s',
                transform: hovered === i ? 'translateY(-6px)' : 'none',
                boxShadow: hovered === i ? `0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px ${s.border}` : 'none',
              }}
            >
              {/* Number + icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: s.color, letterSpacing: '0.1em', opacity: 0.7 }}>{s.num}</span>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: s.glow, border: `1px solid ${s.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color: s.color,
                }}>
                  <i className={s.icon} />
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: s.color, letterSpacing: '0.04em' }}>
                  {s.tagline}
                </p>
              </div>

              {/* Desc */}
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, flexGrow: 1 }}>
                {s.desc}
              </p>

              {/* Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {s.deliverables.map(d => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-check" style={{ color: s.color, fontSize: '0.65rem', flexShrink: 0 }} />
                    {d}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--glass-border)', marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <i className="fa-regular fa-clock" style={{ marginRight: 5 }} />{s.timeline}
                </span>
                <a
                  href="#contact"
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600,
                    color: s.color, letterSpacing: '0.04em',
                    display: 'flex', alignItems: 'center', gap: 5,
                    textDecoration: 'none',
                    transition: 'gap 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '8px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '5px'}
                >
                  {s.cta} <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.65rem' }} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: 40, padding: '24px 32px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(167,139,250,0.05) 100%)',
            border: '1px solid var(--glass-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Not sure what you need?</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Send me an email and I'll help you figure out the right approach.</p>
          </div>
          <a
            href="mailto:akshbuild@gmail.com"
            className="btn btn-primary glow-btn"
            style={{ fontSize: '0.9rem', padding: '11px 24px', flexShrink: 0 }}
          >
            <i className="fa-solid fa-envelope" /> Email Me
          </a>
        </motion.div>

      </div>
    </section>
  );
}
