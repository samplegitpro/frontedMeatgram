import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import backendUrl from '../../../../config';

const RemoveCategory = ({ categoryId, onDelete, type, subcategoryName }) => {
  const token = Cookies.get('adminToken');
  const [alert, setAlert] = useState(null);

  const handleDelete = () => {
    const encodedSubcategoryName = encodeURIComponent(subcategoryName);
    const deleteEndpoint = type === 'subcategory'
      ? `${backendUrl}/api/categories/${categoryId}?subcategoryName=${encodedSubcategoryName}`
      : `${backendUrl}/api/categories/${categoryId}`;

    fetch(deleteEndpoint, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Add your admin authentication token here
      },
    })
      .then((response) => {
        if (response.status === 204) {
          // Category or subcategory deleted successfully, call the onDelete callback
          if (!subcategoryName) {
            onDelete(categoryId);
          }
          setAlert({ message: `Deleted ${type === 'subcategory' ? 'Subcategory' : 'Category'} successful`, type: 'success' });
        } else if (response.status === 404) {
          // Category or subcategory not found
          setAlert({ message: `No such ${type === 'subcategory' ? 'Subcategory' : 'Category'} exists`, type: 'danger' });
        } else {
          throw new Error(`Failed to delete ${type === 'subcategory' ? 'subcategory' : 'category'}`);
        }
      })
      .catch((error) => {
        console.error(`Error deleting ${type === 'subcategory' ? 'subcategory' : 'category'}:`, error);
        setAlert({ message: `Error deleting ${type === 'subcategory' ? 'Subcategory' : 'Category'}`, type: 'danger' });
      });
  };

  return (
    <>
      <button className='btn btn-danger btn-sm' onClick={handleDelete}>Remove</button>
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
    </>
  );
};

export default RemoveCategory;

// import React,{useState} from 'react';
// import { Alert } from 'react-bootstrap'; 
// import Cookies from 'js-cookie';
// import backendUrl from '../../../../config';

// const RemoveCategory = ({ categoryId,onDelete, type , subcategoryName}) => {
//   const token = Cookies.get('adminToken');
// const [alert, setAlert] = useState(null); 
 
//   const handleDelete = () => {
//     const deleteEndpoint = type === 'subcategory'
//       ? `${backendUrl}/api/categories/${categoryId}?subcategoryName=${subcategoryName}`
//       : `${backendUrl}/api/categories/${categoryId}`;
  
//     fetch(deleteEndpoint, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`, // Add your admin authentication token here
//       },
//     })
//       .then((response) => {
//         if (response.status === 204) {
//           // Category or subcategory deleted successfully, call the onDelete callback
//           if(!subcategoryName){
//             onDelete(categoryId);
//           }
//           setAlert({ message: `Deleted ${type === 'subcategory' ? 'Subcategory' : 'Category'} successful`, type: 'success' });
//         } else if (response.status === 404) {
//           // Category or subcategory not found
//           setAlert({ message: `No such ${type === 'subcategory' ? 'Subcategory' : 'Category'} exists`, type: 'danger' });
//         } else {
//           throw new Error(`Failed to delete ${type === 'subcategory' ? 'subcategory' : 'category'}`);
//         }
//       })
//       .catch((error) => {
//         console.error(`Error deleting ${type === 'subcategory' ? 'subcategory' : 'category'}:`, error);
//         setAlert({ message: `Error deleting ${type === 'subcategory' ? 'Subcategory' : 'Category'}`, type: 'danger' });
//       });
//   };
  

//   return (
//     <>
//     <button className='btn btn-danger btn-sm' onClick={handleDelete}>Remove</button>
//     {alert && <Alert variant={alert.type}>{alert.message}</Alert>} 
//     </>
//   );
// };


// export default RemoveCategory;


// // const RemoveCategory = ({ categoryId, onDelete }) => {
// //   const token = localStorage.getItem('adminToken');
// // const handleDelete = () => {
// //   // Send a request to the backend API to delete the category
// //   fetch(`${backendUrl}/api/categories/${categoryId}`, {
// //     method: 'DELETE',
// //     headers: {
// //       Authorization: `Bearer ${token}`, // Add your admin authentication token here
// //     },
// //   })
// //     .then(response => {
// //       if (response.status === 204) {
// //         // Category deleted successfully, call the onDelete callback
// //         onDelete(categoryId);
// //       } else {
// //         throw new Error('Failed to delete category');
// //       }
// //     })
// //     .catch(error => console.error('Error deleting category:', error));
// // };

// // return (
// //   <button onClick={handleDelete}>Remove</button>
// // );
// // };
// // /