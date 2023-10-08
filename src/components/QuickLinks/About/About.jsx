import React from "react";
import { useMediaQuery } from "react-responsive";
import "./About.css"; // You can import your custom CSS for styling if needed

function About() {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Define mobile view based on screen width
  
  return (
    <div className="about-main-container">
      <div className="responsive-container-block Container">
      {isMobile && (
          <img className="mainImg" src="/assets/MEAT GRAM (1).jpg" alt="Meat Image" />
        )}
        <div className="text-container mx-auto my-auto">
          <h1 className="text-blk headingText">About Us</h1>

          <p className="text-blk description">
            Welcome to Cher's MeatGram, your one-stop destination for
            premium-quality fresh chicken, fish, mutton, and delectable
            marinades delivered right to your doorstep in Bhopal. We take pride
            in offering the finest selection of meats to elevate your culinary
            experience and make every meal a memorable one.
            <br />
            <br />
            <strong>Mission</strong>
            <br />
            At Cher's MeatGram, our mission is to provide the people of Bhopal
            with a convenient and trustworthy source for their meat and marinade
            needs. We are committed to:
            <ul>
              <li>
                <strong>Quality:</strong> We source our meats from trusted
                suppliers, ensuring that you receive the freshest,
                highest-quality products every time you order from us.
              </li>
              <li>
                <strong>Convenience:</strong> We understand the value of your
                time, which is why we offer hassle-free online ordering and
                doorstep delivery. We want to make it easy for you to access the
                best meats without leaving the comfort of your home.
              </li>
              <li>
                <strong>Variety:</strong> We believe in giving you choices. Our
                diverse range of meats and marinades allows you to explore new
                flavors and culinary experiences, enhancing your cooking
                repertoire.
              </li>
              <li>
                <strong>Sustainability:</strong> We are dedicated to sustainable
                sourcing practices that minimize our environmental impact. By
                choosing Cher's MeatGram, you are supporting responsible and
                eco-friendly meat procurement.
              </li>
              <li>
                <strong>Customer Satisfaction:</strong> Your satisfaction is our
                top priority. We are always ready to listen to your feedback and
                improve our services to better meet your expectations.
              </li>
            </ul>
            <strong>Vision</strong>
            <br />
            Our vision for Cher's MeatGram is to become Bhopal's most trusted
            and preferred meat and marinade delivery service. We aim to:
            <ul>
              <li>
                <strong>Become a Household Name:</strong> We want every
                household in Bhopal to recognize Cher's MeatGram as the go-to
                destination for fresh and high-quality meats.
              </li>
              <li>
                <strong>Promote Healthy Eating:</strong> We aspire to educate
                our customers about the benefits of incorporating lean meats
                into their diets for a healthier lifestyle.
              </li>
              <li>
                <strong>Support Local Communities:</strong> We aim to strengthen
                local communities by collaborating with local farmers and
                suppliers, contributing to the region's economic growth.
              </li>
              <li>
                <strong>Innovate Continuously:</strong> We will constantly
                strive to introduce new and exciting products, recipes, and
                cooking tips to inspire your culinary creativity.
              </li>
              <li>
                <strong>Expand Responsibly:</strong> While we are focused on
                Bhopal today, our vision extends to reaching more cities and
                regions, bringing the joy of delicious, responsibly sourced meats
                to a broader audience.
              </li>
            </ul>
            Join us on this flavourful journey as we work passionately to make
            Cher's MeatGram synonymous with quality, convenience, and culinary
            excellence in Bhopal and beyond. Thank you for choosing Cher's
            MeatGram for your meat and marinade needs!
            <br />
            <br />
            <strong>Follow us on Instagram and Facebook: @chersmeatgram</strong>
            <br />
            <strong>Call: 7055205010</strong>
            <br />
            <strong>WhatsApp: 7055205010</strong>
            <br />
            <strong>
              Store Address: R-02 Panchwati Complex, Panchwati Colony, Lalghati,
              Bhopal
            </strong>
          </p>



          <a href="/all-products" className="explore text-decoration-none">Order Now</a>
        </div>
      </div>

      <div className="footer-container">
        <p>© Copyright 2023 All Rights Reserved</p>
      </div>
    </div>
  );
}

export default About;
