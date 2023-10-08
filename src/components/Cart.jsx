import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CartApp from "./Cart/CartApp";
import LoginModal from "./Navigation/LoginModal";
function Cart() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = Cookies.get("token");
 
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <LoginModal
          showLoginModal={showLoginPrompt}
          handleLoginModalClose={() => setShowLoginPrompt(false)}
          handleLoginSuccess={() => {
            setShowLoginPrompt(false);
            window.location.reload();
          }}
        />
      ) : (
        <CartApp />
      )}
    </div>
  );
}

export default Cart;

