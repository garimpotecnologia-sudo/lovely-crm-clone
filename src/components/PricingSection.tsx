import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Crown } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Essencial",
      price: "R$ 97",
      period: "/mês",
      description: "Perfeito para pequenas empresas",
      features: [
        "Até 3 atendentes",
        "WhatsApp Business API",
        "Chat em tempo real",
        "Relatórios básicos",
        "Suporte via chat",
        "Integração básica CRM"
      ],
      buttonText: "Quero este plano",
      popular: false
    },
    {
      name: "Profissional",
      price: "R$ 197",
      period: "/mês",
      description: "Mais escolhido pelos nossos clientes",
      features: [
        "Até 10 atendentes",
        "WhatsApp + Instagram + Messenger",
        "Chatbot inteligente",
        "Relatórios avançados",
        "Suporte prioritário 24/7",
        "Integração completa CRM",
        "Automações personalizadas",
        "Dashboard executivo"
      ],
      buttonText: "Quero este plano",
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 397",
      period: "/mês",
      description: "Solução completa para grandes empresas",
      features: [
        "Atendentes ilimitados",
        "Todas as integrações",
        "IA personalizada",
        "Relatórios customizados",
        "Gerente de sucesso dedicado",
        "API personalizada",
        "White label disponível",
        "Onboarding VIP"
      ],
      buttonText: "Quero este plano",
      popular: false
    }
  ];

  const handlePlanClick = (planName: string) => {
    const message = `oi, quero contratar o plano ${planName} do CRM. Pode me explicar mais sobre?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5547984147016?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="precos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Escolha o <span className="gradient-text">Plano Ideal</span> para sua Empresa
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comece hoje mesmo e transforme seu atendimento. Todos os planos incluem teste grátis de 14 dias!
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`feature-card relative overflow-hidden ${
                  plan.popular ? 'ring-2 ring-brand-magenta scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-brand-magenta text-white px-6 py-2 rounded-bl-2xl">
                    <div className="flex items-center space-x-1">
                      <Crown className="h-4 w-4" />
                      <span className="text-sm font-semibold">Mais Popular</span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-brand-purple">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
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

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Não sabe qual plano escolher? Fale conosco e encontraremos a melhor solução!
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20preciso%20de%20ajuda%20para%20escolher%20o%20plano%20ideal.%20Podem%20me%20orientar%3F", "_blank")}
            >
              Falar com Consultor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;