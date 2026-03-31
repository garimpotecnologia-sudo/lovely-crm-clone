import { CheckCircle2, TrendingUp, Clock, Users, Zap, Shield } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumente suas vendas com IA",
      description: "Identifique leads quentes, responda automaticamente e converta mais clientes com nossa IA comercial."
    },
    {
      icon: Clock,
      title: "Automatize tarefas repetitivas",
      description: "Deixe a IA cuidar de atendimentos, follow-ups e integração com seu ERP. Ganhe eficiência total."
    },
    {
      icon: Users,
      title: "Organize sua operação",
      description: "Centralize atendimento, distribua tarefas e monitore resultados em tempo real."
    },
    {
      icon: Zap,
      title: "Respostas instantâneas",
      description: "Chatbots com IA generativa entendem a intenção e respondem de forma natural 24/7."
    },
    {
      icon: CheckCircle2,
      title: "Ecossistema integrado",
      description: "WhatsApp, Instagram, Facebook e ERP conectados em um painel unificado."
    },
    {
      icon: Shield,
      title: "Segurança e confiabilidade",
      description: "Criptografia ponta a ponta + backups automáticos. Seus dados sempre protegidos."
    }
  ];

  const stats = [
    { value: "2.800+", label: "Empresas atendidas" },
    { value: "20M+", label: "Mensagens trocadas" },
    { value: "+70%", label: "Atendimentos automatizados" },
    { value: "24/7", label: "Suporte disponível" }
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      <div className="mesh-bg absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-purple uppercase tracking-widest mb-3">
            Por que o AgentPRO
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Mais do que um CRM,{" "}
            <span className="gradient-text">uma plataforma completa</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transforme seu atendimento e acelere resultados
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto stagger-children">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="feature-card group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <benefit.icon className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
