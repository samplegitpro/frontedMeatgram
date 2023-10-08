import React, { useEffect, useState } from "react";
import backendUrl from "../../../config";
import CarouselCard from "../CarouselCard/CarouselCard";
import { Carousel } from "react-bootstrap";
import "./RawMenu.css";
import { useMediaQuery } from "react-responsive";

function RawMenu() {
  const isMobile = useMediaQuery({ maxWidth: 991 }); // Define mobile breakpoint
  const isSmallWidth=useMediaQuery({ maxWidth: 349 });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the top-selling products from the backend
    fetch(`${backendUrl}/api/products/rawmenu`)
      .then((response) => response.json())
      .then((data) => {
        // Update the products state with the fetched data
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching top-selling products:", error);
      });
  }, []);

  
  return (
    <div className="menu bestsellers-container" style={{marginTop:"5rem"}} id={`scroll1`}>
      <div className="heading" style={{backgroundColor:"black",color:"white"}}>
        <h1>Raw Menu</h1>
        {/* <h3>&mdash; Menu &mdash;</h3> */}
      </div>

      {isMobile ? ( // Render Carousel only on mobile screens
        <div className="carousel-container" style={{width:isSmallWidth&&"20rem"}}>
          <Carousel
            indicators={false}
            prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
            nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
            nextLabel=""
            prevLabel=""
          >
            {products.map((product, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">
                  <div className="col-12">
                    <CarouselCard product={product} notShowDescription={false} />
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <>
      
            {products.map((product, index) => (
                <CarouselCard product={product} notShowDescription={false} />
            
            ))}
       
     </>
      )}
    </div>
  );
}

export default RawMenu;