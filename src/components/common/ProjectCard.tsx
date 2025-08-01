import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, FileText, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  status: string;
  progress?: number;
  deadline?: string;
  members?: string[];
  documentsCount?: number;
  onViewDetails?: () => void;
  className?: string;
}

const statusConfig = {
  rascunho: { color: 'bg-muted text-muted-foreground', label: 'Rascunho' },
  submetido: { color: 'bg-primary text-primary-foreground', label: 'Submetido' },
  selecionado: { color: 'bg-success text-success-foreground', label: 'Selecionado' },
  confirmado_virtual: { color: 'bg-warning text-warning-foreground', label: 'Confirmado Virtual' },
  finalista: { color: 'bg-success text-success-foreground', label: 'Finalista' },
  avaliado: { color: 'bg-primary text-primary-foreground', label: 'Avaliado' },
  premiado: { color: 'bg-success text-success-foreground', label: 'Premiado' }
};

export function ProjectCard({
  id,
  title,
  category,
  status,
  progress = 75,
  deadline,
  members = [],
  documentsCount = 0,
  onViewDetails,
  className
}: ProjectCardProps) {
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.rascunho;

  return (
    <Card className={cn("hover:shadow-md transition-all duration-200 cursor-pointer", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Categoria {category}
              </Badge>
              <Badge className={cn("text-xs", statusInfo.color)}>
                {statusInfo.label}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Project Info */}
        <div className="space-y-2">
          {deadline && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Prazo: {deadline}</span>
            </div>
          )}

          {members.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{members.length} membro(s)</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{documentsCount} documento(s)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            Ver Detalhes
          </Button>
          {status === 'rascunho' && (
            <Button size="sm" className="flex-1">
              Continuar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}