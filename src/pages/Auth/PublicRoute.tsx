import React from 'react';  
import { Navigate } from 'react-router-dom';  
  
const PublicRoute = ({ children }) => {  
    const token = localStorage.getItem('access_token');  
  
    // Memeriksa apakah token ada  
    const isAuthenticated = !!token;  
  
    return isAuthenticated ? <Navigate to="/" /> : children;  
};  
  
export default PublicRoute;  
