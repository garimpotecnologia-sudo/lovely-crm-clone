import { Calendar, Clock, Users, Zap, HeartPulse, Shield } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Calendar,
      title: "Agendamento inteligente",
      description: "Pacientes agendam, confirmam e remarcam consultas automaticamente pelo WhatsApp, sem sobrecarregar sua recepção."
    },
    {
      icon: Clock,
      title: "Reduza faltas em até 60%",
      description: "Lembretes automáticos via WhatsApp e SMS antes da consulta. Reagendamento instantâneo em caso de cancelamento."
    },
    {
      icon: Users,
      title: "Gestão completa de pacientes",
      description: "Histórico de atendimentos, preferências e dados centralizados. Cada profissional da equipe com visão completa do paciente."
    },
    {
      icon: Zap,
      title: "Atendimento instantâneo 24/7",
      description: "Chatbots com IA respondem dúvidas sobre convênios, horários, procedimentos e encaminham para o setor correto automaticamente."
    },
    {
      icon: HeartPulse,
      title: "Pós-consulta automatizado",
      description: "Follow-up automático, pesquisa de satisfação e lembretes de retorno. Fidelize pacientes sem esforço manual."
    },
    {
      icon: Shield,
      title: "Segurança e LGPD",
      description: "Dados de pacientes protegidos com criptografia. Em total conformidade com a LGPD e normas do setor de saúde."
    }
  ];

  const stats = [
    { value: "2.800+", label: "Clínicas atendidas" },
    { value: "20M+", label: "Pacientes impactados" },
    { value: "-60%", label: "Redução de faltas" },
    { value: "24/7", label: "Atendimento ao paciente" }
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
            Para sua clínica
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Tudo que sua clínica precisa{" "}
            <span className="gradient-text">em uma plataforma</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Do agendamento ao pós-consulta, automatize e humanize o atendimento ao paciente
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
