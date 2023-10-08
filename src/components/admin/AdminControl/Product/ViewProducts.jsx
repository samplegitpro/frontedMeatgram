import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import RemoveItem from './RemoveItem';
import axios from 'axios';
import Cookies from 'js-cookie';
import backendUrl from '../../../../config';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
const [subcategories, setSubcategories] = useState([]);
const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    // Fetch products from backend API
    // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/allproducts`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    // Fetch categories from the backend API
    fetch(`${backendUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
  
    // Find the selected category object based on its name
    const selectedCategory = categories.find(
      (category) => category.name === selectedCategoryName
    );
  
    if (selectedCategory) {
      // Update the subcategories state with the subcategories of the selected category
      setSubcategories(selectedCategory.subcategories);
    } else {
      // If no category is selected or found, reset the subcategories state
      setSubcategories([]);
    }
  
    // Update the edited product's category
    setEditedProduct({
      ...editedProduct,
      category: selectedCategoryName,
      subcategory: '', // Reset the subcategory when the category changes
    });
  };
  


  const handleEditClick = (product) => {
    setEditedProduct({ ...product });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedProduct(null);
  };

  const handleQuantityAndMrpChange = (e, index, field) => {
    const updatedQuantityAndMrp = [...editedProduct.quantityAndMrp];
    updatedQuantityAndMrp[index][field] = e.target.value;
    setEditedProduct({ ...editedProduct, quantityAndMrp: updatedQuantityAndMrp });
  };
  
  const handleEditSubmit = async () => {
    try {
      const token = Cookies.get('adminToken');
      const formData = new FormData();

      // Append the edited product data
      formData.append('product', JSON.stringify(editedProduct));

      // Check if a new image was selected and append it to formData
      if (editedImage) {
        formData.append('image', editedImage);
      }
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await axios.post(
        `${backendUrl}/api/admin/products/edit/${editedProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // No need for 'Content-Type' here since FormData handles it
          },
        }
      );

      if (response.status === 200) {
        // Product updated successfully
        setShowEditModal(false);
        setEditedProduct(null);
        setEditedImage(null);

        // Update the products list with the updated product
        const updatedProducts = products.map((product) =>
          product._id === editedProduct._id ? response.data : product
        );
        setProducts(updatedProducts);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  // const handleEditSubmit = async () => {
  //   try {
  //     const token = Cookies.get('adminToken');
  //     const response = await axios.put(
  //       `${backendUrl}/api/admin/products/${editedProduct._id}`,
  //       editedProduct,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       // Product updated successfully
  //       setShowEditModal(false);
  //       setEditedProduct(null);

  //       // Update the products list with the updated product
  //       const updatedProducts = products.map((product) =>
  //         product._id === editedProduct._id ? editedProduct : product
  //       );
  //       setProducts(updatedProducts);
  //     } else {
  //       console.error('Failed to update product');
  //     }
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };
  const handleDeleteItem = (itemId) => {
    // Remove the deleted item from the products list
    const updatedProducts = products.filter(product => product._id !== itemId);
    setProducts(updatedProducts);
  };
  const handleAddQuantityAndMrp = () => {
    const updatedQuantityAndMrp = [
      ...editedProduct.quantityAndMrp,
      { quantity: '', mrp: '', numOfPieces: '' },
    ];
    setEditedProduct({ ...editedProduct, quantityAndMrp: updatedQuantityAndMrp });
  };
 
 
  return (
    <Container>
      <h2>View Products</h2>
      <Row className="d-flex">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <div className="h-100">
              <Card className="mb-4 h-100">
                <div className="card-image-container">
                  {/* Correct when deploying */}
                  <Card.Img
                    variant="top"
                    src={`${backendUrl}${product.image}`}
                    alt={product.name}
                    className="img-fluid img h-100"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="mb-2">
                    Description: {product.description}
                  </Card.Text>
                  {product.quantityAndMrp.map((qAndM, index) => (
                    <div key={index} className="mb-2">
                      <span className="fw-bold">Quantity: </span>
                      {qAndM.quantity},{' '}
                      <span className="fw-bold">MRP: </span>
                      {qAndM.mrp},{' '}
                      <span className="fw-bold">Number of Pieces: </span>
                      {qAndM.numOfPieces || 'N/A'}
                    </div>
                  ))}

                  <Card.Text className="mb-2">
                    Category: {product.category}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    Subcategory: {product.subcategory}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </Button>
                  <RemoveItem itemId={product._id} onDelete={handleDeleteItem} />
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedProduct && (
            <Form>
              <Form.Group controlId="editProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="editProductImage">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditedImage(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group controlId="editProductDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              {editedProduct.quantityAndMrp.map((qAndM, index) => (
                <div key={index} className="mb-4">
                  <h5>Quantity and MRP {index + 1}</h5>
                  <Form.Group controlId={`editProductQuantity${index}`}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      value={qAndM.quantity}
                      onChange={(e) =>
                        handleQuantityAndMrpChange(e, index, 'quantity')
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId={`editProductMRP${index}`}>
                    <Form.Label>MRP</Form.Label>
                    <Form.Control
                      type="number"
                      value={qAndM.mrp}
                      onChange={(e) =>
                        handleQuantityAndMrpChange(e, index, 'mrp')
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId={`editProductNumOfPieces${index}`}>
                    <Form.Label>Number of Pieces</Form.Label>
                    <Form.Control
                      type="number"
                      value={qAndM.numOfPieces}
                      onChange={(e) =>
                        handleQuantityAndMrpChange(e, index, 'numOfPieces')
                      }
                    />
                  </Form.Group>
                </div>
              ))}

              {/* Add Quantity and MRP button */}
              <Button
                variant="secondary"
                onClick={handleAddQuantityAndMrp}
              >
                Add Quantity and MRP
              </Button>

              <Form.Group controlId="editProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={editedProduct.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="editProductSubcategory">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control
                  as="select"
                  value={editedProduct.subcategory}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      subcategory: e.target.value,
                    })
                  }
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Add topSelling and boneless options */}
              <Form.Group controlId="editProductTopSelling">
                <Form.Label>Top Selling</Form.Label>
                <Form.Control
                  as="select"
                  value={editedProduct.isTopSelling}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      isTopSelling: e.target.value === 'true',
                    })
                  }
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="editProductBoneless">
                <Form.Label>Boneless</Form.Label>
                <Form.Control
                  as="select"
                  value={editedProduct.isBoneless}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      isBoneless: e.target.value === 'true',
                    })
                  }
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};


export default ViewProducts;



// import React, { useEffect, useState } from 'react';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import RemoveItem from './RemoveItem';
// import '../control.css';
// import backendUrl from '../../../../config';
// const ViewProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from backend API
//     // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
//     fetch(`${backendUrl}/api/products/allproducts`)
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const appendTimestamp = (url) => {
//     const timestamp = Date.now();
//     return url + `?timestamp=${timestamp}`;
//   };

  // const handleDeleteItem = (itemId) => {
  //   // Remove the deleted item from the products list
  //   const updatedProducts = products.filter(product => product._id !== itemId);
  //   setProducts(updatedProducts);
  // };

//   return (
//     <Container>
//       <h2>View Products</h2>
//       <Row className="d-flex">
//         {products.map(product => (
//           <Col key={product._id} sm={6} md={4} lg={3}>
//             <div className="h-100">
//               <Card className="mb-4 h-100">
//                 <div className="card-image-container">

//                 {/* correct when deploying */}
//                   <Card.Img
//                     variant="top"
//                     src={`${backendUrl}${appendTimestamp(product.image)}`}
//                     alt={product.name}
//                     className="img-fluid h-100"
//                   />
//                 </div>
//                 <Card.Body>
//                   <Card.Title>{product.name}</Card.Title>
//                   <Card.Text>{product.description}</Card.Text>
//                   <Card.Text>Price: {product.price}</Card.Text>
//                   <div className="additional-info">
//                     <p>Top Selling: {product.isTopSelling ? 'Yes' : 'No'}</p>
//                     <p>Boneless: {product.isBoneless ? 'Yes' : 'No'}</p>
//                     <p>Category: {product.category}</p>
//                   </div>
                  // <RemoveItem itemId={product._id} onDelete={handleDeleteItem} />
//                 </Card.Body>
//               </Card>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default ViewProducts;


