import { useEffect } from "react";
import { useSignupFlow } from "@/hooks/use-signup-flow";
import StepIndicator from "./StepIndicator";
import StepPlanSelection from "./StepPlanSelection";
import StepCompanyInfo from "./StepCompanyInfo";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";
import type { Plan } from "@/types/plans";

interface SignupFlowContentProps {
  initialPlan?: Plan | null;
  onClose: () => void;
}

const SignupFlowContent = ({
  initialPlan,
  onClose,
}: SignupFlowContentProps) => {
  const { state, selectPlan, reset } = useSignupFlow();

  useEffect(() => {
    if (initialPlan) {
      selectPlan(initialPlan);
    }
  }, [initialPlan]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <StepPlanSelection />;
      case 2:
        return <StepCompanyInfo />;
      case 3:
        return <StepPayment />;
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
        <h2 className="text-lg font-bold text-center text-foreground mb-4 tracking-tight">
          Contratar{" "}
          <span className="gradient-text">CRM AGENTPRO</span>
        </h2>
        <StepIndicator currentStep={state.currentStep} />
      </div>

      {/* Content */}
      <div className="p-6">{renderStep()}</div>
    </div>
  );
};

export default SignupFlowContent;
