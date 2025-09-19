import { Button } from "@/components/ui/button";
import { Users, Bot, BarChart3, Target } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Centralize o atendimento",
      description: "Tenha **visibilidade de toda a sua operação**, supervisione seus atendentes e equipes, **integrando os seus canais de comunicação.**"
    },
    {
      icon: Bot,
      title: "Automatize na medida certa",
      description: "Garanta **respostas 24 horas por dia, 7 dias por semana**. Crie fluxos de respostas automáticas, **ofereça informações** relevantes antes de um atendimento humano."
    },
    {
      icon: Target,
      title: "Acompanhe cada etapa",
      description: "Saiba em qual **etapa da jornada** o seu cliente ou lead está, **resolva problemas de forma ágil**, crie Kanbans e funis conforme a sua necessidade, **sempre atrelado às conversas**"
    },
    {
      icon: BarChart3,
      title: "Mensure a sua operação",
      description: "Tenha **todas as métricas necessárias** para gerir a sua operação, saiba a performance de times, departamentos e atendentes. Além de **garantir rastreabilidade das suas conversões**"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Transforme o WhatsApp da sua empresa em uma{" "}
              <span className="gradient-text">ferramenta poderosa</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Garanta rápida resposta dos seus leads, filtrando por ordem de entrada e segmentando por vendedor. 
              Utilize nossa solução de campanhas para enviar mensagens em massa, enviando promoções e novos produtos.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card group fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: feature.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
            >
              Falar com um especialista!
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="hero-button"
            onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
          >
            Quero essas funcionalidades!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;