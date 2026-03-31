import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, ChevronDown } from "lucide-react";
import { PLANS, type Plan } from "@/types/plans";

interface PricingSectionProps {
  onOpenPricing: () => void;
  onSelectPlan: (plan: Plan) => void;
}

const PricingSection = ({ onOpenPricing, onSelectPlan }: PricingSectionProps) => {
  const handlePlanClick = (planId: string) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (plan) {
      onSelectPlan(plan);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      <div className="mesh-bg absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-purple uppercase tracking-widest mb-3">
              Preços
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">
              <span className="gradient-text">Planos</span> para cada fase do seu negócio
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Escolha o plano ideal e comece a transformar seu atendimento hoje
            </p>
            <button
              onClick={onOpenPricing}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple hover:text-brand-magenta transition-colors"
            >
              Ver tabela completa de funcionalidades
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto mb-12 stagger-children">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-all duration-500 border overflow-hidden group ${
                  plan.popular
                    ? "bg-gradient-to-b from-brand-purple to-brand-purple/90 text-white border-brand-purple/50 shadow-xl shadow-brand-purple/10 lg:scale-[1.04]"
                    : "bg-card border-border/50 hover:border-brand-purple/20"
                }`}
                style={{
                  boxShadow: plan.popular
                    ? undefined
                    : "var(--shadow-card)",
                }}
              >
                {/* Popular glow */}
                {plan.popular && (
                  <>
                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Crown className="h-3.5 w-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-wide">
                        Popular
                      </span>
                    </div>
                  </>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      plan.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs mb-1 ${
                      plan.popular ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {plan.users} · {plan.channels}
                  </p>

                  <div className="mt-4 mb-1">
                    <span
                      className={`text-4xl font-extrabold tracking-tight ${
                        plan.popular ? "text-white" : "text-foreground"
                      }`}
                    >
                      {plan.priceFormatted}
                    </span>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] ${
                      plan.popular ? "text-white/50" : "text-muted-foreground/60"
                    }`}
                  >
                    Ativação: {plan.activationFeeFormatted}
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full py-2.5 mb-5 font-semibold ${
                    plan.popular
                      ? "bg-white text-brand-purple hover:bg-white/90"
                      : "bg-brand-purple text-white hover:bg-brand-purple/90"
                  }`}
                  onClick={() => handlePlanClick(plan.id)}
                >
                  {plan.buttonText}
                </Button>

                {/* Features */}
                <div className="space-y-2">
                  {plan.allFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2"
                    >
                      {feature.included ? (
                        <CheckCircle
                          className={`h-4 w-4 flex-shrink-0 ${
                            plan.popular ? "text-green-300" : "text-green-500"
                          }`}
                        />
                      ) : (
                        <span
                          className={`w-4 h-4 flex items-center justify-center flex-shrink-0 text-[10px] ${
                            plan.popular
                              ? "text-white/30"
                              : "text-muted-foreground/40"
                          }`}
                        >
                          —
                        </span>
                      )}
                      <span
                        className={`text-xs ${
                          feature.included
                            ? plan.popular
                              ? "text-white/80"
                              : "text-foreground/70"
                            : plan.popular
                            ? "text-white/30"
                            : "text-muted-foreground/40"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Compare button */}
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={onOpenPricing}
              className="px-8 py-5 h-auto font-semibold text-base border-brand-purple/20 hover:border-brand-purple/40 hover:bg-brand-purple/5"
            >
              Comparar todos os planos
            </Button>
          </div>

          {/* Adicionais */}
          <div className="mt-10">
            <details className="feature-card cursor-pointer">
              <summary className="font-semibold text-foreground flex items-center gap-2">
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform [details[open]_&]:rotate-180" />
                Adicionais e Taxas de Ativação
              </summary>
              <div className="space-y-4 text-sm text-muted-foreground mt-4 pt-4 border-t border-border/50">
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Usuários Adicionais:
                  </h4>
                  <p>
                    Essential: R$ 107/mês · Pro: R$ 87/mês · Plus+: R$ 57/mês
                    · Advanced: R$ 47/mês
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Canais Adicionais:
                  </h4>
                  <p>
                    WhatsApp: R$ 89/mês · Direct/Messenger: R$ 69/mês ·
                    Pagamentos: R$ 99/mês
                  </p>
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
