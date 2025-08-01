import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

interface SearchResult {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  instituicao?: string;
  nivel_escolar?: string;
}

export function UserSearchByCPF({ 
  onUserSelect, 
  excludeIds = [], 
  placeholder = "Digite o CPF do membro" 
}: {
  onUserSelect: (user: SearchResult) => void;
  excludeIds?: number[];
  placeholder?: string;
}) {
  const [cpf, setCpf] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState('');

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setCpf(formatted);
    
    if (formatted.length === 14) {
      searchUser(formatted);
    } else {
      setResults([]);
      setError('');
    }
  };

  const searchUser = async (cpfValue: string) => {
    setSearching(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock results
      const mockResults: SearchResult[] = [
        {
          id: 1,
          nome: 'João Silva Santos',
          email: 'joao.silva@email.com',
          cpf: cpfValue,
          instituicao: 'Escola Estadual Dom Pedro II',
          nivel_escolar: 'medio'
        }
      ];
      
      const filteredResults = mockResults.filter(user => !excludeIds.includes(user.id));
      setResults(filteredResults);
      
      if (filteredResults.length === 0) {
        setError('Usuário não encontrado ou já faz parte da equipe');
      }
    } catch (err) {
      setError('Erro ao buscar usuário. Tente novamente.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Buscar Usuário por CPF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={placeholder}
                value={cpf}
                onChange={(e) => handleCPFChange(e.target.value)}
                className="pl-10"
                maxLength={14}
              />
            </div>
            {searching && (
              <div className="flex items-center px-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Usuários encontrados:</h4>
            {results.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.nome}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.instituicao && (
                      <p className="text-xs text-muted-foreground">{user.instituicao}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.nivel_escolar && (
                    <Badge variant="outline" className="text-xs">
                      {user.nivel_escolar.replace('_', ' ')}
                    </Badge>
                  )}
                  <Button size="sm" onClick={() => onUserSelect(user)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>Digite o CPF completo para buscar usuários cadastrados na plataforma.</p>
        </div>
      </CardContent>
    </Card>
  );
}