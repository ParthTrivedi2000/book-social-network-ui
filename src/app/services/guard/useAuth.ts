import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');  // Assuming token is stored in localStorage
    if (token) {
      setIsAuthenticated(true);  // Set true if token exists
    } else {
      setIsAuthenticated(false);  // Otherwise, false
    }
  }, []);  // Run once when the component mounts

  return { isAuthenticated };
};
