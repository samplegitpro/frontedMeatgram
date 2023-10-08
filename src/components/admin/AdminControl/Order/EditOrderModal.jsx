import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditOrderModal = ({ order, onSave, onClose }) => {
    const [editedOrder, setEditedOrder] = useState({ ...order });
    const [discountPercentage, setDiscountPercentage] = useState(
        order.discount || 0
      );
      const [totalAmount, setTotalAmount] = useState(order.amount);
      const [isDeliveryCharged, setIsDeliveryCharged] = useState(order.isDeliveryCharged || false);

  
      useEffect(() => {
        console.log(isDeliveryCharged)
        // Recalculate the total amount whenever editedOrder, discountPercentage, or isDeliveryCharged changes
        const calculateTotalAmount = () => {
          let total = 0;
          editedOrder.items.forEach((item) => {
            const itemTotal = item.quantity * item.selectedQuantityAndMrp.mrp;
            total += itemTotal;
          });
    
          // Calculate the discount amount based on the percentage
          const discountAmount = (total * discountPercentage) / 100;
          total -= discountAmount;
    
          // Subtract delivery charge if isDeliveryCharged is false
          
          if (isDeliveryCharged) {
            total += 50;
          }
    
          setTotalAmount(total);
        };
    
        calculateTotalAmount();
      }, [editedOrder, discountPercentage, isDeliveryCharged]);
    
      const handleInputChange = (e) => {

      const { name, value } = e.target;
      setEditedOrder({
        ...editedOrder,
        [name]: value,
      });
    };
  
    const handleSelectedQuantityAndMrpChange = (itemId, field, value) => {
      const updatedItems = editedOrder.items.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            selectedQuantityAndMrp: {
              ...item.selectedQuantityAndMrp,
              [field]: value,
            },
          };
        }
        return item;
      });
  
      setEditedOrder({
        ...editedOrder,
        items: updatedItems,
      });
    };
  
    const handleOuterQuantityChange = (itemId, value) => {
      const updatedItems = editedOrder.items.map((item) => {
        console.log(item)
        console.log(value)
        if (item._id === itemId) {
          return {
            ...item,
            quantity: value,
          };
        }

        return item;
      });
  
      setEditedOrder({
        ...editedOrder,
        items: updatedItems,
      });
    };
  
    const handleDiscountPercentageChange = (e) => {
        setDiscountPercentage(parseFloat(e.target.value) || 0);
      };
      const handleIsDeliveryChargedChange = (e) => {
        setIsDeliveryCharged(e.target.value === 'true');
      };
    
    
      const handleSave = () => {
        // Calculate the discount amount based on the percentage
        const discountAmount = (totalAmount * discountPercentage) / 100;
    
        const updatedOrder = {
          ...editedOrder,
          amount: totalAmount , // Apply the discount
          discount:discountPercentage,
          isDeliveryCharged,
        };
    
        onSave(updatedOrder);
        onClose();
      };
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedOrder.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={editedOrder.mobileNumber}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="selectedQuantityAndMrp">
            <Form.Label>Selected Quantity & MRP</Form.Label>
            {editedOrder.items.map((item) => (
              <div key={item._id}>
              <Form.Label>Item : {item.item.name}</Form.Label>
              <hr />
              {/* <Form.Group controlId={`item_quantity-${item._id}`}> */}
      <Form.Label>Quantity</Form.Label>
   
      <Form.Control
        type="number"
        name={`item_quantity-${item._id}`}
        value={item.quantity}
        onChange={(e) =>
            handleOuterQuantityChange(item._id, parseInt(e.target.value))
        }
      />
    {/* </Form.Group> */}
              <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="string"
                  name={`quantity-${item._id}`}
                  value={item.selectedQuantityAndMrp.quantity}
                  onChange={(e) =>
                    handleSelectedQuantityAndMrpChange(
                      item._id,
                      'quantity'
                    )
                  }
                />
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name={`mrp-${item._id}`}
                  value={item.selectedQuantityAndMrp.mrp}
                  onChange={(e) =>
                    handleSelectedQuantityAndMrpChange(
                      item._id,
                      'mrp',
                      parseFloat(e.target.value)
                    )
                  }
                />
                 <Form.Label>Pieces</Form.Label>
                <Form.Control
                  type="number"
                  name={`pieces-${item._id}`}
                  value={item.selectedQuantityAndMrp.numOfPieces}
                  onChange={(e) =>
                    handleSelectedQuantityAndMrpChange(
                      item._id,
                      'numOfPieces',
                      parseFloat(e.target.value)
                    )
                  }
                />
                <hr />
              </div>
            ))}
          </Form.Group>
          
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={editedOrder.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={editedOrder.pincode}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="discountPercentage">
            <Form.Label>Discount Percentage</Form.Label>
            <Form.Control
              type="number"
              name="discountPercentage"
              value={discountPercentage}
              onChange={handleDiscountPercentageChange}
            />
          </Form.Group> 
          <Form.Group controlId="isDeliveryCharged">
            <Form.Label>Is Delivery Charged?</Form.Label>
            <Form.Control
              as="select"
              name="isDeliveryCharged"
              value={isDeliveryCharged.toString()}
              onChange={handleIsDeliveryChargedChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Control>
          </Form.Group>
           
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              name="amount"
              value={totalAmount.toFixed(2)} // Format totalAmount as a string with 2 decimal places
              readOnly
            />
          </Form.Group>




        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrderModal;

