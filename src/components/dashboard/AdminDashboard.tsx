import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from '@/components/common/StatsCard';
import { SimpleChart } from '@/components/common/SimpleChart';
import { useApi } from '@/hooks/useApi';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  UserCheck,
  DollarSign,
  Calendar,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardData {
  total_projects: number;
  projects_by_status: {
    submitted: number;
    selected: number;
    evaluated: number;
    awarded: number;
  };
  projects_by_category: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  recent_submissions: Array<{
    date: string;
    count: number;
  }>;
}

export function AdminDashboard() {
  const { data: dashboardData, loading, refetch } = useApi<AdminDashboardData>('/admin/dashboard');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const categoryChartData = {
    labels: dashboardData?.projects_by_category.map(item => `Categoria ${item.category}`) || [],
    datasets: [{
      data: dashboardData?.projects_by_category.map(item => item.count) || [],
      label: 'Projetos por Categoria'
    }]
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Visão geral completa da FEBIC</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Projetos"
          value={dashboardData?.total_projects || 0}
          icon={FileText}
          change="+12% desde o mês passado"
          changeType="increase"
        />
        <StatsCard
          title="Projetos Avaliados"
          value={dashboardData?.projects_by_status.evaluated || 0}
          icon={UserCheck}
          change="+5% esta semana"
          changeType="increase"
        />
        <StatsCard
          title="Usuários Ativos"
          value="2,847"
          icon={Users}
          change="+8% este mês"
          changeType="increase"
        />
        <StatsCard
          title="Ações Pendentes"
          value="23"
          icon={AlertCircle}
          change="4 críticas"
          changeType="neutral"
        />
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projetos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={categoryChartData}
              type="pie"
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4">
              <Users className="h-8 w-8 mb-2" />
              <span>Aprovar Usuários</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Calendar className="h-8 w-8 mb-2" />
              <span>Cronograma</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Settings className="h-8 w-8 mb-2" />
              <span>Configurações</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Download className="h-8 w-8 mb-2" />
              <span>Relatórios</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium">Aprovar 15 novos avaliadores</p>
                  <p className="text-sm text-muted-foreground">Solicitações pendentes de aprovação</p>
                </div>
              </div>
              <Button size="sm">Revisar</Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium">8 isenções de pagamento</p>
                  <p className="text-sm text-muted-foreground">Aguardando análise e aprovação</p>
                </div>
              </div>
              <Button size="sm">Analisar</Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Atualizar cronograma</p>
                  <p className="text-sm text-muted-foreground">Definir datas da próxima fase</p>
                </div>
              </div>
              <Button size="sm">Configurar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}