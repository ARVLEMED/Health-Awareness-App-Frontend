// src/utils/auth.js
export const getToken = () => {
    return localStorage.getItem('access_token'); // Make sure you save the token with this key
  };
  