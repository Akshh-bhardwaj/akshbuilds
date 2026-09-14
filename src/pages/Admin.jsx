import React, { useState, useEffect } from 'react';

const MASTER_ADMIN_PASSWORD = 'Aksh@1234';

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [sourceType, setSourceType] = useState('server'); // 'server' | 'local'

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Helper to load locally captured inquiries from the Contact form
  const getLocalInquiries = () => {
    try {
      const saved = localStorage.getItem('akshbuilds_inquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item, idx) => ({
          id: item.id || `local-${idx}-${Date.now()}`,
          name: item.name || 'Anonymous Client',
          email: item.email || 'No email provided',
          message: item.budget ? `[Budget: ${item.budget}] ${item.message}` : item.message,
          created_at: item.timestamp || new Date().toISOString()
        }));
      }
    } catch (e) {
      console.error('Error reading local inquiries:', e);
    }
    return [];
  };

  const loadMessages = async (authToken) => {
    setLoading(true);
    let serverMessages = [];
    let serverConnected = false;

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (res.status === 401) {
        if (authToken !== MASTER_ADMIN_PASSWORD) {
          throw new Error('Unauthorized');
        }
      } else if (res.ok) {
        serverMessages = await res.json();
        serverConnected = true;
      }
    } catch (err) {
      // Backend server may be offline or unhosted
      if (err.message === 'Unauthorized') {
        setToken('');
        localStorage.removeItem('admin_token');
        setAuthError('Session expired. Please log in again.');
        setLoading(false);
        return;
      }
    }

    const localMsgs = getLocalInquiries();

    // Merge server messages and local inquiries, removing duplicates by email + message
    const combined = [...serverMessages];
    localMsgs.forEach(loc => {
      const exists = combined.some(s => s.email === loc.email && s.message === loc.message);
      if (!exists) {
        combined.push(loc);
      }
    });

    setMessages(combined);
    setSourceType(serverConnected ? 'server' : 'local');
    setLoading(false);
    setAuthError('');
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    loadMessages(token);
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanPassword = passwordInput.trim();
    if (!cleanPassword) return;

    setVerifying(true);
    setAuthError('');

    // Check if entered password matches Master Admin Password
    if (cleanPassword === MASTER_ADMIN_PASSWORD) {
      localStorage.setItem('admin_token', cleanPassword);
      setToken(cleanPassword);
      await loadMessages(cleanPassword);
      setVerifying(false);
      return;
    }

    // Otherwise test against backend API
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        headers: {
          'Authorization': `Bearer ${cleanPassword}`
        }
      });

      if (response.status === 401 || !response.ok) {
        setAuthError('Invalid Admin Password. Please try again.');
        setVerifying(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem('admin_token', cleanPassword);
      setToken(cleanPassword);
      setMessages(data);
      setSourceType('server');
      setAuthError('');
    } catch (err) {
      setAuthError('Invalid Admin Password.');
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

  const handleDeleteMessage = (idxToDelete) => {
    const updated = messages.filter((_, idx) => idx !== idxToDelete);
    setMessages(updated);
    try {
      localStorage.setItem('akshbuilds_inquiries', JSON.stringify(updated));
    } catch {}
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored inbox messages?')) {
      setMessages([]);
      try {
        localStorage.removeItem('akshbuilds_inquiries');
      } catch {}
    }
  };

  // Render Login Overlay if not authenticated
  if (!token) {
    return (
      <div className="admin-login-container container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="glass reveal active" style={{ padding: '40px', maxWidth: '450px', width: '100%', textAlign: 'center', border: '1px solid var(--glass-border)', borderRadius: '16px', backdropFilter: 'blur(20px)', background: 'rgba(6, 18, 32, 0.85)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--primary-color)' }}>
            <i className="fa-solid fa-shield-halved glow-text"></i>
          </div>
          
          <h2 className="headline" style={{ fontSize: '2rem', marginBottom: '8px', color: '#fff' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '0.9rem' }}>
            Enter your admin password to view incoming client project inquiries.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <label htmlFor="adminKey" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#cbd5e1' }}>Admin Password</label>
              <input 
                type="password" 
                id="adminKey" 
                className="glass-input" 
                required 
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontSize: '0.95rem' }}
              />
            </div>

            {authError && (
              <p style={{ color: 'var(--accent-color)', fontSize: '0.85rem', margin: '4px 0 0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-triangle-exclamation"></i> {authError}
              </p>
            )}

            <button 
              type="submit" 
              className="btn btn-primary glow-btn"
              disabled={verifying}
              style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '8px', fontWeight: 600 }}
            >
              {verifying ? (
                <>Verifying... <i className="fa-solid fa-spinner fa-spin"></i></>
              ) : (
                <>Unlock Dashboard <i className="fa-solid fa-key"></i></>
              )}
            </button>
          </form>

          <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
            <a href="/" className="btn btn-outline glow-hover" style={{ display: 'inline-block', width: '100%', padding: '10px', borderRadius: '8px', textDecoration: 'none' }}>
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
          <h1 className="headline" style={{ fontSize: '2.6rem', margin: 0 }}><span className="text-glow">Admin</span> Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Manage incoming client quotes and project requests.</span>
            <span style={{ 
              fontSize: '0.75rem', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              background: sourceType === 'server' ? 'rgba(16,185,129,0.15)' : 'rgba(0,212,255,0.15)',
              color: sourceType === 'server' ? '#10b981' : '#00d4ff',
              border: `1px solid ${sourceType === 'server' ? 'rgba(16,185,129,0.3)' : 'rgba(0,212,255,0.3)'}`
            }}>
              <i className={`fa-solid ${sourceType === 'server' ? 'fa-signal' : 'fa-database'}`} style={{ marginRight: '4px' }}></i>
              {sourceType === 'server' ? 'Live Server Sync' : 'Local Storage Sync'}
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {messages.length > 0 && (
            <button onClick={handleClearAll} className="btn btn-outline" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '8px 16px', borderRadius: '8px' }}>
              <i className="fa-solid fa-trash-can"></i> Clear All
            </button>
          )}
          <button onClick={handleLogout} className="btn btn-outline glow-hover" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)', padding: '8px 16px', borderRadius: '8px' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
          <a href="/" className="btn btn-outline glow-hover" style={{ padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </a>
        </div>
      </div>

      <div className="glass reveal active" style={{ padding: '30px', border: '1px solid var(--glass-border)', borderRadius: '16px', background: 'rgba(6, 18, 32, 0.7)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem' }}>
            <i className="fa-solid fa-envelope glow-text" style={{ color: 'var(--primary-color)' }}></i> Inbox ({messages.length})
          </h2>
          <button 
            onClick={() => loadMessages(token)} 
            className="btn btn-outline" 
            style={{ fontSize: '0.85rem', padding: '6px 14px', borderRadius: '8px' }}
            title="Refresh Messages"
          >
            <i className="fa-solid fa-arrows-rotate"></i> Refresh
          </button>
        </div>
        
        {loading ? (
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ color: 'var(--primary-color)' }}></i> Loading client messages...
          </p>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 40px', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-folder-open" style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.4 }}></i>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8' }}>No messages received yet.</p>
            <p style={{ fontSize: '0.85rem', maxWidth: '400px', margin: '8px auto 0' }}>Client inquiries submitted via the Contact form will appear here automatically.</p>
          </div>
        ) : (
          <div className="messages-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg, idx) => (
              <div key={msg.id || idx} className="message-card" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', padding: '22px', borderRadius: '12px', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 600 }}>{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: '4px' }}>
                      <i className="fa-solid fa-envelope" style={{ fontSize: '0.8rem' }}></i> {msg.email}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', background: 'rgba(255,255,255,0.04)', padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                      <i className="fa-regular fa-clock"></i> {new Date(msg.created_at).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(idx)}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}
                      title="Delete message"
                    >
                      <i className="fa-solid fa-trash hover:text-red-400"></i>
                    </button>
                  </div>
                </div>
                <div style={{ margin: 0, lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)', color: 'var(--text-main)', fontSize: '0.95rem' }}>
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
