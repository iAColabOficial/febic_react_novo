
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType } from '@/types/auth';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRoleType[];
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && user.active_role && !allowedRoles.includes(user.active_role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
