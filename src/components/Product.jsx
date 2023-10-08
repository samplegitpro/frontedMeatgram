import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductWrap from "./inner_component_product/ProductWrap/ProductWrap";
import Cookies from 'js-cookie';
import "../styles/style.css";
import backendUrl from "../config";


function Product() {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Extract the productId from the URL
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('ids');

    // Fetch the product details from the backend using the productId
    fetchProduct(productId);
  }, [location.pathname]);

  const fetchProduct = async (productId) => {
    try {
      // Make a request to the backend API to fetch the product details
      const response = await fetch(`${backendUrl}/api/products?ids=${productId}`);
  
      const data = await response.json();
      // console.log("logging in product.jsx"+data)
      // Set the fetched product data to the state
      setProduct(data[0]);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.log("Error fetching product:", error);
      setLoading(false);
    }
  };

  

  return (
    <div>
  
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProductWrap  product={product} />
         
        </>
      )}
    </div>
  );
}

export default Product;
