import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminPanel from '../AdminPanel/AdminPanel';
import AdminLogin from '../AdminPanel/AdminLogin';

const AdminApp = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the admin token exists in local storage
    const adminToken = Cookies.get('adminToken');
    console.log("Hello Admin");
    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      // Redirect to the login page if not authenticated
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear the admin token from both local storage and the cookie
    localStorage.removeItem('adminToken');
    Cookies.remove('adminToken'); // Delete the cookie
    setIsAuthenticated(false);
    // Redirect to the login page after logout
    navigate('/admin/login');
  };
  

  return (
    <div>
      {isAuthenticated ? (
         <AdminPanel onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
     
    </div>
  );
};

export default AdminApp;
