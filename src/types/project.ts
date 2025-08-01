
export interface Project {
  id: string;
  title: string;
  abstract: string;
  category: ProjectCategory;
  subcategory: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  submission_deadline?: string;
  
  // Team
  authors: ProjectMember[];
  orientador: ProjectMember;
  coorientador?: ProjectMember;
  
  // Files
  documents: ProjectDocument[];
  
  // Evaluation
  evaluations?: Evaluation[];
  final_score?: number;
  
  // Financial
  payment_status: PaymentStatus;
  fee_amount: number;
  is_exempt: boolean;
}

export type ProjectCategory = 
  | 'ciencias_exatas'
  | 'ciencias_biologicas'
  | 'ciencias_humanas'
  | 'ciencias_sociais'
  | 'engenharias'
  | 'linguistica_artes';

export type ProjectStatus = 
  | 'rascunho'
  | 'submetido'
  | 'selecionado'
  | 'confirmado_virtual'
  | 'finalista'
  | 'confirmado_presencial'
  | 'avaliado'
  | 'rejeitado';

export type PaymentStatus = 
  | 'pendente'
  | 'pago'
  | 'vencido'
  | 'isento';

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'author' | 'orientador' | 'coorientador';
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'paper' | 'presentation' | 'video' | 'attachment';
  url: string;
  size: number;
  uploaded_at: string;
}

export interface Evaluation {
  id: string;
  evaluator_id: string;
  evaluator_name: string;
  score: number;
  comments: string;
  criteria_scores: Record<string, number>;
  created_at: string;
}
