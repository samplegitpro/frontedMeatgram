import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col ,Button} from 'react-bootstrap';
import SubcategoryAdd from './SubcategoryAdd';
import RemoveCategory from './RemoveCategory';
import backendUrl from '../../../../config';
const CategoryView = () => {
  const [categories, setCategories] = useState([]);
  const [showSubcategoryAdd, setShowSubcategoryAdd] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/categories`);
      const data = await response.json();
      console.log(data)
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(category => category._id !== categoryId);
    setCategories(updatedCategories);
  };
  const handleToggleSubcategoryAdd = () => {
    setShowSubcategoryAdd(!showSubcategoryAdd); // Toggle visibility when the button is clicked
  };
  const handleSubcategoryAdded = (categoryId, newSubcategory) => {
    // Find the category in the categories array
    const updatedCategories = categories.map((category) => {
      if (category._id === categoryId) {
        // Clone the category and add the new subcategory to its subcategories array
        const updatedCategory = { ...category };
        updatedCategory.subcategories.push(newSubcategory);
        return updatedCategory;
      }
      return category;
    });
  
    // Update the state with the modified categories array
    setCategories(updatedCategories);
  };


  
  return (
    <Container>
      <h2 className="my-4">View Categories</h2>
      <Row className="d-flex">
        {categories.map((category) => (
          <Col key={category._id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <div className="card-image-container">
                <Card.Img
                  variant="top"
                  src={`${backendUrl}${category.imageUrl}`}
                  alt={category.name}
                  className="img-fluid h-100"
                />
              </div>
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div>
                    <p className="mb-2"><strong>Subcategories:</strong></p>
                    <ul>
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory} className="mb-2">
                          {subcategory}
                          <RemoveCategory
                            categoryId={category._id}
                            onDelete={handleDeleteCategory}
                            type="subcategory"
                            subcategoryName={subcategory}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button onClick={handleToggleSubcategoryAdd}>Add Subcategory</Button> {/* Button to toggle */}
      
      {showSubcategoryAdd && <SubcategoryAdd categoryId={category._id} onSubcategoryAdded={(newSubcategory) => handleSubcategoryAdded(category._id, newSubcategory)} />}
                <RemoveCategory
                  categoryId={category._id}
                  onDelete={handleDeleteCategory}
                  type="category"
                />

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryView;

// {categories.map(category => (
//   <Col key={category._id} sm={6} md={4} lg={3}>
//     <div className="h-100">
//       <Card className="mb-4 h-100">
//         <div className="card-image-container">
//           <Card.Img 
//             variant="top" 
//             src={`${backendUrl}${category.imageUrl}`}
//             alt={category.name} 
//             className="img-fluid h-100" 
//           />
//         </div>
//         <Card.Body>
//           <Card.Title>{category.name}</Card.Title>
//           <RemoveCategory categoryId={category._id} onDelete={handleDeleteCategory} />
//         </Card.Body>
//       </Card>
//     </div>
//   </Col>
// ))}