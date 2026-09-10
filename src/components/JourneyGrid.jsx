import { motion } from 'framer-motion';

const BOILERPLATE_POINTS = [
  {
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Fragile Database Architecture',
    desc: 'Default connections crash under concurrent traffic spikes; unhandled deadlocks trigger 3 AM downtime.',
    tag: '3 AM INCIDENTS',
  },
  {
    icon: 'fa-solid fa-puzzle-piece',
    title: 'Bloated Plugin Patchwork',
    desc: 'Glued-together NPM templates and unoptimized packages that break whenever a minor dependency updates.',
    tag: 'DEPENDENCY DEBT',
  },
  {
    icon: 'fa-solid fa-lock-open',
    title: 'Zero Security Gates',
    desc: 'Unsanitized input payloads, memory leaks, and missing OWASP protections left vulnerable in production.',
    tag: 'SECURITY RISKS',
  },
];

const PRODUCTION_POINTS = [
  {
    icon: 'fa-solid fa-bolt',
    title: 'Sub-40ms Global Edge Latency',
    desc: 'Distributed Redis caching and high-concurrency PostgreSQL connection pooling with 99.99% uptime.',
    tag: 'SUB-40MS EDGE',
  },
  {
    icon: 'fa-solid fa-code-commit',
    title: 'Bespoke Custom Architecture',
    desc: 'Zero-bloat, type-safe API contracts tailored specifically to your product logic and high-scale traffic.',
    tag: '100% TAILORED',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'OWASP-Hardened CI/CD Gates',
    desc: 'Automated vulnerability audits, strict data sanitization, and enterprise security built into every release.',
    tag: 'OWASP VERIFIED',
  },
];

export default function JourneyGrid() {
  return (
    <section
      className="journey-grid-section"
      style={{
        position: 'relative',
        padding: '90px 0 100px',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: '#00d4ff',
              background: 'rgba(0, 212, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '20px',
              padding: '6px 16px',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
            Architecture Comparison
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '840px',
              margin: '0 auto 16px',
            }}
          >
            Production Edge{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ff3355 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              vs
            </span>{' '}
            Generic Boilerplate
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            The architectural difference between fragile copy-paste templates and custom-engineered systems that scale without breaking.
          </p>
        </div>

        {/* ── 2-COLUMN SIDE-BY-SIDE DIFFERENCE COMPARISON MATRIX ── */}
        <div className="difference-container">

          {/* LEFT SIDE: Generic Boilerplate (The Fragile Way) */}
          <div className="diff-card diff-card-boilerplate">
            <div className="diff-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="diff-badge-boilerplate">
                  <i className="fa-solid fa-xmark" style={{ marginRight: '4px' }} /> THE FRAGILE WAY
                </span>
              </div>
              <h3 className="diff-title-boilerplate">
                Generic Boilerplate
              </h3>
              <p className="diff-desc-boilerplate">
                Quick to start, but collapses under real-world traffic and requires continuous hotfixing.
              </p>
            </div>

            <div className="diff-points-list">
              {BOILERPLATE_POINTS.map((pt, i) => (
                <div key={i} className="diff-point-item diff-point-item-bp">
                  <div className="diff-icon-bp">
                    <i className={pt.icon} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#fca5a5', margin: 0 }}>
                        {pt.title}
                      </h4>
                      <span className="diff-tag-bp">{pt.tag}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5, margin: 0 }}>
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER VS BADGE */}
          <div className="diff-vs-badge">
            <span>VS</span>
          </div>

          {/* RIGHT SIDE: Production Edge (The akshbuilds Way) */}
          <div className="diff-card diff-card-production">
            <div className="diff-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="diff-badge-production">
                  <i className="fa-solid fa-check" style={{ marginRight: '4px' }} /> THE AKSHBUILDS WAY
                </span>
              </div>
              <h3 className="diff-title-production">
                Production Edge Engine
              </h3>
              <p className="diff-desc-production">
                Bespoke architecture engineered for zero-downtime scale, sub-40ms speeds, and bank-grade security.
              </p>
            </div>

            <div className="diff-points-list">
              {PRODUCTION_POINTS.map((pt, i) => (
                <div key={i} className="diff-point-item diff-point-item-prod">
                  <div className="diff-icon-prod">
                    <i className={pt.icon} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        {pt.title}
                      </h4>
                      <span className="diff-tag-prod">{pt.tag}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: 0 }}>
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Difference Layout & Responsive Styles */}
      <style>{`
        .difference-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: center;
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
        }

        .diff-card {
          border-radius: 24px;
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .diff-card:hover {
          transform: translateY(-4px);
        }

        /* Left Side: Boilerplate (Red warning theme) */
        .diff-card-boilerplate {
          background: rgba(24, 8, 14, 0.85);
          border: 1.5px solid rgba(244, 63, 94, 0.3);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(244, 63, 94, 0.08);
        }

        .diff-badge-boilerplate {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.35);
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.06em;
        }

        .diff-title-boilerplate {
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 800;
          color: #fda4af;
          letter-spacing: -0.02em;
          margin: 12px 0 6px;
        }

        .diff-desc-boilerplate {
          font-size: 0.90rem;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.5;
          margin: 0;
        }

        .diff-point-item-bp {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(244, 63, 94, 0.15);
        }

        .diff-icon-bp {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(244, 63, 94, 0.12);
          color: #f43f5e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          flex-shrink: 0;
        }

        .diff-tag-bp {
          font-family: var(--font-mono);
          font-size: 0.60rem;
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.1);
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 700;
        }

        /* Center VS Badge */
        .diff-vs-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4ff, #a855f7);
          color: #ffffff;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 800;
          box-shadow: 0 0 25px rgba(0, 212, 255, 0.5), 0 0 10px rgba(168, 85, 247, 0.5);
          flex-shrink: 0;
          z-index: 5;
        }

        /* Right Side: Production Edge (Cyan / Violet glowing theme) */
        .diff-card-production {
          background: rgba(8, 22, 40, 0.9);
          border: 1.5px solid rgba(0, 212, 255, 0.6);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 212, 255, 0.2);
        }

        .diff-badge-production {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #00d4ff;
          background: rgba(0, 212, 255, 0.12);
          border: 1px solid rgba(0, 212, 255, 0.4);
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.06em;
        }

        .diff-title-production {
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 12px 0 6px;
        }

        .diff-desc-production {
          font-size: 0.90rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin: 0;
        }

        .diff-point-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          border-radius: 14px;
        }

        .diff-points-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .diff-point-item-prod {
          background: rgba(0, 212, 255, 0.04);
          border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .diff-icon-prod {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(0, 212, 255, 0.15);
          color: #00d4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }

        .diff-tag-prod {
          font-family: var(--font-mono);
          font-size: 0.60rem;
          color: #00d4ff;
          background: rgba(0, 212, 255, 0.12);
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .difference-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .diff-vs-badge {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
