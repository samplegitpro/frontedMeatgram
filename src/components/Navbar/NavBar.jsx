import React, { useState,useEffect } from "react";
import { Route, Routes,useNavigate,useLocation } from "react-router-dom";
import './NavBar.css'
import Body from "../Body";
import Cart from "../Cart";
import Product from "../Product";
import Navigation from "../Navigation/Navigation";

import AdminApp from "../admin/AdminApp/AdminApp";
import Items from '../product/Items'
import PaymentSuccess from '../orders/PaymentSuccess'
import MyOrderPage from "../orders/MyOrderPage";
import OrderStatusUpdate from "../orders/OrderStatusUpdate";
import LoginModal from "../Navigation/LoginModal";
import Cookies from 'js-cookie';
import MobileDownload from "../MobileDownload/MobileDownload";
import CategoryApp from "../inner_components_category/CategoryApp";
import FAQPage from "../QuickLinks/FAQs/FAQPage";

import Terms from "../QuickLinks/Terms/Terms";
import PrivacyPolicy from "../QuickLinks/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "../QuickLinks/ContactUs/ContactUs";
import About from "../QuickLinks/About/About";

function NavBar() {
  const [categoryName, setCategoryName] = useState('');
  
  const [subCategory, setsubCategory] = useState("");
  const navigate = useNavigate();
  const [isToggleOn, setIsToggleOn] = useState(false); // Toggle state

  useEffect(() => {
    const toggle = document.getElementById('toggle');
    const menu = document.getElementById('menu');
    const backdrop = document.getElementById('backdrop');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        
        toggle.classList.toggle('on');
        backdrop.classList.toggle('active');
      });
    }
  
    return () => {
      if (toggle && menu) {
        console.log("Removing event listener");
        toggle.removeEventListener('click', () => {
          toggle.classList.toggle('on');
        });
      }
    };
  }, []);
  

  // const userId = localStorage.getItem('userId');
  const userId = Cookies.get('userId');
  const handleCategoryChoice = (category,subcategories) => {
    setCategoryName(category);
    setsubCategory(subcategories);
    navigate(`/category/${categoryName}`);
  };
  

const handleToggleClick = () => {
    setIsToggleOn(!isToggleOn);
  };

  const location = useLocation();

  // Check if the current pathname is the home page ("/")
  const isHomePage = location.pathname === "/";
  return (

                
          
  
      <div>
       {isHomePage && <MobileDownload />}
       <Navigation />

        <Routes >
          <Route exact path="/" element={<Body categoryChoice={handleCategoryChoice} />} />
          <Route path="/category/:categoryName" element={<CategoryApp categoryChoice={handleCategoryChoice} category={categoryName} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:productType" element={<Items title="All-Products" showAll={true} />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/user/myorder" element={<MyOrderPage isAdmin={false} userId={userId} />} />
          <Route path="/order/:orderId" element={<OrderStatusUpdate />}/>
          <Route path="/login" element={<LoginModal />} /> 
          <Route path="/FAQs" element={<FAQPage />} /> 
          <Route path="/terms" element={<Terms />} /> 
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} /> 
          <Route path="/contactus" element={<ContactUs />} /> 
          <Route path="/about" element={<About />} /> 

        </Routes>
      </div>
  );
}

export default NavBar;


// <section className="header">
// <div className="container">
//   <div className="header-wrap">
//     <div className="left">
//       <div className="logo" >
//         <a href="/">
//           <img src="/images/logo.png" alt="logo" />
//         </a>
//       </div>
//     </div>


//     <div className={`toggle ${isToggleOn ? 'on' : ''}`} id="toggle" onClick={handleToggleClick}>
//         <span></span>
//      </div>
//     <div className={`right menu ${isToggleOn ? 'on' : ''}`}  id="menu">
//         <Navigation isToggleOn={isToggleOn} setIsToggleOpen={setIsToggleOn}/>
//      </div>
//      <div className={`backdrop ${isToggleOn ? 'active' : ''}`} id="backdrop"></div>
     
    
//   </div>
// </div>
// </section>