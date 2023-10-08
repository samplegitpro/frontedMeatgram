// components/OrderStatusUpdate.js

import React, { useState } from 'react';
import axios from 'axios';
import backendUrl from '../../config';
const OrderStatusUpdate = ({ orderId }) => {
  const [status, setStatus] = useState('');

  const updateOrderStatus = async () => {
    try {
      await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, { status });
      // Handle success
    } catch (error) {
      console.error('Error updating order status:', error);
      // Handle error
    }
  };

  return (
    <div>
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      <button onClick={updateOrderStatus}>Update</button>
    </div>
  );
};

export default OrderStatusUpdate;
