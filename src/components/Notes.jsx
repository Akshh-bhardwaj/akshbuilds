import { useState, useEffect, useMemo } from 'react';
import NOTES_MANIFEST from './notesManifest.json';

// ─── CATEGORIES DEFINITION ──────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'all',
    label: 'All Notes',
    icon: 'fa-solid fa-layer-group',
    color: '#00d4ff',
    colorAlpha: 'rgba(0,212,255,0.12)',
    colorBorder: 'rgba(0,212,255,0.3)',
    colorGlow: 'rgba(0,212,255,0.4)',
    desc: 'Browse all 60+ verified, handwritten, and classroom-tested PDF notes.',
  },
  {
    id: 'dsa',
    label: 'DSA & Algorithms',
    icon: 'fa-solid fa-code',
    color: '#00d4ff',
    colorAlpha: 'rgba(0,212,255,0.12)',
    colorBorder: 'rgba(0,212,255,0.3)',
    colorGlow: 'rgba(0,212,255,0.4)',
    desc: 'Arrays, Linked Lists, Trees & Hashing, DAA, C Programming, 60+ LeetCode Solutions, and Sorting.',
  },
  {
    id: 'core',
    label: 'CS Core & OS',
    icon: 'fa-solid fa-microchip',
    color: '#ec4899',
    colorAlpha: 'rgba(236,72,153,0.12)',
    colorBorder: 'rgba(236,72,153,0.3)',
    colorGlow: 'rgba(236,72,153,0.4)',
    desc: 'Operating Systems (Made Easy), COA Computer Architecture, Compiler Design, and Electrical Engineering.',
  },
  {
    id: 'java',
    label: 'Java Core & Practice',
    icon: 'fa-brands fa-java',
    color: '#fbbf24',
    colorAlpha: 'rgba(251,191,36,0.12)',
    colorBorder: 'rgba(251,191,36,0.3)',
    colorGlow: 'rgba(251,191,36,0.4)',
    desc: '83-page OOP handwritten master notes, 15+ practice questions, loops, arrays, ArrayList, and Strings.',
  },
  {
    id: 'web',
    label: 'Web Dev & JS',
    icon: 'fa-brands fa-html5',
    color: '#61dafb',
    colorAlpha: 'rgba(97,218,251,0.12)',
    colorBorder: 'rgba(97,218,251,0.3)',
    colorGlow: 'rgba(97,218,251,0.4)',
    desc: 'JS All-in-One 80 pages, Node.js backend notes, 37-page CSS Complete guide, HTML handwritten notes, and roadmap.',
  },
  {
    id: 'db',
    label: 'Databases & SQL',
    icon: 'fa-solid fa-database',
    color: '#10b981',
    colorAlpha: 'rgba(16,185,129,0.12)',
    colorBorder: 'rgba(16,185,129,0.3)',
    colorGlow: 'rgba(16,185,129,0.4)',
    desc: 'DBMS Easy classroom notes (Vol 1 & 2), DBMS handwritten notes, relational algebra, SQL, and indexing.',
  },
  {
    id: 'python',
    label: 'Python & Data Science',
    icon: 'fa-brands fa-python',
    color: '#a78bfa',
    colorAlpha: 'rgba(167,139,250,0.12)',
    colorBorder: 'rgba(167,139,250,0.3)',
    colorGlow: 'rgba(167,139,250,0.4)',
    desc: 'Complete Python handwritten notes (Vols 1 & 2), NumPy, Pandas data science plan, and crash courses.',
  },
  {
    id: 'tools',
    label: 'Tools & Analytics',
    icon: 'fa-solid fa-table-cells',
    color: '#38bdf8',
    colorAlpha: 'rgba(56,189,248,0.12)',
    colorBorder: 'rgba(56,189,248,0.3)',
    colorGlow: 'rgba(56,189,248,0.4)',
    desc: 'Excel basics, data manipulation formulas, VLOOKUP, pivot tables, and analytical shortcuts.',
  },
  {
    id: 'roadmaps',
    label: 'Career Roadmaps',
    icon: 'fa-solid fa-map-location-dot',
    color: '#f43f5e',
    colorAlpha: 'rgba(244,63,94,0.12)',
    colorBorder: 'rgba(244,63,94,0.3)',
    colorGlow: 'rgba(244,63,94,0.4)',
    desc: 'Self-paced career blueprints for Cloud Computing, Cybersecurity, and Machine Learning engineering.',
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

// ─── PDF PREVIEW MODAL ──────────────────────────────────────────────────────
function PdfPreviewModal({ pdf, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!pdf) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'modalBackdropFade 0.2s ease-out forwards',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '90vh',
          background: 'rgba(13, 17, 23, 0.98)',
          border: '1px solid rgba(0, 212, 255, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 212, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(0, 212, 255, 0.12)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-color)',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}
            >
              <i className="fa-solid fa-file-pdf" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '520px',
                }}
              >
                {pdf.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '2px',
                }}
              >
                <span style={{ color: 'var(--primary-color)' }}>{pdf.pages}</span>
                <span>•</span>
                <span>{pdf.size}</span>
                <span>•</span>
                <span style={{ color: 'var(--accent-green)' }}>{pdf.badge}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={pdf.path}
              download={pdf.filename}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: 'var(--accent-green)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              <i className="fa-solid fa-download" />
              Download
            </a>

            <a
              href={pdf.path}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <i className="fa-solid fa-arrow-up-right-from-square" />
              New Tab
            </a>

            <button
              onClick={onClose}
              aria-label="Close preview"
              style={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s',
              }}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div style={{ flex: 1, position: 'relative', background: '#0a0d14' }}>
          <iframe
            src={`${pdf.path}#toolbar=1`}
            title={pdf.title}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#0a0d14',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── UNLOCKED NOTES LIBRARY ─────────────────────────────────────────────────
function NotesLibrary({ onRelock }) {
  const [activeTab, setActiveTab] = useState('dsa');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);
  const [visibleCount, setVisibleCount] = useState(18);

  // Filter notes based on active category & search query
  const filteredNotes = useMemo(() => {
    return NOTES_MANIFEST.filter((note) => {
      const matchesCategory = activeTab === 'all' || note.category === activeTab;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(q) ||
        note.badge.toLowerCase().includes(q) ||
        note.desc.toLowerCase().includes(q) ||
        note.category.toLowerCase().includes(q)
      );
    });
  }, [activeTab, searchQuery]);

  // Reset pagination on tab change or search change
  useEffect(() => {
    setVisibleCount(18);
  }, [activeTab, searchQuery]);

  const displayedNotes = useMemo(() => {
    return filteredNotes.slice(0, visibleCount);
  }, [filteredNotes, visibleCount]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: NOTES_MANIFEST.length };
    NOTES_MANIFEST.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });
    return counts;
  }, []);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[1];

  return (
    <div key="library" style={{ animation: 'sectionFadeIn 0.25s ease-out forwards' }}>
      <style>{`
        @keyframes sectionFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .notes-search-bar {
          position: relative;
          width: 100%;
          max-width: 460px;
        }
        .notes-search-input {
          width: 100%;
          padding: 11px 18px 11px 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.84rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .notes-search-input:focus {
          border-color: var(--primary-color);
          background: rgba(0, 212, 255, 0.04);
          box-shadow: 0 0 16px rgba(0, 212, 255, 0.2);
        }
        .notes-tab-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }
        .notes-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          white-space: nowrap;
          position: relative;
        }
        .notes-tab:hover {
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.25);
        }
        .notes-tab.active-tab {
          font-weight: 700;
          color: var(--text-main);
        }
        .notes-pdf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 18px;
          margin-top: 20px;
        }
        @media (max-width: 640px) {
          .notes-pdf-grid {
            grid-template-columns: 1fr;
          }
        }
        .pdf-card {
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          background: rgba(13, 17, 23, 0.92);
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          position: relative;
          overflow: hidden;
          contain: content;
          animation: cardFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pdf-card:hover {
          transform: translateY(-4px);
          border-color: var(--card-glow-color, rgba(0,212,255,0.4));
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.6), 0 0 24px var(--card-glow-alpha, rgba(0,212,255,0.12));
        }
        .pdf-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, transform 0.18s;
          text-decoration: none;
        }
        .pdf-card-btn-preview {
          background: rgba(0, 212, 255, 0.12);
          border: 1px solid rgba(0, 212, 255, 0.35);
          color: var(--primary-color);
          flex: 1;
        }
        .pdf-card-btn-preview:hover {
          background: var(--primary-color);
          color: #000d14;
          box-shadow: 0 0 14px rgba(0, 212, 255, 0.45);
          transform: translateY(-1px);
        }
        .pdf-card-btn-dl {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-green);
          padding: 8px 12px;
        }
        .pdf-card-btn-dl:hover {
          background: var(--accent-green);
          color: #000;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
          transform: translateY(-1px);
        }
        .pdf-card-btn-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          color: var(--text-dim);
          padding: 8px 11px;
        }
        .pdf-card-btn-tab:hover {
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '24px',
          padding: '14px 20px',
          borderRadius: '14px',
          background: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-green)',
              fontSize: '0.85rem',
            }}
          >
            <i className="fa-solid fa-unlock-keyhole" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--accent-green)' }}>
              Full 60+ Notes Library Unlocked!
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Includes Akshbuild Notes, handwritten master guides, and classroom cheatsheets.
            </div>
          </div>
        </div>

        {/* Search bar & Relock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '440px' }}>
          <div className="notes-search-bar" style={{ flex: 1 }}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                fontSize: '0.8rem',
              }}
            />
            <input
              type="text"
              className="notes-search-input"
              placeholder="Search 60+ notes (e.g. Trees, Java, OS, DBMS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          <button
            onClick={onRelock}
            title="Lock access (for testing flow)"
            style={{
              padding: '10px 13px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.18s',
            }}
          >
            <i className="fa-solid fa-lock" style={{ marginRight: 5 }} />
            Relock
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="notes-tab-bar">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              className={`notes-tab${isActive ? ' active-tab' : ''}`}
              onClick={() => setActiveTab(cat.id)}
              style={{
                borderColor: isActive ? cat.colorBorder : 'var(--glass-border)',
                background: isActive ? cat.colorAlpha : 'rgba(255,255,255,0.02)',
                color: isActive ? cat.color : 'var(--text-muted)',
                boxShadow: isActive ? `0 0 14px ${cat.colorAlpha}` : 'none',
              }}
            >
              <i className={cat.icon} style={{ fontSize: '0.8rem', color: isActive ? cat.color : 'inherit' }} />
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: '0.66rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: isActive ? cat.color : 'rgba(255,255,255,0.08)',
                  color: isActive ? '#000d14' : 'var(--text-dim)',
                  fontWeight: 700,
                  marginLeft: '2px',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Description & Filter status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          color: 'var(--text-dim)',
          marginBottom: '12px',
        }}
      >
        <div>
          <span style={{ color: activeCategoryMeta.color, fontWeight: 700 }}>// {activeCategoryMeta.label}</span> —{' '}
          {activeCategoryMeta.desc}
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
          Showing <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{displayedNotes.length}</span> of {filteredNotes.length} note
          {filteredNotes.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            borderRadius: '18px',
            border: '1px dashed var(--glass-border)',
            background: 'rgba(255,255,255,0.01)',
            marginTop: '20px',
          }}
        >
          <i className="fa-solid fa-folder-open" style={{ fontSize: '2.5rem', color: 'var(--text-dim)', marginBottom: 14 }} />
          <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginBottom: 6 }}>No Notes Found</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No study notes matched your search query "{searchQuery}". Try searching for another topic or reset the search.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('dsa');
            }}
            className="notes-tab"
            style={{ marginTop: 14 }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Notes Grid (High performance CSS rendering - No layout thrashing) */}
      <div className="notes-pdf-grid">
        {displayedNotes.map((note) => {
          const catMeta = CATEGORIES.find((c) => c.id === note.category) || CATEGORIES[1];
          return (
            <div
              key={note.id}
              className="pdf-card"
              style={{
                '--card-glow-color': catMeta.color,
                '--card-glow-alpha': catMeta.colorAlpha,
              }}
            >
              <div>
                {/* Top Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.67rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '16px',
                      background: catMeta.colorAlpha,
                      border: `1px solid ${catMeta.colorBorder}`,
                      color: catMeta.color,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <i className={catMeta.icon} style={{ fontSize: '0.62rem' }} />
                    {note.badge}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{note.pages}</span>
                    <span>•</span>
                    <span>{note.size}</span>
                  </div>
                </div>

                {/* Title */}
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    lineHeight: 1.35,
                    color: 'var(--text-main)',
                    marginBottom: 8,
                  }}
                >
                  {note.title}
                </h4>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.81rem',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {note.desc}
                </p>
              </div>

              {/* Card Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setPreviewPdf(note)}
                  className="pdf-card-btn pdf-card-btn-preview"
                  title="Read / Preview inside browser"
                >
                  <i className="fa-solid fa-eye" />
                  Preview PDF
                </button>

                <a
                  href={note.path}
                  download={note.filename}
                  className="pdf-card-btn pdf-card-btn-dl"
                  title="Direct download file"
                >
                  <i className="fa-solid fa-download" />
                </a>

                <a
                  href={note.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-card-btn pdf-card-btn-tab"
                  title="Open in new browser tab"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button if not all displayed */}
      {filteredNotes.length > displayedNotes.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 18)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'rgba(0, 212, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              color: 'var(--primary-color)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <i className="fa-solid fa-circle-chevron-down" />
            Load More Notes ({filteredNotes.length - displayedNotes.length} remaining)
          </button>
        </div>
      )}

      {/* PDF Modal Reader */}
      {previewPdf && <PdfPreviewModal pdf={previewPdf} onClose={() => setPreviewPdf(null)} />}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Notes() {
  const [stepStatus, setStepStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('akshbuilds_steps_verified');
      return saved ? JSON.parse(saved) : { yt: 'idle', ig: 'idle' }; // 'idle' | 'checking' | 'too_fast' | 'verified'
    } catch {
      return { yt: 'idle', ig: 'idle' };
    }
  });

  // Persist unlock state in localStorage
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem('akshbuilds_notes_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [shake, setShake] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('dsa');

  const allDone = stepStatus.yt === 'verified' && stepStatus.ig === 'verified';
  const completedCount = (stepStatus.yt === 'verified' ? 1 : 0) + (stepStatus.ig === 'verified' ? 1 : 0);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === (hoveredTopic || selectedTopic)) || CATEGORIES[1];

  // Pick representative notes for preview in the locked gate
  const previewNotes = useMemo(() => {
    const targetCat = hoveredTopic || selectedTopic;
    const catNotes = NOTES_MANIFEST.filter((n) => targetCat === 'all' || n.category === targetCat);
    return catNotes.slice(0, 3);
  }, [hoveredTopic, selectedTopic]);

  // Clean, automated follow & verification trigger
  const handleFollowClick = (step) => {
    if (stepStatus[step.id] === 'verified') return;

    // Open channel/profile in a new tab
    window.open(step.url, '_blank', 'noopener,noreferrer');
    const clickTime = Date.now();

    // Set step to active scanning state
    setStepStatus((prev) => ({ ...prev, [step.id]: 'checking' }));

    const handleReturn = () => {
      window.removeEventListener('focus', handleReturn);
      document.removeEventListener('visibilitychange', handleVisibility);

      const elapsed = Date.now() - clickTime;
      if (elapsed < 4200) {
        // Returned too fast without following!
        setStepStatus((prev) => ({ ...prev, [step.id]: 'too_fast' }));
      } else {
        // Stayed enough time to follow: run 1.8s automated verification scan
        setTimeout(() => {
          setStepStatus((prev) => {
            const next = { ...prev, [step.id]: 'verified' };
            try {
              localStorage.setItem('akshbuilds_steps_verified', JSON.stringify(next));
            } catch (e) {}
            return next;
          });
        }, 1200);
      }
    };

    const handleVisibility = () => {
      if (!document.hidden) handleReturn();
    };

    setTimeout(() => {
      window.addEventListener('focus', handleReturn, { once: true });
      document.addEventListener('visibilitychange', handleVisibility, { once: true });
    }, 400);
  };

  const handleUnlock = () => {
    if (!allDone) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setUnlocked(true);
    try {
      localStorage.setItem('akshbuilds_notes_unlocked', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRelock = () => {
    setUnlocked(false);
    setStepStatus({ yt: 'idle', ig: 'idle' });
    try {
      localStorage.removeItem('akshbuilds_notes_unlocked');
      localStorage.removeItem('akshbuilds_steps_verified');
    } catch (e) {
      console.error(e);
    }
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
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        @media (max-width: 860px) {
          .notes-split { grid-template-columns: 1fr; }
        }
        .notes-left {
          padding: 48px 40px;
          background: rgba(13, 17, 23, 0.95);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
        }
        @media (max-width: 860px) {
          .notes-left { border-right: none; border-bottom: 1px solid var(--glass-border); padding: 32px 22px; }
          .notes-right { padding: 32px 22px; }
        }
        .notes-right {
          padding: 48px 40px;
          background: rgba(0,0,0,0.28);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
        }
        .notes-big-num {
          font-family: var(--font-heading);
          font-size: clamp(4.5rem, 9vw, 6.8rem);
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
          padding: 7px 13px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          color: var(--text-muted);
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .topic-pill-btn:hover {
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.3);
        }
        .notes-step-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px 20px;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .notes-step-row.done-row {
          background: rgba(16,185,129,0.06);
          border-color: rgba(16,185,129,0.35);
        }
        .notes-step-row.warning-row {
          background: rgba(239, 68, 68, 0.06);
          border-color: rgba(239, 68, 68, 0.35);
        }
        .notes-step-row.checking-row {
          background: rgba(0, 212, 255, 0.06);
          border-color: rgba(0, 212, 255, 0.35);
        }
        .notes-progress-track {
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
        }
        .notes-progress-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--primary-color), #7c3aed);
          transition: width 0.4s ease;
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
        {/* ── Section Header ── */}
        <div style={{ marginBottom: 36 }}>
          <span className="section-label">// study materials & cheatsheets</span>
          <h2 className="section-title">
            Complete <span className="text-glow">PDF Notes & Handbook</span>
          </h2>
          <p className="section-subtitle">
            60+ hand-crafted PDF notes, algorithms, handwritten sheets, CS core guides, and roadmaps — free for all verified community supporters.
          </p>
        </div>

        {/* ══════════════════════════════════
             Clean, high performance render
        ══════════════════════════════════ */}
        {!unlocked ? (
          <div
            key="gate"
            className="notes-split"
            style={{
              boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${activeCategoryMeta.colorAlpha}`,
              borderColor: activeCategoryMeta.colorBorder,
              animation: 'sectionFadeIn 0.25s ease-out forwards',
            }}
          >
            {/* LEFT — Topics & Notes Preview */}
            <div className="notes-left">
              <div>
                <div className="notes-big-num">60+</div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
                    letterSpacing: '-0.03em',
                    marginTop: 8,
                  }}
                >
                  Curated PDF Notes.<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.62em' }}>
                    Select any category below to preview what's inside:
                  </span>
                </div>
              </div>

              {/* Category Pills */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  // available subject areas
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => {
                    const isHighlighted = hoveredTopic === c.id || (!hoveredTopic && selectedTopic === c.id);
                    return (
                      <button
                        key={c.id}
                        className="topic-pill-btn"
                        onClick={() => setSelectedTopic(c.id)}
                        onMouseEnter={() => setHoveredTopic(c.id)}
                        onMouseLeave={() => setHoveredTopic(null)}
                        style={{
                          borderColor: isHighlighted ? c.color : 'var(--glass-border)',
                          background: isHighlighted ? c.colorAlpha : 'rgba(255,255,255,0.02)',
                          color: isHighlighted ? c.color : 'var(--text-muted)',
                          boxShadow: isHighlighted ? `0 0 14px ${c.colorAlpha}` : 'none',
                          fontWeight: isHighlighted ? 700 : 500,
                        }}
                      >
                        <i className={c.icon} style={{ color: c.color, fontSize: '0.78rem' }} />
                        {c.label}
                        {isHighlighted && (
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: c.color,
                              boxShadow: `0 0 6px ${c.color}`,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes Preview Inside Selected Category */}
              <div
                key={activeCategoryMeta.id}
                style={{
                  padding: '18px 20px',
                  borderRadius: 14,
                  background: 'rgba(0,0,0,0.35)',
                  border: `1px solid ${activeCategoryMeta.colorBorder}`,
                  boxShadow: `0 0 20px ${activeCategoryMeta.colorAlpha}`,
                  animation: 'sectionFadeIn 0.2s ease-out forwards',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.94rem',
                      color: activeCategoryMeta.color,
                    }}
                  >
                    <i className={activeCategoryMeta.icon} style={{ marginRight: 8 }} />
                    {activeCategoryMeta.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: activeCategoryMeta.color,
                      background: activeCategoryMeta.colorAlpha,
                      padding: '2px 8px',
                      borderRadius: 10,
                    }}
                  >
                    Includes {previewNotes.length}+ PDFs
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {previewNotes.map((pn) => (
                    <div
                      key={pn.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        padding: '6px 10px',
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <i
                          className="fa-regular fa-file-pdf"
                          style={{ marginRight: 6, color: activeCategoryMeta.color }}
                        />
                        {pn.title}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.67rem',
                          color: 'var(--text-dim)',
                          flexShrink: 0,
                        }}
                      >
                        {pn.pages}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Unlock Steps with Automated Follow Verification */}
            <div className="notes-right">
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--primary-color)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  // 2 quick steps to unlock
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.95rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                  }}
                >
                  Support the creator.<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.65em' }}>
                    Follow on YouTube & Instagram to unlock all 60+ PDF notes.
                  </span>
                </h3>
              </div>

              {/* Progress bar */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                  }}
                >
                  <span>unlock verification</span>
                  <span style={{ color: allDone ? 'var(--accent-green)' : 'var(--primary-color)', fontWeight: 600 }}>
                    {completedCount}/2 verified
                  </span>
                </div>
                <div className="notes-progress-track">
                  <div className="notes-progress-fill" style={{ width: `${(completedCount / 2) * 100}%` }} />
                </div>
              </div>

              {/* Step Cards with Integrated Radar Verification */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {STEPS.map((step) => {
                  const status = stepStatus[step.id]; // 'idle' | 'checking' | 'too_fast' | 'verified'
                  const isVerified = status === 'verified';
                  const isChecking = status === 'checking';
                  const isTooFast = status === 'too_fast';

                  return (
                    <div
                      key={step.id}
                      className={`notes-step-row ${isVerified ? 'done-row' : ''} ${isTooFast ? 'warning-row' : ''} ${isChecking ? 'checking-row' : ''}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: isVerified ? 'var(--accent-green)' : isTooFast ? '#ef4444' : 'var(--text-dim)',
                            flexShrink: 0,
                            width: 20,
                            fontWeight: 700,
                          }}
                        >
                          {isVerified ? <i className="fa-solid fa-check" /> : step.num}
                        </div>

                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            flexShrink: 0,
                            background: isVerified ? 'rgba(16,185,129,0.12)' : isTooFast ? 'rgba(239,68,68,0.15)' : step.colorAlpha,
                            border: `1px solid ${isVerified ? 'rgba(16,185,129,0.35)' : isTooFast ? 'rgba(239,68,68,0.4)' : step.colorBorder}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.05rem',
                            color: isVerified ? 'var(--accent-green)' : isTooFast ? '#ef4444' : step.color,
                            transition: 'all 0.3s',
                          }}
                        >
                          <i className={isVerified ? 'fa-solid fa-check' : isChecking ? 'fa-solid fa-circle-notch fa-spin' : isTooFast ? 'fa-solid fa-triangle-exclamation' : step.icon} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '0.92rem',
                              color: isVerified ? 'var(--accent-green)' : isTooFast ? '#ef4444' : 'var(--text-main)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <span>{step.action} on {step.platform}</span>
                            {isVerified && (
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.62rem',
                                  color: 'var(--accent-green)',
                                  background: 'rgba(16,185,129,0.15)',
                                  padding: '1px 7px',
                                  borderRadius: 8,
                                  fontWeight: 700,
                                }}
                              >
                                VERIFIED ✓
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.7rem',
                              color: isVerified ? 'rgba(16,185,129,0.8)' : isTooFast ? '#ef4444' : 'var(--text-dim)',
                              marginTop: 2,
                            }}
                          >
                            {isVerified
                              ? 'Subscription confirmed ✓'
                              : isChecking
                              ? 'Verifying follow status in real-time...'
                              : isTooFast
                              ? 'Follow not detected yet — please hit follow'
                              : `Support ${step.handle}`}
                          </div>
                        </div>

                        {!isVerified && (
                          <button
                            onClick={() => handleFollowClick(step)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: 8,
                              border: `1px solid ${isTooFast ? 'rgba(239,68,68,0.4)' : step.colorBorder}`,
                              background: isTooFast ? 'rgba(239,68,68,0.12)' : step.colorAlpha,
                              color: isTooFast ? '#ef4444' : step.color,
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              transition: 'all 0.18s ease',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {isChecking ? (
                              <>
                                <i className="fa-solid fa-circle-notch fa-spin" /> Verifying...
                              </>
                            ) : isTooFast ? (
                              <>
                                <i className="fa-solid fa-rotate-right" /> Follow Now
                              </>
                            ) : (
                              <>
                                <span>{step.action}</span>
                                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.65rem' }} />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* In-Card Notice when user bounces too quickly */}
                      {isTooFast && (
                        <div
                          style={{
                            padding: '8px 12px',
                            borderRadius: 8,
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px dashed rgba(239, 68, 68, 0.3)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <i className="fa-solid fa-circle-exclamation" style={{ color: '#ef4444' }} />
                          <span>You returned too quickly! Click <strong>Follow Now</strong> above and hit Subscribe/Follow on {step.platform}.</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Unlock button */}
              <button
                className={shake ? 'shake' : ''}
                onClick={handleUnlock}
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  borderRadius: 12,
                  border: allDone ? 'none' : '1px solid var(--glass-border)',
                  cursor: allDone ? 'pointer' : 'not-allowed',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  background: allDone
                    ? 'linear-gradient(135deg, var(--primary-color) 0%, #7c3aed 100%)'
                    : 'rgba(255,255,255,0.04)',
                  color: allDone ? '#000d14' : 'var(--text-dim)',
                  boxShadow: allDone ? '0 0 32px rgba(0,212,255,0.3)' : 'none',
                  transition: 'all 0.25s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                {allDone ? (
                  <>
                    <i className="fa-solid fa-unlock" /> Unlock All 60+ Study Materials
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock" /> Complete & Verify {2 - completedCount} Follow Step{2 - completedCount !== 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════
               UNLOCKED — Full 60+ PDF Notes Library
          ══════════════════════════════════ */
          <NotesLibrary onRelock={handleRelock} />
        )}
      </div>
    </section>
  );
}
