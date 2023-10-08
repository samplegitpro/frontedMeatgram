import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Testimonial.css";
function Testimonials() {
  return (
    <section className="section__container testimonial-container">
      <h2>Testimonials</h2>
      <h1>What our customers say</h1>
      <Carousel>
        <Carousel.Item>
          <div className="section__card">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <h4>Our Clients Review</h4>
            <p>
              Excellent service and very humble and gentle executive staff
              mutton quality is good and fresh. Once the order was not good as
              expected I informed them the issue. They immediately re-delivered
              same order complimentary. I like this This thing.
            </p>
            <img
              src="/assets/user.png"
              style={{ width: "5rem", height: "5rem" }}
              alt="user"
            />
            <h5>Asif Baig</h5>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="section__card">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <h4>Our Clients Review</h4>
            <p>
              The quality of all meats which we have purchased, especially
              freshwater fishes have been great. The delivery experience has
              been good as well with respect to time to delivery.
            </p>
            <img
              src="/assets/user.png"
              style={{ width: "5rem", height: "5rem" }}
              alt="user"
            />
            <h5>Gulshan Enterprises</h5>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="section__card">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <h4>Our Clients Review</h4>
            <p>
              Excellent service and good quality products. Really happy with the
              quality and taste. Very fresh item delivered on time 😊 …
            </p>
            <img
              src="/assets/user.png"
              style={{ width: "5rem", height: "5rem" }}
              alt="user"
            />
            <h5>Deepa Mirchandani</h5>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default Testimonials;
