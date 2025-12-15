import { useUser } from '../context/UserContext';

export const useAuth = () => {
  const {
    user,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated,
    loading
  } = useUser();

  return {
    user,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated,
    loading,
    // Additional convenience methods
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
  };
};
