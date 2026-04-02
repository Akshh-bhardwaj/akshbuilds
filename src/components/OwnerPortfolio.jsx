import React from 'react';

export default function OwnerPortfolio() {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Meet the <span className="text-glow">Founder</span></h2>
          <p className="section-subtitle">AI Engineer & Tech Enthusiast building scalable, futuristic solutions.</p>
        </div>

        <div className="portfolio-content">
          <div className="portfolio-bio glass reveal delay-1">
            <h3>About Aksh</h3>
            <p>
              Hey! I am Aksh, an innovative developer passionate about artificial intelligence, modern web architectures, and creating tools that solve real-world problems. 
              My journey revolves around optimizing workflows, building high-performance applications, and exploring the bleeding edge of AI capabilities.
            </p>
            <div className="portfolio-actions mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover">
                <i className="fa-brands fa-github"></i> View GitHub
              </a>
              <a href="/#contact" className="btn btn-primary glow-btn" style={{ marginLeft: '15px' }}>
                Website Contact
              </a>
            </div>
          </div>

          <div className="portfolio-skills glass reveal delay-2">
            <h3>Tech Arsenal</h3>
            <div className="skills-grid">
              <span className="skill-badge"><i className="fa-brands fa-react"></i> React & Next.js</span>
              <span className="skill-badge"><i className="fa-brands fa-node-js"></i> Node & Express</span>
              <span className="skill-badge"><i className="fa-solid fa-brain"></i> AI Engineering</span>
              <span className="skill-badge"><i className="fa-brands fa-python"></i> Python</span>
              <span className="skill-badge"><i className="fa-solid fa-database"></i> SQL & MongoDB</span>
              <span className="skill-badge"><i className="fa-brands fa-figma"></i> UI/UX Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
