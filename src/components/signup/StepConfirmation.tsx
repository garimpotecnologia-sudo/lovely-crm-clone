import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Mail, Shield, Clock } from "lucide-react";
import { useSignupFlow } from "@/hooks/use-signup-flow";

const StepConfirmation = () => {
  const { state, reset } = useSignupFlow();
  const isTrial = state.mode === "trial";

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7);

  return (
    <div className="text-center space-y-6 px-1 py-4">
      {/* Success Animation */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-500/20 animate-[pulse-ring_1.5s_ease-out_infinite]" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-[bounceIn_0.6s_ease-out]">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
          {isTrial ? "Trial ativado com sucesso!" : "Conta criada com sucesso!"}
        </h3>
        <p className="text-muted-foreground mt-2">
          {isTrial
            ? "Aproveite 7 dias grátis do CRM AGENTPRO"
            : "Seu CRM AGENTPRO está pronto para uso"}
        </p>
      </div>

      {/* Trial Badge */}
      {isTrial && (
        <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5">
          <Clock className="h-5 w-5 text-amber-500" />
          <div className="text-left">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
              Trial válido até {trialEndDate.toLocaleDateString("pt-BR")}
            </p>
            <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
              Após o período, será necessário escolher um plano para continuar
            </p>
          </div>
        </div>
      )}

      {/* Account Details Card */}
      <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 text-left space-y-4 max-w-md mx-auto">
        <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-brand-purple" />
          Dados de Acesso
        </h4>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-1.5 border-b border-border/30">
            <span className="text-muted-foreground">Plano</span>
            <span className="font-semibold text-foreground">
              {state.selectedPlan?.name}
              {isTrial && (
                <span className="ml-1.5 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
                  TRIAL
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 border-b border-border/30">
            <span className="text-muted-foreground">E-mail de acesso</span>
            <span className="font-medium text-foreground text-xs">
              {state.loginEmail}
            </span>
          </div>

          {isTrial ? (
            <div className="flex justify-between items-center py-1.5 border-b border-border/30">
              <span className="text-muted-foreground">Trial expira em</span>
              <span className="font-medium text-amber-600">
                {trialEndDate.toLocaleDateString("pt-BR")}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center py-1.5 border-b border-border/30">
              <span className="text-muted-foreground">Próx. cobrança</span>
              <span className="font-medium text-foreground">
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-1.5">
            <span className="text-muted-foreground">
              {isTrial ? "Valor após trial" : "Valor mensal"}
            </span>
            <span className="font-bold text-brand-purple">
              {state.selectedPlan?.priceFormatted}/mês
            </span>
          </div>
        </div>
      </div>

      {/* Email Notification */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3 max-w-md mx-auto">
        <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <span>
          Enviamos os dados de acesso para{" "}
          <strong className="text-foreground">{state.loginEmail}</strong>
        </span>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 max-w-sm mx-auto pt-2">
        <Button
          className="w-full hero-button py-3 gap-2 text-base"
          onClick={() => {
            if (state.loginUrl) {
              window.open(state.loginUrl, "_blank");
            }
          }}
        >
          Acessar meu CRM
          <ExternalLink className="h-4 w-4" />
        </Button>

        <Button variant="outline" className="w-full" onClick={reset}>
          Voltar ao site
        </Button>
      </div>
    </div>
  );
};

export default StepConfirmation;
