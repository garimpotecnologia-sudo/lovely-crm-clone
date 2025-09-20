import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Crown, X } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl md:text-3xl font-bold mb-2">
            <span className="gradient-text">Planos</span> e Preços
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Escolha o plano ideal para sua empresa
          </p>
        </DialogHeader>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-4 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-xl border p-6 overflow-hidden ${
                plan.popular ? 'ring-2 ring-brand-magenta scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand-magenta text-white px-3 py-1 rounded-bl-xl">
                  <div className="flex items-center space-x-1">
                    <Crown className="h-3 w-3" />
                    <span className="text-xs font-semibold">Mais Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold mb-1 text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{plan.users}</p>
                <div className="mb-1">
                  <span className="text-2xl font-bold text-brand-purple">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">Taxa de ativação: {plan.activationFee}</p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full py-2 text-sm ${
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
        <div className="mt-6 bg-muted/50 rounded-lg p-4">
          <details className="cursor-pointer">
            <summary className="font-semibold text-foreground mb-3">
              Adicionais e Taxas de Ativação
            </summary>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-1">Usuários Adicionais (por mês):</h4>
                <p>• Essential: R$ 107/mês • Pro: R$ 87/mês • Plus+: R$ 57/mês • Advanced: R$ 47/mês</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Canais Adicionais (por mês):</h4>
                <p>• WhatsApp adicional: R$ 89/mês • Direct/Messenger adicional: R$ 69/mês • Integração de Pagamentos: R$ 99/mês</p>
                <p>• Automação ilimitada (chatbots, sequências, integrações): R$ 147/mês</p>
                <p>• Transcrição de áudio com IA: R$ 6,99/mês por usuário</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Ativação de Canais Extras:</h4>
                <p>• WhatsApp adicional: R$ 99 • Direct/Messenger adicional: R$ 69</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Precificação de conversas (cobradas pela Meta):</h4>
                <p>• Conversa receptiva: ilimitado</p>
                <p>• Conversa de marketing: US$ 0,0625</p>
                <p>• Conversa de utilidade: US$ 0,0068</p>
                <p className="text-xs italic">Nota: Valores cobrados pela Meta; podem variar conforme política da Meta. Cada conversa é contabilizada em janelas de 24h.</p>
              </div>
            </div>
          </details>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;