import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/api/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (res.status === 401) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        setMessages(data);
        setLoading(false);
        setAuthError('');
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
        setLoading(false);
        if (err.message === 'Unauthorized') {
          // Clear invalid token
          setToken('');
          localStorage.removeItem('admin_token');
          setAuthError('Session expired or invalid key. Please log in again.');
        }
      });
  }, [token, API_URL]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setVerifying(true);
    setAuthError('');

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        headers: {
          'Authorization': `Bearer ${passwordInput}`
        }
      });

      if (response.status === 401) {
        setAuthError('Invalid Admin Secret Key.');
        setVerifying(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      localStorage.setItem('admin_token', passwordInput);
      setToken(passwordInput);
      setMessages(data);
      setAuthError('');
    } catch (err) {
      console.error('Login error:', err);
      setAuthError('Connection failed. Is the API server running?');
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setMessages([]);
    setPasswordInput('');
  };

  // Render Login Overlay if not authenticated
  if (!token) {
    return (
      <div className="admin-login-container container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="glass reveal active" style={{ padding: '40px', maxWidth: '450px', width: '100%', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
            <i className="fa-solid fa-lock glow-text"></i>
          </div>
          
          <h2 className="headline" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Admin access</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.95rem' }}>
            Enter your <strong>ADMIN_SECRET_KEY</strong> to view client project requests.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <label htmlFor="adminKey" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Secret Key</label>
              <input 
                type="password" 
                id="adminKey" 
                className="glass-input" 
                required 
                placeholder="••••••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
              />
            </div>

            {authError && (
              <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', margin: '5px 0 0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-triangle-exclamation"></i> {authError}
              </p>
            )}

            <button 
              type="submit" 
              className="btn btn-primary glow-btn"
              disabled={verifying}
              style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}
            >
              {verifying ? (
                <>Verifying... <i className="fa-solid fa-spinner fa-spin"></i></>
              ) : (
                <>Unlock Dashboard <i className="fa-solid fa-key"></i></>
              )}
            </button>
          </form>

          <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
            <a href="/" className="btn btn-outline glow-hover" style={{ display: 'inline-block', width: '100%', padding: '10px' }}>
              <i className="fa-solid fa-arrow-left"></i> Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="admin-header reveal active" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
        <div>
          <h1 className="headline" style={{ fontSize: '3rem', margin: 0 }}><span className="text-glow">Admin</span> Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0' }}>Manage incoming client quotes and project requests.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={handleLogout} className="btn btn-outline glow-hover" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
          <a href="/" className="btn btn-outline glow-hover"><i className="fa-solid fa-arrow-left"></i> Back to Home</a>
        </div>
      </div>

      <div className="glass reveal active" style={{ padding: '30px', border: '1px solid var(--glass-border)' }}>
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
          <i className="fa-solid fa-envelope glow-text" style={{ color: 'var(--primary-color)' }}></i> Inbox ({messages.length})
        </h2>
        
        {loading ? (
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ color: 'var(--primary-color)' }}></i> Loading client messages...
          </p>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 40px', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-folder-open" style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.4 }}></i>
            <p>No messages received yet. Share your portfolio contact form to get quotes!</p>
          </div>
        ) : (
          <div className="messages-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg) => (
              <div key={msg.id} className="message-card" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', padding: '25px', borderRadius: '12px', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.25rem' }}>{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: '4px' }}>
                      <i className="fa-solid fa-envelope" style={{ fontSize: '0.8rem' }}></i> {msg.email}
                    </a>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                    <i className="fa-regular fa-clock"></i> {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                <div style={{ margin: 0, lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '18px', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)', color: 'var(--text-main)', fontSize: '0.98rem' }}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
