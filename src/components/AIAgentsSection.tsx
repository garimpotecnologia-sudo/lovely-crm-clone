import { Bot, Users, BookOpen, Plug, Settings, Clock, Zap } from "lucide-react";

const AIAgentsSection = () => {
  const features = [
    {
      icon: Users,
      title: "Colabore com agentes especializados",
      description: "Conecte múltiplos agentes, cada um com uma função específica (venda, suporte, qualificação de leads etc.), e deixe que eles atuem em conjunto dentro da mesma conversa."
    },
    {
      icon: Bot,
      title: "Supervisão automática de conversas",
      description: "Um agente supervisor monitora em tempo real, identifica a intenção e redireciona para o agente ideal. Isso eleva a precisão e reduz erros (ou 'alucinações' de IA)."
    },
    {
      icon: BookOpen,
      title: "Treinamento com seu conteúdo real",
      description: "Use sua base (manuais, catálogos, FAQs) para treinar os agentes e garantir respostas alinhadas à sua marca e à sua oferta."
    },
    {
      icon: Plug,
      title: "Integração sem esforço",
      description: "Conecte com seus sistemas via API ou importe sua base de conhecimento direto na plataforma. Fluxos contextuais garantem conversas inteligentes e escaláveis."
    },
    {
      icon: Settings,
      title: "Você no controle das LLMs",
      description: "Escolha ou experimente a LLM que melhor balanceia custo e performance — sem depender exclusivamente da nossa infraestrutura."
    },
    {
      icon: Clock,
      title: "Atendimento 24/7 com contexto real",
      description: "Com fluxos e base conectada, automatize o atendimento sem perder contexto, com precisão e personalização alinhadas à jornada do cliente."
    },
    {
      icon: Zap,
      title: "Comece rápido, evolua sempre",
      description: "Configure agentes, conecte conhecimento e ative atendimentos inteligentes em minutos — dentro do seu CRM."
    }
  ];

  return (
    <section id="ai-agents" className="py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              Agentes inteligentes nativos no seu CRM
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Monte uma equipe de IA dentro do seu CRM – sem depender de programadores.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;
