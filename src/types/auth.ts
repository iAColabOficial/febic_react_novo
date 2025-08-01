
export interface User {
  id: number;
  email: string;
  cpf: string;
  nome: string;
  telefone?: string;
  data_nascimento?: string;
  endereco_completo?: string;
  is_active: boolean;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  // Campos relacionados
  profile?: UserProfile;
  roles?: UserRole[];
  active_role?: UserRoleType;
}

export interface UserProfile {
  id: number;
  user_id: number;
  instituicao?: string;
  nivel_escolar?: NivelEscolar;
  formacao_academica?: string;
  area_atuacao?: string;
  curriculo_lattes?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: number;
  user_id: number;
  role_type: UserRoleType;
  status: RoleStatus;
  approved_by?: number;
  approved_at?: string;
  created_at: string;
}

export type NivelEscolar = 
  | 'educacao_infantil'
  | 'fundamental_1_3'
  | 'fundamental_4_6'
  | 'fundamental_7_9'
  | 'medio'
  | 'tecnico'
  | 'eja'
  | 'superior'
  | 'pos_graduacao';

export type RoleStatus = 'ativo' | 'pendente' | 'rejeitado' | 'inativo';

export type UserRoleType = 
  | 'autor'
  | 'orientador'
  | 'coorientador'
  | 'avaliador'
  | 'voluntario'
  | 'feira_afiliada'
  | 'coordenador'
  | 'coordenador_admin'
  | 'diretor'
  | 'financeiro'
  | 'admin_staff';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  data_nascimento?: string;
  endereco_completo?: string;
  password: string;
  password_confirmation: string;
  role_type: UserRoleType;
  // Dados do perfil
  instituicao?: string;
  nivel_escolar?: NivelEscolar;
  formacao_academica?: string;
  area_atuacao?: string;
  curriculo_lattes?: string;
}
