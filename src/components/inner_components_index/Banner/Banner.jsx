import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import backendUrl from "../../../config";
import './Banner.css'; // Import your custom styles for the banner if needed
import { useMediaQuery } from "react-responsive";

function Banner() {
  const [images, setImages] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/getbanner`);
      setImages(response.data);
    } catch (error) {
      console.log("Failed to fetch banner images:", error);
      setImages([]);
    }
  };

  // Set the fixed aspect ratio
  const aspectRatio = 2;

  // Calculate the height based on viewport height (vh)
  const containerHeight = isMobile ? "26vh" : "100vh";

  return (
    <div id="homepage-slider" className="st-slider">
      <Carousel
        autoPlay={true}
        interval={5000} // Change image every 5 seconds
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false} // Remove arrow buttons
        useKeyboardArrows={true}
        swipeable={true}
        stopOnHover={false}
      >
        {images.map((image, index) => (
          <div key={index}>
          
          {isMobile?(
            <div
              className="image homepage-slider-image bg-yellow"
              style={{
                backgroundImage: `url(${backendUrl}${image.image})`,
                backgroundSize: "cover", // Adjust backgroundSize
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                width: "100%", // Adjust the width for desktop
                height: containerHeight, // Set the calculated container height
              }}
            ></div>):(
            <img src={`${backendUrl}${image.image}`} classname='img img-fluid h-15' style={{height:"30rem"}} alt={image.alt}/>
            )}</div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
