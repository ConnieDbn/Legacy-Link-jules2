import React from 'react';

function Register() {
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" style={{ fontSize: '1.1em' }}>
        <div className="form-group">
          <label htmlFor="registerName">Name:</label>
          <input type="text" id="registerName" placeholder="Enter your name" style={{ fontSize: '1.1em' }} />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">Email:</label>
          <input type="email" id="registerEmail" placeholder="Enter your email" style={{ fontSize: '1.1em' }} />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Password:</label>
          <input type="password" id="registerPassword" placeholder="Create a password" style={{ fontSize: '1.1em' }} />
        </div>
        <div className="form-group">
          <label htmlFor="registerConfirmPassword">Confirm Password:</label>
          <input type="password" id="registerConfirmPassword" placeholder="Confirm your password" style={{ fontSize: '1.1em' }} />
        </div>
        <button type="submit" style={{
          background: '#1565c0',
          color: '#fff',
          fontSize: '1.1em',
          padding: '0.7em 1.5em',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold'
        }}>Register</button>
        <p className="auth-link">
          Already have an account? <a href="/login" style={{ color: '#1565c0' }}>Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Register;