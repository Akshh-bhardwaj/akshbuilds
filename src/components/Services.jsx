export default function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Web Development <span className="text-glow">Services</span></h2>
          <p className="section-subtitle">Delivering high-performance digital apps engineered meticulously using advanced AI.</p>
        </div>
        
        <div className="tools-grid mt-4">
          
          {/* Service 1 */}
          <div className="tool-card glass reveal delay-1" style={{ textAlign: 'center' }}>
            <div className="tool-icon-wrapper" style={{ margin: '0 auto 20px', background: 'rgba(0, 240, 255, 0.1)' }}>
              <i className="fa-solid fa-desktop glow-text"></i>
            </div>
            <h3 className="tool-name">Full-Stack Websites</h3>
            <p className="tool-desc" style={{ marginBottom: '15px' }}>
              From sleek SaaS landing pages to robust E-Commerce platforms. Tailored, blazing-fast, and responsive.
            </p>
            <a href="#contact" className="btn btn-outline glow-hover" style={{ width: '100%' }} aria-label="Get a quote for Full-Stack Website development">Get a Quote</a>
          </div>

          {/* Service 2 */}
          <div className="tool-card glass reveal delay-2" style={{ textAlign: 'center' }}>
            <div className="tool-icon-wrapper" style={{ margin: '0 auto 20px', background: 'rgba(138, 43, 226, 0.1)' }}>
              <i className="fa-solid fa-microchip" style={{ color: 'var(--secondary-color)', textShadow: '0 0 10px rgba(138,43,226,0.5)' }}></i>
            </div>
            <h3 className="tool-name">AI Workflow Integration</h3>
            <p className="tool-desc" style={{ marginBottom: '15px' }}>
              Need an intelligent chatbot or automated system on your site? I seamlessly integrate custom LLM tools into any project.
            </p>
            <a href="#contact" className="btn btn-outline glow-hover" style={{ width: '100%', borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }} aria-label="Learn more about AI Workflow Integration">Learn More</a>
          </div>

          {/* Service 3 */}
          <div className="tool-card glass reveal delay-3" style={{ textAlign: 'center' }}>
            <div className="tool-icon-wrapper" style={{ margin: '0 auto 20px', background: 'rgba(255, 0, 85, 0.1)' }}>
              <i className="fa-solid fa-pen-ruler" style={{ color: 'var(--accent-color)', textShadow: '0 0 10px rgba(255,0,85,0.5)' }}></i>
            </div>
            <h3 className="tool-name">Rapid UI Prototyping</h3>
            <p className="tool-desc" style={{ marginBottom: '15px' }}>
              Watch your vision come to life in days, not months. Utilizing Generative UI to produce breathtaking visual mocks instantly.
            </p>
            <a href="#contact" className="btn btn-outline glow-hover" style={{ width: '100%', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} aria-label="Hire me for Rapid UI Prototyping">Hire Me</a>
          </div>

          {/* Service 4 */}
          <div className="tool-card glass reveal delay-3" style={{ textAlign: 'center' }}>
            <div className="tool-icon-wrapper" style={{ margin: '0 auto 20px', background: 'rgba(0, 255, 136, 0.1)' }}>
              <i className="fa-solid fa-shield-halved" style={{ color: '#00ff88', textShadow: '0 0 10px rgba(0,255,136,0.5)' }}></i>
            </div>
            <h3 className="tool-name">Advanced Web Security</h3>
            <p className="tool-desc" style={{ marginBottom: '15px' }}>
              Built-in data encryption, flawless JWT authentication, and OWASP-compliant infrastructures to keep client data absolutely bulletproof.
            </p>
            <a href="#contact" className="btn btn-outline glow-hover" style={{ width: '100%', borderColor: '#00ff88', color: '#00ff88' }} aria-label="Contact about Advanced Web Security for your app">Secure your App</a>
          </div>

        </div>
      </div>
    </section>
  );
}
