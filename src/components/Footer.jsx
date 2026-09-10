export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* Brand */}
        <div className="footer-brand">
          <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-0.5px' }}>
            <span style={{ color: 'var(--text-main)' }}>aksh</span>
            <span className="text-glow">builds</span>
            <span style={{ color: 'var(--accent-color)' }}>.</span>
          </div>
          <div className="footer-tagline">building fast · secure · scalable</div>
        </div>

        {/* Nav links */}
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="https://www.linkedin.com/in/akshit-sharma-790601189/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i> LinkedIn
          </a>
          <a href="https://github.com/Akshh-bhardwaj" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i> GitHub
          </a>
          <a href="https://www.instagram.com/akshbuilds/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i> Instagram
          </a>
          <a href="https://www.youtube.com/@Akshbuilds" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-youtube"></i> YouTube
          </a>
          <a href="mailto:akshbuilds@gmail.com">
            <i className="fa-solid fa-envelope"></i> Email
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          <span style={{ color: 'var(--text-dim)' }}>© {year} </span>
          <span className="accent">AkshBuilds</span>
          <span style={{ color: 'var(--text-dim)' }}> · MIT License · Built with React + Vite</span>
        </div>

      </div>
    </footer>
  );
}
