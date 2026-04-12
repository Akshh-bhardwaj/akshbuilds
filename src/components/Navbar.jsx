import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuActive(!menuActive);
  const closeMenu = () => setMenuActive(false);

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
          <span style={{ color: 'var(--text-main)' }}>aksh</span><span className="text-glow">builds</span><span style={{ color: 'var(--accent-color)' }}>.</span>
        </a>
        
        <div className={`nav-links ${menuActive ? 'active' : ''}`}>
          <a href="#about" className="nav-link" onClick={closeMenu}>About</a>
          <a href="#projects" className="nav-link" onClick={closeMenu}>Projects</a>
          <a href="#services" className="nav-link" onClick={closeMenu}>Services</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
          <a href="https://github.com/akshbuilds" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu} style={{ color: 'var(--primary-color)' }}>
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
