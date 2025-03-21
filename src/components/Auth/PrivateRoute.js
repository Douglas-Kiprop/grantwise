import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
    console.log('PrivateRoute - token in localStorage:', localStorage.getItem('token'));
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;