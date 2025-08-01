import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/common/StatsCard';
import { SimpleChart } from '@/components/common/SimpleChart';
import { useApi } from '@/hooks/useApi';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Users,
  MapPin,
  Calendar,
  Download,
  RefreshCw,
  Award
} from 'lucide-react';

export function DirectorDashboard() {
  const { data: dashboardData, loading } = useApi('/admin/dashboard');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const regionData = {
    labels: ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'],
    datasets: [{
      data: [450, 320, 280, 180, 90],
      label: 'Projetos por Região'
    }]
  };

  const trendData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      data: [850, 1100, 1350, 1600, 1900],
      label: 'Crescimento de Participação',
      borderColor: 'hsl(222, 84%, 33%)',
      backgroundColor: 'hsla(222, 84%, 33%, 0.1)'
    }]
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Executivo</h1>
          <p className="text-muted-foreground">Visão estratégica da FEBIC</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Relatório Executivo
          </Button>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Participação Total"
          value="1,847"
          icon={Users}
          change="+18.5% vs 2023"
          changeType="increase"
        />
        <StatsCard
          title="Projetos de Qualidade"
          value="89.2%"
          icon={Award}
          change="+3.4% qualidade"
          changeType="increase"
        />
        <StatsCard
          title="Instituições Participantes"
          value="456"
          icon={MapPin}
          change="+23 novas"
          changeType="increase"
        />
        <StatsCard
          title="Taxa de Conclusão"
          value="94.7%"
          icon={TrendingUp}
          description="Projetos concluídos"
        />
      </div>

      {/* Strategic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Distribuição Regional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={regionData}
              type="bar"
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Crescimento Histórico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart
              data={trendData}
              type="line"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Strategic Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Impacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Alcance Social</span>
              <Badge className="bg-success text-success-foreground">Alto</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Inovação Científica</span>
              <Badge className="bg-success text-success-foreground">Excelente</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Sustentabilidade</span>
              <Badge className="bg-warning text-warning-foreground">Bom</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Diversidade Regional</span>
              <Badge className="bg-primary text-primary-foreground">Ótimo</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marcos da FEBIC 2024</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Recorde de Participação</p>
                <p className="text-xs text-muted-foreground">1.847 projetos inscritos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Expansão Nacional</p>
                <p className="text-xs text-muted-foreground">Todos os estados participando</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Digitalização Completa</p>
                <p className="text-xs text-muted-foreground">100% online e sustentável</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Decisões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Expansão Internacional</p>
              <p className="text-xs text-muted-foreground">Parceria com feiras da América Latina</p>
              <div className="mt-2">
                <Badge variant="outline">Em Análise</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Programa de Mentoria</p>
              <p className="text-xs text-muted-foreground">Conectar alunos com pesquisadores</p>
              <div className="mt-2">
                <Badge className="bg-warning text-warning-foreground">Planejamento</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Estratégicas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto flex-col py-6">
            <BarChart3 className="h-8 w-8 mb-2" />
            <span>Análise Competitiva</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <Users className="h-8 w-8 mb-2" />
            <span>Gestão de Stakeholders</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <Calendar className="h-8 w-8 mb-2" />
            <span>Planejamento 2025</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <Award className="h-8 w-8 mb-2" />
            <span>Cerimônia de Premiação</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}