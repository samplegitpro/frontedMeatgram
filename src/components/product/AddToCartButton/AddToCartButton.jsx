import React, { useState } from 'react';
import '../Card.css';
import Cookies from 'js-cookie';
import backendUrl from '../../../config';
import LoginModal from '../../Navigation/LoginModal';
const AddToCartButton = ({ product,quantity ,selectedQuantityAndMrp}) => {
  const { _id } = product;
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the login modal

  const addToCart = async () => {
    try {
      setIsAddingToCart(true);
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');

      // Check if the user is authenticated
      if (!token || !userId) {
        // If not authenticated, show the login modal
        setShowLoginModal(true);
        setIsAddingToCart(false);
        return;
      }

      const response = await fetch(`${backendUrl}/api/cart/addItem`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          itemId: _id,
          quantity,
          selectedQuantityAndMrp:selectedQuantityAndMrp,
       
        }),
      });

      if (response.ok) {
        console.log(selectedQuantityAndMrp)
        setIsItemAdded(true);
        setTimeout(() => {
          setIsItemAdded(false);
        }, 2000);
      } else {
        console.log('Failed to add item to the cart');
        console.log(selectedQuantityAndMrp)

      }
    } catch (error) {
      console.log('Error adding item to the cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleLoginSuccess = () => {
    // This function can be used to handle successful login
    // For example, you can update the UI or perform any other actions
    window.location.reload();
  };

  return (
    <>
      <button className="add-to-cart-btn" style={{backgroundColor:"#BA0001"}} onClick={addToCart} disabled={isAddingToCart}>
        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
      </button>
      {isItemAdded && (
        <div className="added-message">
          Item added to cart!
        </div>
      )}
      {showLoginModal && (
        <LoginModal
          showLoginModal={showLoginModal}
          handleLoginModalClose={() => setShowLoginModal(false)}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default AddToCartButton;















// import React, { useState } from 'react';
// import '../Card.css';
// import Cookies from 'js-cookie';
// import backendUrl from '../../../config';
// const AddToCartButton = ({ product }) => {
//   const { _id } = product;
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isItemAdded, setIsItemAdded] = useState(false);

//   const addToCart = async () => {
//     try {
//       setIsAddingToCart(true);
//       const token = Cookies.get('token');
//       const userId = Cookies.get('userId');
//       // const token = localStorage.getItem('token');
//       // const userId = localStorage.getItem('userId');
//       const response = await fetch(`${backendUrl}/api/cart/addItem`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: userId,
//           itemId: _id,
//           quantity: 1,
//         }),
//       });

//       if (response.ok) {
//         setIsItemAdded(true);
//         setTimeout(() => {
//           setIsItemAdded(false);
//         }, 2000);
//       } else {
//         console.log('Failed to add item to the cart');
//       }
//     } catch (error) {
//       console.log('Error adding item to the cart:', error);
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   return (
//   <>
//       <button className="add-to-cart-btn" onClick={addToCart} disabled={isAddingToCart}>
//         {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//       </button>
//       {isItemAdded && (
//         <div className="added-message">
//           Item added to cart!
//         </div>
//       )}
//       </>
//   );
// };

// export default AddToCartButton;
