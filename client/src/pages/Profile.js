import React from 'react';

function Profile() {
  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      <form className="profile-form" style={{ fontSize: '1.1em' }}>
        <div className="form-group">
          <label htmlFor="profileName">Name:</label>
          <input type="text" id="profileName" placeholder="Your name" style={{ fontSize: '1.1em' }} />
        </div>
        <div className="form-group">
          <label htmlFor="profileEmail">Email:</label>
          <input type="email" id="profileEmail" placeholder="Your email" style={{ fontSize: '1.1em' }} />
        </div>
        <div className="form-group">
          <label htmlFor="profilePassword">Change Password:</label>
          <input type="password" id="profilePassword" placeholder="New password" style={{ fontSize: '1.1em' }} />
        </div>
        <button type="submit" style={{
          background: '#1565c0',
          color: '#fff',
          fontSize: '1.1em',
          padding: '0.7em 1.5em',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold'
        }}>Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;