
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar projetos, usuários..."
              className="pl-10 w-80"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              3
            </Badge>
          </Button>

          {/* User role badge */}
          {user && user.active_role && (
            <Badge variant="secondary" className="capitalize">
              {user.active_role.replace('_', ' ')}
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}

function getPageTitle() {
  const path = window.location.pathname;
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/projects': 'Projetos',
    '/my-projects': 'Meus Projetos',
    '/users': 'Usuários',
    '/evaluations': 'Avaliações',
    '/financial': 'Financeiro',
    '/reports': 'Relatórios',
    '/settings': 'Configurações',
    '/notifications': 'Notificações',
    '/schedule': 'Agenda',
    '/students': 'Orientandos',
    '/credentials': 'Credenciais',
    '/notices': 'Avisos',
  };
  
  return titles[path] || 'FEBIC';
}
