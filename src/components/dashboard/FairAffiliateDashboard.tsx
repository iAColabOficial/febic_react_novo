import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApi } from '@/hooks/useApi';
import { 
  Key, 
  Users, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Plus,
  FileText,
  Calendar
} from 'lucide-react';

interface FairToken {
  id: string;
  token: string;
  quantidade_credenciais: number;
  quantidade_usada: number;
  expires_at: string;
  is_active: boolean;
}

export function FairAffiliateDashboard() {
  const { data: tokens, loading } = useApi<FairToken[]>('/feiras/tokens');
  const [newToken, setNewToken] = useState('');
  const [validating, setValidating] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const validateToken = async () => {
    setValidating(true);
    // Simulate API call
    setTimeout(() => {
      setValidating(false);
      setNewToken('');
    }, 2000);
  };

  const totalCredentials = tokens?.reduce((sum, token) => sum + token.quantidade_credenciais, 0) || 0;
  const usedCredentials = tokens?.reduce((sum, token) => sum + token.quantidade_usada, 0) || 0;
  const availableCredentials = totalCredentials - usedCredentials;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Credenciais</h1>
          <p className="text-muted-foreground">Feira Afiliada - FEBIC 2024</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Token Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Key className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalCredentials}</p>
                <p className="text-sm text-muted-foreground">Total de Credenciais</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{usedCredentials}</p>
                <p className="text-sm text-muted-foreground">Utilizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{availableCredentials}</p>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{tokens?.filter(t => t.is_active).length || 0}</p>
                <p className="text-sm text-muted-foreground">Tokens Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Validation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Validar Credencial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Token de Credenciamento</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o token..."
                  value={newToken}
                  onChange={(e) => setNewToken(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={validateToken}
                  disabled={!newToken || validating}
                >
                  {validating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    'Validar'
                  )}
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Como funciona:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Receba o token da coordenação FEBIC</li>
                <li>Valide aqui para ativar suas credenciais</li>
                <li>Use para credenciar projetos da sua feira</li>
                <li>Acompanhe o status dos projetos enviados</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Active Tokens */}
        <Card>
          <CardHeader>
            <CardTitle>Tokens Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            {tokens && tokens.length > 0 ? (
              <div className="space-y-3">
                {tokens.map((token) => (
                  <div key={token.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium font-mono text-sm">{token.token}</p>
                      <p className="text-xs text-muted-foreground">
                        {token.quantidade_usada}/{token.quantidade_credenciais} utilizadas
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expira em: {token.expires_at}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={token.is_active ? "default" : "secondary"}>
                        {token.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum token ativo</p>
                <p className="text-sm text-muted-foreground">
                  Entre em contato com a coordenação para receber seus tokens
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Credentialed Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Projetos Credenciados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Análise da Qualidade da Água</p>
                <p className="text-sm text-muted-foreground">
                  Categoria III • Enviado via token FEBIC2024-001
                </p>
                <p className="text-xs text-muted-foreground">Enviado há 2 dias</p>
              </div>
              <Badge className="bg-success text-success-foreground">Aprovado na FEBIC</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Robótica Educacional Inclusiva</p>
                <p className="text-sm text-muted-foreground">
                  Categoria IV • Enviado via token FEBIC2024-001
                </p>
                <p className="text-xs text-muted-foreground">Enviado há 1 semana</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">Em Análise</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Sustentabilidade na Agricultura</p>
                <p className="text-sm text-muted-foreground">
                  Categoria V • Enviado via token FEBIC2024-002
                </p>
                <p className="text-xs text-muted-foreground">Enviado há 3 dias</p>
              </div>
              <Badge variant="outline">Aguardando Documentos</Badge>
            </div>
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
            <Plus className="h-8 w-8 mb-2" />
            <span>Credenciar Projeto</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <FileText className="h-8 w-8 mb-2" />
            <span>Relatório de Projetos</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <Users className="h-8 w-8 mb-2" />
            <span>Contatar Coordenação</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col py-6">
            <Calendar className="h-8 w-8 mb-2" />
            <span>Prazos Importantes</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}