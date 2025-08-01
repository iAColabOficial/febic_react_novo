
import { Project } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign } from 'lucide-react';

interface ProjectStatusCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const statusColors: Record<string, string> = {
  rascunho: 'bg-gray-100 text-gray-800',
  submetido: 'bg-blue-100 text-blue-800',
  selecionado: 'bg-green-100 text-green-800',
  confirmado_virtual: 'bg-purple-100 text-purple-800',
  finalista: 'bg-yellow-100 text-yellow-800',
  confirmado_presencial: 'bg-indigo-100 text-indigo-800',
  avaliado: 'bg-emerald-100 text-emerald-800',
  rejeitado: 'bg-red-100 text-red-800',
};

const paymentStatusColors: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  pago: 'bg-green-100 text-green-800',
  vencido: 'bg-red-100 text-red-800',
  isento: 'bg-blue-100 text-blue-800',
};

export function ProjectStatusCard({ project, onViewDetails }: ProjectStatusCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {project.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 capitalize">
              {project.category.replace('_', ' ')}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={statusColors[project.status]}>
              {project.status.replace('_', ' ')}
            </Badge>
            <Badge className={paymentStatusColors[project.payment_status]}>
              {project.payment_status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{project.authors.length} autor(es)</span>
          </div>
          
          {project.submission_deadline && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Prazo: {new Date(project.submission_deadline).toLocaleDateString()}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>
              {project.is_exempt ? 'Isento' : `R$ ${project.fee_amount.toFixed(2)}`}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(project)}
            className="w-full"
          >
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
