import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_SECTIONS = ['home', 'tools', 'projects', 'notes', 'services', 'contact'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    let lastCheck = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));

          // Throttle DOM getBoundingClientRect to every 150ms to prevent layout thrashing
          const now = performance.now();
          if (location.pathname === '/' && now - lastCheck > 150) {
            lastCheck = now;
            let matchedSection = 'home';
            for (const id of [...NAV_SECTIONS].reverse()) {
              const el = document.getElementById(id);
              if (el && el.getBoundingClientRect().top <= 120) {
                matchedSection = id;
                break;
              }
            }
            setActiveSection(prev => (prev !== matchedSection ? matchedSection : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setMenuActive(!menuActive);
  const closeMenu = () => setMenuActive(false);

  const handleNavClick = (e, path, hash) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname !== path) {
      setTimeout(() => navigate(path + hash), 0);
    } else {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, '/', '')} className="logo">
          <span style={{ color: 'var(--text-main)' }}>aksh</span>
          <span className="text-glow">builds</span>
          <span style={{ color: 'var(--accent-color)' }}>.</span>
        </a>

        {/* Nav links */}
        <div className={`nav-links ${menuActive ? 'active' : ''}`}>
          <a href="/about"      onClick={(e) => handleNavClick(e, '/about', '')}     className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</a>
          <a href="/#projects"  onClick={(e) => handleNavClick(e, '/', '#projects')} className={`nav-link ${isHome && activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
          <a href="/#notes"     onClick={(e) => handleNavClick(e, '/', '#notes')}    className={`nav-link ${isHome && activeSection === 'notes'    ? 'active' : ''}`}>Notes</a>
          <a href="/#services"  onClick={(e) => handleNavClick(e, '/', '#services')} className={`nav-link ${isHome && activeSection === 'services'  ? 'active' : ''}`}>Services</a>
          <a href="/#contact"   onClick={(e) => handleNavClick(e, '/', '#contact')}  className={`nav-link ${isHome && activeSection === 'contact'   ? 'active' : ''}`}>Contact</a>
          <a href="https://www.linkedin.com/in/akshit-sharma-790601189/" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu} style={{ color: '#0a66c2' }}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/Akshh-bhardwaj" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu}>
            <i className="fa-brands fa-github"></i>
          </a>

          {/* Available for hire badge */}
          <span className="nav-status">
            <span className="nav-status-dot"></span>
            available
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          <i className={`fa-solid ${menuActive ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
}
