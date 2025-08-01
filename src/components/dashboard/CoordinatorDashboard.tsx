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
  Download,
  RefreshCw,
  Settings,
  Calendar
} from 'lucide-react';

export function CoordinatorDashboard() {
  const { data: dashboardData, loading } = useApi('/projects');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const projectsData = {
    labels: ['Categoria I', 'Categoria II', 'Categoria III', 'Categoria IV'],
    datasets: [{
      data: [245, 189, 312, 156],
      label: 'Projetos por Categoria'
    }]
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Coordenador</h1>
          <p className="text-muted-foreground">Visão geral dos projetos e avaliações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
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
          title="Projetos Submetidos"
          value="902"
          icon={FileText}
          change="+12% este mês"
          changeType="increase"
        />
        <StatsCard
          title="Em Avaliação"
          value="267"
          icon={UserCheck}
          change="+5% esta semana"
          changeType="increase"
        />
        <StatsCard
          title="Finalistas"
          value="89"
          icon={TrendingUp}
          change="+23% vs ano passado"
          changeType="increase"
        />
        <StatsCard
          title="Avaliadores Ativos"
          value="45"
          icon={Users}
          description="Disponíveis para avaliação"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="evaluators">Avaliadores</TabsTrigger>
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleChart
                  data={projectsData}
                  type="pie"
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status das Avaliações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Categoria I</p>
                    <p className="text-sm text-muted-foreground">Avaliação virtual concluída</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Concluída</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Categoria II</p>
                    <p className="text-sm text-muted-foreground">Em andamento - 67% avaliados</p>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">Em Andamento</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Categoria III</p>
                    <p className="text-sm text-muted-foreground">Aguardando distribuição</p>
                  </div>
                  <Badge variant="outline">Pendente</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Projetos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto flex-col py-6">
                <FileText className="h-8 w-8 mb-2" />
                <span>Ver Todos os Projetos</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-6">
                <Users className="h-8 w-8 mb-2" />
                <span>Distribuir Avaliadores</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-6">
                <TrendingUp className="h-8 w-8 mb-2" />
                <span>Relatórios de Progresso</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Avaliadores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ferramentas de gestão de avaliadores em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma da FEBIC</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Submissão de Projetos</p>
                  <p className="text-sm text-muted-foreground">01/01/2024 - 15/03/2024</p>
                </div>
                <Badge className="bg-success text-success-foreground">Concluída</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium">Avaliação Virtual</p>
                  <p className="text-sm text-muted-foreground">16/03/2024 - 30/04/2024</p>
                </div>
                <Badge className="bg-warning text-warning-foreground">Em Andamento</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Fase Presencial</p>
                  <p className="text-sm text-muted-foreground">15/08/2024 - 18/08/2024</p>
                </div>
                <Badge variant="outline">Planejada</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}