import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import FontSizeSwitcher from '../common/FontSizeSwitcher';
import '../../styles/components/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only show navigation if user is logged in
  const showNavigation = user && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Legacy Link</h1>
        </div>
        {showNavigation && (
          <nav className="main-nav">
            <ul>
              <li>
                <Link
                  to="/photos"
                  className={location.pathname === '/photos' ? 'active' : ''}
                >
                  Photos
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className={location.pathname === '/documents' ? 'active' : ''}
                >
                  Documents
                </Link>
              </li>
              <li>
                <Link
                  to="/will"
                  className={location.pathname === '/will' ? 'active' : ''}
                >
                  Will
                </Link>
              </li>
              <li>
                <Link
                  to="/last-words"
                  className={location.pathname === '/last-words' ? 'active' : ''}
                >
                  Last Words
                </Link>
              </li>
              <li>
                <Link
                  to="/post-death"
                  className={location.pathname === '/post-death' ? 'active' : ''}
                >
                  Post-Death Access
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div className="header-actions">
          {user && (
            <div className="user-info">
              <span>Hello, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
          <FontSizeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
