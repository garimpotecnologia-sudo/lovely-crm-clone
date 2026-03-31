import { Bot, Users, BookOpen, Plug, Settings, Clock, Zap } from "lucide-react";

const AIAgentsSection = () => {
  const features = [
    {
      icon: Users,
      title: "Agentes especializados por setor",
      description: "Configure agentes para recepção, triagem, pós-consulta e cobrança. Cada um atua com expertise na sua função, dentro da mesma conversa com o paciente."
    },
    {
      icon: Bot,
      title: "Triagem inteligente automatizada",
      description: "O agente supervisor identifica a intenção do paciente (agendar, remarcar, tirar dúvida, emergência) e direciona automaticamente para o fluxo correto."
    },
    {
      icon: BookOpen,
      title: "Treinado com os dados da sua clínica",
      description: "Alimente o agente com protocolos, tabelas de convênios, horários e procedimentos. As respostas são precisas e alinhadas à sua operação."
    },
    {
      icon: Plug,
      title: "Integração com sistemas de saúde",
      description: "Conecte com seu sistema de gestão, prontuário eletrônico ou ERP via API. Os fluxos garantem conversas contextuais e escaláveis."
    },
    {
      icon: Settings,
      title: "Controle total da IA",
      description: "Escolha o modelo de IA que melhor equilibra custo e qualidade para cada tipo de interação — consultas simples ou atendimentos complexos."
    },
    {
      icon: Clock,
      title: "Atendimento 24/7 para pacientes",
      description: "Seus pacientes podem agendar, confirmar e tirar dúvidas a qualquer hora. Sem espera, sem fila, com atendimento humanizado."
    },
    {
      icon: Zap,
      title: "Implantação rápida",
      description: "Configure agentes, conecte sua base de conhecimento e comece a atender em minutos — sem precisar de equipe técnica."
    }
  ];

  return (
    <section id="ai-agents" className="py-24 relative overflow-hidden">
      <div className="mesh-bg absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-purple uppercase tracking-widest mb-3">
              Inteligência Artificial
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Agentes inteligentes que{" "}
              <span className="gradient-text">entendem sua clínica</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Monte uma equipe de IA especializada no atendimento ao paciente — sem depender de programadores.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-5 stagger-children">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="feature-card group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;
