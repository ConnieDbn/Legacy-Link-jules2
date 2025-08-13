import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, handle actual login logic here
      console.log('Login attempt:', formData);
    }, 1000);
  };

  return (
    <div className="auth-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2em' }}>
        <h1 style={{ 
          color: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5em',
          marginBottom: '0.5em'
        }}>
          <span role="img" aria-label="login">🔑</span>
          Sign In to Your Account
        </h1>
        <p style={{ 
          color: 'var(--text-medium)', 
          fontSize: '1.2em',
          margin: 0
        }}>
          Access your secure Legacy Link vault
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="loginEmail">
            <span role="img" aria-hidden="true">📧</span>
            Email Address <span className="required">*</span>
          </label>
          <input 
            type="email" 
            id="loginEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={errors.email ? 'error' : ''}
            aria-describedby={errors.email ? 'email-error' : 'email-help'}
            autoComplete="email"
            required
          />
          <div className="help-text" id="email-help">
            Use the email address you registered with
          </div>
          {errors.email && (
            <div className="error-message" id="email-error" role="alert">
              <span role="img" aria-hidden="true">⚠️</span>
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="loginPassword">
            <span role="img" aria-hidden="true">🔒</span>
            Password <span className="required">*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? 'text' : 'password'}
              id="loginPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
              aria-describedby={errors.password ? 'password-error' : 'password-help'}
              autoComplete="current-password"
              required
              style={{ paddingRight: '3.5em' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1em',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2em',
                color: 'var(--text-medium)',
                padding: '0.3em',
                borderRadius: '4px'
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="help-text" id="password-help">
            Click the eye icon to show/hide your password
          </div>
          {errors.password && (
            <div className="error-message" id="password-error" role="alert">
              <span role="img" aria-hidden="true">⚠️</span>
              {errors.password}
            </div>
          )}
        </div>

        {/* Forgot Password Link */}
        <div style={{ textAlign: 'right', marginBottom: '2em' }}>
          <Link 
            to="/forgot-password" 
            style={{ 
              color: 'var(--primary-blue)',
              textDecoration: 'none',
              fontSize: '1.1em',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="btn btn-primary btn-large"
          disabled={isLoading}
          style={{ 
            width: '100%',
            marginBottom: '1.5em'
          }}
        >
          {isLoading ? (
            <span className="loading">
              <span role="img" aria-hidden="true">⏳</span>
              Signing you in...
            </span>
          ) : (
            <>
              <span role="img" aria-hidden="true">🔑</span>
              Sign In
            </>
          )}
        </button>

        {/* Register Link */}
        <div className="auth-link">
          <p style={{ 
            fontSize: '1.2em',
            textAlign: 'center',
            margin: 0
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register"
              style={{
                color: 'var(--primary-blue)',
                fontWeight: '600',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.borderBottomColor = 'var(--primary-blue)'}
              onMouseOut={(e) => e.target.style.borderBottomColor = 'transparent'}
            >
              Create one here
            </Link>
          </p>
        </div>
      </form>

      {/* Security Notice */}
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '1.5em',
        marginTop: '2em',
        textAlign: 'center'
      }}>
        <h4 style={{ 
          color: 'var(--text-dark)', 
          margin: '0 0 0.5em 0',
          fontSize: '1.1em'
        }}>
          <span role="img" aria-hidden="true">🔐</span> Your Security Matters
        </h4>
        <p style={{ 
          color: 'var(--text-medium)', 
          margin: 0,
          fontSize: '1em',
          lineHeight: '1.6'
        }}>
          Your data is protected with enterprise-grade encryption. 
          We never store your password in plain text.
        </p>
      </div>
    </div>
  );
}

export default Login;