import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container reveal">
        <div className="section-header">
          <h2 className="section-title">Start a <span className="text-glow">Project</span></h2>
          <p className="section-subtitle">Let's build something phenomenal together.</p>
        </div>
        
        <div className="reveal delay-1" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <a href="mailto:akshubhardwaj231@gmail.com" className="btn btn-outline glow-hover" style={{ fontSize: '1.2rem', padding: '15px 30px', background: 'rgba(0, 240, 255, 0.05)', borderColor: 'var(--primary-color)' }}>
            <i className="fa-solid fa-envelope"></i> akshubhardwaj231@gmail.com
          </a>
        </div>
        
        <form className="contact-form glass reveal delay-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name or Company</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="glass-input" 
              required 
              placeholder="e.g. Acme Corp"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="glass-input" 
              required 
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Website Requirements / Project Details</label>
            <textarea 
              id="message" 
              name="message" 
              className="glass-input" 
              rows="5" 
              required 
              placeholder="What kind of amazing website can I build for you?"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className={`btn submit-btn ${status === 'success' ? '' : 'btn-primary glow-btn'}`}
            disabled={status !== 'idle'}
            style={status === 'success' ? { background: '#00c853', color: '#fff', borderColor: '#00c853' } : {}}
          >
            {status === 'idle' && (
              <><span>Get a Free Quote</span> <i className="fa-solid fa-paper-plane"></i></>
            )}
            {status === 'sending' && (
              <><span>Sending...</span> <i className="fa-solid fa-spinner fa-spin"></i></>
            )}
            {status === 'success' && (
              <><span>Request Received!</span> <i className="fa-solid fa-check"></i></>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
