import React, { useState, useEffect } from "react";
import backendUrl from "../../../../config";

const AdminOrderItem = ({
  order,
  orderDate,
  orderNumber,
  totalAmount,
  mobileNumber,
  userName,
  address,
  products,
  orderForLater,
  deliveryDate,
  deliveryTimeSlot,
}) => {
  // Maintain local state for the status
  const [status, setStatus] = useState(order.status);

  // Update the status when the order prop changes
  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);
  const statusClasses = {
    "Not processed": "table-secondary",
    Processing: "table-warning",
    Shipped: "table-info",
    Delivered: "table-success",
    Cancelled: "table-danger",
  };

  return (
    <div
      className={`card-body ${
        status === "Cancelled" ? "bg-danger text-white" : ""
      }`}
    >
      {orderForLater && <h3>This Order is for later.</h3>}
      {orderForLater && (
        <h5 style={{ fontSize: "1rem" }}>
          Delivery Date: {new Date(deliveryDate).toLocaleDateString()}
        </h5>
      )}
      {orderForLater && (
        <h5 style={{ fontSize: "1rem" }}>Time slot:- {deliveryTimeSlot}</h5>
      )}
      <hr />
      <h5 className="card-title">Order #{orderNumber}</h5>
      <p className="card-text">
        Order Date: {new Date(orderDate).toLocaleDateString()}
      </p>
      <p className="card-text">Total Amount: {totalAmount}</p>
      <p className="card-text">Mobile Number: {mobileNumber}</p>
      <p className="card-text">User Name: {userName}</p>
      <p className="card-text">Address: {address}</p>

      <table className="table table-striped table-responsive table-bordered table-hover table-condensed">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product Name</th>
            <th>Selected Quantity</th> {/* Show selected quantity */}
            <th>Selected Pieces</th> {/* Show selected quantity */}
            <th>MRP</th> {/* Show MRP */}
            <th>Num Of Item</th>
            <th>Subtotal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => (
              <tr key={index} className={statusClasses[status]}>
                <td>
                  {product.item ? (
                    <span>
                      <img
                        src={`${backendUrl}${product.item.image}`}
                        alt="product"
                      />
                    </span>
                  ) : (
                    <span className="text-danger">
                      Admin deleted this product
                    </span>
                  )}
                </td>
                <td>
                  {product.item ? (
                    <span>{product.item.name}</span>
                  ) : (
                    <span className="text-danger">
                      Admin deleted this product
                    </span>
                  )}
                </td>
                <td>{product.selectedQuantityAndMrp?.quantity || "N/A"}</td>
                <td>{product.selectedQuantityAndMrp?.pieces || "N/A"}</td>
                <td>{product.selectedQuantityAndMrp?.mrp || "N/A"}</td>
                <td>{product.quantity}</td>
                <td>
                  {(product.selectedQuantityAndMrp?.mrp || 0) *
                    product.quantity}
                </td>
                <td>{status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderItem;
