import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [apiMessage, setApiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => {
        setApiMessage(data.message);
        setIsLoading(false);
      })
      .catch(error => {
        setApiMessage('Error connecting to backend');
        setIsLoading(false);
      });
  }, []);

  // Mock data - in real app this would come from API
  const summaryData = {
    vaultItems: 0,
    contacts: 0,
    lastInstructionUpdate: 'Never'
  };

  return (
    <div className="dashboard-container">
      {/* Connection Status */}
      <div className={`status-indicator ${apiMessage.includes('Error') ? 'status-error' : 'status-success'}`}>
        <span role="img" aria-hidden="true">
          {apiMessage.includes('Error') ? '❌' : '✅'}
        </span>
        <span>
          {isLoading ? 'Connecting to server...' : `Server status: ${apiMessage}`}
        </span>
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome to Legacy Link!</h1>
        <p>Your secure place to organize and share your important information with loved ones.</p>
      </div>

      {/* Hero Image */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3em'
        }}
      >
        <div
          style={{
            background: 'var(--primary-blue)',
            borderRadius: '20px',
            padding: '2em',
            maxWidth: '500px',
            boxShadow: '0 8px 32px var(--shadow-medium)'
          }}
        >
          <img
            src="https://www.consat.co.za/images/Legacy%20Vault.png"
            alt="Legacy Link - Secure digital legacy platform for families"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '12px',
              margin: '0 auto'
            }}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-summary">
        <div className="summary-card" tabIndex="0">
          <span className="icon" role="img" aria-label="vault items">🔒</span>
          <h3>Vault Items</h3>
          <p>Total Items: {summaryData.vaultItems}</p>
          <div className="help-text">
            Store important documents, photos, and digital assets securely.
          </div>
        </div>
        
        <div className="summary-card" tabIndex="0">
          <span className="icon" role="img" aria-label="trusted contacts">👥</span>
          <h3>Trusted Contacts</h3>
          <p>Total Contacts: {summaryData.contacts}</p>
          <div className="help-text">
            People who will receive access to your legacy information.
          </div>
        </div>
        
        <div className="summary-card" tabIndex="0">
          <span className="icon" role="img" aria-label="final instructions">📝</span>
          <h3>Final Instructions</h3>
          <p>Last Updated: {summaryData.lastInstructionUpdate}</p>
          <div className="help-text">
            Important guidance and wishes for your loved ones.
          </div>
        </div>
      </div>

      {/* Dead Man's Switch Status */}
      <div 
        style={{
          background: 'var(--background-white)',
          border: '2px solid var(--warning-orange)',
          borderRadius: '12px',
          padding: '2em',
          margin: '2em 0',
          textAlign: 'center'
        }}
      >
        <h3 style={{ 
          color: 'var(--warning-orange)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '0.5em',
          margin: '0 0 1em 0'
        }}>
          <span role="img" aria-label="timer">⏰</span>
          Dead Man's Switch Status
        </h3>
        <p style={{ fontSize: '1.2em', margin: '0 0 1em 0' }}>
          <strong>Status:</strong> <span style={{ color: 'var(--warning-orange)' }}>Not Configured</span>
        </p>
        <p style={{ color: 'var(--text-medium)', marginBottom: '1.5em' }}>
          Set up automatic notifications to your trusted contacts if you don't check in regularly.
        </p>
        <Link to="/profile" className="btn btn-primary btn-large">
          <span role="img" aria-hidden="true">⚙️</span>
          Configure Dead Man's Switch
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/vault" className="quick-action-btn" aria-label="Access your secure vault to manage documents and assets">
          <span role="img" aria-hidden="true">🔒</span>
          <span>Manage Vault</span>
        </Link>
        
        <Link to="/contacts" className="quick-action-btn" aria-label="Add or edit your trusted contacts">
          <span role="img" aria-hidden="true">👥</span>
          <span>Manage Contacts</span>
        </Link>
        
        <Link to="/instructions" className="quick-action-btn" aria-label="Create or update your final instructions">
          <span role="img" aria-hidden="true">📝</span>
          <span>Write Instructions</span>
        </Link>
      </div>

      {/* Help Section */}
      <div 
        style={{
          background: 'var(--background-white)',
          borderRadius: '12px',
          padding: '2em',
          marginTop: '3em',
          border: '1px solid rgba(13, 71, 161, 0.1)'
        }}
      >
        <h3 style={{ 
          color: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5em',
          marginBottom: '1em'
        }}>
          <span role="img" aria-label="help">❓</span>
          Getting Started
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5em',
          fontSize: '1.1em'
        }}>
          <div>
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.5em' }}>
              1. Set Up Your Vault
            </h4>
            <p style={{ color: 'var(--text-medium)', lineHeight: '1.6' }}>
              Upload important documents, photos, and digital assets to your secure vault.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.5em' }}>
              2. Add Trusted Contacts
            </h4>
            <p style={{ color: 'var(--text-medium)', lineHeight: '1.6' }}>
              Choose family members or friends who should receive access to your legacy.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.5em' }}>
              3. Write Instructions
            </h4>
            <p style={{ color: 'var(--text-medium)', lineHeight: '1.6' }}>
              Leave important guidance and final wishes for your loved ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;