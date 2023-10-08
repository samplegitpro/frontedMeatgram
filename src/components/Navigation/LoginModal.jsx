// LoginModal.js
import React, { useState ,useEffect } from "react";
import { Modal, Button,Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import backendUrl from "../../config";
import FacebookLogin from 'react-facebook-login';
const LoginModal = ({ showLoginModal, handleLoginModalClose, handleLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);
  const location = useLocation();
  const [token, setToken] = useState(Cookies.get('token') || '');
  useEffect(() => {
    // Check if the URL contains query parameters
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const userId = params.get("userId");
      if(token && userId){

      
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('userId', userId, { expires: 7 });
      // Save the token and userId to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }
  }
  }, [location.search]);
 
  // const handleLoginWithFacebook = () => {
  //   // Show alert message for Facebook login (Coming Soon)
  //   setErrorAlert("Facebook login is coming soon. Please try another way.");
  // };
  const handleSignupWithEmail = () => {
    axios
      .post(`${backendUrl}/api/user/register`, { email, password })
      .then((response) => {
        // If the login is successful, you can call handleLoginSuccess() here
        // and close the modal after successful login
       
        if (response.status === 200) {
          const token = response.data.token;
          const userId = response.data.userId;
  
          Cookies.set('token', token, { expires: 7 }); // Store the token in a cookie with a 7-day expiration
          Cookies.set('userId', userId, { expires: 7 }); // Store the userId in a cookie with a 7-day expiration
  
           handleLoginSuccess();
        }
        handleLoginModalClose();
      })
      .catch((error) => {
        setErrorAlert("User already registered. Please log in instead.");
      });
  };
  

  
const handleLoginWithEmail = () => {
  axios
    .post(`${backendUrl}/api/user/login`, { email, password })
    .then((response) => {
      // If the login is successful, you can call handleLoginSuccess() here
      // and close the modal after successful login
      console.log(response.data);

      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.userId;

        Cookies.set('token', token, { expires: 7 }); // Store the token in a cookie with a 7-day expiration
        Cookies.set('userId', userId, { expires: 7 }); // Store the userId in a cookie with a 7-day expiration
        
        handleLoginSuccess();
      }
      handleLoginModalClose();
    })
    .catch((error) => {
      setErrorAlert("Invalid credentials. Please try again.");
    });
};
  const handleLoginWithGoogle = () => {
    // Redirect the user to the Google login route on your backend
    window.location.href = `${backendUrl}/api/user/auth/google`;

  };
  
  const responseFacebook = (response) => {
    console.log("I am executing");
    if (response.status === "unknown") {
      // User canceled the Facebook login
      setErrorAlert("Facebook login was canceled.");
    } else {
      // You can access the user's Facebook information in the `response` object
      // You may want to send this information to your server for further processing
      const { id, name, email, accessToken } = response;
  
      // Example API request to your backend:
      axios
        .post(`${backendUrl}/api/user/login-with-facebook`, {
          facebookId: id,
          name,
          email,
          accessToken,
        })
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            const userId = response.data.userId;
  
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("userId", userId, { expires: 7 });
  
            handleLoginSuccess();
          }
          handleLoginModalClose();
        })
        .catch((error) => {
          setErrorAlert("Facebook login failed. Please try another way.");
        });
    }
  };

  const handleGuestLogin = () => {
    // Generate a guest username and email
    const guestUsername = "Guest" + Math.floor(Math.random() * 1000);
    const guestEmail = guestUsername + "@example.com";
    
    // Generate a random guest password (e.g., a random 8-character string)
    const guestPassword = generateRandomPassword(8);

    // Send the guest user data (including name, email, and password) to the backend for registration
    axios
      .post(`${backendUrl}/api/user/register`, { name: guestUsername, email: guestEmail, password: guestPassword })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          const userId = response.data.userId;

          Cookies.set('token', token, { expires: 7 }); // Store the token in a cookie with a 7-day expiration
          Cookies.set('userId', userId, { expires: 7 }); // Store the userId in a cookie with a 7-day expiration

          // Handle the successful guest login
          handleLoginSuccess();
        }
        handleLoginModalClose();
      })
      .catch((error) => {
        setErrorAlert("Guest login failed. Please try another way."); // Handle any guest login errors
      });
  };

  // Function to generate a random password
  const generateRandomPassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

 
  
 

  return (
    <Modal
      show={showLoginModal}
      onHide={handleLoginModalClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
        {(
          <div>
            <form>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control text-dark focus border-dark"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control text-dark focus border-dark"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button variant="warning" className="btn me-4" onClick={handleSignupWithEmail}>
              <i className="fa fa-sign-in me-2" aria-hidden="true"></i>{" "}
                Register
             </Button> 
              <Button variant="primary" className="btn me-4" onClick={handleLoginWithEmail}>
              <i className="fa fa-sign-in me-2" aria-hidden="true"></i>{" "}
                Log In
              </Button>
              <hr />
              
              <Button
                variant="danger"
                style={{"text-align":"start"}}
                className="btn mt-1 d-inline align-items-center"
                onClick={handleLoginWithGoogle}
              >
               <FontAwesomeIcon icon={faGoogle} className="me-1" /> Sign In with Google
              </Button>
              
             
               <FacebookLogin
              appId="652309396876568" // Replace with your Facebook App ID
             
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="btn btn-primary btn-md mt-1 text-start"
              icon="fa-facebook"
              // textButton="Log in with Facebook"
              textButton={<span className="ml-1">Sign In with Facebook</span>} // Add margin to the right of the text
            />
             
               
             <Button
                variant="secondary"
                style={{width:"12.1rem" , textAlign:"justify"}}
                className="btn me-4 mt-1 d-inline align-items-center"
                onClick={handleGuestLogin}
              >
              <FontAwesomeIcon icon={faUser} className="mt-1 me-1" /> Sign in as Guest
              </Button>
              
             
            </form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;



