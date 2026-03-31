import type { Plan } from "@/types/plans";

interface OrderSummaryProps {
  plan: Plan;
  showActivation?: boolean;
}

const OrderSummary = ({ plan, showActivation = true }: OrderSummaryProps) => {
  const firstPayment = plan.price + plan.activationFee;

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
      <h4 className="font-semibold text-foreground text-sm">Resumo do Pedido</h4>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Plano {plan.name}</span>
          <span className="font-medium text-foreground">
            {plan.priceFormatted}/mês
          </span>
        </div>

        {showActivation && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa de ativação</span>
            <span className="font-medium text-foreground">
              {plan.activationFeeFormatted}
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-3">
        {showActivation && (
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-foreground">
              1º pagamento
            </span>
            <span className="font-bold text-brand-purple">
              R$ {firstPayment.toLocaleString("pt-BR")}
            </span>
          </div>
        )}
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">
            {showActivation ? "Após o 1º mês" : "Mensalidade"}
          </span>
          <span className="text-muted-foreground">
            {plan.priceFormatted}/mês
          </span>
        </div>
      </div>

      <div className="bg-brand-purple/5 rounded-lg p-3 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground">{plan.users}</strong> inclusos
          {" · "}
          {plan.channels}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
