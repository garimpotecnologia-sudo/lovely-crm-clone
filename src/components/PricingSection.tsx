import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Crown, X } from "lucide-react";

interface PricingSectionProps {
  onOpenPricing: () => void;
}

const PricingSection = ({ onOpenPricing }: PricingSectionProps) => {
  const plans = [
    {
      name: "Essential",
      users: "3 usuários",
      price: "R$ 487",
      period: "/mês",
      activationFee: "R$ 1.090,00",
      channels: "WhatsApp",
      allFeatures: [
        { name: "Central de Atendimento básica", included: true },
        { name: "2 Chatbots de Atendimento", included: true },
        { name: "1 Chatbot de Automação", included: true },
        { name: "10 Etiquetas", included: true },
        { name: "Relatórios básicos", included: true },
        { name: "Funis (Kanban)", included: false },
        { name: "Campos Personalizados", included: false },
        { name: "Disparo em Massa", included: false },
        { name: "Webhook", included: false },
        { name: "API", included: false },
        { name: "Make e N8N", included: false }
      ],
      buttonText: "Quero este plano",
      popular: false
    },
    {
      name: "Pro",
      users: "5 usuários",
      price: "R$ 687",
      period: "/mês",
      activationFee: "R$ 1.490,00",
      channels: "WhatsApp + Instagram + Messenger",
      allFeatures: [
        { name: "Central de Atendimento completa", included: true },
        { name: "3 Chatbots de Atendimento", included: true },
        { name: "2 Chatbots de Automação", included: true },
        { name: "Etiquetas ilimitadas", included: true },
        { name: "2 Funis (Kanban)", included: true },
        { name: "Campos Personalizados ilimitados", included: true },
        { name: "Disparo de Campanhas", included: true },
        { name: "Webhook", included: false },
        { name: "API", included: false },
        { name: "Make e N8N", included: false }
      ],
      buttonText: "Quero este plano",
      popular: true
    },
    {
      name: "Plus+",
      users: "10 usuários", 
      price: "R$ 987",
      period: "/mês",
      activationFee: "R$ 1.990,00",
      channels: "Todos os canais",
      allFeatures: [
        { name: "Central de Atendimento completa", included: true },
        { name: "5 Chatbots de Atendimento", included: true },
        { name: "3 Chatbots de Automação", included: true },
        { name: "5 Funis (Kanban)", included: true },
        { name: "Campos Personalizados ilimitados", included: true },
        { name: "Disparo de Campanhas", included: true },
        { name: "Webhook", included: true },
        { name: "API", included: true },
        { name: "Make e N8N", included: true },
        { name: "Carteiras de Cliente", included: true }
      ],
      buttonText: "Quero este plano",
      popular: false
    },
    {
      name: "Advanced",
      users: "20 usuários",
      price: "R$ 1.487", 
      period: "/mês",
      activationFee: "R$ 2.499,00",
      channels: "Todos os canais",
      allFeatures: [
        { name: "Central de Atendimento completa", included: true },
        { name: "10 Chatbots de Atendimento", included: true },
        { name: "4 Chatbots de Automação", included: true },
        { name: "10 Funis (Kanban)", included: true },
        { name: "Campos Personalizados ilimitados", included: true },
        { name: "Disparo de Campanhas", included: true },
        { name: "Webhook", included: true },
        { name: "API", included: true },
        { name: "Make e N8N", included: true },
        { name: "Carteiras de Cliente", included: true },
        { name: "Gerente de sucesso dedicado", included: true },
        { name: "Suporte prioritário 24/7", included: true }
      ],
      buttonText: "Quero este plano",
      popular: false
    }
  ];

  const handlePlanClick = (planName: string) => {
    const message = `Olá! Cliquei no plano ${planName} na seção de preços do site. Quero saber mais sobre este plano e como contratar!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5547984147016?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="precos" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <span className="gradient-text">Planos</span> e Preços
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Escolha o plano ideal para sua empresa
            </p>
            <Button 
              variant="outline" 
              onClick={onOpenPricing}
              className="mb-8"
            >
              Ver Tabela Completa de Funcionalidades
            </Button>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`feature-card relative overflow-hidden ${
                  plan.popular ? 'ring-2 ring-brand-magenta scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-brand-magenta text-white px-4 py-2 rounded-bl-xl">
                    <div className="flex items-center space-x-1">
                      <Crown className="h-4 w-4" />
                      <span className="text-sm font-semibold">Mais Popular</span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{plan.users}</p>
                  <p className="text-xs text-brand-purple font-medium mb-3">{plan.channels}</p>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-brand-purple">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Taxa de ativação: {plan.activationFee}</p>
                </div>

                {/* All Features */}
                <div className="space-y-2 mb-4">
                  {plan.allFeatures.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      {feature.included ? (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'hero-button' 
                      : 'bg-brand-purple text-white hover:bg-brand-purple/90'
                  }`}
                  onClick={() => handlePlanClick(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>

          {/* Adicionais */}
          <div className="mt-8">
            <details className="feature-card">
              <summary className="cursor-pointer font-semibold text-foreground mb-4">
                Adicionais e Taxas de Ativação
              </summary>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Usuários Adicionais (por mês):</h4>
                  <p>• Essential: R$ 107/mês • Pro: R$ 87/mês • Plus+: R$ 57/mês • Advanced: R$ 47/mês</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Canais Adicionais (por mês):</h4>
                  <p>• WhatsApp adicional: R$ 89/mês • Direct/Messenger adicional: R$ 69/mês • Integração de Pagamentos: R$ 99/mês</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Ativação de Canais Extras:</h4>
                  <p>• WhatsApp adicional: R$ 99 • Direct/Messenger adicional: R$ 69</p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;