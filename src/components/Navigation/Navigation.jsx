import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import Cookies from 'js-cookie';

import './Navigation.css'; // Import your custom CSS

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false); // Local state for the toggle button
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  useEffect(() => {
    // Check for authentication token on component mount
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsAuthenticated(true);
    window.location.reload(); // Refresh the page after successful login
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    navigate("/");
    window.location.reload(); // Refresh the page after logout
  };

  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen); // Toggle the state for showing/hiding navigation links
  };


  const openLocationModal = () => {
    setLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setLocationModalOpen(false);
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
  };

  return (
    <div className="navbar bg-black text-white d-flex justify-content-between align-items-center">
    <div className="center-section logo-text">
      <a href="/" className="logo">
        <img src="/assets/MEAT GRAM (1).jpg" alt="" className="logo-img" />
      </a>
      <div className="d-flex align-items-center">
        <div className="location-icon ml-3 mr-3 both-text">
          <i className="bi bi-geo-alt-fill"></i>
          <span className="location-text">Location</span>
          <p className="bpl">Bhopal</p>
        </div>
      </div>
    </div>

    <div className="right-section d-flex align-items-center">
      <div className="icons d-flex align-items-center">
        <Link to="/cart" className="icon mr- text-white">
          <i className="bi bi-cart-fill"></i>
        </Link>

        {isAuthenticated ? (
          <div className={`mt-1 dropdown`}>
            <button
              className="btn btn-secondary dropdown-toggle icon"
              type="button"
              id="profileDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-user" aria-hidden="true"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right text-dark" style={{color:"black"}} aria-labelledby="profileDropdown">
              <a className="dropdown-item text-dark" href="/user/myorder">
                My Orders
              </a>
              <button className="dropdown-item text-dark" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button className="btn" onClick={handleLoginClick}>
            <i className="bi bi-person-circle bi-10x" style={{ color: "white", fontSize: "24px" }}></i>
          </button>
        )}
      </div>
      <button className={`btn btn-link toggle-button text-white ${isToggleOpen ? 'open' : ''}`} onClick={handleToggleClick}>
  <i className="bi bi-list"></i>
  <div className={`dropdown-menu toggle-menu ${isToggleOpen ? 'open' : ''}`}>
    <Link to="/" className="dropdown-item">
      Home
    </Link>
    <Link to="/about" className="dropdown-item">
      About Us
    </Link>
    <Link to="/franchise" className="dropdown-item">
      Franchise
    </Link>
    <Link to="/FAQs" className="dropdown-item">
      FAQ
    </Link>
    <Link to="/contactus" className="dropdown-item">
      Contact Us
    </Link>
  </div>
</button>

    </div>

    <LoginModal
      showLoginModal={showLoginModal}
      handleLoginModalClose={handleLoginModalClose}
      handleLoginSuccess={handleLoginSuccess}
    />
  </div>
);
}

export default Navigation;


// {/* <>
//       <div className="search">
//         <a href="/" className="logo">
//           <img src="/assets/MEAT GRAM (1).jpg" alt="" />
//         </a>

//         {/* <SearchBar /> */}

//         <div className="boxthree">
//           <a href="/cart" className="mw-3 text-decoration-none">
//             <i className="bi bi-cart2" style={{ color: "white" }}><p>Cart</p></i>
//           </a>

//           {isAuthenticated ?
//             <div className={`mb-2 dropdown`}>
//               <button
//                 className="btn btn-secondary dropdown-toggle"
//                 type="button"
//                 id="profileDropdown"
//                 data-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 <i className="fa fa-user" aria-hidden="true"></i>
//               </button>
//               <div className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
//                 {/* <a className="dropdown-item text-dark" href="/profile">
//                   My Profile
//                 </a> */}
//                 <a className="dropdown-item text-dark" href="/user/myorder">
//                   My Orders
//                 </a>
//                 <button className="dropdown-item text-dark" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             </div> :
//             <button
//               className="btn"
//               onClick={handleLoginClick}
//             >
//               <i className="bi bi-person-circle bi-10x" style={{ color: "white", fontSize: "24px" }}><p>Login</p></i>
//             </button>
//           }

//           <LoginModal
//             showLoginModal={showLoginModal}
//             handleLoginModalClose={handleLoginModalClose}
//             handleLoginSuccess={handleLoginSuccess}
//           />
//         </div>
//       </div>
//     </> */}
  