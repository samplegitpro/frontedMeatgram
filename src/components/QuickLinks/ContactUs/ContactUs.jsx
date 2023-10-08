import React from "react";
import "./ContactUs.css"; // You can import your custom CSS for styling if needed

function ContactUs() {
  return (
    <div className="contact-main-container">
      <div className="contact-container">
        <div className="contact-content">
          <div className="image-box">
            <img src="/assets/contact.png" style={{height:"22rem"}} alt="contact" />
          </div>
          <form action="mailto:chersmeatgram@gmail.com" method="POST" enctype="text/plain">

            <div className="topic">Send us a message</div>
            <div className="input-box">
              <input type="text" required />
              <label>Enter your name</label>
            </div>
            <div className="input-box">
              <input type="text" required />
              <label>Enter your email</label>
            </div>
            <div className="message-box">
              <textarea></textarea>
              <label>Enter your message</label>
            </div>
            <div className="input-box">
              <input type="submit" value="Send Message" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
