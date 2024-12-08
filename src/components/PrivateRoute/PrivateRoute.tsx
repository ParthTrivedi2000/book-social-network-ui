// PrivateRoute.tsx
import { Route, Navigate } from 'react-router-dom';
// import { tokenService } from '../services/Token'; // Assuming tokenService handles JWT storage/validation
import { tokenService } from '../../app/services/token/Token';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return tokenService.isTokenValid() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export { PrivateRoute };
