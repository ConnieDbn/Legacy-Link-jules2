import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import contexts
import { FontSizeProvider } from './contexts/FontSizeContext';

// Import components
import FontSizeControls from './components/FontSizeControls';

// Import your page components
import Dashboard from './pages/Dashboard';
import VaultItems from './pages/VaultItems';
import AddEditVaultItem from './pages/AddEditVaultItem';
import Contacts from './pages/Contacts';
import Instructions from './pages/Instructions';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <FontSizeProvider>
      <Router>
        <div className="app">
          {/* Skip to main content link for screen readers */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Enhanced Navigation Menu */}
          <nav role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link 
              to="/dashboard"
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              aria-label="Legacy Link Home"
            >
              <img
                src="https://www.consat.co.za/images/logo.png"
                alt="Legacy Link"
                style={{
                  height: '2.2em',
                  marginRight: '0.8em',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.2em'
                }}
              />
              <span style={{ 
                color: 'white', 
                fontSize: '1.1em', 
                fontWeight: '700',
                display: 'none' // Hidden on smaller screens
              }}>
                Legacy Link
              </span>
            </Link>
            
            {/* Main Navigation Links */}
            <div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/dashboard" aria-label="Go to Dashboard">
                <span role="img" aria-hidden="true">🏠</span>
                <span>Home</span>
              </Link>
              
              <Link to="/vault" aria-label="Access your secure vault">
                <span role="img" aria-hidden="true">🔒</span>
                <span>Vault</span>
              </Link>
              
              <Link to="/contacts" aria-label="Manage your contacts">
                <span role="img" aria-hidden="true">👥</span>
                <span>Contacts</span>
              </Link>
              
              <Link to="/instructions" aria-label="Create or edit your instructions">
                <span role="img" aria-hidden="true">📝</span>
                <span>Instructions</span>
              </Link>
              
              <Link to="/profile" aria-label="View and edit your profile">
                <span role="img" aria-hidden="true">👤</span>
                <span>Profile</span>
              </Link>
              
              <Link to="/login" aria-label="Sign in to your account">
                <span role="img" aria-hidden="true">🔑</span>
                <span>Sign In</span>
              </Link>
              
              <Link to="/register" aria-label="Create a new account">
                <span role="img" aria-hidden="true">✍️</span>
                <span>Register</span>
              </Link>
            </div>

            {/* Font Size Controls */}
            <FontSizeControls />
          </nav>

          {/* Main Content Area */}
          <main 
            id="main-content"
            role="main"
            style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              padding: '2em 1em',
              minHeight: 'calc(100vh - 200px)',
              position: 'relative'
            }}
          >
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Vault routes */}
              <Route path="/vault" element={<VaultItems />} />
              <Route path="/vault/add" element={<AddEditVaultItem />} />
              <Route path="/vault/edit/:id" element={<AddEditVaultItem />} />
              
              {/* Other feature routes */}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Catch all route - redirects to Dashboard */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>

          {/* Enhanced Footer */}
          <footer 
            role="contentinfo"
            style={{
              textAlign: 'center',
              padding: '2em 1em',
              background: 'var(--primary-blue)',
              color: 'var(--background-white)',
              marginTop: '3em',
              borderTop: '3px solid var(--secondary-yellow)'
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h3 style={{ 
                color: 'var(--background-white)', 
                fontSize: '1.4em', 
                marginBottom: '0.5em' 
              }}>
                Legacy Link
              </h3>
              <p style={{ 
                margin: '0 0 1em 0', 
                fontSize: '1.1em',
                opacity: '0.9'
              }}>
                Secure Your Legacy for Future Generations
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '0.95em',
                opacity: '0.8'
              }}>
                © 2025 Legacy Link - All rights reserved
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </FontSizeProvider>
  );
}

export default App;