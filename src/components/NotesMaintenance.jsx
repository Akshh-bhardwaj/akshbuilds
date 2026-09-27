import { motion } from 'framer-motion';

export default function NotesMaintenance() {
  return (
    <section id="notes" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(251, 191, 36, 0.12)',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              color: '#fbbf24',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#fbbf24',
                boxShadow: '0 0 10px #fbbf24',
                animation: 'pulse 1.8s infinite',
              }}
            />
            <i className="fa-solid fa-screwdriver-wrench" style={{ fontSize: '0.85rem' }} />
            Vault Upgrade in Progress
          </div>

          <h2 className="section-title">
            Engineering Vault <span className="text-glow" style={{ color: '#fbbf24' }}>Under Maintenance</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
            We are separating and categorizing all <strong>Handwritten Master Notes</strong> and <strong>Digital Cheatsheets</strong> into dedicated, high-speed vaults.
          </p>
        </div>

        {/* Maintenance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            background: 'linear-gradient(145deg, rgba(13, 20, 32, 0.92) 0%, rgba(6, 12, 20, 0.95) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.25)',
            borderRadius: '24px',
            padding: '48px 36px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(251, 191, 36, 0.08)',
            position: 'relative',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Ambient Corner Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '24px',
            }}
          >
            {/* Animated Maintenance Icon */}
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '22px',
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24',
                fontSize: '2.4rem',
                boxShadow: '0 0 25px rgba(251, 191, 36, 0.25)',
              }}
            >
              <i className="fa-solid fa-gears" />
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '10px',
                }}
              >
                Reorganizing Notes & Handbooks
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.98rem',
                  lineHeight: '1.7',
                  maxWidth: '680px',
                  margin: '0 auto',
                }}
              >
                The notes vault is temporarily paused while we sort materials into distinct tabs:
                verified classroom <strong>Handwritten Notes</strong> vs. comprehensive <strong>Digital Guides & LeetCode Cheatsheets</strong>. This ensures clean navigation and instant access without mixed content.
              </p>
            </div>

            {/* Upcoming Features Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                width: '100%',
                marginTop: '12px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div style={{ color: '#00d4ff', fontSize: '1.2rem', marginBottom: '8px' }}>
                  <i className="fa-solid fa-pen-nib" />
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                  Handwritten Master Notes
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
                  Dedicated filter for clean, authentic college & classroom notes.
                </div>
              </div>

              <div
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div style={{ color: '#a78bfa', fontSize: '1.2rem', marginBottom: '8px' }}>
                  <i className="fa-solid fa-laptop-code" />
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                  Digital Guides & Cheatsheets
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
                  Concise formula sheets, LeetCode patterns, and exam guides.
                </div>
              </div>

              <div
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '8px' }}>
                  <i className="fa-solid fa-bolt" />
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                  One-Click Instant Preview
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
                  Enhanced PDF modal with faster rendering and direct downloads.
                </div>
              </div>
            </div>

            {/* Back to browsing action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginTop: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <a
                href="/#projects"
                className="btn btn-primary"
                style={{
                  padding: '10px 22px',
                  borderRadius: '24px',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Explore Featured Projects</span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }} />
              </a>

              <a
                href="/#contact"
                className="btn btn-outline"
                style={{
                  padding: '10px 22px',
                  borderRadius: '24px',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <i className="fa-regular fa-paper-plane" style={{ fontSize: '0.85rem' }} />
                <span>Need Notes Urgently? Contact Me</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
