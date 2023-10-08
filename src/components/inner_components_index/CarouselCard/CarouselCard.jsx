import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AddToCartButton from '../../product/AddToCartButton/AddToCartButton';
import backendUrl from '../../../config';

function CarouselCard({ product , notShowDescription}) {

  const { _id, name, image, quantityAndMrp, description } = product;
  const defaultQuantity = quantityAndMrp?.[0] || {}; // Default to the first detail

  const [selectedDetail, setSelectedDetail] = useState(defaultQuantity);
  const handleQuantityChange = (newDetail) => {
    setSelectedDetail(newDetail);
  };

  // Function to truncate the description to the first 10 words
  const truncateDescription = (description, wordCount) => {
    const words = description.split(' ');
    if (words.length <= wordCount) {
      return description;
    }
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const truncatedDescription = truncateDescription(description);

  return (
    <div className="food-items carousel-card" style={{width:"80%" , margin:"auto"}}>
      <Link to={`/products?ids=${_id}`}> {/* Wrap the image with a Link */}
      
      <div 
     style={{
        backgroundImage: `url(${backendUrl}${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center', // Center the background image
        paddingTop: '100%',
        borderRadius: '10px 10px 0 0',
      }}
      ></div>

        {/* <img src={`${backendUrl}${image}`} alt={name} /> */}
      </Link>
      <div className="details">
        <div className="title-description">
          <h5>{name}</h5>
          {notShowDescription&& <p className='d-inline'>{truncatedDescription}</p> }
        </div>
        <form className="quantity-form">
          {quantityAndMrp &&
            quantityAndMrp.map((detail, index) => (
              <div className='container' key={index}>
                <input
                  type="radio"
                  name={`quantity-${_id}`} // Use a unique name attribute based on the product _id
                  value={index}
                  id={`quantity-${index}-${_id}`} // Include the product _id in the ID
                  checked={selectedDetail === detail}
                  onChange={() => handleQuantityChange(detail)}
                />
                <label htmlFor={`quantity-${index}-${_id}`}>
                  {parseFloat(detail.quantity) > 0 && `${detail.quantity} Qty. `}
                  <span>Rs.{detail.mrp} {detail.numOfPieces > 0 && `Pcs.${detail.numOfPieces}`}</span>
                </label>
              </div>
            ))}
        </form>
        <AddToCartButton product={product} quantity={1} selectedQuantityAndMrp={{ quantity: selectedDetail.quantity, mrp: selectedDetail.mrp, numOfPieces: selectedDetail.numOfPieces }} />
      </div>
    </div>
  );
}

export default CarouselCard;
