import { useState } from 'react';

const projectData = [
  {
    id: 1,
    title: 'Personalized AI Chatbot',
    badges: [
      { text: 'React', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' },
      { text: 'OpenAI', color: 'var(--secondary-color)', bg: 'rgba(138, 43, 226, 0.1)' }
    ],
    desc: 'A complex deep-learning platform to automate high-fidelity conversational workflows. Complete with dynamic prompts.',
    fullDesc: 'The Forminne project is a sprawling generative AI orchestration interface built natively in React. The frontend manages heavy WebGL rendering components via hardware acceleration, connecting via WebSockets to a Node-based Python ML engine holding DALL-E and Sora APIs.',
    image: '/assets/project_video_dash_1775024426115.png',
    github: 'https://github.com/akshbuilds',
    liveLink: 'https://forminne.netlify.app/',
    delay: 'delay-1'
  },
  {
    id: 2,
    title: 'AI Model Tracking Hub',
    badges: [
      { text: 'React Native', color: 'var(--accent-color)', bg: 'rgba(255, 0, 85, 0.1)' },
      { text: 'GraphQL', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    desc: 'A sleek hyper-optimized minimalist mobile application prototyping active performance metrics metrics for various LLM instances.',
    fullDesc: 'Serving as the optimal command center for MLOps engineers, this React Native build compiles perfectly cross-platform. It digests vast datasets via GraphQL in sub-50ms latency intervals ensuring metrics are perfectly synced visually in real-time.',
    image: '/assets/project_ai_tracker_1775024442510.png',
    github: 'https://github.com/akshbuilds',
    liveLink: 'https://phenomenal-muffin-646633.netlify.app/',
    delay: 'delay-2'
  },
  {
    id: 3,
    title: 'Secure Fintech Backend API',
    badges: [
      { text: 'Node + Express', color: '#00ff88', bg: 'rgba(0, 255, 136, 0.1)' },
      { text: 'PostgreSQL', color: '#4facfe', bg: 'rgba(79, 172, 254, 0.1)' }
    ],
    desc: 'A rigorously load-tested enterprise API microservice built on Node.js managing encrypted financial transactions with OWASP standards.',
    fullDesc: 'Developed completely from scratch, this architectural specimen routes thousands of pseudo-financial requests globally. Integrated with bulletproof JWT Auth layers, bcrypt password hashing, input sanitization workflows, and a hyper-fast PostgreSQL data lake connection.',
    image: '/assets/project_backend_api_1775025512690.png',
    github: 'https://github.com/akshbuilds',
    delay: 'delay-3'
  },
  {
    id: 4,
    title: 'Advanced AI Chatbot',
    badges: [
      { text: 'TypeScript', color: '#ffcc00', bg: 'rgba(255, 204, 0, 0.1)' },
      { text: 'LangChain', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    desc: 'An ultra-intelligent conversational agent featuring contextual memory processing, complex document retrieval via RAG, and agentic workflows.',
    fullDesc: 'This AI Assistant bridges the gap between semantic understanding and actionable tasks. Utilizing multi-agent workflows, it not only parses natural language flawlessly but securely interfaces with external APIs using LangChain and strict system prompts.',
    image: '/assets/project_chatbot_1775025903371.png',
    github: 'https://github.com/akshbuilds',
    liveLink: 'https://phenomenal-muffin-646633.netlify.app/',
    delay: 'delay-1'
  },
  {
    id: 5,
    title: 'Premium-Chess Engine',
    badges: [
      { text: 'WebSockets', color: '#ff0055', bg: 'rgba(255, 0, 85, 0.1)' },
      { text: 'Next.js', color: '#FFF', bg: 'rgba(255, 255, 255, 0.1)' }
    ],
    desc: 'A massively scalable, highly-aesthetic multiplayer chess hub capable of hosting thousands of concurrent ultra-low latency matches.',
    fullDesc: 'Premium-Chess completely revolutionizes the chess-playing experience using WebRTC and robust Socket.io architecture. The responsive glassmorphism board features algorithmic move validations, ELO matchmaking algorithms, and breathtaking aesthetic animations without dropping a single frame.',
    image: '/assets/project_premium_chess_1775025919148.png',
    github: 'https://github.com/akshbuilds',
    liveLink: 'https://premium-chess.onrender.com/',
    delay: 'delay-2'
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);

  const activeProject = projectData.find(p => p.id === selectedId);

  // Close modal nicely when clicking outside inner content
  const handleOverlayClick = (e) => {
    if (e.target.className.includes('modal-overlay')) {
      setSelectedId(null);
    }
  };

  return (
    <>
      <section id="projects" className="projects section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Concept <span className="text-glow">Projects</span></h2>
            <p className="section-subtitle">Real UI/UX prototypes, Secure APIs, and AI integrations.</p>
          </div>
          
          <div className="projects-grid mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '30px' }}>
            
            {projectData.map((project) => (
              <div key={project.id} className={`project-card glass reveal ${project.delay}`} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => setSelectedId(project.id)}>
                <div className="project-img" style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="project-info" style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    {project.badges.map((b, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', background: b.bg, color: b.color, padding: '4px 10px', borderRadius: '4px' }}>
                        {b.text}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{project.title}</h3>
                  <p className="project-desc" style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
                    {project.desc}
                  </p>
                  <button className="btn btn-outline glow-hover" style={{ width: '100%' }}>
                    Open Details <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Interactive Project Modal */}
      <div className={`modal-overlay ${selectedId ? 'active' : ''}`} onClick={handleOverlayClick}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setSelectedId(null)}>×</button>
          
          {activeProject && (
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                {activeProject.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: '0.9rem', background: b.bg, color: b.color, padding: '6px 14px', borderRadius: '6px' }}>
                    {b.text}
                  </span>
                ))}
              </div>
              
              <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{activeProject.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '80%' }}>
                {activeProject.fullDesc}
              </p>
              
              <img src={activeProject.image} alt={activeProject.title} style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '30px' }} />
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {activeProject.liveLink && (
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ borderColor: '#00ff88', color: '#00ff88' }}>
                    <i className="fa-solid fa-rocket"></i> View Live Demo
                  </a>
                )}
                <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-btn">
                  <i className="fa-brands fa-github"></i> View App Source Code
                </a>
                <button className="btn btn-outline glow-hover" onClick={() => setSelectedId(null)}>
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
