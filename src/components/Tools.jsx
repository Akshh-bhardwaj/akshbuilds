export default function Tools() {
  return (
    <section id="tools" className="tools section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">My <span className="text-glow">Gen AI Stack</span></h2>
          <p className="section-subtitle">How I build breathtaking, high-performance websites seamlessly at record speeds.</p>
        </div>
        
        <div className="tools-grid">
          {/* Tool Card 1 */}
          <div className="tool-card glass reveal delay-1">
            <div className="tool-icon-wrapper">
              <i className="fa-solid fa-code glow-text"></i>
            </div>
            <h3 className="tool-name">Claude 3.5 Sonnet</h3>
            <div className="replaces-badge" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary-color)', borderColor: 'rgba(0, 240, 255, 0.2)' }}>
              <span>Role:</span> <strong>Core Logic</strong>
            </div>
            <p className="tool-desc">The ultimate generative AI for writing flawlessly optimized React components, complex backend integrations, and airtight website logic.</p>
          </div>

          {/* Tool Card 2 */}
          <div className="tool-card glass reveal delay-2">
            <div className="tool-icon-wrapper">
              <i className="fa-solid fa-wand-magic-sparkles glow-text"></i>
            </div>
            <h3 className="tool-name">v0.dev / Cursor</h3>
            <div className="replaces-badge" style={{ background: 'rgba(138, 43, 226, 0.1)', color: 'var(--secondary-color)', borderColor: 'rgba(138, 43, 226, 0.2)' }}>
              <span>Role:</span> <strong>Rapid Prototyping</strong>
            </div>
            <p className="tool-desc">Generative UI tools that allow me to instantly convert design workflows into highly scalable responsive websites and dashboards for clients.</p>
          </div>

          {/* Tool Card 3 */}
          <div className="tool-card glass reveal delay-3">
            <div className="tool-icon-wrapper">
              <i className="fa-solid fa-paintbrush glow-text"></i>
            </div>
            <h3 className="tool-name">Midjourney / Figma</h3>
            <div className="replaces-badge" style={{ background: 'rgba(255, 0, 85, 0.1)', color: 'var(--accent-color)', borderColor: 'rgba(255, 0, 85, 0.2)' }}>
              <span>Role:</span> <strong>Brand Aesthetics</strong>
            </div>
            <p className="tool-desc">Generating bespoke, royalty-free graphical assets and seamlessly integrating them into pixel-perfect modern web layouts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
