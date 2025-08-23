import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [apiMessage, setApiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    vaultItems: 0,
    contacts: 0,
    lastInstructionUpdate: 'Never'
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [apiTestRes, vaultRes, trusteesRes] = await Promise.all([
          fetch('http://localhost:5000/api/test'),
          fetch('/api/vault'),
          fetch('/api/auth/trustees')
        ]);

        const apiTestData = await apiTestRes.json();
        setApiMessage(apiTestData.message);

        const vaultData = await vaultRes.json();
        const trusteesData = await trusteesRes.json();

        setSummaryData({
          vaultItems: vaultData.length,
          contacts: trusteesData.length,
          lastInstructionUpdate: 'Never' // To be implemented
        });
      } catch (error) {
        setApiMessage('Error connecting to backend');
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <img
            src="https://www.consat.co.za/images/Legacy%20Vault.png"
            alt="Legacy Link - Secure digital legacy platform for families"
            className="hero-image"
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
      <div className="dead-mans-switch-status">
        <h3>
          <span role="img" aria-label="timer">⏰</span>
          Dead Man's Switch Status
        </h3>
        <p>
          <strong>Status:</strong> <span className="status-text">Not Configured</span>
        </p>
        <p className="help-text">
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
      <div className="help-section">
        <h3>
          <span role="img" aria-label="help">❓</span>
          Getting Started
        </h3>
        <div className="help-section-grid">
          <div>
            <h4>
              1. Set Up Your Vault
            </h4>
            <p>
              Upload important documents, photos, and digital assets to your secure vault.
            </p>
          </div>
          <div>
            <h4>
              2. Add Trusted Contacts
            </h4>
            <p>
              Choose family members or friends who should receive access to your legacy.
            </p>
          </div>
          <div>
            <h4>
              3. Write Instructions
            </h4>
            <p>
              Leave important guidance and final wishes for your loved ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;