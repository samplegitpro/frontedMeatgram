import React from 'react';
import backendUrl from '../../../../config';
const RemoveItem = ({ itemId, onDelete }) => {
  const handleDelete = () => {
    // Send a request to the backend API to delete the item
    fetch(`${backendUrl}/api/admin/items/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Item deleted successfully, call the onDelete callback
        onDelete(itemId);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <button className="btn btn-danger mt-1" onClick={handleDelete}>Remove</button>
  );
};

export default RemoveItem;
