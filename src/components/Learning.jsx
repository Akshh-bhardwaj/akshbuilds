export default function Learning() {
  return (
    <section id="learning" className="learning section" style={{ background: 'rgba(0, 0, 0, 0.4)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container">
        
        <div className="learning-card glass reveal" style={{ padding: '60px', textAlign: 'center', border: '1px solid rgba(0, 240, 255, 0.2)', boxShadow: '0 0 50px rgba(0,240,255,0.05)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
            <i className="fa-solid fa-graduation-cap glow-text"></i>
          </div>
          
          <h2 className="section-title" style={{ fontSize: '2.8rem', marginBottom: '15px' }}>
            Ready to <span className="text-glow">Learn from the Best?</span>
          </h2>
          
          <p className="section-subtitle" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', color: 'var(--text-main)' }}>
            Join the <strong style={{ color: 'var(--primary-color)' }}>SPT Institute</strong> to master AI, modern software development, and elite tech stacks. Turn your passion into a lucrative career.
          </p>
          
          <div className="learning-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://www.instagram.com/sptinstitute?igsh=MzRyZ3VucTdoanp5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-instagram glow-btn"
              style={{ fontSize: '1.1rem', padding: '15px 35px' }}
            >
              <i className="fa-brands fa-instagram"></i> Follow SPT Institute
            </a>
            
            <a 
              href="https://sptinstitute.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline glow-hover"
              style={{ fontSize: '1.1rem', padding: '15px 35px' }}
            >
              <i className="fa-solid fa-globe"></i> Visit sptinstitute.com
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
