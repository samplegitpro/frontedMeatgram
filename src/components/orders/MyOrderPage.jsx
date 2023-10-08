



// components/MyOrderPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderContainer from './OrderContainer';
import Cookies from 'js-cookie';
import LoadingOverlay from '../Loading/LoadingOverlay'
import backendUrl from '../../config';
const MyOrderPage = ({ isAdmin }) => {
  const userId=Cookies.get('userId');

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/orders/${isAdmin ? 'admin' : `user/${userId}`}`);
        setOrders(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [isAdmin, userId]);
  return (
    <div>
      <h1 className="mt-4">Order History</h1>
      <p className="text-muted">
        Check the status of recent orders, manage returns, and download invoices.
      </p>

      {isLoading ? ( // Render loading overlay if isLoading is true
        <LoadingOverlay />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <OrderContainer isAdmin={isAdmin} key={orders._id} orders={orders} />
      )}
    </div>
  );
};

export default MyOrderPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import OrderContainer from './OrderContainer';
// import Cookies from 'js-cookie';
// import LoadingOverlay from '../Loading/LoadingOverlay';
// import backendUrl from '../../config';

// const MyOrderPage = ({ isAdmin }) => {
//   const userId = Cookies.get('userId');

//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPlayingAudio, setIsPlayingAudio] = useState(false);
//   const [isNewOrder, setIsNewOrder] = useState(false);
//   const [showAllOrders, setShowAllOrders] = useState(false); // New state for showing all orders

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         let url;
//         if (isAdmin) {
//           // If admin, fetch today's orders initially, or all orders if requested
//           url = showAllOrders
//             ? `${backendUrl}/api/orders/admin`
//             : `${backendUrl}/api/orders/admin?date=today`;
//         } else {
//           url = `${backendUrl}/api/orders/user/${userId}`;
//         }

//         const response = await axios.get(url);
//         setOrders(response.data.reverse());
//         setIsLoading(false);
//         checkForNewOrder(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setIsLoading(false);
//       }
//     };

//     const checkForNewOrder = (newOrders) => {
//       if (newOrders.length > 0) {
//         const lastOrder = newOrders[0];
//         if (lastOrder._id !== orders[0]?._id && !isPlayingAudio) {
//           const audio = new Audio('/audio/notification.mp3');
//           audio.play();
//           setIsPlayingAudio(true);
//           setIsNewOrder(true);
//         }
//       }
//     };

//     // Periodically check for new orders every 60 seconds
//     const checkForNewOrders = setInterval(() => {
//       fetchOrders();
//     }, 60000);

//     return () => {
//       clearInterval(checkForNewOrders);
//     };
//   }, [isAdmin, userId, orders, isPlayingAudio, showAllOrders]);

//   const stopAudio = () => {
//     const audio = document.querySelector('audio');

//     if (audio) {
//       audio.pause();
//       setIsPlayingAudio(false);
//       setIsNewOrder(false);
//     } else {
//       setIsPlayingAudio(false);
//       setIsNewOrder(false);
//     }
//   };

//   const toggleShowAllOrders = () => {
//     setShowAllOrders(!showAllOrders);
//   };

//   return (
//     <div>
//       <h1 className="mt-4">Order History</h1>
//       <p className="text-muted">
//         Check the status of recent orders, manage returns, and download invoices.
//       </p>

//       {isAdmin && isNewOrder && isPlayingAudio ? (
//         <div>
//           <button className="btn btn-success" onClick={stopAudio}>
//             New Order Received, click to confirm
//           </button>
//         </div>
//       ) : null}

//       {isAdmin && (
//         <div>
//           <button className="btn btn-primary mt-3" onClick={toggleShowAllOrders}>
//             {showAllOrders ? 'Show Today Orders' : 'Show All Orders'}
//           </button>
//         </div>
//       )}

//       {isLoading ? (
//         <LoadingOverlay />
//       ) : orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <OrderContainer isAdmin={isAdmin} orders={orders} />
//       )}
//     </div>
//   );
// };

// export default MyOrderPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import OrderContainer from './OrderContainer';
// import Cookies from 'js-cookie';
// import LoadingOverlay from '../Loading/LoadingOverlay';
// import backendUrl from '../../config';

// const MyOrderPage = ({ isAdmin }) => {
//   const userId = Cookies.get('userId');

//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPlayingAudio, setIsPlayingAudio] = useState(false);
//   const [isNewOrder, setIsNewOrder] = useState(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           `${backendUrl}/api/orders/${isAdmin ? 'admin' : `user/${userId}`}`
//         );
//         setOrders(response.data.reverse());
//         setIsLoading(false);
//         checkForNewOrder(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setIsLoading(false);
//       }
//     };

//     const checkForNewOrder = (newOrders) => {
//       if (newOrders.length > 0) {
//         const lastOrder = newOrders[0];
//         if (lastOrder._id !== orders[0]?._id && !isPlayingAudio) {
//           const audio = new Audio('/audio/notification.mp3');
//           audio.play();
//           setIsPlayingAudio(true);
//           setIsNewOrder(true);
//         }
//       }
//     };

   
//     // Periodically check for new orders every 60 seconds
//     const checkForNewOrders = setInterval(() => {
//       fetchOrders();
//     }, 60000);

//     return () => {
//       clearInterval(checkForNewOrders);
//     };
//   }, [isAdmin, userId, orders, isPlayingAudio]);

//   const stopAudio = () => {
//     const audio = document.querySelector('audio');
    
//     if (audio) {
//       audio.pause();
//       setIsPlayingAudio(false);
//       setIsNewOrder(false);
//     } else {
//       setIsPlayingAudio(false);
//       setIsNewOrder(false);
//     }
//   };
  
//   return (
//     <div>
//       <h1 className="mt-4">Order History</h1>
//       <p className="text-muted">
//         Check the status of recent orders, manage returns, and download invoices.
//       </p>

//       {isAdmin && isNewOrder && isPlayingAudio ? (
//         <div>
//           <button className="btn btn-responsive btn-success" onClick={stopAudio}>New Order Received click to confirm</button>
//         </div>
//       ) : null}

//       {isLoading ? (
//         <LoadingOverlay />
//       ) : orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <OrderContainer isAdmin={isAdmin} key={orders._id} orders={orders} />
//       )}
//     </div>
//   );
// };

// export default MyOrderPage;






















