import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import backendUrl from '../../../config';
import { useMediaQuery } from "react-responsive";
const CheckoutPage = ({name,mobileNumber,address, amount, products,numberOfItem,storeLocation,pincode,isOrderForLater,deliveryTimeSlot,deliveryDate }) => {
  const isMobile = useMediaQuery({ maxWidth: 741 }); // Define mobile breakpoint

  const  userId= Cookies.get('userId');
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showOrderInfo, setShowOrderInfo] = useState(false);
 
  const [orderError, setOrderError] = useState(null);
  const [couponCode, setCouponCode] = useState(''); // State to store the entered coupon code
  const [discount, setDiscount] = useState(0); // State to store the discount amount
  const [couponAlert, setCouponAlert] = useState(null);
  const [totalAmount, setTotalAmount] = useState(amount);



  useEffect(() => {
    const razorpaySuccessHandler = (response) => {
      savePaymentDetails(
        response.razorpay_order_id,
        response.razorpay_payment_id,
        response.razorpay_signature
      );
    };

    if (window.Razorpay?.on) {
      window.Razorpay.on('payment.success', razorpaySuccessHandler);
    }

    return () => {
      if (window.Razorpay?.off) {
        window.Razorpay.off('payment.success', razorpaySuccessHandler);
      }
    };
  }, []);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = async () => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(`${backendUrl}/api/coupon/apply`, {
        method: 'POST', // Adjust the HTTP method as needed
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode, amount }), // Modify the request body as needed
        
      });
      const data = await response.json(); 
      console.log(data)

      if (data.valid) {
        setDiscount(data.amount);
        setTotalAmount(data.amount)
        setCouponAlert({ variant: 'success', message: 'Coupon applied successfully!' });
     
      } else {
        setDiscount(0);
        setCouponAlert({ variant: 'danger', message: data.message });
     
      }
    } catch (error) {
      console.error('An error occurred while applying the coupon:', error);
      setCouponAlert({ variant: 'warning', message: 'An error occurred while applying the coupon:' });
     
    }
  };


  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleFormSubmitRazorpay = async (e) => {
    e.preventDefault();

    try {
      // Create the order on the backend and receive the order details
      const { data: { order } } = await axios.post(`${backendUrl}/api/payment/checkout`, { amount:totalAmount });

      const { data: { key } } = await axios.get(`${backendUrl}/api/getkey`);

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'MeatGram',
        description: 'Buy Your Product',
        image: '/images/logo.png',
        order_id: order.id,
        callback_url: `${backendUrl}/api/payment/paymentverification`,
        handler: async (response) => {
          const result = await axios.post(`${backendUrl}/api/payment/paymentverification`, response);
          if (result.status === 200) {
            savePaymentDetails(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          }
        },
        prefill: {
          name,
          contact: mobileNumber,
        },
        notes: {
          address,
          products: products.map((item) => ({
            id: item.item._id,
            quantity: item.quantity,
          })),
          pincode
        },
        theme: {
          color: '#111212',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      // After successful payment, the paymentVerification route in the backend will handle saving the payment details in the database
    } catch (error) {
      console.error(error);
    }
  };

  async function savePaymentDetails(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {
      // Send the payment details to the backend
      const data = {
        name,
        mobileNumber,
        address,
        userId,
        amount:totalAmount+50,
        pincode,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      };

      const response = await axios.post(`${backendUrl}/api/payment/savepayment`, data);
      Cookies.set('token', response.data.token, { expires: 7 }); // Store the token in a cookie with a 7-day expiration
      Cookies.set('userId', response.data.userId, { expires: 7 }); // 
      const token = Cookies.get('token');
      window.location.href = `/paymentsuccess?reference=${razorpay_payment_id}&token=${token}&userId=${userId}`;
      console.log('Payment details sent to the backend');
 
    } catch (error) {
      window.location.href = '/paymenterror';
      console.error('An error occurred while sending payment details:', error);
    }
  }

  const handleCashOnDelivery = async (e) => {

    e.preventDefault();
    setShowOrderInfo(true);
    try {
      // Create the order on the backend without Razorpay details
      const data = {
        name,
        mobileNumber,
        address,
        userId,
        amount:totalAmount+50,
        pincode,
        deliveryTimeSlot,
        deliveryDate,
        isOrderForLater,
        isDeliveryCharged:true,
        discount:discount?50:0
      };
   
      const response = await axios.post(`${backendUrl}/api/payment/cashondelivery`, data);
      if (response.data.success) {
       
        setOrderError(null);
        setShowOrderInfo(false);
        const token = Cookies.get('token');
        window.location.href = `/paymentsuccess?reference="Cash On Delivery"&token=${token}&userId=${userId}`;

        // Redirect or show a success message
        console.log('Order confirmed with Cash On Delivery');
      } else {
        setOrderPlaced(false);
        setShowOrderInfo(false);
        setOrderError('Failed to place the order. Please try again later.');
        console.log('Order placement failed.');
      }
    } catch (error) {
      setOrderPlaced(false);
      setShowOrderInfo(false);
      setOrderError('An error occurred while processing the order. Please try again later.');
      console.error('An error occurred while processing the order:', error);
      // Handle errors
    }
  };


  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Checkout</h2>
          <Form onSubmit={paymentMethod === 'razorpay' ? handleFormSubmitRazorpay : handleCashOnDelivery}>
          <section class="addline">
    <div class="container" id="checkout_content">
        <div class="address">
           <h5 id="total_items">Total item - {numberOfItem}</h5>
           <p>address:</p>
           
           <h3 id="delivery_address">{address}</h3>
           {isOrderForLater&&(<h3>This Order is for later.</h3>)}
           {isOrderForLater&& (<h5 style={{fontSize:"1rem"}}>Delivery Date:- {deliveryDate} </h5>)}
           {isOrderForLater&& (<h5 style={{fontSize:"1rem"}}>Time slot:- {deliveryTimeSlot} </h5>)}
           {/* <!-- <h3>The product will be delivered by </h3> -->
           <!-- <p>11-Nov-2022</p> --> */}

        </div>
        <div class="bill" style={{width:isMobile&&"100%"}}>
            <h6 class="el">BILL DETAILS</h6>
            <div class="left-right">
                <div class="left">
               <h5 id="total_items">Name:- </h5>

                    <p>subtotal:-</p>
                    <p>Delivery:- </p>
                    <p>Apply Coupon:- </p>
                    {discount > 0 && ( // Display the discount only if greater than 0
                        <>
                        <p class="all">Discount:- </p>
                        </>
                      )}
                    
                   
                    <h6>Total</h6>
                </div>

                <div class="right">




                    <p id="subtotal" style={{marginBottom:"0.5rem"}}>{name}</p>
                    <p id="subtotal" >{amount}</p>
                    <p id="subtotal" > +50 </p>
                    
                    <div className="d-flex">
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={handleCouponChange}
                          className="form-control me-2"
                        />
                        <Button variant="primary" onClick={applyCoupon}>
                          Apply
                        </Button>
                      </div>
                    
                      {discount > 0 && ( // Display the discount only if greater than 0
                        <>
                          <p className="all" style={{marginTop:"1.2rem"}} id="discount">
                           50%
                          </p>
                        </>
                      )}
                      <h6 id="total" className='mt-3'>{discount?discount+50:amount+50}</h6>

                </div>
            </div>
              {couponAlert && (
                  <Alert variant={couponAlert.variant}>{couponAlert.message}</Alert>
                )}
        </div>

        <div class="button-bill-wrap">
            <div class="first">

            <div className="payment-method-box">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
               
                checked={paymentMethod === 'cashOnDelivery'}
                onChange={() => handlePaymentMethodChange('cashOnDelivery')}
              />
              <label htmlFor="cashOnDelivery" className='me-6'>Cash On Delivery</label>

              {/* <input
                type="radio"
                id="razorpay"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={() => handlePaymentMethodChange('razorpay')}
              />
                
              <label htmlFor="razorpay" className='me-6'>Pay Now with Razorpay</label> */}
            </div>
{/* 
            {paymentMethod === 'razorpay' && (
             
              <Button variant="primary" type="submit">
                Proceed to Pay
              </Button>
            )} */}

            {!showOrderInfo && paymentMethod === 'cashOnDelivery' && (
              <Button variant="success" type="submit">
                Confirm Order
              </Button>
            )}

            {showOrderInfo && (
                  <Alert variant="info">Placing your order, please wait...</Alert>
                )}

                {orderPlaced && !orderError && (
                  <Alert variant="success">Your Order is placed Successfully. Thank you!</Alert>
                )}

            {orderError && (
              <Alert variant="danger">Error: {orderError}</Alert>
            )} 
            </div>
        
        </div>
       

    </div>
</section>
          
          </Form>
        </Col>

      
      </Row>
    </Container>
  );
};

export default CheckoutPage;


