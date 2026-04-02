import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="hero container section">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="hero-badge glass">
          <i className="fa-solid fa-bolt" style={{ color: 'var(--accent-color)' }}></i> Peak Performance
        </motion.div>
        <motion.h1 variants={itemVariants} className="headline" style={{ lineHeight: '1.2' }}>
          I build AI-powered <br /> 
          <span className="text-glow">websites & tools <i className="fa-solid fa-rocket rocket-icon"></i></span>
        </motion.h1>
        <motion.p variants={itemVariants} className="subheading" style={{ fontSize: '1.25rem', marginTop: '15px' }}>
          Helping creators and businesses grow faster through cutting-edge, scalable digital solutions.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-buttons" style={{ flexWrap: 'wrap', marginTop: '30px', justifyContent: 'center', gap: '15px' }}>
          <a href="#projects" className="btn btn-primary glow-btn" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>
            🚀 View Projects
          </a>
          <a href="/about" className="btn btn-outline glow-hover" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>
            ℹ️ About Owner
          </a>
          <a href="https://www.instagram.com/akshbuilds/" target="_blank" rel="noopener noreferrer" className="btn btn-instagram glow-btn" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>
            <i className="fa-brands fa-instagram"></i> My Instagram
          </a>
          <a href="https://www.instagram.com/sptinstitute?igsh=MzRyZ3VucTdoanp5" target="_blank" rel="noopener noreferrer" className="btn btn-instagram glow-btn" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>
            <i className="fa-brands fa-instagram"></i> SPT Institute
          </a>
          <a href="https://sptinstitute.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>
            <i className="fa-solid fa-globe"></i> Website
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="hero-img-container"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <img 
          src="/assets/hero_brain_graphic_1775024409798.png" 
          alt="AI Futuristic Abstract Graphic" 
          className="hero-img"
        />
      </motion.div>
    </section>
  );
}
