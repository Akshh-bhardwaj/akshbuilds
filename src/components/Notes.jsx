import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── DATA ───────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'dsa',
    label: 'DSA & Algorithms',
    icon: 'fa-solid fa-code',
    color: '#00d4ff',
    colorAlpha: 'rgba(0,212,255,0.12)',
    colorBorder: 'rgba(0,212,255,0.3)',
    colorGlow: 'rgba(0,212,255,0.4)',
    count: '40+ notes',
    desc: 'Arrays, Two-Pointers, Trees, Graphs, DP, Sorting, and LeetCode Top 30 patterns in Java & C.',
    drive: 'https://drive.google.com/drive/folders/DSA_FOLDER_ID',
    modules: [
      { id: 'm1', title: '01. Arrays & Two Pointers', badge: '30 LC Problems', desc: 'Sliding window, Kadane\'s algorithm, Dutch National Flag, and binary search partitions.' },
      { id: 'm2', title: '02. Linked Lists Mastery', badge: '30 LC Problems', desc: 'Tortoise & Hare cycle detection, in-place reversal, and LRU Cache doubly linked list design.' },
      { id: 'm3', title: '03. Stacks & Monotonic Queues', badge: 'Cheatsheet', desc: 'Next Greater Element, largest rectangle in histogram, and sliding window maximum.' },
      { id: 'm4', title: '04. Trees & Graph Traversals', badge: 'Core Theory', desc: 'DFS, BFS, Dijkstra, Topological Sort, Tarjan\'s bridges, and Kosaraju\'s SCC in C/Java.' },
      { id: 'm5', title: '05. Dynamic Programming Classics', badge: 'Patterns', desc: '0/1 Knapsack, Longest Common Subsequence, Longest Increasing Subsequence, and Coin Change.' },
    ],
  },
  {
    id: 'react',
    label: 'React & Frontend',
    icon: 'fa-brands fa-react',
    color: '#61dafb',
    colorAlpha: 'rgba(97,218,251,0.12)',
    colorBorder: 'rgba(97,218,251,0.3)',
    colorGlow: 'rgba(97,218,251,0.4)',
    count: '25+ notes',
    desc: 'React 19, custom hooks, performance tuning, Zustand state management, and SSR patterns.',
    drive: 'https://drive.google.com/drive/folders/REACT_FOLDER_ID',
    modules: [
      { id: 'r1', title: '01. React 19 Core & New Hooks', badge: 'Modern', desc: 'useActionState, useOptimistic, Server Actions, and compiler optimizations.' },
      { id: 'r2', title: '02. State Management Architecture', badge: 'Architecture', desc: 'Zustand vs Redux Toolkit vs Context API with real-world caching strategies.' },
      { id: 'r3', title: '03. High-Performance Web Vitals', badge: 'Performance', desc: 'Code splitting, dynamic imports, memoization, and LCP/INP optimization.' },
      { id: 'r4', title: '04. Custom Hooks & Design Patterns', badge: 'Patterns', desc: 'useDebounce, useIntersectionObserver, useLocalStorage, and compound components.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: 'fa-solid fa-server',
    color: '#a78bfa',
    colorAlpha: 'rgba(167,139,250,0.12)',
    colorBorder: 'rgba(167,139,250,0.3)',
    colorGlow: 'rgba(167,139,250,0.4)',
    count: '30+ notes',
    desc: 'Express.js, REST architecture, JWT auth, rate limiting, and production security checklists.',
    drive: 'https://drive.google.com/drive/folders/BACKEND_FOLDER_ID',
    modules: [
      { id: 'b1', title: '01. RESTful API Best Practices', badge: 'Architecture', desc: 'Semantic routing, standardized error contracts, pagination, and input validation.' },
      { id: 'b2', title: '02. JWT & Role-Based Access (RBAC)', badge: 'Security', desc: 'Access/refresh token lifecycles, HTTP-only cookies, and bcrypt hashing.' },
      { id: 'b3', title: '03. WebSockets & Realtime Layer', badge: 'Realtime', desc: 'Event-driven pub/sub architecture and socket connection handling.' },
      { id: 'b4', title: '04. API Security & Rate Limiting', badge: 'OWASP', desc: 'Express rate limiters, helmet headers, SQL injection guards, and CORS security.' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    icon: 'fa-solid fa-brain',
    color: '#f43f5e',
    colorAlpha: 'rgba(244,63,94,0.12)',
    colorBorder: 'rgba(244,63,94,0.3)',
    colorGlow: 'rgba(244,63,94,0.4)',
    count: '20+ notes',
    desc: 'Prompting techniques, RAG pipelines, vector embeddings, LangChain, and autonomous agents.',
    drive: 'https://drive.google.com/drive/folders/AI_FOLDER_ID',
    modules: [
      { id: 'a1', title: '01. Production RAG Architecture', badge: 'High Value', desc: 'Chunking strategies, hybrid search (BM25 + Dense Vectors), and reranking models.' },
      { id: 'a2', title: '02. Vector Embeddings & Vector DBs', badge: 'Vector Search', desc: 'Pinecone, Qdrant, ChromaDB, cosine similarity, and dimensionality reduction.' },
      { id: 'a3', title: '03. Agentic AI & Tool Calling', badge: 'Agents', desc: 'Function calling schemas, ReAct loop frameworks, and multi-agent coordination.' },
      { id: 'a4', title: '04. Prompt Engineering Mastery', badge: 'Techniques', desc: 'Few-shot prompting, Chain of Thought, DSPy, and structured JSON output guards.' },
    ],
  },
  {
    id: 'sysdesign',
    label: 'System Design',
    icon: 'fa-solid fa-diagram-project',
    color: '#fbbf24',
    colorAlpha: 'rgba(251,191,36,0.12)',
    colorBorder: 'rgba(251,191,36,0.3)',
    colorGlow: 'rgba(251,191,36,0.4)',
    count: '18+ notes',
    desc: 'Scalability, CAP theorem, caching strategies, load balancers, and database sharding.',
    drive: 'https://drive.google.com/drive/folders/SYSDESIGN_FOLDER_ID',
    modules: [
      { id: 's1', title: '01. Scalability & High Availability', badge: 'Fundamentals', desc: 'Horizontal vs vertical scaling, single point of failure (SPOF), and SLA metrics.' },
      { id: 's2', title: '02. Distributed Caching (Redis)', badge: 'Caching', desc: 'Write-through, write-back, cache-aside, cache stampede mitigation, and TTL policies.' },
      { id: 's3', title: '03. Database Sharding & Partitioning', badge: 'Databases', desc: 'Range vs hash-based sharding, replication lag, and consistent hashing.' },
      { id: 's4', title: '04. Message Queues & Event Streaming', badge: 'Streaming', desc: 'Kafka vs RabbitMQ architectures, backpressure, and idempotent consumers.' },
    ],
  },
  {
    id: 'db',
    label: 'Databases & SQL',
    icon: 'fa-solid fa-database',
    color: '#10b981',
    colorAlpha: 'rgba(16,185,129,0.12)',
    colorBorder: 'rgba(16,185,129,0.3)',
    colorGlow: 'rgba(16,185,129,0.4)',
    count: '15+ notes',
    desc: 'SQL mastery, indexing internals, PostgreSQL query planning, and schema migrations.',
    drive: 'https://drive.google.com/drive/folders/DB_FOLDER_ID',
    modules: [
      { id: 'd1', title: '01. Advanced SQL & Window Functions', badge: 'Queries', desc: 'ROW_NUMBER(), RANK(), DENSE_RANK(), CTEs, and recursive queries.' },
      { id: 'd2', title: '02. B-Tree & Hash Indexing Internals', badge: 'Indexing', desc: 'Index scan vs Seq scan, composite index column order, and EXPLAIN ANALYZE.' },
      { id: 'd3', title: '03. ACID Transactions & Concurrency', badge: 'Transactions', desc: 'Dirty reads, phantom reads, isolation levels, and optimistic vs pessimistic locking.' },
      { id: 'd4', title: '04. PostgreSQL vs NoSQL Tradeoffs', badge: 'Design', desc: 'JSONB in Postgres, normalization vs denormalization, and scaling trade-offs.' },
    ],
  },
];

const STEPS = [
  {
    id: 'yt',
    num: '01',
    platform: 'YouTube',
    action: 'Subscribe',
    handle: '@Akshbuilds',
    url: 'https://www.youtube.com/@Akshbuilds',
    icon: 'fa-brands fa-youtube',
    color: '#ff0000',
    colorAlpha: 'rgba(255,0,0,0.14)',
    colorBorder: 'rgba(255,0,0,0.3)',
  },
  {
    id: 'ig',
    num: '02',
    platform: 'Instagram',
    action: 'Follow',
    handle: '@akshbuilds',
    url: 'https://www.instagram.com/akshbuilds/',
    icon: 'fa-brands fa-instagram',
    color: '#e1306c',
    colorAlpha: 'rgba(225,48,108,0.14)',
    colorBorder: 'rgba(225,48,108,0.3)',
  },
];

// ─── NOTES LIBRARY (shown after unlock) ────────────────────────────────────
function NotesLibrary() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [selectedModule, setSelectedModule] = useState(null);
  const active = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <motion.div
      key="library"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <style>{`
        .notes-tab-bar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .notes-tab {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 18px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          white-space: nowrap;
          position: relative;
        }
        .notes-tab:hover {
          transform: translateY(-2px);
          color: var(--text-main);
        }
        .notes-tab.active-tab {
          font-weight: 700;
          color: var(--text-main);
        }
        .notes-cat-card {
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .notes-cat-top {
          padding: 36px 36px 28px;
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }
        @media (max-width: 600px) {
          .notes-cat-top { padding: 24px 20px 20px; flex-direction: column; }
          .notes-tab { font-size: 0.72rem; padding: 8px 14px; }
        }
        .notes-modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 14px;
          padding: 0 36px 32px;
        }
        @media (max-width: 600px) {
          .notes-modules-grid { padding: 0 20px 24px; grid-template-columns: 1fr; }
        }
        .note-module-card {
          padding: 18px 20px;
          border-radius: 16px;
          background: rgba(0,0,0,0.25);
          border: 1.5px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease,
                      box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.2,0.8,0.2,1);
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }
        .note-module-card:hover {
          background: var(--card-color-alpha) !important;
          border-color: var(--card-color) !important;
          box-shadow: 0 0 0 1.5px var(--card-color),
                      0 14px 40px rgba(0,0,0,0.5),
                      0 0 32px var(--card-color-alpha) !important;
          transform: translateY(-5px) scale(1.02);
        }
        .note-module-card:hover .mod-title {
          color: var(--card-color) !important;
        }
        .note-module-card.selected-module {
          background: var(--card-color-alpha) !important;
          border-color: var(--card-color) !important;
          box-shadow: 0 0 0 2px var(--card-color),
                      0 8px 32px rgba(0,0,0,0.5),
                      0 0 40px var(--card-color-alpha) !important;
          transform: translateY(-4px) scale(1.015);
        }
        .notes-cat-bottom {
          padding: 22px 36px 28px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          background: rgba(0,0,0,0.2);
        }
        @media (max-width: 600px) {
          .notes-cat-bottom { padding: 18px 20px 24px; }
        }
        .notes-open-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.25s;
          text-decoration: none;
        }
        .notes-open-btn:hover {
          transform: translateY(-2px) scale(1.02);
          filter: brightness(1.15);
        }
      `}</style>

      {/* Unlock success banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          color: 'var(--accent-green)',
          border: '1px solid rgba(16,185,129,0.25)',
          background: 'rgba(16,185,129,0.08)',
          padding: '7px 16px', borderRadius: 8,
          marginBottom: 28,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', boxShadow: '0 0 10px var(--accent-green)' }} />
        access granted — select and hover any study material to highlight & explore
      </motion.div>

      {/* Tab bar */}
      <div className="notes-tab-bar">
        {CATEGORIES.map(cat => {
          const isActive = activeTab === cat.id;
          return (
            <motion.button
              key={cat.id}
              className={`notes-tab${isActive ? ' active-tab' : ''}`}
              onClick={() => {
                setActiveTab(cat.id);
                setSelectedModule(null);
              }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                borderColor: isActive ? cat.colorBorder : 'var(--glass-border)',
                background: isActive ? cat.colorAlpha : 'rgba(255,255,255,0.02)',
                color: isActive ? cat.color : 'var(--text-muted)',
                boxShadow: isActive ? `0 0 20px ${cat.colorAlpha}` : 'none',
              }}
            >
              <i className={cat.icon} style={{ fontSize: '0.85rem', color: isActive ? cat.color : 'inherit' }} />
              {cat.label}
              {isActive && (
                <motion.span
                  layoutId="activeTabIndicator"
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: '15%',
                    right: '15%',
                    height: '2px',
                    background: cat.color,
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${cat.color}`,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active category card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="notes-cat-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
          style={{
            borderColor: active.colorBorder,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 35px ${active.colorAlpha}`,
          }}
        >
          {/* Top section */}
          <div className="notes-cat-top">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              style={{
                width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                background: active.colorAlpha,
                border: `1.5px solid ${active.colorBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.75rem', color: active.color,
                boxShadow: `0 0 24px ${active.colorAlpha}`,
              }}
            >
              <i className={active.icon} />
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: active.color,
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: active.colorAlpha, padding: '3px 10px', borderRadius: 20,
                border: `1px solid ${active.colorBorder}`,
              }}>
                <i className="fa-solid fa-bookmark" style={{ fontSize: '0.65rem' }} />
                {active.count} available
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 800,
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', letterSpacing: '-0.03em',
                marginBottom: 8, color: 'var(--text-main)',
              }}>
                {active.label}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 600 }}>
                {active.desc}
              </p>
            </div>
          </div>

          {/* Curated Study Modules / Sheets Interactive Grid */}
          <div style={{ padding: '0 36px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <i className="fa-solid fa-layer-group" style={{ marginRight: 6, color: active.color }} />
            featured study modules & cheatsheets (hover / click to highlight)
          </div>

          <div className="notes-modules-grid">
            {active.modules.map(mod => {
              const isSelected = selectedModule === mod.id;
              return (
                <motion.div
                  key={mod.id}
                  className={`note-module-card${isSelected ? ' selected-module' : ''}`}
                  onClick={() => setSelectedModule(isSelected ? null : mod.id)}
                  style={{
                    '--card-color': active.color,
                    '--card-color-alpha': active.colorAlpha,
                  }}
                >
                  {/* Selected glow overlay */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedGlow"
                      style={{
                        position: 'absolute', inset: 0, borderRadius: 16,
                        background: `radial-gradient(ellipse at top left, ${active.colorAlpha} 0%, transparent 65%)`,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, position: 'relative' }}>
                    <span
                      className="mod-title"
                      style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 700,
                        fontSize: '0.93rem',
                        color: isSelected ? active.color : 'var(--text-main)',
                        display: 'flex', alignItems: 'center', gap: 7,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      <i
                        className="fa-regular fa-file-code"
                        style={{ fontSize: '0.85rem', color: active.color }}
                      />
                      {mod.title}
                    </span>

                    {/* Badge — flips to checkmark when selected */}
                    <motion.span
                      animate={{
                        background: isSelected ? active.color : 'rgba(255,255,255,0.07)',
                        color: isSelected ? '#000' : 'var(--text-dim)',
                        scale: isSelected ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.18 }}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
                        padding: '3px 9px', borderRadius: 20,
                        fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0,
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}
                    >
                      {isSelected && <i className="fa-solid fa-check" style={{ fontSize: '0.6rem' }} />}
                      {isSelected ? 'Selected' : mod.badge}
                    </motion.span>
                  </div>

                  {/* Description */}
                  <motion.p
                    animate={{ color: isSelected ? 'var(--text-main)' : 'var(--text-muted)' }}
                    transition={{ duration: 0.18 }}
                    style={{ fontSize: '0.81rem', lineHeight: 1.55, margin: 0, position: 'relative' }}
                  >
                    {mod.desc}
                  </motion.p>

                  {/* Footer hint */}
                  <motion.div
                    animate={{ color: isSelected ? active.color : 'var(--text-dim)', opacity: 1 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                      position: 'relative',
                    }}
                  >
                    <motion.i
                      className={isSelected ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}
                      animate={{ scale: isSelected ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ fontSize: '0.7rem' }}
                    />
                    <span>{isSelected ? 'Module highlighted — view in Drive below' : 'click to highlight this module'}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom action bar */}
          <div className="notes-cat-bottom">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-dim)', lineHeight: 1.8 }}>
              <span style={{ color: active.color, fontWeight: 700 }}>→</span> Complete Google Drive repository · View & download anytime<br />
              <span style={{ color: active.color, fontWeight: 700 }}>→</span> Includes full code templates, complexity analysis & diagrams
            </div>

            <a
              href={active.drive}
              target="_blank"
              rel="noopener noreferrer"
              className="notes-open-btn"
              style={{
                background: `linear-gradient(135deg, ${active.color}, ${active.color}dd)`,
                color: '#000f1a',
                boxShadow: `0 0 28px ${active.colorGlow}`,
              }}
            >
              <i className="fa-brands fa-google-drive" />
              Open {active.label} Drive
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.78rem' }} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>
        6 Core Topics · 100+ Free Notes & Cheatsheets · Updated Weekly
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Notes() {
  const [done, setDone]                 = useState({ yt: false, ig: false });
  const [unlocked, setUnlocked]         = useState(false);
  const [shake, setShake]               = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('dsa');

  const allDone        = done.yt && done.ig;
  const completedCount = (done.yt ? 1 : 0) + (done.ig ? 1 : 0);

  const activePreview = CATEGORIES.find(c => c.id === (hoveredTopic || selectedTopic)) || CATEGORIES[0];

  const handleStep = (step) => {
    window.open(step.url, '_blank', 'noopener,noreferrer');
    setDone(prev => ({ ...prev, [step.id]: true }));
  };

  const handleUnlock = () => {
    if (!allDone) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setUnlocked(true);
  };

  return (
    <section id="notes" className="section">
      <style>{`
        .notes-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: all 0.3s;
        }
        @media (max-width: 860px) {
          .notes-split { grid-template-columns: 1fr; }
        }
        .notes-left {
          padding: 52px 44px;
          background: var(--glass-bg);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
          backdrop-filter: blur(18px);
        }
        @media (max-width: 860px) {
          .notes-left { border-right: none; border-bottom: 1px solid var(--glass-border); padding: 36px 24px; }
          .notes-right { padding: 36px 24px; }
        }
        .notes-right {
          padding: 52px 44px;
          background: rgba(0,0,0,0.28);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 26px;
        }
        .notes-big-num {
          font-family: var(--font-heading);
          font-size: clamp(4.5rem, 9vw, 7.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, var(--primary-color) 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .topic-pill-btn {
          font-family: var(--font-mono);
          font-size: 0.73rem;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          color: var(--text-muted);
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .topic-pill-btn:hover {
          transform: translateY(-2px);
          color: var(--text-main);
        }
        .notes-step-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          transition: all 0.3s;
        }
        .notes-step-row.done-row {
          background: rgba(16,185,129,0.06);
          border-color: rgba(16,185,129,0.28);
        }
        .notes-progress-track {
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
        }
        .notes-progress-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--primary-color), #7c3aed);
          transition: width 0.5s cubic-bezier(0.25,0.8,0.25,1);
          box-shadow: 0 0 10px rgba(0,212,255,0.6);
        }
        @keyframes shake-x {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .shake { animation: shake-x 0.45s ease; }
      `}</style>

      <div className="container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <span className="section-label">// free study materials</span>
          <h2 className="section-title">
            Study <span className="text-glow">Notes & Cheatsheets</span>
          </h2>
          <p className="section-subtitle">
            100+ hand-crafted study notes, algorithms, and architectures — free for all supporters.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ══════════════════════════════════
               LOCKED — split gate layout with Interactive Highlights
          ══════════════════════════════════ */}
          {!unlocked ? (
            <motion.div
              key="gate"
              className="notes-split"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              style={{
                boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${activePreview.colorAlpha}`,
                borderColor: activePreview.colorBorder,
              }}
            >
              {/* LEFT — Interactive Topics Preview */}
              <div className="notes-left">
                <div>
                  <div className="notes-big-num">100+</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)', letterSpacing: '-0.03em', marginTop: 8 }}>
                    Notes & Cheatsheets.<br />
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.62em' }}>Select or hover any study topic below to preview:</span>
                  </div>
                </div>

                {/* Interactive Pills that Highlight on Hover or Click */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                    // available categories
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {CATEGORIES.map(c => {
                      const isHighlighted = (hoveredTopic === c.id) || (!hoveredTopic && selectedTopic === c.id);
                      return (
                        <motion.button
                          key={c.id}
                          className="topic-pill-btn"
                          onClick={() => setSelectedTopic(c.id)}
                          onMouseEnter={() => setHoveredTopic(c.id)}
                          onMouseLeave={() => setHoveredTopic(null)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            borderColor: isHighlighted ? c.color : 'var(--glass-border)',
                            background: isHighlighted ? c.colorAlpha : 'rgba(255,255,255,0.02)',
                            color: isHighlighted ? c.color : 'var(--text-muted)',
                            boxShadow: isHighlighted ? `0 0 16px ${c.colorAlpha}` : 'none',
                            fontWeight: isHighlighted ? 700 : 500,
                          }}
                        >
                          <i className={c.icon} style={{ color: c.color, fontSize: '0.78rem' }} />
                          {c.label}
                          {isHighlighted && <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, boxShadow: `0 0 6px ${c.color}` }} />}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Preview Box of the Selected / Hovered Study Material */}
                <motion.div
                  key={activePreview.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.3)',
                    border: `1px solid ${activePreview.colorBorder}`,
                    boxShadow: `0 0 20px ${activePreview.colorAlpha}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem', color: activePreview.color }}>
                      <i className={activePreview.icon} style={{ marginRight: 8 }} />
                      {activePreview.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: activePreview.color, background: activePreview.colorAlpha, padding: '2px 8px', borderRadius: 10 }}>
                      {activePreview.count}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                    {activePreview.desc}
                  </p>
                </motion.div>
              </div>

              {/* RIGHT — Unlock Steps */}
              <div className="notes-right">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--primary-color)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                    // 2 quick steps to unlock
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.4rem, 2.5vw, 1.95rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                    Support the channel.<br />
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.65em' }}>Get lifetime access to all notes.</span>
                  </h3>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    <span>unlock progress</span>
                    <span style={{ color: allDone ? 'var(--accent-green)' : 'var(--primary-color)', fontWeight: 600 }}>{completedCount}/2 completed</span>
                  </div>
                  <div className="notes-progress-track">
                    <div className="notes-progress-fill" style={{ width: `${(completedCount / 2) * 100}%` }} />
                  </div>
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {STEPS.map(step => {
                    const isDone = done[step.id];
                    return (
                      <motion.div
                        key={step.id}
                        className={`notes-step-row${isDone ? ' done-row' : ''}`}
                        onClick={() => !isDone && handleStep(step)}
                        whileHover={!isDone ? { x: 4, borderColor: step.color, boxShadow: `0 0 20px ${step.colorAlpha}` } : {}}
                        style={{ cursor: isDone ? 'default' : 'pointer' }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: isDone ? 'var(--accent-green)' : 'var(--text-dim)', flexShrink: 0, width: 24, fontWeight: 700 }}>
                          {isDone ? <i className="fa-solid fa-check" /> : step.num}
                        </div>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                          background: isDone ? 'rgba(16,185,129,0.12)' : step.colorAlpha,
                          border: `1px solid ${isDone ? 'rgba(16,185,129,0.3)' : step.colorBorder}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.05rem', color: isDone ? 'var(--accent-green)' : step.color,
                          transition: 'all 0.3s',
                        }}>
                          <i className={isDone ? 'fa-solid fa-check' : step.icon} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isDone ? 'var(--accent-green)' : 'var(--text-main)' }}>
                            {step.action} on {step.platform}
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: isDone ? 'rgba(16,185,129,0.7)' : step.color, opacity: 0.9, marginTop: 2 }}>
                            {isDone ? 'verified ✓' : step.handle}
                          </div>
                        </div>
                        {!isDone && <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: 'var(--text-dim)', fontSize: '0.75rem', flexShrink: 0 }} />}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Unlock button */}
                <motion.button
                  className={shake ? 'shake' : ''}
                  onClick={handleUnlock}
                  whileHover={allDone ? { scale: 1.02 } : {}}
                  whileTap={allDone ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%', padding: '15px 24px',
                    borderRadius: 12, border: allDone ? 'none' : '1px solid var(--glass-border)',
                    cursor: allDone ? 'pointer' : 'not-allowed',
                    fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem',
                    background: allDone ? 'linear-gradient(135deg, var(--primary-color) 0%, #7c3aed 100%)' : 'rgba(255,255,255,0.04)',
                    color: allDone ? '#000d14' : 'var(--text-dim)',
                    boxShadow: allDone ? '0 0 32px rgba(0,212,255,0.3)' : 'none',
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  }}
                >
                  {allDone
                    ? <><i className="fa-solid fa-unlock" /> Unlock Study Materials</>
                    : <><i className="fa-solid fa-lock" /> Complete {2 - completedCount} step{2 - completedCount !== 1 ? 's' : ''} above</>
                  }
                </motion.button>
              </div>
            </motion.div>

          ) : (

            /* ══════════════════════════════════
                 UNLOCKED — full notes library with interactive module highlighting
            ══════════════════════════════════ */
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <NotesLibrary />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
