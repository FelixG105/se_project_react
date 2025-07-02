import { Navigate } from 'react-router-dom';
// import { checkToken } from '../utils/auth';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, isLoading }) => {
  const { currentUser } = useContext(CurrentUserContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
