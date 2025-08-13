import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEditVaultItem() {
  const navigate = useNavigate();
  // State for form fields
  const [form, setForm] = useState({
    title: '',
    type: '',
    content: '',
  });
  const [file, setFile] = useState(null);

  // Placeholder user ID (replace with real user ID if you have auth)
  const userId = 'PLACEHOLDER_USER_ID';

  // Handle text input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create FormData
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('type', form.type);
    formData.append('content', form.content);
    formData.append('user', userId); // Add user ID
    if (file) {
      formData.append('file', file);
    }

    // 2. Send to backend
    try {
      const response = await fetch('/api/vault/items', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Vault item saved successfully!');
        navigate('/vault');
      } else {
        alert('Failed to save item.');
      }
    } catch (error) {
      alert('Error saving item: ' + error.message);
    }
  };

  return (
    <div className="add-edit-container">
      <h2>Add New Vault Item</h2>
      <form className="item-form" style={{ fontSize: '1.1em' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Item Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter item title"
            style={{ fontSize: '1.1em' }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Category:</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ fontSize: '1.1em' }}
            required
          >
            <option value="">Select a category</option>
            <option value="document">Document</option>
            <option value="asset">Asset</option>
            <option value="account">Account</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="content">Description:</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Enter description"
            style={{ fontSize: '1.1em' }}
            rows={3}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload Document:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            style={{ fontSize: '1.1em' }}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          {file && (
            <div style={{ marginTop: '0.5em', fontSize: '0.95em', color: '#1565c0' }}>
              Selected file: {file.name}
            </div>
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => navigate('/vault')}
            style={{
              background: '#bbdefb',
              color: '#1565c0',
              fontSize: '1.1em',
              padding: '0.7em 1.5em',
              borderRadius: '6px',
              border: 'none',
              marginRight: '10px'
            }}
          >
            Back
          </button>
          <button
            type="submit"
            style={{
              background: '#1565c0',
              color: '#fff',
              fontSize: '1.1em',
              padding: '0.7em 1.5em',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditVaultItem;