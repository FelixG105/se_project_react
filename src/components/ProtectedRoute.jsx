import { Navigate } from 'react-router-dom';
import { checkToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  return checkToken() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
