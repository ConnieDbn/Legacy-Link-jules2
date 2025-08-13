import React from 'react';

function Contacts() {
  return (
    <div className="contacts-container">
      <h2>Contacts & Beneficiaries</h2>
      <button className="add-button">Add New Contact</button>
      <div className="contacts-list">
        <p>No contacts found. Click "Add New Contact" to create one.</p>
      </div>
    </div>
  );
}

export default Contacts;