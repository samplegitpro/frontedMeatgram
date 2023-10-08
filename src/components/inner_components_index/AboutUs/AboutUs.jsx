import React from "react";
import './AboutUs.css'
function AboutUs() {
  return (
    <div class="about" id="Aboutus">
      <div class="about_main d-flex align-items-center justify-content-center">
      <div class="video">
          <video controls autoPlay loop muted playsinline style={{borderRadius:"20px"}} src="/assets/about_video1.mp4"></video>
        </div>
        <div class="about_text">
          <h1><span>About</span>Us</h1>
          <p>
           Welcome to Cher's MeatGram, your one-stop destination for premium-quality fresh chicken, fish, mutton, and delectable marinades delivered right to your doorstep in Bhopal. We take pride in offering the finest selection of meats to elevate your culinary experience and make every meal a memorable one.
          </p>
        </div>
      </div>

      <a href="/product/all-product" class="about_btn">Order Now</a>
    </div>

  );
}

export default AboutUs;
