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
  const [activeSessionId, setActiveSessionId] = useState(null);
  const { makeRequest } = useApi();

  // Helper to start a client-side session
  const loginSuccess = (userData) => {
    const expiry = Date.now() + 30 * 60 * 1000; // 30 minutes
    localStorage.setItem('sessionExpiry', expiry.toString());
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

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
      loginSuccess(response.user); // Use helper
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
      loginSuccess(response.user); // Use helper
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
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
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
    // Check for stored session and validate on app load
    const storedUser = localStorage.getItem('user');
    const expiry = localStorage.getItem('sessionExpiry');

    // Check if session exists and is valid (not expired)
    if (storedUser && expiry && Date.now() < parseInt(expiry)) {
      setUser(JSON.parse(storedUser));
      // Optionally check token if needed, but for now we rely on local session
      // const token = localStorage.getItem('token');
      // if (token) refreshUser().catch(() => {}); 
    } else {
      // Session expired or invalid
      if (storedUser || expiry) {
        logout();
      }
    }
    setLoading(false);
    setLoading(false);
  }, []);

  // Initialize Active Session ID
  useEffect(() => {
    let sessionId = sessionStorage.getItem('activeSessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('activeSessionId', sessionId);
    }
    setActiveSessionId(sessionId);
  }, []);

  const value = {
    user,
    setUser,
    login,
    signup,
    logout,
    refreshUser,
    loginSuccess, // Export helper
    isAuthenticated,
    loading,
    activeSessionId
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
