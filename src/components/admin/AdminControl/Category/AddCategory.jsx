import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import backendUrl from '../../../../config';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubcategoryChange = (e) => {
    setNewSubcategory(e.target.value);
  };

  const addSubcategory = () => {
    if (newSubcategory.trim() !== '') {
      setSubcategories([...subcategories, newSubcategory]);
      setNewSubcategory('');
    }
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name.toLowerCase());
    formData.append('image', image);

    // Append subcategories to the form data
    subcategories.forEach((subcategory) => {
      formData.append('subcategories', subcategory);
    });

    try {
      const token = localStorage.getItem('adminToken');
      const requestOptions = {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${backendUrl}/api/admin/add-category`, requestOptions);

      if (response.ok) {
        // Category added successfully
        // Reset form fields
        setName('');
        setImage(null);
        setSubcategories([]);
        setNewSubcategory('');
        alert('Category added successfully!');
      } else {
        // Error occurred while adding the category
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Add Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name all small"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Subcategories</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Enter subcategory"
              value={newSubcategory}
              onChange={handleSubcategoryChange}
            />
            <Button variant="secondary" onClick={addSubcategory}>
              Add
            </Button>
          </div>
          <ul>
            {subcategories.map((subcategory, index) => (
              <li key={index}>
                {subcategory}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => removeSubcategory(index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
