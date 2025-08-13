import React from 'react';

function Instructions() {
  return (
    <div className="instructions-container">
      <h2>Instructions</h2>
      <div className="instructions-content">
        <textarea 
          placeholder="Enter your instructions here..."
          rows="10"
          style={{ fontSize: '1.1em', width: '100%', borderRadius: '6px', border: '2px solid #90a4ae', padding: '1em' }}
        ></textarea>
        <button className="save-button" style={{
          background: '#1565c0',
          color: '#fff',
          fontSize: '1.1em',
          padding: '0.7em 1.5em',
          borderRadius: '6px',
          border: 'none',
          fontWeight: 'bold',
          marginTop: '1em'
        }}>Save Instructions</button>
      </div>
    </div>
  );
}

export default Instructions;