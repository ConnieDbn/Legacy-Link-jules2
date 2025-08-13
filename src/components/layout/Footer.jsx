import React from 'react';
import '../../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Legacy Link - All rights reserved</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="disclaimer">
          This application is not a substitute for legal advice. Please consult with a lawyer for legally binding documents.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
