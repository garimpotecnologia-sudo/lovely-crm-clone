import { CheckCircle2, TrendingUp, Clock, Users, Zap, Shield } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumente suas vendas com IA",
      description: "Com nossa Inteligência Artificial comercial, você identifica leads quentes, responde automaticamente e converte mais clientes."
    },
    {
      icon: Clock,
      title: "Automatize tarefas repetitivas",
      description: "Tarefas manuais? Deixe que a IA cuide de atendimentos, follow-ups e integração com seu ERP. Ganhe eficiência total."
    },
    {
      icon: Users,
      title: "Organize sua operação com integração ERP",
      description: "Centralize atendimento, distribua tarefas e monitore resultados em tempo real dentro do seu sistema empresarial."
    },
    {
      icon: Zap,
      title: "Respostas instantâneas",
      description: "Chatbots com IA generativa entendem a intenção e respondem de forma natural 24/7."
    },
    {
      icon: CheckCircle2,
      title: "Ecossistema integrado",
      description: "WhatsApp, Instagram, Facebook e ERP conectados em um painel unificado. Tudo sincronizado, sem falhas."
    },
    {
      icon: Shield,
      title: "Segurança e confiabilidade",
      description: "Criptografia ponta a ponta + backups automáticos. Seus dados sempre protegidos no AgentPRO."
    }
  ];

  const stats = [
    { value: "2.800+", label: "Empresas atendidas" },
    { value: "20M+", label: "Mensagens trocadas" },
    { value: "+70%", label: "Atendimentos automatizados por IA" },
    { value: "24/7", label: "Suporte disponível" }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-primary rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Porque escolher a nossa empresa
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
      </div>
    </section>
  );
};

export default BenefitsSection;
