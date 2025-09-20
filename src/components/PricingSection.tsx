import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Crown } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Essential",
      users: "3 usuários",
      price: "R$ 487",
      period: "/mês",
      activationFee: "R$ 1.090,00",
      features: [
        "3 usuários inclusos",
        "WhatsApp Business API",
        "Dashboard básico",
        "Suporte por chat",
        "Relatórios básicos"
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
      features: [
        "5 usuários inclusos",
        "WhatsApp + Instagram + Messenger",
        "Automações avançadas",
        "Suporte prioritário",
        "Relatórios completos"
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
      features: [
        "10 usuários inclusos",
        "Todas as integrações",
        "IA personalizada",
        "Onboarding dedicado",
        "API customizada"
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
      features: [
        "20 usuários inclusos",
        "Funcionalidades ilimitadas",
        "Gerente de sucesso",
        "Suporte 24/7",
        "Treinamentos exclusivos"
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <span className="gradient-text">Planos</span> e Preços
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para sua empresa
            </p>
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
                  <p className="text-sm text-muted-foreground mb-3">{plan.users}</p>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-brand-purple">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Taxa de ativação: {plan.activationFee}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
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