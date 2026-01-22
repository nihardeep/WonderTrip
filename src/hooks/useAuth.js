import { useUser } from '../context/UserContext';

export const useAuth = () => {
  const {
    user,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated,
    loginSuccess, // Added
    loading,
    activeSessionId
  } = useUser();

  return {
    user,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated,
    loginSuccess, // Added
    loading,
    activeSessionId,
    // Additional convenience methods
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
  };
};
