import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="hero container section reveal">
      <div className="hero-content">
        <div className="hero-badge glass">
          <i className="fa-solid fa-bolt"></i> Future Ready
        </div>
        <h1 className="headline">
          I Build the Future <br /> 
          <span className="text-glow">with AI <i className="fa-solid fa-rocket rocket-icon"></i></span>
        </h1>
        <p className="subheading">Delivering breathtaking custom websites for businesses by leveraging the power of Generative AI.</p>
        
        <div className="hero-buttons" style={{ flexWrap: 'wrap' }}>
          <a href="#services" className="btn btn-primary glow-btn">Hire Me for Web Dev</a>
          <a href="https://www.instagram.com/akshbuilds/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary glass-btn">
            <i className="fa-brands fa-instagram"></i> Follow on Instagram
          </a>
          <Link to="/about" className="btn btn-outline glow-hover">
            <i className="fa-solid fa-user"></i> Know About Owner
          </Link>
        </div>
      </div>
      
      <div className="hero-img-container">
        <img 
          src="/assets/hero_brain_graphic_1775024409798.png" 
          alt="AI Futuristic Abstract Graphic" 
          className="hero-img"
        />
      </div>
    </section>
  );
}
