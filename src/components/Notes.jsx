import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    desc: 'Browse all 40+ curated, handwritten, and classroom-tested PDF notes.',
  },
  {
    id: 'dsa',
    label: 'DSA & Algorithms',
    icon: 'fa-solid fa-code',
    color: '#00d4ff',
    colorAlpha: 'rgba(0,212,255,0.12)',
    colorBorder: 'rgba(0,212,255,0.3)',
    colorGlow: 'rgba(0,212,255,0.4)',
    desc: 'Arrays, Linked Lists, Trees & Hashing, 60+ LeetCode Solutions, 2D Arrays, and Searching/Sorting.',
  },
  {
    id: 'java',
    label: 'Java Core & Practice',
    icon: 'fa-brands fa-java',
    color: '#fbbf24',
    colorAlpha: 'rgba(251,191,36,0.12)',
    colorBorder: 'rgba(251,191,36,0.3)',
    colorGlow: 'rgba(251,191,36,0.4)',
    desc: 'Handwritten notes, 15+ practice questions, loops, arrays, ArrayList, Strings, and theory question banks.',
  },
  {
    id: 'web',
    label: 'Web Dev & CSS',
    icon: 'fa-brands fa-html5',
    color: '#61dafb',
    colorAlpha: 'rgba(97,218,251,0.12)',
    colorBorder: 'rgba(97,218,251,0.3)',
    colorGlow: 'rgba(97,218,251,0.4)',
    desc: 'Complete 37-page CSS guide, responsive design, CSS variables, HTML crash courses, and 100-day roadmap.',
  },
  {
    id: 'db',
    label: 'Databases & SQL',
    icon: 'fa-solid fa-database',
    color: '#10b981',
    colorAlpha: 'rgba(16,185,129,0.12)',
    colorBorder: 'rgba(16,185,129,0.3)',
    colorGlow: 'rgba(16,185,129,0.4)',
    desc: 'Complete SQL notes: DDL, DML, Joins, Aggregations, Group By, Subqueries, and Indexing fundamentals.',
  },
  {
    id: 'python',
    label: 'Python & Data Science',
    icon: 'fa-brands fa-python',
    color: '#a78bfa',
    colorAlpha: 'rgba(167,139,250,0.12)',
    colorBorder: 'rgba(167,139,250,0.3)',
    colorGlow: 'rgba(167,139,250,0.4)',
    desc: 'Python syntax basics, transition to data science with NumPy and Pandas, and lecture lesson plans.',
  },
  {
    id: 'roadmaps',
    label: 'Career Roadmaps',
    icon: 'fa-solid fa-map-location-dot',
    color: '#f43f5e',
    colorAlpha: 'rgba(244,63,94,0.12)',
    colorBorder: 'rgba(244,63,94,0.3)',
    colorGlow: 'rgba(244,63,94,0.4)',
    desc: 'Self-paced career roadmaps for Cloud Computing, Cybersecurity, and Machine Learning engineering.',
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
    // Lock scroll when open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!pdf) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
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
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '90vh',
          background: 'rgba(13, 17, 23, 0.96)',
          border: '1px solid rgba(0, 212, 255, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 212, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
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
              className="notes-modal-action-btn"
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
              className="notes-modal-action-btn"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
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
      </motion.div>
    </motion.div>
  );
}

// ─── UNLOCKED NOTES LIBRARY ─────────────────────────────────────────────────
function NotesLibrary({ onRelock }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);

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

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: NOTES_MANIFEST.length };
    NOTES_MANIFEST.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });
    return counts;
  }, []);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <motion.div
      key="library"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <style>{`
        .notes-search-bar {
          position: relative;
          width: 100%;
          max-width: 480px;
        }
        .notes-search-input {
          width: 100%;
          padding: 12px 18px 12px 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          outline: none;
          transition: all 0.25s ease;
        }
        .notes-search-input:focus {
          border-color: var(--primary-color);
          background: rgba(0, 212, 255, 0.04);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
        }
        .notes-tab-bar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
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
        .notes-pdf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        @media (max-width: 640px) {
          .notes-pdf-grid {
            grid-template-columns: 1fr;
          }
        }
        .pdf-card {
          border-radius: 18px;
          border: 1px solid var(--glass-border);
          background: rgba(13, 17, 23, 0.88);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          position: relative;
          overflow: hidden;
          contain: content;
          transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .pdf-card:hover {
          transform: translateY(-5px);
          border-color: var(--card-glow-color, rgba(0,212,255,0.4));
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px var(--card-glow-alpha, rgba(0,212,255,0.15));
        }
        .pdf-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 14px;
          border-radius: 10px;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
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
          box-shadow: 0 0 16px rgba(0, 212, 255, 0.5);
          transform: translateY(-1px);
        }
        .pdf-card-btn-dl {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-green);
          padding: 9px 14px;
        }
        .pdf-card-btn-dl:hover {
          background: var(--accent-green);
          color: #000;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.5);
          transform: translateY(-1px);
        }
        .pdf-card-btn-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          color: var(--text-dim);
          padding: 9px 12px;
        }
        .pdf-card-btn-tab:hover {
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Top Banner & Persistence Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          padding: '16px 22px',
          borderRadius: '16px',
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
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.94rem', color: 'var(--accent-green)' }}>
              Full Study Library Unlocked!
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              40+ verified notes and handbooks ready for instant in-browser preview or offline download.
            </div>
          </div>
        </div>

        {/* Search bar & Relock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '440px' }}>
          <div className="notes-search-bar" style={{ flex: 1 }}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                fontSize: '0.85rem',
              }}
            />
            <input
              type="text"
              className="notes-search-input"
              placeholder="Search 40+ notes (e.g. Trees, Java, SQL, CSS)..."
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
              padding: '11px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-dim)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            <i className="fa-solid fa-lock" style={{ marginRight: 6 }} />
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
            <motion.button
              key={cat.id}
              className={`notes-tab${isActive ? ' active-tab' : ''}`}
              onClick={() => setActiveTab(cat.id)}
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
              {isActive && (
                <motion.span
                  layoutId="activeNotesTabIndicator"
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
          marginBottom: '10px',
        }}
      >
        <div>
          <span style={{ color: activeCategoryMeta.color, fontWeight: 700 }}>// {activeCategoryMeta.label}</span> —{' '}
          {activeCategoryMeta.desc}
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
          Showing <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{filteredNotes.length}</span> note
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
            borderRadius: '20px',
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
              setActiveTab('all');
            }}
            className="notes-tab"
            style={{ marginTop: 14 }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Notes Grid */}
      <motion.div layout className="notes-pdf-grid">
        <AnimatePresence>
          {filteredNotes.map((note) => {
            const catMeta = CATEGORIES.find((c) => c.id === note.category) || CATEGORIES[1];
            return (
              <motion.div
                layout
                key={note.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="pdf-card"
                style={{
                  '--card-glow-color': catMeta.color,
                  '--card-glow-alpha': catMeta.colorAlpha,
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 14 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.67rem',
                        fontWeight: 700,
                        padding: '3px 9px',
                        borderRadius: '20px',
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
                      fontSize: '1.02rem',
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
                      fontSize: '0.82rem',
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* PDF Modal Reader */}
      <AnimatePresence>
        {previewPdf && <PdfPreviewModal pdf={previewPdf} onClose={() => setPreviewPdf(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Notes() {
  const [done, setDone] = useState({ yt: false, ig: false });
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

  const allDone = done.yt && done.ig;
  const completedCount = (done.yt ? 1 : 0) + (done.ig ? 1 : 0);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === (hoveredTopic || selectedTopic)) || CATEGORIES[1];

  // Pick 3 representative notes for preview in the locked gate
  const previewNotes = useMemo(() => {
    const targetCat = hoveredTopic || selectedTopic;
    const catNotes = NOTES_MANIFEST.filter((n) => targetCat === 'all' || n.category === targetCat);
    return catNotes.slice(0, 3);
  }, [hoveredTopic, selectedTopic]);

  const handleStep = (step) => {
    window.open(step.url, '_blank', 'noopener,noreferrer');
    setDone((prev) => ({ ...prev, [step.id]: true }));
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
    setDone({ yt: false, ig: false });
    try {
      localStorage.removeItem('akshbuilds_notes_unlocked');
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
          transition: all 0.3s;
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
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 40 }}
        >
          <span className="section-label">// study materials & cheatsheets</span>
          <h2 className="section-title">
            Complete <span className="text-glow">PDF Notes & Handbook</span>
          </h2>
          <p className="section-subtitle">
            40+ hand-crafted PDF notes, algorithms, handwritten sheets, and roadmaps — free for all community supporters.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ══════════════════════════════════
               LOCKED — Split Gate
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
                boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${activeCategoryMeta.colorAlpha}`,
                borderColor: activeCategoryMeta.colorBorder,
              }}
            >
              {/* LEFT — Topics & Notes Preview */}
              <div className="notes-left">
                <div>
                  <div className="notes-big-num">40+</div>
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
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes Preview Inside Selected Category */}
                <motion.div
                  key={activeCategoryMeta.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 14,
                    background: 'rgba(0,0,0,0.35)',
                    border: `1px solid ${activeCategoryMeta.colorBorder}`,
                    boxShadow: `0 0 20px ${activeCategoryMeta.colorAlpha}`,
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
                </motion.div>
              </div>

              {/* RIGHT — Unlock Steps */}
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
                      Get instant access to all PDF notes.
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
                    <span>unlock progress</span>
                    <span style={{ color: allDone ? 'var(--accent-green)' : 'var(--primary-color)', fontWeight: 600 }}>
                      {completedCount}/2 completed
                    </span>
                  </div>
                  <div className="notes-progress-track">
                    <div className="notes-progress-fill" style={{ width: `${(completedCount / 2) * 100}%` }} />
                  </div>
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {STEPS.map((step) => {
                    const isDone = done[step.id];
                    return (
                      <motion.div
                        key={step.id}
                        className={`notes-step-row${isDone ? ' done-row' : ''}`}
                        onClick={() => !isDone && handleStep(step)}
                        whileHover={!isDone ? { x: 4, borderColor: step.color, boxShadow: `0 0 20px ${step.colorAlpha}` } : {}}
                        style={{ cursor: isDone ? 'default' : 'pointer' }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: isDone ? 'var(--accent-green)' : 'var(--text-dim)',
                            flexShrink: 0,
                            width: 24,
                            fontWeight: 700,
                          }}
                        >
                          {isDone ? <i className="fa-solid fa-check" /> : step.num}
                        </div>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            flexShrink: 0,
                            background: isDone ? 'rgba(16,185,129,0.12)' : step.colorAlpha,
                            border: `1px solid ${isDone ? 'rgba(16,185,129,0.3)' : step.colorBorder}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.05rem',
                            color: isDone ? 'var(--accent-green)' : step.color,
                            transition: 'all 0.3s',
                          }}
                        >
                          <i className={isDone ? 'fa-solid fa-check' : step.icon} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '0.92rem',
                              color: isDone ? 'var(--accent-green)' : 'var(--text-main)',
                            }}
                          >
                            {step.action} on {step.platform}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.7rem',
                              color: isDone ? 'rgba(16,185,129,0.7)' : step.color,
                              opacity: 0.9,
                              marginTop: 2,
                            }}
                          >
                            {isDone ? 'verified ✓' : step.handle}
                          </div>
                        </div>
                        {!isDone && (
                          <i
                            className="fa-solid fa-arrow-up-right-from-square"
                            style={{ color: 'var(--text-dim)', fontSize: '0.75rem', flexShrink: 0 }}
                          />
                        )}
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
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  {allDone ? (
                    <>
                      <i className="fa-solid fa-unlock" /> Unlock All Study Materials
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-lock" /> Complete {2 - completedCount} step
                      {2 - completedCount !== 1 ? 's' : ''} above
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ══════════════════════════════════
                 UNLOCKED — Full PDF Notes Library
            ══════════════════════════════════ */
            <NotesLibrary onRelock={handleRelock} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
