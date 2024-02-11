import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Route } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  useEffect(() => {
    const storedToken = Cookies.get('jwt-token');
    console.log(storedToken)
    setAuthToken(storedToken || null);

    if (storedToken) {
      checkTokenValidity(storedToken);
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    checkTokenValidity(token);
  };
  
  const logout = async () => {
    try {
      Route.apply('/')
      await axios.post('http://localhost:8080/user/logout');
    } catch (error) {
      console.error('Error during logout:', error.response?.data || 'An unexpected error occurred');
    } finally {
      setAuthToken(null);
      setTokenValid(false);
    }
  };
  

  const checkTokenValidity = async (token) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/user/jwt-token-check',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTokenValid(true);
    } catch (error) {
      setTokenValid(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, tokenValid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
