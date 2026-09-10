import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'Akshh-bhardwaj';

const langColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  C: '#555555',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  'Jupyter Notebook': '#DA5B0B',
};

function StatBox({ label, value, loading }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
        {loading ? '—' : value}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{label}</div>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,240,255,0.12)' }}
        transition={{ duration: 0.2 }}
        className="glass"
        style={{
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid var(--glass-border)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-brands fa-github" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-color)', wordBreak: 'break-word' }}>
            {repo.name}
          </span>
        </div>

        {repo.description && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', flexGrow: 1 }}>
            {repo.description.length > 80 ? repo.description.slice(0, 80) + '…' : repo.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '14px', marginTop: 'auto', flexWrap: 'wrap' }}>
          {repo.language && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: langColors[repo.language] || '#aaa',
                  display: 'inline-block', flexShrink: 0,
                }}
              />
              {repo.language}
            </span>
          )}
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <i className="fa-regular fa-star" style={{ marginRight: '4px' }}></i>{repo.stargazers_count}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-code-fork" style={{ marginRight: '4px' }}></i>{repo.forks_count}
          </span>
        </div>
      </motion.div>
    </a>
  );
}


function AvatarWithFallback({ url }) {
  const [failed, setFailed] = useState(false);

  const wrapStyle = {
    width: 90, height: 90, borderRadius: '50%',
    border: '2px solid var(--primary-color)',
    boxShadow: '0 0 16px rgba(0,212,255,0.25)',
    flexShrink: 0,
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem',
    color: 'var(--primary-color)',
  };

  if (url && !failed) {
    return (
      <div style={wrapStyle}>
        <img
          src={url}
          alt="Akshit Sharma"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  return <div style={wrapStyle}>AS</div>;
}


export default function OwnerPortfolio() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`),
        ]);
        const user = await userRes.json();
        const allRepos = await reposRes.json();

        // Top repos: sort by stars then forks, take top 6, skip forks
        const top = allRepos
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
          .slice(0, 6);

        setProfile(user);
        setRepos(top);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  // Total stars across all repos
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Meet the <span className="text-glow">Founder</span></h2>
          <p className="section-subtitle">Full-Stack Developer & AI Engineer — live data pulled straight from GitHub.</p>
        </div>

        <div className="portfolio-content">

          {/* Bio card */}
          <motion.div
            className="portfolio-bio glass reveal delay-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '20px' }}>
              {/* Avatar — photo first, monogram fallback if image fails */}
              <AvatarWithFallback url={profile?.avatar_url} />
              <div>
                <h3 style={{ marginBottom: '4px' }}>{loading ? 'Loading…' : profile?.name || 'Akshit Sharma'}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>
                  <i className="fa-solid fa-location-dot" style={{ marginRight: '6px', color: 'var(--primary-color)' }}></i>
                  {loading ? '—' : profile?.location || 'India'}
                </p>
                {!loading && profile?.bio && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px', fontStyle: 'italic' }}>
                    "{profile.bio}"
                  </p>
                )}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                  <a href="https://leetcode.com/Akshh2908/" target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ padding: '8px 16px', fontSize: '0.85rem', borderColor: '#ffa116', color: '#ffa116' }}>
                    <i className="fa-solid fa-code"></i> LeetCode
                  </a>
                  <a href="#contact" className="btn btn-primary glow-btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '16px' }}>
              I'm Akshit, a full-stack developer and AI engineer who designs, builds, and ships web applications end-to-end.
              I started coding competitively in C++ while studying DSA, then moved into full-stack development building real products
              — from a multiplayer chess engine to an AI orchestration platform.
            </motion.p>
            <motion.p variants={itemVariants} style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '16px' }}>
              My focus is on building fast, secure, and maintainable systems — React &amp; Next.js on the frontend,
              Node.js + PostgreSQL on the backend, and LLM / RAG integrations for AI-driven products.
            </motion.p>
            <motion.p variants={itemVariants} style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Outside of code, I run <strong>AkshBuilds</strong> — sharing free tools,
              build logs, and engineering breakdowns for developers and founders on Instagram and YouTube.
            </motion.p>
          </motion.div>

          {/* Skills + Stats card */}
          <div className="portfolio-skills glass reveal delay-2">
            <h3 style={{ marginBottom: '20px' }}>Tech Arsenal</h3>
            <div className="skills-grid">
              <span className="skill-badge"><i className="fa-brands fa-react"></i> React &amp; Next.js</span>
              <span className="skill-badge"><i className="fa-brands fa-node-js"></i> Node &amp; Express</span>
              <span className="skill-badge"><i className="fa-solid fa-brain"></i> LLM / RAG / LangChain</span>
              <span className="skill-badge"><i className="fa-brands fa-python"></i> Python</span>
              <span className="skill-badge"><i className="fa-solid fa-database"></i> PostgreSQL &amp; MongoDB</span>
              <span className="skill-badge"><i className="fa-solid fa-shield-halved"></i> OWASP &amp; JWT Auth</span>
              <span className="skill-badge"><i className="fa-brands fa-figma"></i> UI/UX &amp; Figma</span>
              <span className="skill-badge"><i className="fa-brands fa-docker"></i> Docker &amp; Cloud Deploy</span>
            </div>

            {/* Live GitHub stats */}
            <div style={{ marginTop: '30px', padding: '20px', borderRadius: '12px', background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.12)' }}>
              <h4 style={{ marginBottom: '14px', color: 'var(--primary-color)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-brands fa-github"></i> Live GitHub Stats
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <StatBox label="Public Repos" value={profile?.public_repos} loading={loading} />
                <StatBox label="Followers" value={profile?.followers} loading={loading} />
                <StatBox label="Total Stars" value={loading ? null : totalStars} loading={loading} />
                <StatBox label="Member Since" value="2025" loading={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Repos grid */}
        {!error && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              <i className="fa-brands fa-github" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
              Top Repositories
            </h3>
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass" style={{ height: '110px', borderRadius: '12px', border: '1px solid var(--glass-border)', opacity: 0.4 }} />
                ))}
              </div>
            ) : (
              <motion.div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {repos.map((repo) => (
                  <motion.div key={repo.id} variants={itemVariants}>
                    <RepoCard repo={repo} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
