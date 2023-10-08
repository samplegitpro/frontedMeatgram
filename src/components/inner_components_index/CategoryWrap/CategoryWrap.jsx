import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CategoryWrap.css';
import { useMediaQuery } from "react-responsive";
import backendUrl from "../../../config";

function CategoryWrap({ onCategoryChoice }) {
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const isWideScreen = useMediaQuery({ minWidth: 576 });
  useEffect(() => {
    // Fetch categories from backend API
    fetch(`${backendUrl}/api/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const navigate = useNavigate();
  const handleCategoryClick = (categoryName, subcategories) => {
    onCategoryChoice(categoryName, subcategories);
    navigate(`/category/${categoryName}`);
  };

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  const maxVisibleCategories = showAllCategories ? categories.length : 7;
  const visibleCategories = categories && categories.length > 0 ? categories.slice(0, maxVisibleCategories) : [];

  return (
    <div className={`category-container mb-2 ${isWideScreen ? "wide-screen" : ""}`}>
      <div className="row">
      <div className={`col-md-12 order-1 order-md-1 ${isWideScreen ? "text-center" : ""}`}>
          <h3 style={{ color: "#BA0001" }}>Products</h3>
        </div>
        <div className={`col-md-12 order-2 order-md-2 ${isWideScreen ? "d-flex justify-content-between flex-wrap" : ""}`}>
          <div className="row ">
            {visibleCategories.map((category, index) => (
              <div className="col-4 col-md-1 mb-2" key={category._id}>
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  onClick={() => handleCategoryClick(category.name.toLowerCase(), category.subcategories)}
                >
                  <div className="circ my-2 col-md-1">
                    <div className="crcl">
                      <img src={`${backendUrl}${category.imageUrl}`} alt="" className="crcl" />
                    </div>
                    <div className="text">
                      <p>{category.name.toUpperCase()}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {categories.length > 7 && (
              <div className="col-4 col-md-1 mb-2">
                <div className={`circ ${showAllCategories ? "view-less" : "view-all"}`} onClick={toggleShowAllCategories}>
                  <div className="crcl">
                    <img
                      className="crcl" 
                      src={showAllCategories ? "/assets/less.png" : "/assets/more.png"}
                      alt={showAllCategories ? "View Less Categories" : "View More Categories"}
                    />
                  </div>
                   <div className="text">
                      <p>{showAllCategories ? "View Less" : "View More"}</p>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryWrap;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './CategoryWrap.css';
// import backendUrl from "../../../config";

// function CategoryWrap({ onCategoryChoice }) {
//   const [categories, setCategories] = useState([]);
//   const [showAllCategories, setShowAllCategories] = useState(false);

//   useEffect(() => {
//     // Fetch categories from backend API
//     fetch(`${backendUrl}/api/categories`)
//       .then(response => response.json())
//       .then(data => setCategories(data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   const navigate = useNavigate();
//   const handleCategoryClick = (categoryName, subcategories) => {
//     onCategoryChoice(categoryName, subcategories);
//     navigate(`/category/${categoryName}`);
//   };

//   const toggleShowAllCategories = () => {
//     setShowAllCategories(!showAllCategories);
//   };

//   const maxVisibleCategories = showAllCategories ? categories.length : 4;
//   const visibleCategories = categories && categories.length > 0 ? categories.slice(0, maxVisibleCategories) : [];

//   return (
//     <div className="category-container mb-2">
//       <div className="row">
//         <div className="col-md-12 order-1 order-md-1 ">
//           <h3 style={{ color: "#BA0001" }}>Products</h3>
//         </div>
//         <div className="col-md-12 order-2 order-md-2">
//           <div className="row">
//             {visibleCategories.map((category, index) => (


//               <div className="col-4 col-md-1" key={category._id}>
//                 <Link
//                   to={`/category/${category.name.toLowerCase()}`}
//                   onClick={() => handleCategoryClick(category.name.toLowerCase(), category.subcategories)}
//                 >


//                   <div className="circ my-2 col-md-1">


//                     <div className="crcl">
//                       <img src={`${backendUrl}${category.imageUrl}`} alt="" className="crcl" />
//                     </div>
//                     <div className="text">
//                       <p>{category.name.toUpperCase()}</p>
//                     </div>
  

//                   </div>


//                 </Link>
//               </div>



//             ))}
         
//           {categories.length > 4 && (
//              <div className="col-4 my-auto">
//             <div className={`circ ${showAllCategories ? "view-less" : "view-all"}`} onClick={toggleShowAllCategories}>
//               <div className="crcl">
//                 <img
//                   style={{ width: "4rem", height: "4rem" }}
//                   src={showAllCategories ? "/assets/less.jpg" : "/assets/more.jpg"}
//                   alt={showAllCategories ? "View Less Categories" : "View More Categories"}
//                 />
//               </div>
//             </div>
//             </div>
//           )}
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CategoryWrap;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './CategoryWrap.css';
// import backendUrl from "../../../config";

// function CategoryWrap({ onCategoryChoice }) {
//   const [categories, setCategories] = useState([]);
//   const [showAllCategories, setShowAllCategories] = useState(false);
 
//   useEffect(() => {
//     // Fetch categories from backend API
//     fetch(`${backendUrl}/api/categories`)
//       .then(response => response.json())
//       .then(data => setCategories(data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   const navigate = useNavigate();
//   const handleCategoryClick = (categoryName, subcategories) => {
//     onCategoryChoice(categoryName, subcategories);
//     navigate(`/category/${categoryName}`);
//   };

//   const toggleShowAllCategories = () => {
//     setShowAllCategories(!showAllCategories);
//   };

//   const maxVisibleCategories = showAllCategories ? categories.length : 4;
//   const visibleCategories = categories && categories.length > 0 ? categories.slice(0, maxVisibleCategories) : [];

//   return (
//     <div className="category-container mb-2">
//       <div className="row">
//      <h3 style={{color:"#BA0001"}}>Products</h3>
//     </div>
     

//       {visibleCategories.map((category, index) => (
//         <Link
//           to={`/category/${category.name.toLowerCase()}`}
//           key={category._id} // You should use a unique key for each item in the list
//           onClick={() => handleCategoryClick(category.name.toLowerCase(), category.subcategories)}
//         >
//           <div className="circ my-auto">
//             <div className="crcl">
//               <img src={`${backendUrl}${category.imageUrl}`} alt="" className="crcl" />
//             </div>
//             <div className="text">
//               <p>{category.name.toUpperCase()}</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//       {categories.length > 4 && (
//         <div className={`circ ${showAllCategories ? "view-less" : "view-all"}`} onClick={toggleShowAllCategories}>
//          <div className="crcl">
//           <img style={{width:"4rem" ,height:"4rem"}} src={showAllCategories?"/assets/less.jpg":"/assets/more.jpg"} alt={showAllCategories ? "View Less Categories" : "View More Categories"} />
//           </div>
         
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryWrap;
