
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  FileText, 
  Users, 
  BarChart3, 
  DollarSign, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Award,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const navigation = {
  admin_staff: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projetos', href: '/projects', icon: FileText },
    { name: 'Usuários', href: '/users', icon: Users },
    { name: 'Avaliações', href: '/evaluations', icon: Award },
    { name: 'Financeiro', href: '/financial', icon: DollarSign },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ],
  coordenador_admin: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projetos', href: '/projects', icon: FileText },
    { name: 'Usuários', href: '/users', icon: Users },
    { name: 'Avaliações', href: '/evaluations', icon: Award },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  ],
  coordenador: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projetos', href: '/projects', icon: FileText },
    { name: 'Avaliações', href: '/evaluations', icon: Award },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  ],
  diretor: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projetos', href: '/projects', icon: FileText },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  ],
  financeiro: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Financeiro', href: '/financial', icon: DollarSign },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  ],
  avaliador: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Avaliações', href: '/evaluations', icon: Award },
    { name: 'Agenda', href: '/schedule', icon: BookOpen },
  ],
  autor: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Meus Projetos', href: '/my-projects', icon: FileText },
    { name: 'Notificações', href: '/notifications', icon: Bell },
  ],
  orientador: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Meus Projetos', href: '/my-projects', icon: FileText },
    { name: 'Orientandos', href: '/students', icon: UserCheck },
  ],
  coorientador: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Meus Projetos', href: '/my-projects', icon: FileText },
  ],
  feira_afiliada: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Credenciais', href: '/credentials', icon: Users },
  ],
  voluntario: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Avisos', href: '/notices', icon: Bell },
  ],
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userNavigation = navigation[user.active_role!] || [];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl text-gray-900">FEBIC</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-2"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={undefined} />
              <AvatarFallback>{user.nome.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.nome}</p>
                <p className="text-xs text-gray-500 capitalize">{user.active_role?.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {userNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Sair</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
