// adminorderpage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminOrderContainer from "./AdminOrderContainer";
import Cookies from "js-cookie";
import LoadingOverlay from "../../../Loading/LoadingOverlay";
import backendUrl from "../../../../config";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isNewOrder, setIsNewOrder] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const adminToken = Cookies.get("adminToken");
        const response = await axios.get(
          `${backendUrl}/api/orders/admin/today`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          },
        );

        const { success, orders } = response.data;

        if (success) {
          console.log(orders);
          setOrders(orders);
          setIsLoading(false);
          checkForNewOrder(orders);
        } else {
          // Handle the case where the response indicates an error
          setIsLoading(false);
          // You might want to show an error message to the user.
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    const checkForNewOrder = (newOrders) => {
      if (newOrders.length > 0) {
        const lastOrder = newOrders[0];
        if (lastOrder._id !== orders[0]?._id && !isPlayingAudio) {
          //   const audio = new Audio('/audio/notification.mp3');
          //   audio.play();
          setIsPlayingAudio(true);
          setIsNewOrder(true);
        }
      }
    };

    // Periodically check for new orders every 60 seconds
    const checkForNewOrders = setInterval(() => {
      fetchOrders();
    }, 60000);

    return () => {
      clearInterval(checkForNewOrders);
    };
  }, [orders, isPlayingAudio]);

  const stopAudio = () => {
    const audio = document.querySelector("audio");
    if (audio) {
      audio.pause();
      setIsPlayingAudio(false);
      setIsNewOrder(false);
    } else {
      setIsPlayingAudio(false);
      setIsNewOrder(false);
    }
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      // Your logic to confirm the order
      // ...

      // After successfully confirming the order, remove styling and stop audio
      setIsNewOrder(false);
      stopAudio();
    } catch (error) {
      console.error("Error confirming order:", error);
      // Handle any errors here
    }
  };

  return (
    <div>
      <h1 className="mt-4">Admin Order History</h1>

      {isNewOrder && (
        <div>
          <audio src="/audio/notification.mp3" controls autoPlay></audio>
          <p>New order placed!</p>
          <button className="btn btn-success" onClick={stopAudio}>
            Stop Sound And Confirm Order
          </button>
        </div>
      )}

      {isLoading ? (
        <LoadingOverlay />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <AdminOrderContainer updateOrder={setOrders} isAdmin={true} isNew={isNewOrder} orders={orders} handleConfirmOrder={handleConfirmOrder} />
      )}
    </div>
  );
};

export default AdminOrderPage;

