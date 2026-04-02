export default function Tools() {
  return (
    <section id="tools" className="tools section">
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Core <span className="text-glow">Tech Stack</span></h2>
          <p className="section-subtitle">Enterprise-grade technologies I use to build scalable, high-performance solutions.</p>
        </div>
        
        <div className="tools-grid">
          <div className="tool-card glass reveal delay-1">
            <div className="tool-icon-wrapper" style={{ fontSize: '2.5rem', color: '#61DAFB' }}>
              <i className="fa-brands fa-react"></i>
            </div>
            <h3 className="tool-name">React Ecosystem</h3>
            <p className="tool-desc">Expert in React, Next.js, and Vite for building lightning-fast, highly interactive single page applications and user interfaces.</p>
          </div>

          <div className="tool-card glass reveal delay-2">
            <div className="tool-icon-wrapper" style={{ fontSize: '2.5rem', color: '#68A063' }}>
              <i className="fa-brands fa-node-js"></i>
            </div>
            <h3 className="tool-name">Scalable Backends</h3>
            <p className="tool-desc">Building secure, high-throughput microservices using Node.js, Express, PostgreSQL, and low-latency WebSockets.</p>
          </div>

          <div className="tool-card glass reveal delay-3">
            <div className="tool-icon-wrapper" style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>
              <i className="fa-solid fa-microchip"></i>
            </div>
            <h3 className="tool-name">AI Orchestration</h3>
            <p className="tool-desc">Integrating cutting-edge LLMs (OpenAI, Claude) and building intelligent LangChain RAG agents into robust web platforms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
