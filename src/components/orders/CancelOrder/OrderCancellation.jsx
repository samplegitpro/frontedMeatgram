import React, { useState, useEffect } from 'react';
import backendUrl from '../../../config'; // Make sure this path is correct
import Cookies from 'js-cookie';

const OrderCancellation = ({ orderId, orderStatus, orderPlacedAt }) => {
  const [cancellationStatus, setCancellationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to check if the order is cancelable
  const isOrderCancelable = () => {
    // Check if the order status is not "shipped"
    if (orderStatus === 'shipped') {
      return false;
    }

    // Check if the time elapsed is less than half an hour (1800 seconds)
    const currentTime = new Date();
    const orderTime = new Date(orderPlacedAt);
    const elapsedTimeInSeconds = (currentTime - orderTime) / 1000;

    if (elapsedTimeInSeconds > 1800) {
      return false;
    }

    return true;
  };

  // Function to handle canceling the order
  const handleCancelOrder = async () => {
    // Check if the order is already cancelled
    if (orderStatus === 'cancelled') {
      setCancellationStatus('Order Cancelled');
      return;
    }

    // Check if the order is cancelable based on conditions
    if (!isOrderCancelable()) {
      setCancellationStatus('Order cannot be canceled at this time.');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true
      const token = Cookies.get('token'); // Assuming you store the token in local storage

      const response = await fetch(`${backendUrl}/api/orders/cancel-order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'application/json', // Set the content type if needed
        },
      });

      if (response.ok) {
        setCancellationStatus('Order has been successfully canceled.');
      } else {
        setCancellationStatus('Failed to cancel order. Please try again later.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      setCancellationStatus('An error occurred while canceling the order.');
    } finally {
      setIsLoading(false); // Set loading state back to false when done
      setTimeout(() => {
        setCancellationStatus(null);
      }, 5000);
    }

  };

  // useEffect to check the order's cancellation status when the component mounts
  // useEffect(() => {
  //   if (!isOrderCancelable()) {
  //     setCancellationStatus('Order cannot be canceled at this time.');
  //   }
  // }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div>
      {cancellationStatus && (
        <div className={`alert ${cancellationStatus.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {cancellationStatus}
        </div>
      )}
      {isLoading ? (
        <p>Cancelling order, please wait...</p>
      ) : (
        <button onClick={handleCancelOrder} className='btn btn-responsive btn-danger mb-2 me-2 d-inline'>
          Cancel Order
        </button>
      )}
      {/* Display order details here */}
    </div>
  );
};

export default OrderCancellation;

// import React, { useState, useEffect } from 'react';
// import backendUrl from '../../../config';
// import Cookies from 'js-cookie';

// const OrderCancellation = ({ orderId, orderStatus, orderPlacedAt }) => {
//   const [cancellationStatus, setCancellationStatus] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const isOrderCancelable = () => {
//     // Check if the order status is not "shipped"
//     if (orderStatus === 'shipped') {
//       return false;
//     }

//     // Check if the time elapsed is less than half an hour (1800 seconds)
//     const currentTime = new Date();
//     const orderTime = new Date(orderPlacedAt);
//     const elapsedTimeInSeconds = (currentTime - orderTime) / 1000;

//     if (elapsedTimeInSeconds > 1800) {
//       return false;
//     }

//     return true;
//   };

//   const handleCancelOrder = async () => {
//     // Check if the order is cancelable based on conditions
   
//     if(orderStatus==='cancelled'){
//         setCancellationStatus('Order Cancelled');
//       return;
//     }
//     if (!isOrderCancelable()) {
//       // setCancellationStatus('Order cannot be canceled at this time.');
//       return;
//     }
  

//     try {
//       setIsLoading(true); // Set loading state to true
//       const token = Cookies.get('token'); // Assuming you store the token in local storage

//       const response = await fetch(`${backendUrl}/api/orders/cancel-order/${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the token in the headers
//           'Content-Type': 'application/json', // Set the content type if needed
//         },
//       });

//       if (response.ok) {
//         setCancellationStatus('Order has been successfully canceled.');
//       } else {
//         setCancellationStatus('Failed to cancel order. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error cancelling order:', error);
//       setCancellationStatus('An error occurred while canceling the order.');
//     } finally {
//       setIsLoading(false); // Set loading state back to false when done
//     }
//   };

//   useEffect(() => {
//     // Call isOrderCancelable when component mounts to check cancellation status
//     if (!isOrderCancelable()) {
//       setCancellationStatus('Order cannot be canceled at this time.');
//     }
//   }, []);

//   return (
//     <div>
//       {cancellationStatus && (
//         <div className={`alert ${cancellationStatus.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
//           {cancellationStatus}
//         </div>
//       )}
//       {isLoading ? (
//         <p>Cancelling order, please wait...</p>
//       ) :  (
//           <button onClick={handleCancelOrder} className='btn btn-responsive btn-danger mb-2 me-2 d-inline'>
//             Cancel Order
//           </button>
        
//       )}
//       {/* Display order details here */}
//     </div>
//   );
// };

// export default OrderCancellation;
