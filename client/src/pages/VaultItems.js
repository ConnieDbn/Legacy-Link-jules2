import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VaultItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/vault')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch items:', err));
  }, []);

  return (
    <div className="vault-items-container">
      <h2>Vault Items</h2>
      <Link to="/vault/add" className="add-button">Add New Item</Link>
      <div className="items-list">
        {items.length === 0 ? (
          <p>No items found. Click "Add New Item" to create one.</p>
        ) : (
          <ul>
            {items.map(item => (
              <li key={item.id} style={{ marginBottom: '1em' }}>
                <strong>{item.title}</strong> ({item.type})<br />
                {item.content && <span>{item.content}<br /></span>}
                {item.fileUrl && (
                  <a
                    href={`/${item.fileUrl.replace(/\\/g, '/')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View/Download Document
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VaultItems;