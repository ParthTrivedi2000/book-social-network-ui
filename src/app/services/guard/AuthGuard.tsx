// File: AuthGuard.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface AuthGuardProps {
  children: React.ReactNode;  // Ensure the correct type for children
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Check authentication status

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return <>{children}</>;  // Render the protected route if authenticated
};

export default AuthGuard;
