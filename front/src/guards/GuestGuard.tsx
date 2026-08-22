import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext/UserContext';

export const GuestGuard = () => {
  const { user } = useUser();

  if (user) {
    switch (user.role) {
      case 'work':
        return <Navigate to="/worker/" replace />;

      case 'hire':
        return <Navigate to="/employer/" replace />;

      case 'admin':
        return <Navigate to="/admin" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};