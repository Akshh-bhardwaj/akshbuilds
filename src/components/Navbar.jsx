import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuActive(!menuActive);
  const closeMenu = () => setMenuActive(false);

  const handleNavClick = (e, path, hash) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname !== path) {
      setTimeout(() => navigate(path + hash), 0);
      // Let the newly rendered page scroll after loading, but native hash usually scrolls if component mounts.
    } else {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" onClick={(e) => handleNavClick(e, '/', '')} className="logo" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
          <span style={{ color: 'var(--text-main)' }}>aksh</span><span className="text-glow">builds</span><span style={{ color: 'var(--accent-color)' }}>.</span>
        </a>
        
        <div className={`nav-links ${menuActive ? 'active' : ''}`}>
          <a href="/about" onClick={(e) => handleNavClick(e, '/about', '')} className="nav-link">About</a>
          <a href="/#projects" onClick={(e) => handleNavClick(e, '/', '#projects')} className="nav-link">Projects</a>
          <a href="/#services" onClick={(e) => handleNavClick(e, '/', '#services')} className="nav-link">Services</a>
          <a href="/#contact" onClick={(e) => handleNavClick(e, '/', '#contact')} className="nav-link">Contact</a>
          <a href="https://github.com/Akshh-bhardwaj" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu} style={{ color: 'var(--primary-color)' }}>
             <i className="fa-brands fa-github"></i> GitHub
          </a>
        </div>
        
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
