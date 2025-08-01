
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Download,
  RefreshCw,
  CreditCard,
  FileText
} from 'lucide-react';

export function FinancialDashboard() {
  const financialMetrics = [
    {
      title: "Receita Total",
      value: "R$ 485.750",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Pagamentos Confirmados",
      value: "847",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: CheckCircle
    },
    {
      title: "Pendências",
      value: "R$ 45.200",
      change: "-3.1%",
      changeType: "negative" as const,
      icon: AlertTriangle
    },
    {
      title: "Taxa de Inadimplência",
      value: "5.2%",
      change: "-1.8%",
      changeType: "positive" as const,
      icon: TrendingUp
    }
  ];

  const paymentStatus = [
    {
      project: "Análise da Qualidade da Água",
      author: "João Silva",
      amount: "R$ 150,00",
      status: "paid",
      date: "2024-03-10",
      method: "PIX"
    },
    {
      project: "Impacto das Redes Sociais",
      author: "Ana Costa",
      amount: "R$ 150,00",
      status: "pending",
      date: "2024-03-15",
      method: "Boleto"
    },
    {
      project: "Desenvolvimento de App",
      author: "Carlos Lima",
      amount: "R$ 150,00",
      status: "overdue",
      date: "2024-03-05",
      method: "Cartão"
    },
    {
      project: "Estudo sobre Sustentabilidade",
      author: "Maria Santos",
      amount: "Isento",
      status: "exempt",
      date: "-",
      method: "Isenção"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'default';
      case 'overdue': return 'destructive';
      case 'exempt': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'overdue': return 'Vencido';
      case 'exempt': return 'Isento';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Financeiro</h1>
          <p className="text-gray-600">Controle financeiro da FEBIC 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className={`h-3 w-3 mr-1 ${
                  metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-xs font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Control Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Controle de Pagamentos
              </CardTitle>
              <CardDescription>
                Status dos pagamentos por projeto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentStatus.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{payment.project}</h4>
                      <p className="text-xs text-gray-600">{payment.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(payment.status) as any}>
                          {getStatusText(payment.status)}
                        </Badge>
                        <span className="text-xs text-gray-500">{payment.method}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{payment.amount}</div>
                      {payment.date !== '-' && (
                        <div className="text-xs text-gray-500">{payment.date}</div>
                      )}
                    </div>
                    <div className="ml-4">
                      {payment.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          Cobrar
                        </Button>
                      )}
                      {payment.status === 'overdue' && (
                        <Button size="sm" variant="destructive">
                          Urgente
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Financeiras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Gerar Cobrança
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Relatório Mensal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Inadimplentes
              </Button>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total de Projetos</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pagamentos Confirmados</span>
                <span className="font-semibold text-green-600">847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pendentes</span>
                <span className="font-semibold text-orange-600">325</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Vencidos</span>
                <span className="font-semibold text-red-600">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Isenções</span>
                <span className="font-semibold text-blue-600">30</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
