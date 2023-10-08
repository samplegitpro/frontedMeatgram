import React,{useState} from 'react';
import './ProductWrap.css'
import AddToCartButton from '../../product/AddToCartButton/AddToCartButton';
import BoxWrap from '../BoxWrap/BoxWrap';
import backendUrl from '../../../config';

function ProductWrap({ product }) {

  const [count, setCount] = useState(1);
  const { name, image, quantityAndMrp, description,isBoneless } = product;
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0); // Initialize with the first detail

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  
  const handleQuantityAndMrpSelection = (index) => {
    setSelectedDetailIndex(index);
  };
  


  return (
    <section className="productWrap mt-40">
      <div className="container" style={{"marginTop": "5rem"}}>
        <div className="row">
          <div className="col-md-6">
            <div className="images">
              <img  
              className='img-fluid'
              src={`${backendUrl}${image}`}
              style={{ width: '40rem', height: '28rem', borderRadius: '15px' }}
              alt={name} />
            </div>
          </div>
          <div className="col-md-6 mt-10">
            <div className="text-wrap">
              <h3>{name}</h3>
              <div className="list-info">
                <ul>
                 
                    {isBoneless&&
                      <li>
                    'Boneless'
                    </li>
                    }
                 
                  <li>
                    Bite size pieces
                  </li>
                </ul>
              </div>
           
              <p>
               {description}
              </p>
             
              
              <div className="quantity-radio-group">
  {quantityAndMrp.map((detail, index) => (
    <label key={index}>
      <input
        type="radio"
        name="quantityAndMrp"
        value={index}
        checked={selectedDetailIndex === index}
        onChange={() => handleQuantityAndMrpSelection(index)}
      />
    
  {parseFloat(detail.quantity) > 0 && `${detail.quantity} Qty. `}
    Rs.{detail.mrp}
   {detail.numOfPieces > 0 && ` Pcs.${detail.numOfPieces}`}
    </label>
  ))}
</div>

                <BoxWrap
                  key={selectedDetailIndex}
                  numOfPieces={quantityAndMrp[selectedDetailIndex].numOfPieces}
                  quantity={quantityAndMrp[selectedDetailIndex].quantity}
                />
              
              
                        
              <div className="cart-menu">
  <div className="list">
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="btn btn-light quantity">{count}</span>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  </div>
</div>

              <div className="menu-button details">
              <AddToCartButton 
              product={product} 
              quantity={count} 
              selectedQuantityAndMrp={{
                  quantity: quantityAndMrp[selectedDetailIndex].quantity, 
                  mrp: quantityAndMrp[selectedDetailIndex].mrp,
                   numOfPieces: quantityAndMrp[selectedDetailIndex].numOfPieces    }}/>
                    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductWrap;
