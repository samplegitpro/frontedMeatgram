import React from "react";
import NavBar from "./Navbar/NavBar";
import { BrowserRouter, useLocation } from "react-router-dom";

function Header() {
  

  return (
    <div>
      <BrowserRouter>
        {/* Conditionally render MobileDownload only on the home page */}
       
        <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default Header;
