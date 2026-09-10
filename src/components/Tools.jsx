import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import DevCardDeck from './DevCardDeck';

const GITHUB_USERNAME = 'Akshh-bhardwaj';

/* ── Language colour map ─────────────────────────────────────────── */
const LANG_COLORS = {
  C:               '#555555',
  Java:            '#b07219',
  Python:          '#3572a5',
  JavaScript:      '#f1e05a',
  TypeScript:      '#3178c6',
  CSS:             '#563d7c',
  HTML:            '#e34c26',
  'Jupyter Notebook': '#da5b0b',
};

/* ── Static tech-stack rows ──────────────────────────────────────── */
const STACK = [
  { label: 'React / Next.js',  pct: 96, color: '#61dafb', icon: 'fa-brands fa-react'    },
  { label: 'Node.js / Express',pct: 92, color: '#68a063', icon: 'fa-brands fa-node-js'  },
  { label: 'PostgreSQL / DB',  pct: 85, color: '#336791', icon: 'fa-solid fa-database'  },
  { label: 'Python / ML',      pct: 80, color: '#3572a5', icon: 'fa-brands fa-python'   },
  { label: 'LLM / RAG / AI',   pct: 88, color: '#7c3aed', icon: 'fa-solid fa-microchip' },
  { label: 'Docker / DevOps',  pct: 74, color: '#0db7ed', icon: 'fa-brands fa-docker'   },
];

/* ── Animated bar ────────────────────────────────────────────────── */
function AnimBar({ pct, color, delay = 0 }) {
  const ref  = useRef(null);
  const view = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={view ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, delay, ease: [0.25, 0.8, 0.25, 1] }}
        style={{ height: '100%', background: color, borderRadius: '4px', boxShadow: `0 0 8px ${color}55` }}
      />
    </div>
  );
}

/* ── Language segment bar ────────────────────────────────────────── */
function LangBar({ langs }) {
  const ref  = useRef(null);
  const view = useInView(ref, { once: true, margin: '-40px' });
  const total = langs.reduce((s, l) => s + l.count, 0);
  return (
    <div ref={ref}>
      {/* Stacked bar */}
      <div style={{ display: 'flex', height: '8px', borderRadius: '6px', overflow: 'hidden', gap: '2px', marginBottom: '14px' }}>
        {langs.map((l, i) => (
          <motion.div
            key={l.name}
            title={`${l.name} – ${Math.round((l.count / total) * 100)}%`}
            initial={{ flex: 0 }}
            animate={view ? { flex: l.count } : {}}
            transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
            style={{ background: LANG_COLORS[l.name] || '#888', minWidth: 0 }}
          />
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {langs.map(l => (
          <span key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: LANG_COLORS[l.name] || '#888', flexShrink: 0 }} />
            {l.name}
            <span style={{ color: 'var(--text-dim)' }}>{Math.round((l.count / total) * 100)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Repo card ───────────────────────────────────────────────────── */
function RepoCard({ repo, index }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      style={{
        display: 'block',
        textDecoration: 'none',
        padding: '14px 16px',
        borderRadius: '10px',
        border: '1px solid var(--glass-border)',
        background: 'rgba(0,0,0,0.2)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,212,255,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <i className="fa-brands fa-github" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-color)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {repo.name}
        </span>
      </div>
      {repo.description && (
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.5 }}>
          {repo.description.length > 60 ? repo.description.slice(0, 60) + '…' : repo.description}
        </p>
      )}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANG_COLORS[repo.language] || '#888' }} />
            {repo.language}
          </span>
        )}
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <i className="fa-regular fa-star" style={{ marginRight: 3 }} />{repo.stargazers_count}
        </span>
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-code-fork" style={{ marginRight: 3 }} />{repo.forks_count}
        </span>
      </div>
    </motion.a>
  );
}

/* ── Stat pill ───────────────────────────────────────────────────── */
function StatPill({ icon, value, label, color = 'var(--primary-color)' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      padding: '16px 20px', borderRadius: '12px',
      background: 'rgba(0,0,0,0.25)', border: '1px solid var(--glass-border)',
      minWidth: '80px', flex: 1,
    }}>
      <i className={icon} style={{ fontSize: '1.1rem', color }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{value}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Tools() {
  const [profile,  setProfile]  = useState(null);
  const [repos,    setRepos]    = useState([]);
  const [langs,    setLangs]    = useState([]);
  const [topRepos, setTopRepos] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`),
        ]);
        const user = await uRes.json();
        const all  = await rRes.json();

        /* Language frequency */
        const langMap = {};
        all.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const sortedLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));

        /* Top repos by stars */
        const top = [...all]
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
          .slice(0, 4);

        setProfile(user);
        setRepos(all);
        setLangs(sortedLangs);
        setTopRepos(top);
      } catch {
        // Fallback gracefully on network / rate-limit failure
      }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

  /* ── joining date ── */
  const joinYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : null;

  return (
    <section id="tools" className="tools section section-alt" style={{ contentVisibility: 'visible' }}>
      <div className="container">

        {/* Section header */}
        <div className="section-header reveal active">
          <span className="section-label">GitHub & Tech Stack</span>
          <h2 className="section-title">Dev <span className="text-glow">Profile</span></h2>
          <p className="section-subtitle">Live data from GitHub — languages, repositories, and tech stack in one place.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* ── LEFT: GitHub panel ── */}
          <motion.div
            className="glass"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Profile header */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {loading ? (
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
              ) : (
                <img
                  src={profile?.avatar_url}
                  alt={profile?.name}
                  style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--primary-color)', boxShadow: '0 0 16px rgba(0,212,255,0.2)' }}
                />
              )}
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '2px' }}>
                  {loading ? '—' : profile?.name}
                </div>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  @{GITHUB_USERNAME}
                </a>
                {joinYear && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    <i className="fa-regular fa-calendar" style={{ marginRight: 4 }} />joined {joinYear}
                  </div>
                )}
              </div>

              {/* Active badge */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '4px 10px', borderRadius: '20px' }}>
                active
              </div>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <StatPill icon="fa-solid fa-book"       value={loading ? '—' : profile?.public_repos} label="repos"       color="var(--primary-color)" />
              <StatPill icon="fa-solid fa-users"      value={loading ? '—' : profile?.followers}    label="followers"   color="#a78bfa" />
              <StatPill icon="fa-regular fa-star"     value={loading ? '—' : totalStars}            label="stars"       color="#fbbf24" />
              <StatPill icon="fa-solid fa-code-fork"  value={loading ? '—' : repos.reduce((s,r)=>s+r.forks_count,0)} label="forks" color="var(--accent-green)" />
            </div>

            {/* Language bar */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                <i className="fa-solid fa-chart-bar" style={{ marginRight: 6, color: 'var(--primary-color)' }} />most used languages
              </div>
              {loading
                ? <div style={{ height: 8, borderRadius: 6, background: 'rgba(255,255,255,0.05)' }} />
                : <LangBar langs={langs} />
              }
            </div>

            {/* Top repos */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                <i className="fa-solid fa-fire" style={{ marginRight: 6, color: 'var(--accent-color)' }} />top repositories
              </div>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[1,2,3,4].map(i => <div key={i} style={{ height: 60, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }} />)}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {topRepos.map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
                </div>
              )}
            </div>

            {/* GitHub link */}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline glow-hover"
              style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginTop: 'auto' }}
            >
              <i className="fa-brands fa-github" />
              github.com/{GITHUB_USERNAME}
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.7rem', opacity: 0.6 }} />
            </a>
          </motion.div>

          {/* ── RIGHT: Dev Engine Dock & Tech Stack ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Dev Profile Dock with active Card Deck */}
            <div
              id="dev-profile-dock"
              style={{
                position: 'relative',
                zIndex: 20,
              }}
            >
              <DevCardDeck />
            </div>

            {/* Tech stack panel */}
            <motion.div
              className="glass"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* Header */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <i className="fa-solid fa-layers" style={{ marginRight: 6, color: 'var(--primary-color)' }} />Tech Stack
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Tools & frameworks I use daily
                </div>
              </div>

              {/* Stack bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {STACK.map((s, i) => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        <i className={s.icon} style={{ color: s.color, width: '14px', textAlign: 'center' }} />
                        {s.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: s.color }}>{s.pct}%</span>
                    </div>
                    <AnimBar pct={s.pct} color={s.color} delay={i * 0.08} />
                  </div>
                ))}
              </div>

              {/* Terminal output block */}
              <div style={{
                marginTop: 'auto',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,212,255,0.1)',
                borderRadius: '10px',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.73rem',
                lineHeight: '1.8',
              }}>
                <div style={{ color: 'var(--text-dim)', marginBottom: '6px' }}>~/akshbuilds $ git log --oneline -5</div>
                {[
                  { hash: 'a3f9c2e', msg: 'feat: LangChain RAG pipeline v2' },
                  { hash: '7b1d4a1', msg: 'fix: JWT auth edge case on refresh' },
                  { hash: 'e8c2019', msg: 'perf: pg query optimisation -40ms' },
                  { hash: '3f7a882', msg: 'feat: WebSocket broadcast layer'   },
                  { hash: 'c91b347', msg: 'chore: Docker multi-stage build'   },
                ].map(c => (
                  <div key={c.hash} style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#fbbf24', flexShrink: 0 }}>{c.hash}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{c.msg}</span>
                  </div>
                ))}
                <div style={{ color: 'var(--accent-green)', marginTop: '6px' }}>
                  <span className="nav-status-dot" style={{ display: 'inline-block', marginRight: 6 }} />
                  HEAD → main, origin/main
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 820px) {
          #tools .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
