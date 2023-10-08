import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import backendUrl from "../../config";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef();
  const suggestionsRef = useRef();
  const [itemsName, setItemsName] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const inputField = document.querySelector('input[type="text"]');
    if (inputField) {
      inputField.addEventListener("click", toggleSuggestions);
    }
    fetchItemsName();
    return () => {
      inputField.removeEventListener("click", toggleSuggestions);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const handleDocumentClick = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleFormSubmission = async () => {
      if (searchQuery !== "") {
        const nameToSearch = searchQuery;
        const foundObject = itemsData.find(
          (data) => data.name === nameToSearch
        );

        if (foundObject) {
          const productId = foundObject._id;
          console.log("Perform search for ID:", productId);
          setSearchQuery("");
          setSuggestions([]);
          // Close the toggle menu using the function passed from the parent component
     
          const searchUrl = `${window.location.origin}/products?ids=${productId}`;

          // Perform a hard search by changing the window location
          window.location.href = searchUrl;

          // For example, pass it to other functions or make an API call with the ID
        } else {
          console.log("Name not found in the array.");
        }
      }
    };

    handleFormSubmission();
  }, [itemsData, navigate, searchQuery]);
  const fetchItemsName = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/products/itemsName`);

      const data = await response.json();
      setItemsData(data);
      const items = data.map((product) => product.name);
      setItemsName(items);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    // Perform API call or any other logic to fetch suggestions based on the search query
    // For simplicity, I'll use a predefined array of suggestions here

    const filteredSuggestions = itemsName.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const nameToSearch = searchQuery;
    const foundObject = itemsData.find((data) => data.name === nameToSearch);

    if (foundObject) {
      const productId = foundObject._id;
      console.log("Perform search for ID:", productId);

      navigate(`products?ids=${productId}`);
      // For example, pass it to other functions or make an API call with the ID
    } else {
      console.log("Name not found in the array.");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };
  const toggleSuggestions = () => {
    const suggestionsDropdown = document.querySelector(".suggestions");
    if (suggestionsDropdown) {
      suggestionsDropdown.style.display =
        suggestions.length > 0 ? "block" : "none";
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="search-form">
    <div className="search-container dropdown" ref={searchInputRef}>
      <input
        type="text"
        placeholder="Search.."
        className="form-control search-form-control"
        name="search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button background-color-danger">
        <i className="fa fa-search"></i>Search
      </button>
    </div>
  
    {(() => {
      if (suggestions.length > 0) {
        return (
          <ul className="suggestions dropdown-menu">
            {suggestions.map((suggestion, index) => (
              <li
                className="dropdown-item"
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        );
      } else if (searchQuery !== "") {
        return (
          <ul className="suggestions dropdown-menu">
            <li className="dropdown-item">No items match the search.</li>
          </ul>
        );
      } else {
        return null;
      }
    })()}
  </form>
  

  );
};

export default SearchBar;








// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Search.css'
// import backendUrl from '../../config';
// const SearchBar = ({toggleMenu}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const searchInputRef = useRef();
//   const suggestionsRef = useRef();
//   const [itemsName,setItemsName]=useState([]);
//   const [itemsData,setItemsData]=useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const inputField = document.querySelector('input[type="text"]');
//     if (inputField) {
//       inputField.addEventListener('click', toggleSuggestions);
//     }
//     fetchItemsName(); 
//     return () => {
//       inputField.removeEventListener('click', toggleSuggestions);
//     };
//   }, []);


//   useEffect(() => {
//     document.addEventListener('click', handleDocumentClick);

//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//     };
//   }, []);
//   const handleDocumentClick = (e) => {
//     if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
//       setSuggestions([]);
//     }
//   };

//   useEffect(() => {
//     const handleFormSubmission = async () => {
//       if (searchQuery !== '') {
//         const nameToSearch = searchQuery;
//         const foundObject = itemsData.find((data) => data.name === nameToSearch);

//         if (foundObject) {
//           const productId = foundObject._id;
//           console.log('Perform search for ID:', productId);
//           setSearchQuery('');
//           setSuggestions([]);
//           setItemsData([]); // Clear search resultswha
//           // Close the toggle menu using the function passed from the parent component
//           toggleMenu();
//           navigate(`products?ids=${productId}`);

//           // For example, pass it to other functions or make an API call with the ID
//         } else {
//           console.log('Name not found in the array.');
//         }
//       }
//     };

//     handleFormSubmission();
//   }, [itemsData, navigate, searchQuery]);
//   const fetchItemsName = async () => {
//     try {
//       const response = await fetch(`${backendUrl}/api/products/itemsName`);
    
//       const data = await response.json();
//       setItemsData(data);
//       const items = data.map((product) => product.name);
//       setItemsName(items);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };
//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setSearchQuery(value);
//     // Perform API call or any other logic to fetch suggestions based on the search query
//     // For simplicity, I'll use a predefined array of suggestions here
    
//     const filteredSuggestions = itemsName.filter((suggestion) =>
//       suggestion.toLowerCase().startsWith(value.toLowerCase())
//     );
//     setSuggestions(filteredSuggestions);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
  
//     const nameToSearch = searchQuery;
//     const foundObject = itemsData.find((data) => data.name === nameToSearch);
  
//     if (foundObject) {
//       const productId = foundObject._id;
//       console.log('Perform search for ID:', productId);
      
//       navigate(`products?ids=${productId}`);
//       // For example, pass it to other functions or make an API call with the ID
//     } else {
//       console.log('Name not found in the array.');
//     }
//   };
  

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion);
//     setSuggestions([]);
//   };
//   const toggleSuggestions = () => {
//     const suggestionsDropdown = document.querySelector('.suggestions');
//     if (suggestionsDropdown) {
//       suggestionsDropdown.style.display =
//         suggestions.length > 0 ? 'block' : 'none';
//     }
//   };

//   return (



// //     <form onSubmit={handleFormSubmit}>
// // <div className="input-box search-container dropdown" ref={searchInputRef}>
// //   <input
// //     type="text"
// //     placeholder="Search.."
// //     className="form-control"
// //     name="search"
// //     value={searchQuery}
// //     onChange={handleInputChange}
// //     // style={{ color: 'white' }}
// //   />
// //   <button type="submit">
// //   <i className="uil uil-search"></i>
// //   </button>
// // </div>

// // {suggestions.length > 0 && (
// //   <ul className="suggestions dropdown-menu">
// //     {suggestions.map((suggestion, index) => (
// //       <li
// //         className="dropdown-item"
// //         key={index}
// //         onClick={() => handleSuggestionClick(suggestion)}
// //         style={{ color: 'white' }}
// //       >
// //         {suggestion}
// //       </li>
// //     ))}
// //   </ul>
// // )}
// // </form>
// {/* <div class="input-box">
//     <i class="uil uil-search"></i>
//     <input type="text" placeholder="Search here..." />
//     <button class="button">Search</button>
//   </div> */}
    
//   );
// };

// export default SearchBar;


// <form onSubmit={handleFormSubmit}>
// <div className="search-container dropdown" ref={searchInputRef}>
//   <input
//     type="text"
//     placeholder="Search.."
//     className="form-control"
//     name="search"
//     value={searchQuery}
//     onChange={handleInputChange}
//     style={{ color: 'white' }}
//   />
//   <button type="submit">
//     <i className="fa fa-search"></i>
//   </button>
// </div>

// {suggestions.length > 0 && (
//   <ul className="suggestions dropdown-menu">
//     {suggestions.map((suggestion, index) => (
//       <li
//         className="dropdown-item"
//         key={index}
//         onClick={() => handleSuggestionClick(suggestion)}
//         style={{ color: 'white' }}
//       >
//         {suggestion}
//       </li>
//     ))}
//   </ul>
// )}
// </form>