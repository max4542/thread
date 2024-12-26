import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/jwtTokenUtils'; // Ensure the correct path to jwtTokenUtils

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isTokenValid() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
