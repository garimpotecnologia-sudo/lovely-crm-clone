import { useEffect } from "react";
import { useSignupFlow } from "@/hooks/use-signup-flow";
import StepIndicator from "./StepIndicator";
import StepPlanSelection from "./StepPlanSelection";
import StepCompanyInfo from "./StepCompanyInfo";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";
import type { Plan } from "@/types/plans";
import type { SignupMode } from "@/types/signup";

interface SignupFlowContentProps {
  initialPlan?: Plan | null;
  onClose: () => void;
  mode?: SignupMode;
}

const SignupFlowContent = ({
  initialPlan,
  onClose,
  mode = "purchase",
}: SignupFlowContentProps) => {
  const { state, selectPlan, setMode, reset } = useSignupFlow();

  useEffect(() => {
    setMode(mode);
    if (initialPlan) {
      selectPlan(initialPlan);
    }
  }, [initialPlan, mode]);

  const isTrial = state.mode === "trial";

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <StepPlanSelection />;
      case 2:
        return <StepCompanyInfo />;
      case 3:
        // In trial mode, step 3 is skipped (handled by hook)
        // But if somehow rendered, show payment
        return isTrial ? <StepConfirmation /> : <StepPayment />;
      case 4:
        return <StepConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 px-6 pt-6 pb-2 bg-gradient-to-b from-muted/30 to-transparent">
        {isTrial && (
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Trial Grátis · 7 dias
            </span>
          </div>
        )}
        <h2 className="text-lg font-bold text-center text-foreground mb-4 tracking-tight">
          {isTrial ? (
            <>Testar <span className="gradient-text">CRM AGENTPRO</span> Grátis</>
          ) : (
            <>Contratar <span className="gradient-text">CRM AGENTPRO</span></>
          )}
        </h2>
        <StepIndicator currentStep={state.currentStep} />
      </div>

      {/* Content */}
      <div className="p-6">{renderStep()}</div>
    </div>
  );
};

export default SignupFlowContent;
