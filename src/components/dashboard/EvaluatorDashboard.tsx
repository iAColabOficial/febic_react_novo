
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Calendar,
  Video,
  Star,
  Eye,
  BookOpen
} from 'lucide-react';

export function EvaluatorDashboard() {
  const assignedProjects = [
    {
      id: 1,
      title: "Análise da Qualidade da Água em Rios Urbanos",
      category: "Ciências Exatas",
      authors: ["João Silva", "Maria Santos"],
      deadline: "2024-03-20",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      title: "Impacto das Redes Sociais na Saúde Mental",
      category: "Ciências Humanas", 
      authors: ["Ana Costa"],
      deadline: "2024-03-22",
      status: "in_progress",
      priority: "medium"
    },
    {
      id: 3,
      title: "Desenvolvimento de App Educacional",
      category: "Ciências Exatas",
      authors: ["Carlos Lima", "Sofia Ramos"],
      deadline: "2024-03-25",
      status: "completed",
      priority: "low"
    }
  ];

  const upcomingMeetings = [
    {
      project: "Análise da Qualidade da Água",
      date: "2024-03-18",
      time: "14:00",
      type: "Apresentação Virtual",
      meetLink: "https://meet.google.com/abc-def-ghi"
    },
    {
      project: "App Educacional",
      date: "2024-03-19",
      time: "10:30",
      type: "Entrevista com Autores",
      meetLink: "https://meet.google.com/xyz-uvw-rst"
    }
  ];

  const evaluationCriteria = [
    { name: "Originalidade", weight: "25%" },
    { name: "Metodologia", weight: "25%" },
    { name: "Relevância Científica", weight: "20%" },
    { name: "Apresentação", weight: "15%" },
    { name: "Impacto Social", weight: "15%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'default';
      case 'pending': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Avaliado';
      case 'in_progress': return 'Em Andamento';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard do Avaliador</h1>
          <p className="text-gray-600">Gerencie suas avaliações e cronograma</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Minha Agenda
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Projetos Designados</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avaliações Concluídas</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reuniões Hoje</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assigned Projects */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Projetos Designados</h2>
          
          {assignedProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.category} • {project.authors.join(", ")}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(project.status) as any}>
                      {getStatusText(project.status)}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Prazo de avaliação: {project.deadline}</span>
                  <span>{Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias restantes</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Projeto
                  </Button>
                  <Button size="sm" variant={project.status === 'completed' ? 'outline' : 'default'}>
                    <Star className="h-4 w-4 mr-1" />
                    {project.status === 'completed' ? 'Ver Avaliação' : 'Avaliar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5" />
                Próximas Reuniões
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-900">{meeting.project}</h4>
                  <p className="text-xs text-gray-600 mt-1">{meeting.type}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{meeting.date} às {meeting.time}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={meeting.meetLink} target="_blank" rel="noopener noreferrer">
                        Entrar
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Evaluation Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Critérios de Avaliação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {evaluationCriteria.map((criteria, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{criteria.name}</span>
                    <Badge variant="secondary">{criteria.weight}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Definir Disponibilidade
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Relatório de Avaliações
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Manual do Avaliador
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
