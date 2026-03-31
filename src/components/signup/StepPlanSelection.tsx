import { Button } from "@/components/ui/button";
import { CheckCircle, Crown } from "lucide-react";
import { useSignupFlow } from "@/hooks/use-signup-flow";
import { PLANS } from "@/types/plans";

const StepPlanSelection = () => {
  const { state, selectPlan, goToStep } = useSignupFlow();
  const selectedPlan = state.selectedPlan;

  return (
    <div className="space-y-6 px-1">
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground">
          Escolha seu plano
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Selecione o plano ideal para sua empresa
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;

          return (
            <button
              key={plan.id}
              onClick={() => selectPlan(plan)}
              className={`
                relative text-left p-4 rounded-xl border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-brand-purple bg-brand-purple/5 shadow-elegant"
                    : "border-border hover:border-brand-purple/40 hover:bg-muted/50"
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 right-3 bg-brand-magenta text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  <span className="text-[10px] font-semibold">Popular</span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-foreground">{plan.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {plan.users} · {plan.channels}
                  </p>
                </div>
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      isSelected
                        ? "border-brand-purple bg-brand-purple"
                        : "border-muted-foreground/30"
                    }
                  `}
                >
                  {isSelected && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl font-bold text-brand-purple">
                  {plan.priceFormatted}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground mt-1">
                Ativação: {plan.activationFeeFormatted}
              </p>

              <div className="mt-3 space-y-1">
                {plan.allFeatures
                  .filter((f) => f.included)
                  .slice(0, 4)
                  .map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      {feature.name}
                    </div>
                  ))}
                {plan.allFeatures.filter((f) => f.included).length > 4 && (
                  <p className="text-[11px] text-brand-purple font-medium">
                    +
                    {plan.allFeatures.filter((f) => f.included).length - 4}{" "}
                    recursos
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        className="w-full hero-button py-3"
        onClick={() => goToStep(2)}
        disabled={!selectedPlan}
      >
        Continuar
      </Button>
    </div>
  );
};

export default StepPlanSelection;
