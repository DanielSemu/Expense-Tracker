import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();  // Get the user from context
    return user ? children : <Navigate to="/" />;  // Redirect to login page if not authenticated
};

export default PrivateRoute;
