import React, { useEffect, useState } from "react";
import Card from "../product/Card";
import backendUrl from "../../config";
import { Carousel } from "react-bootstrap";
import LoadingOverlay from "../Loading/LoadingOverlay";
import "./BonelessCuts.css";
import { useMediaQuery } from "react-responsive";

import CarouselCard from "./CarouselCard/CarouselCard";
function BonelessCuts() {
  const [items, setItems] = useState([]);
  // const isMobile = window.innerWidth <= 768; // Define mobile breakpoint (adjust as needed)
  const isMobile = useMediaQuery({ maxWidth: 991 }); // Define mobile breakpoint
  const isSmallWidth = useMediaQuery({ maxWidth: 349 });
  useEffect(() => {
    // Fetch the boneless items from the backend
    fetch(`${backendUrl}/api/products/boneless`)
      .then((response) => response.json())
      .then((data) => {
        // Update the items state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching boneless items:", error);
      });
  }, []);

  return (
    <div className="menu bestsellers-container" id={`scroll1`}>
      <div className="heading">
        <h1>Bestsellers Cuts</h1>
        {/* <h3>&mdash; Raw Menu &mdash;</h3> */}
      </div>
      {isMobile ? ( // Render Carousel only on mobile screens
        <div
          className="carousel-container"
          style={{ width: isSmallWidth && "20rem" }}
        >
          <Carousel
            indicators={false}
            prevIcon={
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            }
            nextIcon={
              <span className="carousel-control-next-icon" aria-hidden="true" />
            }
            nextLabel=""
            prevLabel=""
          >
            {items.map((product, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  <div className="col-12">
                    <CarouselCard
                      product={product}
                      notShowDescription={false}
                    />
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <>
          {/* // <div className="card-container"> */}
          {/* Render all cards on desktop screens */}
          {/* <div className="row"> */}
          {items.map((product, index) => (
            // <div className="col-md-4" key={index}>
            <CarouselCard product={product} notShowDescription={false} />
            // </div>
          ))}
          {/* </div> */}
          {/* </div> */}
        </>
      )}
    </div>
  );
}

export default BonelessCuts;
