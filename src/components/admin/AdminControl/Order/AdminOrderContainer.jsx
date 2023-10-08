
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminOrderItem from './AdminOrderItem';
import backendUrl from '../../../../config';
import PrintableBill from '../../../orders/Print/PrintableBill';
import EditOrderModal from './EditOrderModal'; 
import Cookies from 'js-cookie';
const AdminOrderContainer = ({ updateOrder,orders, handleConfirmOrder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedOrder, setEditedOrder] = useState(null);

  const [isOrderPickedUpMap, setIsOrderPickedUpMap] = useState({});
  // Use a map to track the current status for each order
  const [currentStatusMap, setCurrentStatusMap] = useState({});

  const updateOrderStatus = async (orderId, status) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/orders/admin/${orderId}`,
        {
          status,
        },
      );
      // Update the current status map with the new status
      setCurrentStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [orderId]: status,
      }));
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status");
    }
    setIsLoading(false);
  };
  const handleEdit = (order) => {
    setIsEditModalOpen(true);
    console.log(order)
    setEditedOrder(order);
  };


  const handleSaveEdit = async (updatedOrder) => {
    const adminToken = Cookies.get('adminToken');
    const orderId = updatedOrder._id;
    try {
      const response = await axios.put(
        `${backendUrl}/api/orders/admin/updateOrder/${orderId}`,
        updatedOrder,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
  
      // Handle success and update the UI or display a success message
      alert('Order updated successfully');
  
      // Close the edit modal
      setIsEditModalOpen(false);
  
      // Update the order in the state
      updateOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle error and display an error message
      alert('Failed to update order');
    }
  };
  

  // Sample bill data
  const billData = {
    header: {
      companyName: "Cher's Meat Gram",
      companyAddress:
        "R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal, Pin 462030",
      mobileNumber: "7055205010",
      fssaiNo: "21422010005288",
      isoCertificateNo: "20221 7868",
      gstin: "23MEHPS8950L1ZK",
      website: "www.chersmeatgram.com",
    },
    footer: [
      "Please check the material at delivery. If there is any problem please feel free to contact us. And return the material to delivery boy.We will try to send you the same order in next delivery slot.",
      "Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of delivery time.",
      "Order cancellation can be done 1 hour before the delivery slot time.Once dispatched can not be cancelled.",
    ],
  };

  return (
    <div className="mt-4">
      {orders.map((order, index) => (
        <div
          key={order._id}
          className={`card mb-4 ${order.isNew ? "new-order" : ""}`}
        >
          <AdminOrderItem
            order={order}
            orderDate={order.createdAt}
            orderNumber={order._id}
            totalAmount={order.amount}
            mobileNumber={order.mobileNumber}
            userName={order.name}
            isDeliveryCharged={order.isDeliveryCharged}
            discount={order.discount}
            orderForLater={order.isOrderForLater}
            deliveryTimeSlot={order.deliveryTimeSlot}
            deliveryDate={order.deliveryDate}
            address={`${order.address}, ${order.pincode}`}
            products={order.items}
            status={currentStatusMap[order._id] || order.status}

            onConfirmOrder={() => handleConfirmOrder(order._id)}
            onUpdateStatus={(status) => updateOrderStatus(order._id, status)}
            onEdit={() => handleEdit(order)}
          />
          <div className="mt-2 d-flex align-items-center">
            <div className="me-2">
              <p>Status: {currentStatusMap[order._id] || order.status}</p>
              <select
                value={currentStatusMap[order._id] || order.status}
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
            
            <div>
           
        
              <PrintableBill
                discount={order.discount}
                billData={billData}
                orderDate={order.createdAt}
                orderNumber={order._id}
                totalAmount={order.amount}
                mobileNumber={order.mobileNumber}
                userName={order.name}
                isDeliveryCharged={order.isDeliveryCharged}
                address={order.address + ' ' + order.pincode}
                products={
                  order.items
                    ? order.items.map((item) => {
                        if (item && item.item) {
                          return {
                            productName: item.item.name,
                            price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
                            numOfItems: `${item.quantity}`,
                            subTotal: `${
                              item.quantity * item.selectedQuantityAndMrp.mrp
                            }`,
                            productId: `${item.item._id}`,
                          };
                        } else {
                          return { deleted: true };
                        }
                      })
                    : []
                }
              />
                 <button
                    className='btn mt-2 my-2 me-2'
                    style={{ backgroundColor: "orange" }}
                    onClick={() => handleEdit(order)}
                  >
                    Edit Order
                  </button>

              {isEditModalOpen && (
                <EditOrderModal
                  order={editedOrder}
                  onSave={handleSaveEdit}
                  onClose={() => setIsEditModalOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderContainer;


