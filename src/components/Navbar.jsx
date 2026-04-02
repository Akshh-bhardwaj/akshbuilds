import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuActive(!menuActive);
  const closeMenu = () => setMenuActive(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'SPT Institute', href: '#learning' },
    { name: 'Socials', href: '#social' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo">
          aksh<span className="text-glow">builds.</span>
        </a>
        
        <div className={`nav-links ${menuActive ? 'active' : ''}`}>
          <Link to="/about" className="nav-link" onClick={closeMenu} style={{ color: 'var(--accent-color)' }}>
            <i className="fa-solid fa-user"></i> About Owner
          </Link>
          
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link" onClick={closeMenu}>{link.name}</a>
          ))}
          <a href="https://github.com/akshbuilds" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={closeMenu} style={{ color: 'var(--primary-color)' }}>
             <i className="fa-brands fa-github"></i> GitHub
          </a>
        </div>
        
        <div className="hamburger" onClick={toggleMenu}>
          <i className={`fa-solid ${menuActive ? 'fa-xmark' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
}
