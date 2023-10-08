
import React, { useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import backendUrl from '../../config';
import PrintableBill from './Print/PrintableBill';
import OrderCancellation from './CancelOrder/OrderCancellation';
const OrderContainer = ({ orders, isAdmin }) => {
  const [isLoading, setLoading] = useState(false);
  
 
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const response = await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, { status });
      console.log(response.data); // Log the updated order details
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status');
    }
    setLoading(false);
  };

  // Sample bill data
  const billData = {
    header: {
      companyName: "Cher's Meat Gram",
      companyAddress: "R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal, Pin 462030",
      mobileNumber: "7055205010",
      fssaiNo: "21422010005288",
      isoCertificateNo: "20221 7868",
      gstin: "23MEHPS8950L1ZK",
      website: "www.chersmeatgram.com",
    },
    footer: ['Please check the material at delivery. If there is any problem please feel free to contact us. And return the material to delivery boy.We will try to send you the same order in next delivery slot.',
  'Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of delivery time.',
  'Order cancellation can be done 1 hour before the delivery slot time.Once dispatched can not be cancelled.'
  ],
  };
  

// Pass the billData to the PrintableBill component


  return (
    <div className="card mt-4">
      <div className="card-body">
        {orders && orders.map((order, index) => (
          <div key={index} className="mb-4">
           <OrderItem
  key={order._id}
  orderDate={order.createdAt}
  orderNumber={order._id}
  totalAmount={order.amount}
  mobileNumber={order.mobileNumber}
  userName={order.name}
  address={order.address}
  products={
    order.items
      ? order.items.map((item) => {
          if (item && item.item) {
            // If 'item' and 'item.item' are not null, create a product object
            return {
              imageUrl: `${backendUrl}${item.item.image}`,
              productName: item.item.name,
              price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
              numOfPieces: `${item.selectedQuantityAndMrp.numOfPieces}`,
              quantity: `${item.selectedQuantityAndMrp.quantity}`,
              status: order.status,
              numOfItems:`${item.quantity}`,
              subTotal:`${item.quantity*item.selectedQuantityAndMrp.mrp}`,
              productId: `${item.item._id}`,
            };
          } else {
            // If 'item' or 'item.item' is null, create a placeholder object
            return { deleted: true };
          }
        })
      : [] // Handle the case where 'order.items' is null or empty
  } />

<OrderCancellation orderStatus={order.status} orderId={order._id} orderPlacedAt={order.createdAt}/>

<PrintableBill 
  billData={billData}  
  key={index+1}
  orderDate={order.createdAt}
  orderNumber={order._id}
  totalAmount={order.amount}
  mobileNumber={order.mobileNumber}
  userName={order.name}
  address={order.address +" "+ order.pincode} 
  products={
    order.items
      ? order.items.map((item) => {
          if (item && item.item) {
            // If 'item' and 'item.item' are not null, create a product object
            return {
              productName: item.item.name,
              price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
              numOfItems:`${item.quantity}`,
              subTotal:`${item.quantity*item.selectedQuantityAndMrp.mrp}`,
              productId: `${item.item._id}`,
            };
          } else {
            // If 'item' or 'item.item' is null, create a placeholder object
            return { deleted: true };
          }
        })
      : [] // Handle the case where 'order.items' is null or empty
  }

  />
            {isAdmin && (
              <div>
              <div>Pincode {order.pincode}</div>
              <div className="mt-2">
                <p>Status: {order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  disabled={isLoading}
                  className="form-select"
                >
                  <option value="Not processed">Not processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {isLoading && <span className="ms-2">Changing status...</span>}
              </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderContainer;


// import React, { useState } from 'react';
// import axios from 'axios';
// import PrintableBill from './Print/PrintableBill';
// import OrderCancellation from './CancelOrder/OrderCancellation';
// import backendUrl from '../../config';
// import OrderItem from './OrderItem'; // Import the OrderItem component

// const OrderContainer = ({ orders, isAdmin }) => {
//   const [isLoading, setLoading] = useState(false);

//   const updateOrderStatus = async (orderId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, {
//         status,
//       });
//       console.log(response.data); // Log the updated order details
//       alert('Status updated successfully');
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update status');
//     }
//     setLoading(false);
//   };
//   const billData = {
//     header: {
//       companyName: "Cher's Meat Gram",
//       companyAddress: "R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal, Pin 462030",
//       mobileNumber: "7055205010",
//       fssaiNo: "21422010005288",
//       isoCertificateNo: "20221 7868",
//       gstin: "23MEHPS8950L1ZK",
//       website: "www.chersmeatgram.com",
//     },
//     footer: ['Please check the material at delivery. If there is any problem please feel free to contact us. And return the material to delivery boy.We will try to send you the same order in next delivery slot.',
//   'Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of delivery time.',
//   'Order cancellation can be done 1 hour before the delivery slot time.Once dispatched can not be cancelled.'
//   ],
//   };
 
//   // Function to apply Bootstrap styling for different order statuses
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'Not processed':
//         return 'badge bg-secondary';
//       case 'Processing':
//         return 'badge bg-warning text-dark';
//       case 'Shipped':
//         return 'badge bg-info';
//       case 'Delivered':
//         return 'badge bg-success';
//       case 'Cancelled':
//         return 'badge bg-danger';
//       default:
//         return 'badge bg-secondary';
//     }
//   };

//   return (
//     <div className="card mt-4">
//       <div className="card-body">
//         {orders &&
//           orders.map((order, index) => (
//             <div key={index} className="mb-4">
//               <OrderItem
//                 orderDate={order.createdAt}
//                 orderNumber={order._id}
//                 totalAmount={order.amount}
//                 mobileNumber={order.mobileNumber}
//                 userName={order.name}
//                 address={`${order.address}, ${order.pincode}`}
//                 products={
//                   order.items
//                     ? order.items.map((item) => {
//                         if (item && item.item) {
//                           return {
//                             imageUrl: `${backendUrl}${item.item.image}`,
//                             productName: item.item.name,
//                             price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
//                             numOfItems: `${item.quantity}`,
//                             subTotal: `${item.quantity * item.selectedQuantityAndMrp.mrp}`,
//                             productId: `${item.item._id}`,
//                             numOfPieces: `${item.selectedQuantityAndMrp.numOfPieces}`,
//                             quantity: `${item.selectedQuantityAndMrp.quantity}`,
//                             status: order.status,
//                           };
//                         } else {
//                           return { deleted: true };
//                         }
//                       })
//                     : []
//                 }
//               />

//               <OrderCancellation
//                 orderStatus={order.status}
//                 orderId={order._id}
//                 orderPlacedAt={order.createdAt}
//               />

//               <PrintableBill
//                 billData={billData}
//                 key={index + 1}
//                 orderDate={order.createdAt}
//                 orderNumber={order._id}
//                 totalAmount={order.amount}
//                 mobileNumber={order.mobileNumber}
//                 userName={order.name}
//                 address={`${order.address}, ${order.pincode}`}
//                 products={
//                   order.items
//                     ? order.items.map((item) => {
//                         if (item && item.item) {
//                           return {
//                             productName: item.item.name,
//                             price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
//                             numOfItems: `${item.quantity}`,
//                             subTotal: `${item.quantity * item.selectedQuantityAndMrp.mrp}`,
//                             productId: `${item.item._id}`,
//                           };
//                         } else {
//                           return { deleted: true };
//                         }
//                       })
//                     : []
//                 }
//               />

//               {isAdmin && (
//                 <div>
//                   <div>Pincode {order.pincode}</div>
//                   <div className="mt-2">
//                     <p>Status: {order.status}</p>
//                     <select
//                       value={order.status}
//                       onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                       disabled={isLoading}
//                       className="form-select"
//                     >
//                       <option value="Not processed">Not processed</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                     {isLoading && <span className="ms-2">Changing status...</span>}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default OrderContainer;


// import React, { useState } from 'react';
// import axios from 'axios';
// import PrintableBill from './Print/PrintableBill';
// import OrderCancellation from './CancelOrder/OrderCancellation';
// import backendUrl from '../../config';

// const OrderContainer = ({ orders, isAdmin }) => {
//   const [isLoading, setLoading] = useState(false);

//   const updateOrderStatus = async (orderId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, {
//         status,
//       });
//       console.log(response.data); // Log the updated order details
//       alert('Status updated successfully');
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update status');
//     }
//     setLoading(false);
//   };

//   // Function to apply Bootstrap styling for different order statuses
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'Not processed':
//         return 'badge bg-secondary';
//       case 'Processing':
//         return 'badge bg-warning text-dark';
//       case 'Shipped':
//         return 'badge bg-info';
//       case 'Delivered':
//         return 'badge bg-success';
//       case 'Cancelled':
//         return 'badge bg-danger';
//       default:
//         return 'badge bg-secondary';
//     }
//   };
//   const billData = {
//     header: {
//       companyName: "Cher's Meat Gram",
//       companyAddress: "R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal, Pin 462030",
//       mobileNumber: "7055205010",
//       fssaiNo: "21422010005288",
//       isoCertificateNo: "20221 7868",
//       gstin: "23MEHPS8950L1ZK",
//       website: "www.chersmeatgram.com",
//     },
//     footer: ['Please check the material at delivery. If there is any problem please feel free to contact us. And return the material to delivery boy.We will try to send you the same order in next delivery slot.',
//   'Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of delivery time.',
//   'Order cancellation can be done 1 hour before the delivery slot time.Once dispatched can not be cancelled.'
//   ],
//   };
  


//   return (
//     <div className="card mt-4">
//       <div className="card-body">
//         {orders &&
//           orders.map((order, index) => (
//             <div key={index} className="mb-4">
//               <div className="row">
//                 <div className="col-md-8">
//                   <h5 className="mb-3">Order #{order._id}</h5>
//                   <div className="mb-2">
//                     <span className="fw-bold">Order Date:</span> {order.createdAt}
//                   </div>
//                   <div className="mb-2">
//                     <span className="fw-bold">Customer Name:</span> {order.name}
//                   </div>
//                   <div className="mb-2">
//                     <span className="fw-bold">Address:</span> {order.address}, {order.pincode}
//                   </div>
//                   <div className="mb-2">
//                     <span className="fw-bold">Mobile Number:</span> {order.mobileNumber}
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="mb-3">
//                     <span className="fw-bold">Order Status:</span>{' '}
//                     <span className={`badge ${getStatusBadgeClass(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                   {isAdmin && (
//                     <div className="mb-3">
//                       <label htmlFor={`statusSelect${order._id}`} className="form-label">
//                         Change Status:
//                       </label>
//                       <select
//                         id={`statusSelect${order._id}`}
//                         value={order.status}
//                         onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                         disabled={isLoading}
//                         className="form-select"
//                       >
//                         <option value="Not processed">Not processed</option>
//                         <option value="Processing">Processing</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                         <option value="Cancelled">Cancelled</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <hr />
//               <div className="row">
//                 {order.items &&
//                   order.items.map((item, itemIndex) => (
//                     <div key={itemIndex} className="col-md-6 mb-3">
//                       <div className="card">
//                         <img
//                           src={`${backendUrl}${item.item.image}`}
//                           alt={item.item.name}
//                           className="card-img-top"
//                         />
//                         <div className="card-body">
//                           <h5 className="card-title">{item.item.name}</h5>
//                           <p className="card-text">
//                             Price: Rs.{item.selectedQuantityAndMrp.mrp}
//                           </p>
//                           <p className="card-text">
//                             Quantity: {item.selectedQuantityAndMrp.quantity}
//                           </p>
//                           <p className="card-text">
//                             Subtotal: Rs.{item.quantity * item.selectedQuantityAndMrp.mrp}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//               <OrderCancellation
//                 orderStatus={order.status}
//                 orderId={order._id}
//                 orderPlacedAt={order.createdAt}
//               />
//               <PrintableBill
//                 billData={billData}
//                 key={index + 1}
//                 orderDate={order.createdAt}
//                 orderNumber={order._id}
//                 totalAmount={order.amount}
//                 mobileNumber={order.mobileNumber}
//                 userName={order.name}
//                 address={`${order.address}, ${order.pincode}`}
//                 products={
//                   order.items
//                     ? order.items.map((item) => {
//                         if (item && item.item) {
//                           return {
//                             productName: item.item.name,
//                             price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
//                             numOfItems: `${item.quantity}`,
//                             subTotal: `${item.quantity * item.selectedQuantityAndMrp.mrp}`,
//                             productId: `${item.item._id}`,
//                           };
//                         } else {
//                           return { deleted: true };
//                         }
//                       })
//                     : []
//                 }
//               />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default OrderContainer;





























// // <OrderItem
// // key={order._id}
// // orderDate={order.createdAt}
// // orderNumber={order._id}
// // totalAmount={order.amount}
// // mobileNumber={order.mobileNumber}
// // address={order.address}
// // products={order.items && order.items.map((item) => ({
// //   imageUrl: `${backendUrl}${item.item.image}`,
// //   productName: item.item.name,
// //   price: `Rs.${item.item.quantityAndMrp[0].mrp}`,
// //   status: order.status,
// //   productId: `${item.item._id}`
// // }))}