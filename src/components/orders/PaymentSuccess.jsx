import React,{useEffect} from 'react';
import { useSearchParams,useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';

const PaymentSuccess = () => {
    const searchQuery=useSearchParams()[0];
    const location=useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const userId = new URLSearchParams(location.search).get('userId');

    useEffect(() => {
      // Save the token and userId to context and local storage
      Cookies.set('token', token, { expires: 7 }); // Store the token in a cookie with a 7-day expiration
      Cookies.set('userId', userId, { expires: 7 }); // 
    
     
      // Do any other actions needed on successful payment
    }, [token, userId]);
  
    const referenceNum = searchQuery.get("reference");
  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment.</p>
      <p>Your order has been successfully processed.</p>
      <p>Reference Number {referenceNum}</p>

    </div>
  );
};

export default PaymentSuccess;
