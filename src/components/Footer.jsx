import React from "react";

function Footer() {
  return (
    <div class="footer">
    <div class="web_logo">
        <div class="logo_web">
        <img src="/assets/MEAT GRAM (1).jpg" alt="logo-footer"/>
        </div>
        <div class="texts">
        <h1>Cher's<span> Meatgram</span></h1>
        </div>
    </div>

    <div class="contac_detail">
        <p><h1>CONTACT US</h1></p>
        <div class="textone">
            <i class="bi bi-telephone-forward-fill"></i>
            <p>+91 7055205010</p>
        </div>

        <div class="textone">
            <i class="bi bi-envelope-fill"></i>
            <p> supportbhopal@chersmeatgram.com</p>
        </div>
        

        <div class="textone">
            <i class="bi bi-geo-alt-fill"></i>
           
            <p> Shop No-2 Panchwati Colony Near Hotel
                Nirmal Residency Gate, Lalghati, Bhopal</p>
        </div>
    </div>

    <div class="services_link">
      
        <h1>QUICK LINKS</h1>
        
        
        <a href="/privacyPolicy" className="text-decoration-none"><p>Privacy Policy</p></a>
        <a href="/terms" className="text-decoration-none"><p>Terms & Conditions</p></a>
        <a href="/FAQs" className="text-decoration-none"><p>FAQ'S</p></a>
        <div class="media-icons">
            <a href="https://www.facebook.com/chersmeatgram"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/chersmeatgram/"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@CHERSMeatGram"><i class="fab fa-youtube"></i></a>
          </div>
    </div>

</div>
  );
}

export default Footer;
