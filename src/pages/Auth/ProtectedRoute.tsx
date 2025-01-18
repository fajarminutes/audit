import React from 'react';  
import { Navigate } from 'react-router-dom';  
  
const ProtectedRoute = ({ children }) => {  
    const token = localStorage.getItem('access_token');  
    const tokenExpiredAt = localStorage.getItem('token_expired_at');  
  
    // Memeriksa apakah token ada dan belum kedaluwarsa  
    const isAuthenticated = token && new Date(tokenExpiredAt) > new Date();  
  
    return isAuthenticated ? children : <Navigate to="/login" />;  
};  
  
export default ProtectedRoute;  
