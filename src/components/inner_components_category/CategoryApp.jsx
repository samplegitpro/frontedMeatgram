import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryWrap from "../inner_components_index/CategoryWrap/CategoryWrap";
import axios from "axios";
import backendUrl from "../../config";
import Card from "../product/Card";

function CategoryApp() {
  const navigate = useNavigate();
  console.log("Hello");
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [productsBySubcategory, setProductsBySubcategory] = useState({});

  useEffect(() => {
    const pathnameParts = location.pathname.split("/");
const categoryName = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

    if (categoryName) {
      setCategory(categoryName);
      fetchSubCategories(categoryName);
      fetchProducts(categoryName);
    }
  }, [location.pathname]);

  const fetchSubCategories = async (categoryName) => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories`);

      const matchingCategory = response.data.find(
        (category) => category.name === categoryName
      );

      if (matchingCategory) {
        setSubCategories(matchingCategory.subcategories);
      } else {
        setSubCategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchProducts = async (categoryName) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/categories/${categoryName}`
      );

      const categoryProducts = response.data;

      const productsBySubcategory = {};

      categoryProducts.forEach((product) => {
        const subcategory = product.subcategory;

        if (!productsBySubcategory[subcategory]) {
          productsBySubcategory[subcategory] = [];
        }

        productsBySubcategory[subcategory].push(product);
      });

      setProductsBySubcategory(productsBySubcategory);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChoice = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  const handleScrollToSubcategory = (subcategory) => {
    const subcategorySection = document.getElementById(`scroll-${subcategory}`);
    if (subcategorySection) {
      subcategorySection.scrollIntoView({ behavior: "smooth" });
    }
  };
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
  return (
    <>
      <CategoryWrap onCategoryChoice={handleCategoryChoice} />

      

      {subCategories.map((subcategory) => (
        <div style={{marginTop:"5.5rem"}}>
        <div className="scroll_button">
        {subCategories.map((subcategory) => (
          <button
            key={subcategory}
            onClick={() => handleScrollToSubcategory(subcategory)}
          >
            {subcategory.split(' ').map(capitalizeFirstLetter).join(' ')}
          </button>
        ))}
      </div>
        <div
          className="menu bestsellers-container"
          id={`scroll-${subcategory}`}
          key={subcategory}
        >
          <div className="heading">
            {category && <h1>{category.toUpperCase()}</h1>}
            <h3>&mdash; {subcategory.toUpperCase()} &mdash;</h3>
          </div>
          {productsBySubcategory[subcategory]?.map((product, productIndex) => (
            <Card key={productIndex} product={product} />
          ))}
        </div>
        </div>
      ))}
    </>
  );
}

export default CategoryApp;












// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import CategoryWrap from "../inner_components_index/CategoryWrap/CategoryWrap";
// import axios from "axios";
// import backendUrl from "../../config";
// import Card from "../product/Card";
// import ScrollButton from "./ScrollButton";

// function CategoryApp() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [category, setCategory] = useState("");
//   const [productsBySubcategory, setProductsBySubcategory] = useState({});

//   useEffect(() => {
//     // Extract the category from the URL path
//     const pathnameParts = location.pathname.split("/");
//     const categoryName = pathnameParts[pathnameParts.length - 1];

//     // Set the category state if categoryName is defined
//     if (categoryName) {
//       setCategory(categoryName);

//       // Fetch products based on the category
//       fetchProducts(categoryName);
//     }
//   }, [location.pathname]);

//   const fetchProducts = async (categoryName) => {
//     try {
//       const response = await axios.get(
//         `${backendUrl}/api/categories/${categoryName}`
//       );

//       // Assuming the response contains an array of products
//       const categoryProducts = response.data;

//       // Group products by subcategory
//       const productsBySubcategory = {};

//       categoryProducts.forEach((product) => {
//         const subcategory = product.subcategory;

//         if (!productsBySubcategory[subcategory]) {
//           productsBySubcategory[subcategory] = [];
//         }

//         productsBySubcategory[subcategory].push(product);
//       });

//       setProductsBySubcategory(productsBySubcategory);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleCategoryChoice = (categoryName) => {
//     navigate(`/category/${categoryName}`);
//   };

//   return (
//     <div>
//       <CategoryWrap onCategoryChoice={handleCategoryChoice} />
//       {Object.keys(productsBySubcategory).map((subcategory, index) => (
//         <>
//         <ScrollButton items={subcategory}/>
//         <div className="menu bestsellers-container" id={`scroll${index}`} key={index}>
//           <div className="heading">
//             {category && <h1>{category.toUpperCase()}</h1>}
//             <h3>&mdash; {subcategory.toUpperCase()} &mdash;</h3>
//           </div>
//           {productsBySubcategory[subcategory].map((product, productIndex) => (
//             <Card key={productIndex} product={product} />
//           ))}
//         </div>
//         </>
//       ))}
//     </div>
//   );
// }

// export default CategoryApp;



// import React from "react";
// import {  useNavigate } from "react-router-dom";
// import ScrollButton from "./ScrollButton";
// import CategoryWrap from "../inner_components_index/CategoryWrap/CategoryWrap";
// import Items from "../product/Items";


// function CategoryApp({category ,categoryChoice,subCategory}){
    


//     const navigate = useNavigate();
//     const handleCategoryChoice = (categoryName) => {
//         categoryChoice(categoryName);
//         navigate(`/category/${categoryName}`);

//       };
//     return(
//         <div>
//         <CategoryWrap onCategoryChoice={handleCategoryChoice} />
//         {/* <ScrollButton /> */}
//         <Items  showAll={true} category={category} subCategoryies={subCategory} subtitleProps={`Marinated ${category}`} />
//         </div>
//     )
// }

// export default CategoryApp;