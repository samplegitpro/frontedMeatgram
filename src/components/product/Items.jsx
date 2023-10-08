import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import backendUrl from '../../config';
import ScrollButton from '../inner_components_category/ScrollButton';

function Items({key, showAll, category, title, subtitleProps,subCategoryies }) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");


  useEffect(() => {
    fetchProducts();
    console.log(subCategoryies)
  }, [category]);

  const fetchProducts = async () => {
    try {
      let response;
      if (category) {
        response = await axios.get(`${backendUrl}/api/categories/${category}`);
     

        setCategoryName(category);

      } else {
        response = await axios.get(`${backendUrl}/api/products/allproducts`);
      }
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomCards = (array, count) => {
    if (!Array.isArray(array)) {
      return [];
    }

    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const renderProducts = () => {
    if (showAll) {
      return products || [];
    } else {
      const randomCards = getRandomCards(products, 3);
      return randomCards || [];
    }
  };

  return (

    <>
    <ScrollButton items={subCategoryies} />
    <div className="menu bestsellers-container" id={`scroll${key}`}>
       <div className="heading">
  
        {title && <h1><strong> {title} </strong></h1>}
        {/* <h3>&mdash; {subtitleProps && subtitleProps.toUpperCase()} &mdash;</h3> */}
        
      </div>
   
        {renderProducts().map((product, index) => (
          <Card key={index} product={product} />
        ))}
    
    </div>
    </>
  );
}

export default Items;


