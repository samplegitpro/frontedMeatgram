import React from 'react';

function TermsAndConditions() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          {/* Logo */}
          {/* <div className="text-center">
            <img src="./image/MEAT GRAM (1).jpg" alt="" className="logo-term-photo" />
          </div> */}

          {/* Heading */}
          <div className="text-center text-danger">
            <h1 className="mt-4 serif-font">Terms & Conditions</h1>
          </div>

          {/* Text Content */}
          <div className="mt-4">
            <p className="lead">
              <strong>1. Check Your Delivery</strong>
            </p>
            <p className="serif-font">
              Please check the material at delivery. If there is any problem, please feel free to contact us. You can return the material to the delivery boy, and we will try to send you the same order in the next delivery slot.
            </p>

            <p className="lead">
              <strong>2. Returns Policy</strong>
            </p>
            <p className="serif-font">
              Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of the delivery time.
            </p>

           
            <p className="lead">
              <strong>3. Order Cancellation</strong>
            </p>
            <p className="serif-font">
              Order cancellation can be done up to 1 hour before the delivery slot time. Once dispatched, orders cannot be cancelled.
            </p>

            <p className="lead">
              <strong>4. Delivery Time Slots</strong>
            </p>
            <p className="serif-font">
              Our delivery time slots are from 10am to 1pm and 5pm to 9pm.
            </p>
          </div>

          {/* Footer */}
          {/* <div className="text-center mt-4">
            <p className="serif-font">&copy; Copyright 2023, All Rights Reserved</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
