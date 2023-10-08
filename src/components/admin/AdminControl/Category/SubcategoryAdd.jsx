import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Form, Button, Alert } from 'react-bootstrap';
import backendUrl from '../../../../config';

const SubcategoryAdd = ({ categoryId, onSubcategoryAdded }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert
  const [alertVariant, setAlertVariant] = useState('success'); // Alert variant

  const handleSubcategoryNameChange = (e) => {
    setSubcategoryName(e.target.value);
  };
  const token = Cookies.get('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a request to the backend API to add the subcategory
    try {
      const response = await fetch(`${backendUrl}/api/categories/${categoryId}/subcategories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subcategoryName }),
      });

      if (response.ok) {
        // Subcategory added successfully
        onSubcategoryAdded(subcategoryName);
        setSubcategoryName(''); // Clear the input field
        setAlertVariant('success'); // Set alert variant to success
        setShowAlert(true); // Show the alert
        setTimeout(() => {
          setShowAlert(false); // Hide the alert after a few seconds (optional)
        }, 3000); // Adjust the time as needed
      } else {
        // Error occurred while adding the subcategory
        const error = await response.json();
        setAlertVariant('danger'); // Set alert variant to danger
        setShowAlert(true); // Show the alert
        throw new Error(error.error);
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertVariant === 'success' ? 'Subcategory added successfully!' : 'Failed to add subcategory.'}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter subcategory name"
            value={subcategoryName}
            onChange={handleSubcategoryNameChange}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Add Subcategory
        </Button>
      </Form>
    </>
  );
};

export default SubcategoryAdd;
