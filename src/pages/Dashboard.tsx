
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { AuthorDashboard } from '@/components/dashboard/AuthorDashboard';
import { EvaluatorDashboard } from '@/components/dashboard/EvaluatorDashboard';
import { FinancialDashboard } from '@/components/dashboard/FinancialDashboard';
import { CoordinatorDashboard } from '@/components/dashboard/CoordinatorDashboard';
import { DirectorDashboard } from '@/components/dashboard/DirectorDashboard';
import { VolunteerDashboard } from '@/components/dashboard/VolunteerDashboard';
import { FairAffiliateDashboard } from '@/components/dashboard/FairAffiliateDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  // Route to appropriate dashboard based on user role
  switch (user.active_role) {
    case 'admin_staff':
      return <AdminDashboard />;
    
    case 'diretor':
      return <DirectorDashboard />;
      
    case 'coordenador_admin':
    case 'coordenador':
      return <CoordinatorDashboard />;
    
    case 'financeiro':
      return <FinancialDashboard />;
    
    case 'avaliador':
      return <EvaluatorDashboard />;
      
    case 'voluntario':
      return <VolunteerDashboard />;
      
    case 'feira_afiliada':
      return <FairAffiliateDashboard />;
    
    case 'autor':
    case 'orientador':
    case 'coorientador':
      return <AuthorDashboard />;
    
    default:
      return (
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bem-vindo à FEBIC, {user.nome}!
            </h2>
            <p className="text-gray-600">
              Seu dashboard está sendo preparado. Em breve você terá acesso a todas as funcionalidades.
            </p>
          </div>
        </div>
      );
  }
}
