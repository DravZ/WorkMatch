import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext/UserContext';
import type { UserRole } from '../context/UserContext/UserContext';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { user } = useUser();

  // No hay sesión
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Tiene sesión pero no tiene permiso
  if (!allowedRoles.includes(user.role)) {
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