import { CheckCircle2, TrendingUp, Clock, Users, Zap, Shield } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal-dark.png";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumente suas vendas em até 300%",
      description: "Nunca mais perca uma oportunidade. Atenda mais rápido, qualifique melhor e feche mais negócios."
    },
    {
      icon: Clock,
      title: "Economize 15 horas por semana",
      description: "Automatize tarefas repetitivas e foque no que realmente importa: vender e crescer."
    },
    {
      icon: Users,
      title: "Organize toda sua equipe",
      description: "Gerencie atendimentos, distribua leads e acompanhe a performance em tempo real."
    },
    {
      icon: Zap,
      title: "Resposta em segundos",
      description: "Chatbots inteligentes que atendem 24/7 e qualificam leads automaticamente."
    },
    {
      icon: CheckCircle2,
      title: "Integração completa",
      description: "Conecte com suas ferramentas favoritas: Make, N8N, Instagram, Facebook e mais."
    },
    {
      icon: Shield,
      title: "Dados seguros e protegidos",
      description: "Criptografia de ponta a ponta e backup automático. Seus dados sempre seguros."
    }
  ];

  const stats = [
    { value: "500+", label: "Empresas atendidas" },
    { value: "1M+", label: "Mensagens enviadas/mês" },
    { value: "98%", label: "Satisfação dos clientes" },
    { value: "24/7", label: "Suporte disponível" }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Por que escolher o
            <br />
            <img src={logoHorizontal} alt="AgentPRO" className="h-16 md:h-20 mx-auto mt-4" />?
          </h2>
          <p className="text-xl text-muted-foreground">
            Mais do que um CRM, uma plataforma completa para transformar seu atendimento
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-8">Empresas que confiam no AgentPRO</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold">Empresa A</div>
            <div className="text-2xl font-bold">Empresa B</div>
            <div className="text-2xl font-bold">Empresa C</div>
            <div className="text-2xl font-bold">Empresa D</div>
            <div className="text-2xl font-bold">Empresa E</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
