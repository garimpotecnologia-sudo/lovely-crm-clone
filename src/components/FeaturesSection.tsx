import { MessageSquare, Zap, BarChart3, Target } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Centralize atendimentos",
      description: "Todos os canais em uma única plataforma integrada",
      accent: "from-violet-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Automatize rotinas",
      description: "Respostas automáticas e fluxos inteligentes",
      accent: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: BarChart3,
      title: "Acompanhe etapas",
      description: "Visualize o funil de vendas em tempo real",
      accent: "from-purple-500 to-indigo-600",
    },
    {
      icon: Target,
      title: "Mensure resultados",
      description: "Relatórios detalhados de performance",
      accent: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <section id="funcionalidades" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-purple uppercase tracking-widest mb-3">
              Funcionalidades
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">
              Tudo que você precisa para{" "}
              <span className="gradient-text">gerenciar atendimentos</span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card text-center group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.accent} rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
