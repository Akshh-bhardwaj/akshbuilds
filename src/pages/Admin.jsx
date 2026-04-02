import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-dashboard container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="admin-header reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="headline" style={{ fontSize: '3rem', margin: 0 }}><span className="text-glow">Admin</span> Dashboard</h1>
        <a href="/" className="btn btn-outline glow-hover"><i className="fa-solid fa-arrow-left"></i> Back to Home</a>
      </div>

      <div className="glass reveal" style={{ padding: '30px' }}>
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-envelope glow-text"></i> Inbox ({messages.length})
        </h2>
        
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <p>No messages yet! Share your portfolio to get started.</p>
          </div>
        ) : (
          <div className="messages-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg) => (
              <div key={msg.id} className="message-card" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{msg.email}</a>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                <p style={{ margin: 0, lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '6px' }}>
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
