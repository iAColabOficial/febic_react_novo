import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/useApi';
import { 
  Megaphone, 
  Calendar, 
  Users, 
  CheckCircle,
  ClipboardList,
  RefreshCw,
  Bell,
  MapPin
} from 'lucide-react';

export function VolunteerDashboard() {
  const { data: notices, loading } = useApi('/notifications/list');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const tasks = [
    {
      id: 1,
      title: "Apoio na Credenciamento",
      description: "Auxiliar participantes no check-in",
      time: "08:00 - 12:00",
      status: "pending"
    },
    {
      id: 2,
      title: "Organização de Salas",
      description: "Preparar ambiente para apresentações",
      time: "13:00 - 17:00", 
      status: "pending"
    }
  ];

  const events = [
    {
      title: "Cerimônia de Abertura",
      date: "15/08/2024",
      time: "09:00",
      location: "Auditório Principal"
    },
    {
      title: "Apresentações Categoria I",
      date: "16/08/2024", 
      time: "08:00",
      location: "Sala A1-A5"
    },
    {
      title: "Cerimônia de Premiação",
      date: "18/08/2024",
      time: "19:00",
      location: "Auditório Principal"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel do Voluntário</h1>
          <p className="text-muted-foreground">Bem-vindo à equipe FEBIC 2024!</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{tasks.length}</p>
                <p className="text-sm text-muted-foreground">Tarefas Atribuídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{events.length}</p>
                <p className="text-sm text-muted-foreground">Eventos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Voluntários Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Avisos Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-destructive bg-destructive/5 p-4 rounded-r-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Reunião Obrigatória</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Briefing geral para todos os voluntários amanhã às 08:00
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Coordenação • Há 1 hora</p>
                </div>
                <Badge variant="destructive">Urgente</Badge>
              </div>
            </div>

            <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
              <div>
                <p className="font-medium">Material de Apoio</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Manual do voluntário e crachás já estão disponíveis na recepção
                </p>
                <p className="text-xs text-muted-foreground mt-2">Organização • Há 3 horas</p>
              </div>
            </div>

            <div className="border-l-4 border-success bg-success/5 p-4 rounded-r-lg">
              <div>
                <p className="font-medium">Alimentação</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Almoço e lanches serão fornecidos para todos os voluntários
                </p>
                <p className="text-xs text-muted-foreground mt-2">RH • Ontem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Minhas Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Horário: {task.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Pendente</Badge>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma tarefa atribuída no momento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Events Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Cronograma de Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{event.date} às {event.time}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto flex-col py-6">
            <Bell className="h-8 w-8 mb-2" />
            <span>Check-in Presença</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <Users className="h-8 w-8 mb-2" />
            <span>Contatar Coordenação</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <ClipboardList className="h-8 w-8 mb-2" />
            <span>Manual do Voluntário</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <MapPin className="h-8 w-8 mb-2" />
            <span>Mapa do Local</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}