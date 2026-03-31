import { MessageSquare, CalendarCheck, BarChart3, UserCheck } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Centralize canais",
      description: "WhatsApp, Instagram e telefone do paciente em um só lugar",
      accent: "from-violet-500 to-purple-600",
    },
    {
      icon: CalendarCheck,
      title: "Agende com IA",
      description: "Agendamento, confirmação e reagendamento automáticos",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      icon: UserCheck,
      title: "Acompanhe pacientes",
      description: "Jornada completa do paciente no funil de atendimento",
      accent: "from-purple-500 to-indigo-600",
    },
    {
      icon: BarChart3,
      title: "Relatórios clínicos",
      description: "Métricas de atendimento, taxa de faltas e satisfação",
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
              CRM especializado para{" "}
              <span className="gradient-text">o setor de saúde</span>
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
