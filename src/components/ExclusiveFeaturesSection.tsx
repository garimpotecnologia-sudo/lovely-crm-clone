import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  Globe, 
  Send, 
  Building2, 
  Bot, 
  BarChart3, 
  CreditCard,
  Smartphone,
  MessageCircle,
  Settings,
  Target
} from "lucide-react";

const ExclusiveFeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Múltiplos atendentes e equipes",
    },
    {
      icon: MessageSquare,
      title: "Gestão das conversas",
    },
    {
      icon: Globe,
      title: "Múltiplos canais",
    },
    {
      icon: Send,
      title: "Disparo em massa",
    },
    {
      icon: Building2,
      title: "CRM",
    },
    {
      icon: Bot,
      title: "Chatbot",
    },
    {
      icon: BarChart3,
      title: "Indicadores",
    },
    {
      icon: CreditCard,
      title: "Pagamentos",
    },
    {
      icon: Smartphone,
      title: "Mobile e Web",
    },
    {
      icon: MessageCircle,
      title: "Botão de WhatsApp na Web",
    },
    {
      icon: Settings,
      title: "API de Integração",
    },
    {
      icon: Target,
      title: "Rastreabilidade do lead",
    }
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Integration Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Integre o AgentPRO ao seu negócio
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Utilize a nossa <strong>API e Webhooks</strong> para{" "}
              <strong>conectar com as suas plataformas</strong>. Possibilitando conexão 
              com Hubspot, RD Station, Pipedrive entre outras
            </p>
            <Button 
              variant="outline"
              onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
            >
              Ver Documentação de API
            </Button>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Potencialize a sua gestão com{" "}
              <span className="gradient-text">soluções exclusivas</span> do AgentPRO
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card text-center group fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
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
      </div>
    </section>
  );
};

export default ExclusiveFeaturesSection;