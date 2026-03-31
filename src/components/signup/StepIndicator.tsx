import { Check } from "lucide-react";
import type { SignupStep } from "@/types/signup";

interface StepIndicatorProps {
  currentStep: SignupStep;
}

const steps = [
  { number: 1, label: "Plano" },
  { number: 2, label: "Dados" },
  { number: 3, label: "Pagamento" },
  { number: 4, label: "Confirmação" },
] as const;

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center w-full px-2 py-3">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-500
                  ${
                    isCompleted
                      ? "bg-green-500 text-white scale-90"
                      : isActive
                      ? "bg-brand-purple text-white shadow-[0_0_0_4px_hsl(285_99%_35%/0.15)]"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span
                className={`
                  mt-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors
                  ${
                    isActive
                      ? "text-brand-purple"
                      : isCompleted
                      ? "text-green-500"
                      : "text-muted-foreground/60"
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="relative w-10 sm:w-16 h-0.5 mx-1.5">
                <div className="absolute inset-0 bg-muted rounded-full" />
                <div
                  className="absolute inset-y-0 left-0 bg-green-500 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: currentStep > step.number ? "100%" : "0%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
