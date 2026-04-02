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
          <h2 className="section-title">Let's <span className="text-glow">Build Together</span></h2>
          <p className="section-subtitle">Ready to transform your idea into a high-performance digital product?</p>
        </div>
        
        <div className="reveal delay-1" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <a href="mailto:akshubhardwaj231@gmail.com" className="btn btn-primary glow-btn" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            <i className="fa-solid fa-envelope"></i> Email Me Direct
          </a>
          <a href="https://github.com/Akshh-bhardwaj/akshbuilds" target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            <i className="fa-brands fa-github"></i> View GitHub Code
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
