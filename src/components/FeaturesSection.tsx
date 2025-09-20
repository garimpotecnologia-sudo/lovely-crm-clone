import { Button } from "@/components/ui/button";
import { Users, Bot, BarChart3, Target } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Centralize atendimentos",
      description: "WhatsApp, Instagram e Messenger em uma única tela"
    },
    {
      icon: Bot,
      title: "Automatize rotinas",
      description: "Chatbot inteligente qualifica leads 24/7"
    },
    {
      icon: Target,
      title: "Acompanhe etapas",
      description: "Pipeline visual para gerenciar seu funil de vendas"
    },
    {
      icon: BarChart3,
      title: "Mensure resultados",
      description: "Relatórios precisos de performance e conversão"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <span className="gradient-text">Funcionalidades</span> Principais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seus atendimentos
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
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