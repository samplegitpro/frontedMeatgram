import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import axios from 'axios';
import Cookies from 'js-cookie';
import backendUrl from '../../../../config';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [alert, setAlert] = useState(null);

  const [product, setProduct] = useState({
    name: '',
    image: null,
    quantityAndMrp: [],
    description: '',
    category: '',
    subcategory: '',
    isTopSelling: false,
    isBoneless: false, 
    isMarinade:false,
    isRawMenu:false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleQuantityAndMrpChange = (e, index) => {
    const updatedQuantityAndMrp = [...product.quantityAndMrp];
    updatedQuantityAndMrp[index][e.target.name] = e.target.value;
    setProduct({ ...product, quantityAndMrp: updatedQuantityAndMrp });
  };

  const addQuantityAndMrpField = () => {
    const updatedQuantityAndMrp = [
      ...product.quantityAndMrp,
      { quantity: '', mrp: '', numOfPieces: '' },
    ];
    setProduct({ ...product, quantityAndMrp: updatedQuantityAndMrp });
  };

  const removeQuantityAndMrpField = (index) => {
    const updatedQuantityAndMrp = [...product.quantityAndMrp];
    updatedQuantityAndMrp.splice(index, 1);
    setProduct({ ...product, quantityAndMrp: updatedQuantityAndMrp });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('adminToken');
      const formData = new FormData();

      formData.append('name', product.name);
      formData.append('image', product.image);
      formData.append('quantityAndMrp', JSON.stringify(product.quantityAndMrp));
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('subcategory', product.subcategory);
      formData.append('isTopSelling', product.isTopSelling);
      formData.append('isBoneless', product.isBoneless);
      formData.append('isMarinade', product.isMarinade);
      formData.append('isRawMenu', product.isRawMenu);
    
      // Send the product data to the backend API
      const response = await axios.post(`${backendUrl}/api/admin/addproduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Product added successfully
        setAlert({ message: 'Product added successfully', type: 'success' });

        // Reset the form
        setProduct({
          name: '',
          image: null,
          quantityAndMrp: [],
          description: '',
          category: '',
          subcategory: '',
          isTopSelling: false,
          isBoneless: false,
          isMarinade:false,
          isRawMenu:false
        });
      } else {
        setAlert({ message: 'Product not added, please retry', type: 'warning' });
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: 'Error adding product', type: 'danger' });
    }
  };

  // ... (previous code)

return (
  <div className="container">
  <h2>Add Product</h2>
  {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="productName" className="form-label">
        Product Name
      </label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        className="form-control"
        id="productName"
        placeholder="Product Name"
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="productImage" className="form-label">
        Product Image
      </label>
      <input
        type="file"
        name="image"
        onChange={handleImageUpload}
        className="form-control"
        id="productImage"
        required
      />
    </div>

    {product.quantityAndMrp.map((item, index) => (
      <div key={index} className="mb-3">
        <label htmlFor={`quantity${index}`} className="form-label">
          Quantity
        </label>
        <input
          type="text" // Change the input type to number
          name="quantity"
          value={item.quantity}
          onChange={(e) => handleQuantityAndMrpChange(e, index)}
          className="form-control"
          id={`quantity${index}`}
          placeholder="Quantity"
          required
        />

        <label htmlFor={`mrp${index}`} className="form-label">
          MRP
        </label>
        <input
          type="number"
          name="mrp"
          value={item.mrp}
          onChange={(e) => handleQuantityAndMrpChange(e, index)}
          className="form-control"
          id={`mrp${index}`}
          placeholder="MRP"
          required
        />

        <label htmlFor={`numOfPieces${index}`} className="form-label">
          Number of Pieces
        </label>
        <input
          type="number" // Add a field for number of pieces
          name="numOfPieces"
          value={item.numOfPieces}
          onChange={(e) => handleQuantityAndMrpChange(e, index)}
          className="form-control"
          id={`numOfPieces${index}`}
          placeholder="Number of Pieces"
          required
        />

        <button type="button" className="btn btn-danger" onClick={() => removeQuantityAndMrpField(index)}>
          Remove
        </button>
      </div>
    ))}

    <button type="button" className="btn btn-primary" onClick={addQuantityAndMrpField}>
      Add Quantity and MRP
    </button>

    <div className="mb-3">
      <label htmlFor="productDescription" className="form-label">
        Description
      </label>
      <textarea
        name="description"
        value={product.description}
        onChange={handleInputChange}
        className="form-control"
        id="productDescription"
        placeholder="Description"
        required
      ></textarea>
    </div>

      <div className="mb-3">
        <label htmlFor="productCategory" className="form-label">
          Category
        </label>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleInputChange(e);
          }}
          className="form-control"
          id="productCategory"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="mb-3">
          <label htmlFor="productSubcategory" className="form-label">
            Subcategory
          </label>
          <select
            name="subcategory"
            value={product.subcategory}
            onChange={handleInputChange}
            className="form-control"
            id="productSubcategory"
            required
          >
            <option value="">Select a subcategory</option>
            {categories
              .find((category) => category.name === selectedCategory)
              ?.subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isTopSelling"
          name="isTopSelling"
          checked={product.isTopSelling}
          onChange={(e) => setProduct({ ...product, isTopSelling: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="isTopSelling">
          Top Selling Marinades
        </label>
      </div>

      {/* <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isMarinade"
          name="isMarinade"
          checked={product.isMarinade}
          onChange={(e) => setProduct({ ...product, isMarinade: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="isMarinade">
          Marinade Menu
        </label>
      </div> */}

{/* in frontend it is top selling cut but in backend it is isBoneless  */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isBoneless"
          name="isBoneless"
          checked={product.isBoneless}
          onChange={(e) => setProduct({ ...product, isBoneless: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="isBoneless">
          Top Selling Cut
        </label>
      </div>


      {/* <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isBoneless"
          name="isBoneless"
          checked={product.isRawMenu}
          onChange={(e) => setProduct({ ...product, isRawMenu: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="isRawMenu">
           Raw Menu
        </label>
      </div> */}

      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  </div>
);
};

export default AddProduct;
