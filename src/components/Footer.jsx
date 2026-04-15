export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="logo-text">AkshBuilds</span>
        </div>
        
        <div className="footer-links">
          <a href="#tools">Tools</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/Akshh-bhardwaj" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i> GitHub
          </a>
          <a href="https://www.instagram.com/akshbuilds/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i> Instagram
          </a>
        </div>
        
        <div className="footer-copy">
          <p>&copy; <span>{year}</span> AkshBuilds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
