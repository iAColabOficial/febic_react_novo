
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award, 
  Users, 
  BookOpen, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  Microscope,
  Trophy,
  Calendar
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Submissão de Projetos",
      description: "Plataforma intuitiva para submissão e gestão de projetos científicos"
    },
    {
      icon: Users,
      title: "Gestão de Equipes",
      description: "Organize equipes com orientadores, coorientadores e autores"
    },
    {
      icon: Target,
      title: "Sistema de Avaliação",
      description: "Process de avaliação transparente e criterioso"
    },
    {
      icon: Award,
      title: "Premiação",
      description: "Reconhecimento e premiação dos melhores projetos"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Projetos Submetidos" },
    { number: "5,000+", label: "Estudantes Participantes" },
    { number: "500+", label: "Escolas Participantes" },
    { number: "15", label: "Estados Representados" }
  ];

  const timeline = [
    { phase: "Submissão", date: "Jan - Mar", status: "active" },
    { phase: "Avaliação", date: "Abr - Mai", status: "upcoming" },
    { phase: "Seleção", date: "Jun", status: "upcoming" },
    { phase: "Apresentação", date: "Jul - Ago", status: "upcoming" },
    { phase: "Premiação", date: "Set", status: "upcoming" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FEBIC</h1>
                <p className="text-sm text-gray-600">Feira Brasileira de Iniciação Científica</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#sobre" className="text-gray-600 hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#cronograma" className="text-gray-600 hover:text-blue-600 transition-colors">Cronograma</a>
              <a href="#contato" className="text-gray-600 hover:text-blue-600 transition-colors">Contato</a>
              <Link to="/login">
                <Button>Acessar Plataforma</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Promovendo a 
            <span className="text-blue-600"> Iniciação Científica</span> no Brasil
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A FEBIC é a maior feira de iniciação científica do país, conectando estudantes, 
            orientadores e avaliadores em uma plataforma única para o desenvolvimento da ciência brasileira.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="flex items-center gap-2">
                Começar Agora <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Plataforma Completa de Gestão
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde a submissão até a premiação, nossa plataforma oferece todas as ferramentas 
              necessárias para uma experiência completa na feira de ciências.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="cronograma" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Cronograma 2024
            </h3>
            <p className="text-gray-600">
              Acompanhe as fases da feira e não perca os prazos importantes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center justify-between mb-8">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-blue-600"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 ml-auto'}`}>
                    <Card className={`${item.status === 'active' ? 'border-blue-500 bg-blue-50' : ''}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {item.status === 'active' && <Calendar className="h-4 w-4 text-blue-600" />}
                          {item.phase}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 font-medium">{item.date}</p>
                        {item.status === 'active' && (
                          <div className="flex items-center gap-1 mt-2 text-blue-600 text-sm">
                            <CheckCircle className="h-3 w-3" />
                            Em andamento
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Pronto para Participar da FEBIC 2024?
            </h3>
            <p className="text-blue-100 text-lg mb-8">
              Junte-se a milhares de estudantes e pesquisadores que já fazem parte 
              da maior feira de iniciação científica do Brasil.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" />
                  Submeter Projeto
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Trophy className="h-5 w-5 mr-2" />
                Ver Projetos Premiados
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-xl font-bold">FEBIC</span>
              </div>
              <p className="text-gray-400 text-sm">
                Promovendo a iniciação científica e desenvolvendo o futuro da pesquisa no Brasil.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><a href="#" className="hover:text-white">Submissão</a></li>
                <li><a href="#" className="hover:text-white">Avaliação</a></li>
                <li><a href="#" className="hover:text-white">Resultados</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Documentação</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contato@febic.com.br</li>
                <li>(11) 1234-5678</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FEBIC - Feira Brasileira de Iniciação Científica. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
