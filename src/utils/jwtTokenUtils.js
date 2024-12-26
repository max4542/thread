// utils/jwtTokenUtils.js

import { jwtDecode } from 'jwt-decode'; // Use named import

// Utility function to decode the token and get the payload
const decodeToken = (token) => {
  try {
    // Decode the JWT token
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// Utility function to check if the token is valid
const isTokenValid = () => {
  const token = localStorage.getItem('authToken');

  // If no token is found, return false
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    
    // Check if the token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (error) {
    // In case the token is invalid or cannot be decoded, return false
    return false;
  }
};

// Utility function to get user info from the token (like user ID, email, etc.)
const getUserInfoFromToken = () => {
  const token = localStorage.getItem('authToken');
  const decoded = decodeToken(token);
  return decoded ? decoded : null;
};

// Export all functions in a single export statement
export { decodeToken, isTokenValid, getUserInfoFromToken };
