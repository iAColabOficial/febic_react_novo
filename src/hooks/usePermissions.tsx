import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType } from '@/types/auth';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasRole = (roles: UserRoleType[]): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(role => roles.includes(role.role_type));
  };

  const canViewFinancial = (): boolean => {
    return hasRole(['admin_staff', 'financeiro']);
  };

  const canApproveUsers = (): boolean => {
    return hasRole(['admin_staff', 'coordenador_admin']);
  };

  const canManageProjects = (): boolean => {
    return hasRole(['admin_staff', 'coordenador_admin', 'coordenador']);
  };

  const canEvaluate = (): boolean => {
    return hasRole(['avaliador']);
  };

  const canViewAllProjects = (): boolean => {
    return hasRole(['admin_staff', 'coordenador_admin', 'coordenador', 'diretor']);
  };

  const isAdmin = (): boolean => {
    return hasRole(['admin_staff']);
  };

  const isCoordinator = (): boolean => {
    return hasRole(['coordenador_admin', 'coordenador']);
  };

  return {
    hasRole,
    canViewFinancial,
    canApproveUsers,
    canManageProjects,
    canEvaluate,
    canViewAllProjects,
    isAdmin,
    isCoordinator
  };
};