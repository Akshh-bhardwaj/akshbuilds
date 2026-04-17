import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projectData = [
  {
    id: 6,
    title: 'DSA in C Masterclass',
    problem: 'Mastering core data structures and algorithms is essential for excelling in technical interviews at top tech companies.',
    solution: 'Built a comprehensive, well-documented repository of DSA problems and optimal solutions in C, covering dynamic programming, graphs, and advanced data structures.',
    badges: [
      { text: 'C', color: '#ffffff', bg: 'rgba(100, 100, 100, 0.3)' },
      { text: 'Algorithms', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    image: '/assets/project_dsa_c_cover.png',
    github: 'https://github.com/Akshh-bhardwaj/dsa-in-c'
  },
  {
    id: 1,
    title: 'Forminne - AI Agent OS',
    problem: 'Orchestrating multiple generative AI models (DALL-E, Sora, GPT) concurrently is chaotic for enterprises.',
    solution: 'Built a massive AI orchestration interface with hardware-accelerated WebGL rendering and WebSocket connections to a Node/Python ML engine.',
    badges: [
      { text: 'React', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' },
      { text: 'OpenAI API', color: 'var(--secondary-color)', bg: 'rgba(138, 43, 226, 0.1)' }
    ],
    image: '/assets/project_video_dash_1775024426115.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://forminne.netlify.app/'
  },
  {
    id: 2,
    title: 'AI Model Tracking Hub',
    problem: 'MLOps engineers lack real-time, low-latency visual performance metrics for various LLM instances.',
    solution: 'Developed a hyper-optimized mobile application prototype digesting vast datasets via GraphQL in sub-50ms latency.',
    badges: [
      { text: 'React Native', color: 'var(--accent-color)', bg: 'rgba(255, 0, 85, 0.1)' },
      { text: 'GraphQL', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    image: '/assets/project_ai_tracker_1775024442510.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://phenomenal-muffin-646633.netlify.app/'
  },
  {
    id: 3,
    title: 'Secure Fintech Backend',
    problem: 'Financial startup needed an impenetrable data microservice to handle thousands of requests.',
    solution: 'Engineered an OWASP-standard API routing thousands of pseudo-financial requests to a PostgreSQL data lake.',
    badges: [
      { text: 'Node.js', color: '#00ff88', bg: 'rgba(0, 255, 136, 0.1)' },
      { text: 'PostgreSQL', color: '#4facfe', bg: 'rgba(79, 172, 254, 0.1)' }
    ],
    image: '/assets/project_backend_api_1775025512690.webp',
    github: 'https://github.com/Akshh-bhardwaj'
  },
  {
    id: 4,
    title: 'Agentic RAG Assistant',
    problem: 'General chat AI fails at understanding contextual business documents.',
    solution: 'Designed an intelligent agent utilizing vector embeddings, LangChain, and multi-agent RAG for secure document extraction.',
    badges: [
      { text: 'TypeScript', color: '#ffcc00', bg: 'rgba(255, 204, 0, 0.1)' },
      { text: 'LangChain', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    image: '/assets/project_chatbot_1775025903371.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://phenomenal-muffin-646633.netlify.app/'
  },
  {
    id: 5,
    title: 'Premium-Chess Engine',
    problem: 'Standard chess interfaces drop frames and struggle with high-concurrent server loads.',
    solution: 'Built a highly aesthetic, scalable chess hub using Next.js and WebSockets with predictive move algorithms.',
    badges: [
      { text: 'WebSockets', color: '#ff0055', bg: 'rgba(255, 0, 85, 0.1)' },
      { text: 'Next.js', color: '#FFF', bg: 'rgba(255, 255, 255, 0.1)' }
    ],
    image: '/assets/project_premium_chess_1775025919148.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://premium-chess.onrender.com/'
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);

  const activeProject = projectData.find(p => p.id === selectedId);

  // Close modal on overlay click (correct check)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setSelectedId(null);
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedId !== null) setSelectedId(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <section id="projects" className="projects section">
        <div className="container">
          <div className="section-header reveal active">
            <h2 className="section-title">Case <span className="text-glow">Studies</span></h2>
            <p className="section-subtitle">Real problems solved through advanced engineering and design.</p>
          </div>
          
          <motion.div 
            className="projects-grid mt-4" 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projectData.map((project) => (
              <motion.div key={project.id} variants={itemVariants} className="project-card glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="project-img" style={{ height: '220px', width: '100%', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedId(project.id)}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="project-info" style={{ padding: '35px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    {project.badges.map((b, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', background: b.bg, color: b.color, padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
                        {b.text}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title" style={{ fontSize: '1.6rem', marginBottom: '15px' }}>{project.title}</h3>
                  <div style={{ marginBottom: '25px', flexGrow: 1 }}>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '8px' }}><strong>Problem:</strong> <span style={{ color: 'var(--text-muted)' }}>{project.problem}</span></p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}><strong>Solution:</strong> <span style={{ color: '#00f0ff' }}>{project.solution}</span></p>
                  </div>
                  
                  <div className="project-card-actions" style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-btn" style={{ flex: 1, padding: '10px' }}>
                        Live Demo <i className="fa-solid fa-arrow-up-right-from-square" style={{fontSize: '0.8rem'}}></i>
                      </a>
                    )}
                    <button className="btn btn-outline glow-hover" style={{ flex: project.liveLink ? 1 : '100%', padding: '10px' }} onClick={() => setSelectedId(project.id)}>
                      Notes Section
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Project Modal */}
      <div
        className={`modal-overlay ${selectedId ? 'active' : ''}`}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label={activeProject ? activeProject.title : 'Project details'}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={() => setSelectedId(null)} aria-label="Close project details">×</button>
          
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
              <div style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                 <h4 style={{ color: 'var(--text-main)', marginBottom: '10px' }}>The Challenge</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '20px' }}>{activeProject.problem}</p>
                 <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>The Solution</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{activeProject.solution}</p>
              </div>
              
              <img src={activeProject.image} alt={activeProject.title} loading="lazy" style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '30px' }} />
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {activeProject.liveLink && (
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ borderColor: '#00ff88', color: '#00ff88' }}>
                    <i className="fa-solid fa-rocket"></i> View Live Site
                  </a>
                )}
                <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-btn">
                  <i className="fa-brands fa-github"></i> Source Code
                </a>
                <button className="btn btn-outline glow-hover" onClick={() => setSelectedId(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
