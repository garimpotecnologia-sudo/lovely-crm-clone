import { Users, MessageSquare, Building2, Trophy, Clock, Shield } from "lucide-react";

const AuthoritySection = () => {
  const stats = [
    {
      icon: Building2,
      number: "+300",
      label: "Empresas Atendidas",
      description: "Confiaram em nossa solução"
    },
    {
      icon: MessageSquare,
      number: "+100k",
      label: "Atendimentos Gerenciados",
      description: "Mensagens processadas mensalmente"
    },
    {
      icon: Users,
      number: "+2k",
      label: "Usuários Ativos",
      description: "Profissionais usando diariamente"
    },
    {
      icon: Trophy,
      number: "98%",
      label: "Taxa de Satisfação",
      description: "Clientes recomendam nossa solução"
    }
  ];

  const differentials = [
    {
      icon: Shield,
      title: "API Oficial WhatsApp",
      description: "Única plataforma com certificação oficial, sem risco de bloqueio"
    },
    {
      icon: Clock,
      title: "Suporte 24/7",
      description: "Equipe especializada disponível a qualquer momento"
    },
    {
      icon: Users,
      title: "Onboarding Gratuito",
      description: "Configuração completa sem custos adicionais"
    }
  ];

  return (
    <section className="py-20 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Por que escolher o <span className="text-brand-magenta">AgentPRO</span>?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Números que comprovam nossa excelência e diferenciais únicos no mercado
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                  <stat.icon className="h-12 w-12 text-brand-magenta mx-auto mb-4" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold mb-2">{stat.label}</div>
                  <div className="text-white/80 text-sm">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Differentials */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Diferenciais Exclusivos
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {differentials.map((diff, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <diff.icon className="h-8 w-8 text-brand-magenta" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{diff.title}</h4>
                  <p className="text-white/90">{diff.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <div className="font-bold">Certificado WhatsApp</div>
                <div className="text-white/80 text-sm">Business Solution Provider</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="font-bold">Líder de Mercado</div>
                <div className="text-white/80 text-sm">CRM mais usado no Brasil</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="h-8 w-8 text-blue-400" />
              <div>
                <div className="font-bold">5 Anos no Mercado</div>
                <div className="text-white/80 text-sm">Experiência comprovada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;