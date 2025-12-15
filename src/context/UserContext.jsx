import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { API_ENDPOINTS } from '../data/constants';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { makeRequest } = useApi();

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await makeRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Store token and user data
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await makeRequest(API_ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      localStorage.setItem('token', response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const response = await makeRequest(API_ENDPOINTS.USER.PROFILE);
      setUser(response);
    } catch (error) {
      logout(); // If refresh fails, logout user
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for stored token and validate on app load
    const token = localStorage.getItem('token');
    if (token) {
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
