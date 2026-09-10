import { motion } from 'framer-motion';

const socials = [
  {
    icon: 'fa-brands fa-instagram',
    label: 'Instagram',
    handle: '@akshbuilds',
    desc: 'Build logs, free AI tools & dev content',
    followers: 'Follow',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.2)',
    href: 'https://www.instagram.com/akshbuilds/',
  },
  {
    icon: 'fa-brands fa-youtube',
    label: 'YouTube',
    handle: '@Akshbuilds',
    desc: 'Full project walkthroughs & tutorials',
    followers: 'New ↗',
    color: '#ff0000',
    bg: 'rgba(255,0,0,0.08)',
    border: 'rgba(255,0,0,0.2)',
    href: 'https://www.youtube.com/@Akshbuilds',
  },
  {
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    handle: 'Akshh-bhardwaj',
    desc: '19 repos · 30+ stars · open source DSA & projects',
    followers: '73 followers',
    color: '#e6edf3',
    bg: 'rgba(230,237,243,0.06)',
    border: 'rgba(230,237,243,0.12)',
    href: 'https://github.com/Akshh-bhardwaj',
  },
  {
    icon: 'fa-brands fa-linkedin',
    label: 'LinkedIn',
    handle: 'akshit-sharma',
    desc: 'Professional updates & networking',
    followers: 'Connect',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.08)',
    border: 'rgba(10,102,194,0.2)',
    href: 'https://www.linkedin.com/in/akshit-sharma-790601189/',
  },
];

export default function Social() {
  return (
    <section id="social" className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          <span className="section-label">// community</span>
          <h2 className="section-title">
            Find Me <span className="text-glow">Online</span>
          </h2>
          <p className="section-subtitle">
            I share what I build, what I learn, and what I break — follow along.
          </p>
        </motion.div>

        {/* Social grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              style={{
                textDecoration: 'none',
                display: 'flex', flexDirection: 'column', gap: 14,
                padding: '24px',
                borderRadius: 16,
                border: `1px solid ${s.border}`,
                background: s.bg,
                backdropFilter: 'blur(12px)',
                transition: 'box-shadow 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px ${s.border}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Icon + followers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', color: s.color,
                }}>
                  <i className={s.icon} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  color: s.color, background: `${s.color}15`,
                  border: `1px solid ${s.color}25`,
                  padding: '3px 8px', borderRadius: 20,
                }}>
                  {s.followers}
                </span>
              </div>

              {/* Text */}
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-heading)', marginBottom: 2 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: s.color, opacity: 0.8, marginBottom: 6 }}>
                  {s.handle}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {s.desc}
                </div>
              </div>

              {/* Follow link */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: s.color,
                marginTop: 'auto',
              }}>
                Follow <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.6rem' }} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: 32, textAlign: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)',
          }}
        >
          Building in public since 2025 · follow along for free tools & project breakdowns
        </motion.div>

      </div>
    </section>
  );
}
