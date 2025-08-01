import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCard } from '@/components/common/ProjectCard';
import { useApi } from '@/hooks/useApi';
import { 
  Plus, 
  Upload, 
  Users, 
  Bell, 
  FileText, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  CreditCard
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  created_at: string;
  members: string[];
  progress?: number;
  deadline?: string;
  documents_count?: number;
}

export function AuthorDashboard() {
  const { data: projects, loading } = useApi<Project[]>('/projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeProjects = projects?.filter(p => p.status !== 'premiado' && p.status !== 'desclassificado') || [];
  const completedProjects = projects?.filter(p => p.status === 'premiado' || p.status === 'desclassificado') || [];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Projetos</h1>
          <p className="text-muted-foreground">Gerencie seus projetos científicos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{projects?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total de Projetos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{activeProjects.length}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Ações Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Pagamentos Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Projetos Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeProjects.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum projeto ativo</h3>
                <p className="text-muted-foreground mb-4">
                  Comece criando seu primeiro projeto científico
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Projeto
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  status={project.status}
                  progress={project.progress}
                  deadline={project.deadline}
                  members={project.members}
                  documentsCount={project.documents_count}
                  onViewDetails={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}

          {/* Selected Project Details */}
          {selectedProject && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedProject.title}</span>
                  <Badge>{selectedProject.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timeline */}
                <div>
                  <h4 className="font-medium mb-3">Timeline do Projeto</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Projeto criado - {selectedProject.created_at}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Documentos básicos enviados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Em avaliação - Aguardando resultado</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documentos
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Gerenciar Equipe
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver Cronograma
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedProjects.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum projeto concluído</h3>
                <p className="text-muted-foreground">
                  Seus projetos finalizados aparecerão aqui
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  status={project.status}
                  progress={100}
                  members={project.members}
                  onViewDetails={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Resultado da Avaliação</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Seu projeto "Robótica Educacional" foi selecionado para a fase presencial!
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Há 2 horas</p>
                  </div>
                  <Badge variant="default">Novo</Badge>
                </div>
              </div>

              <div className="border-l-4 border-warning bg-warning/5 p-4 rounded-r-lg">
                <div>
                  <p className="font-medium">Pagamento Pendente</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Taxa da fase presencial vence em 3 dias. Acesse o link para pagamento.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Ontem</p>
                </div>
              </div>

              <div className="border-l-4 border-muted bg-muted/20 p-4 rounded-r-lg">
                <div>
                  <p className="font-medium">Documento Aprovado</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Seu relatório científico foi aprovado pela coordenação.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Há 2 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}