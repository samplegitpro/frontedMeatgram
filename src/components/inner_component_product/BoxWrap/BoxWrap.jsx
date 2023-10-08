import React from 'react';
import './BoxWrap.css';

const BoxWrap = ({ numOfPieces, quantity,selected }) => {
  console.log(numOfPieces+"   "+quantity)
  return (
    <div className={`box-wrap ${selected ? 'selected' : ''}`}>
      <div className="first-div">
        {numOfPieces!==0 && 
        <div className="list1">
        <span>

            <img src="/images/Rectangle 89.png" alt="Pieces" />
            No. of Pieces {numOfPieces}
          </span>
        </div>}

         {
         parseFloat(quantity) > 0 && 
         
       
        <div className="list">
        <span>
            <img src="/images/Rectangle 91.png" alt="Weight" />
            Weight {quantity}
          </span>
        </div>
        }
        
      </div>
     
    </div>
  );
};

export default BoxWrap;

