
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AuthState & { loading: boolean } = {
  user: null,
  token: localStorage.getItem('febic_token'),
  isAuthenticated: false,
  loading: true,
};

function authReducer(state: typeof initialState, action: AuthAction): typeof initialState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

// Usuários de demonstração
const demoUsers: Record<string, { user: User; password: string }> = {
  'admin@febic.com.br': {
    password: 'admin123',
    user: {
      id: 1,
      email: 'admin@febic.com.br',
      cpf: '123.456.789-00',
      nome: 'Administrador FEBIC',
      telefone: '(11) 99999-9999',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      active_role: 'admin_staff',
      profile: {
        id: 1,
        user_id: 1,
        instituicao: 'FEBIC - Administração',
        nivel_escolar: 'pos_graduacao',
        area_atuacao: 'Administração Educacional',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      roles: [{
        id: 1,
        user_id: 1,
        role_type: 'admin_staff',
        status: 'ativo',
        created_at: '2024-01-01T00:00:00Z',
      }]
    }
  },
  'autor@febic.com.br': {
    password: 'autor123',
    user: {
      id: 2,
      email: 'autor@febic.com.br',
      cpf: '987.654.321-00',
      nome: 'João Silva',
      telefone: '(11) 88888-8888',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      active_role: 'autor',
      profile: {
        id: 2,
        user_id: 2,
        instituicao: 'Universidade Federal do Brasil',
        nivel_escolar: 'superior',
        area_atuacao: 'Ciências da Computação',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      roles: [{
        id: 2,
        user_id: 2,
        role_type: 'autor',
        status: 'ativo',
        created_at: '2024-01-01T00:00:00Z',
      }]
    }
  },
  'avaliador@febic.com.br': {
    password: 'aval123',
    user: {
      id: 3,
      email: 'avaliador@febic.com.br',
      cpf: '456.789.123-00',
      nome: 'Dra. Maria Santos',
      telefone: '(11) 77777-7777',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      active_role: 'avaliador',
      profile: {
        id: 3,
        user_id: 3,
        instituicao: 'Instituto de Pesquisas Científicas',
        nivel_escolar: 'pos_graduacao',
        area_atuacao: 'Ciências Exatas e da Terra',
        curriculo_lattes: 'http://lattes.cnpq.br/1234567890',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      roles: [{
        id: 3,
        user_id: 3,
        role_type: 'avaliador',
        status: 'ativo',
        created_at: '2024-01-01T00:00:00Z',
      }]
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('febic_token');
      if (token) {
        try {
          // Simular validação do token
          const userData = JSON.parse(localStorage.getItem('febic_user') || '{}');
          if (userData.id) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userData, token } });
          } else {
            localStorage.removeItem('febic_token');
            localStorage.removeItem('febic_user');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('febic_token');
          localStorage.removeItem('febic_user');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('Tentando login com:', credentials);
      
      // Simular autenticação com usuários de demonstração
      const demoUser = demoUsers[credentials.email];
      
      if (!demoUser) {
        throw new Error('Usuário não encontrado');
      }
      
      if (demoUser.password !== credentials.password) {
        throw new Error('Senha incorreta');
      }

      // Simular token
      const token = 'demo_token_' + Date.now();
      
      // Salvar no localStorage
      localStorage.setItem('febic_token', token);
      localStorage.setItem('febic_user', JSON.stringify(demoUser.user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: demoUser.user, token } });
      
      console.log('Login realizado com sucesso para:', demoUser.user.nome);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('febic_token');
    localStorage.removeItem('febic_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('febic_user', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
