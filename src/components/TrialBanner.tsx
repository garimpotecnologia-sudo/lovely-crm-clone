import { useState, useEffect } from "react";
import { X, Clock, AlertTriangle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrialInfo } from "@/lib/trial";
import type { TrialInfo } from "@/types/signup";

interface TrialBannerProps {
  onUpgrade: () => void;
}

const TrialBanner = ({ onUpgrade }: TrialBannerProps) => {
  const [trial, setTrial] = useState<TrialInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const info = getTrialInfo();
    setTrial(info);
  }, []);

  if (!trial || dismissed) return null;

  const isExpired = !trial.isActive;
  const isUrgent = trial.daysRemaining <= 2;

  if (isExpired) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-pulse" />
              <p className="text-sm font-medium truncate">
                <strong>Seu trial expirou!</strong> Para continuar usando o CRM AGENTPRO, ative seu plano {trial.plan}.
              </p>
            </div>
            <Button
              size="sm"
              onClick={onUpgrade}
              className="bg-white text-red-600 hover:bg-white/90 font-bold flex-shrink-0 gap-1.5"
            >
              <CreditCard className="h-3.5 w-3.5" />
              Ativar Plano
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] shadow-sm transition-colors ${
        isUrgent
          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
          : "bg-gradient-to-r from-brand-purple to-brand-magenta text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm font-medium truncate">
              {isUrgent ? (
                <>
                  <strong>Seu trial expira {trial.daysRemaining === 0 ? "hoje" : trial.daysRemaining === 1 ? "amanhã" : `em ${trial.daysRemaining} dias`}!</strong>
                  {" "}Ative seu plano para não perder acesso.
                </>
              ) : (
                <>
                  <strong>Trial grátis:</strong> {trial.daysRemaining} dias restantes no plano {trial.plan}
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              onClick={onUpgrade}
              className={`font-semibold gap-1.5 ${
                isUrgent
                  ? "bg-white text-amber-600 hover:bg-white/90"
                  : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              Contratar
            </Button>
            {!isUrgent && (
              <button
                onClick={() => setDismissed(true)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBanner;
