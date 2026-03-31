import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Copy, Check, QrCode, CreditCard } from "lucide-react";
import { useSignupFlow } from "@/hooks/use-signup-flow";
import {
  creditCardPaymentSchema,
  type CreditCardPaymentValues,
} from "@/schemas/payment";
import OrderSummary from "./OrderSummary";
import {
  formatCPFCNPJ,
  formatCardNumber,
  formatCardExpiry,
} from "@/lib/masks";
import { useToast } from "@/hooks/use-toast";

const StepPayment = () => {
  const { state, processPayment, checkPixPayment, goToStep } = useSignupFlow();
  const { toast } = useToast();
  const [pixCopied, setPixCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"pix" | "credit-card">("pix");

  const cardForm = useForm<CreditCardPaymentValues>({
    resolver: zodResolver(creditCardPaymentSchema),
    defaultValues: {
      method: "credit-card",
      cpfCnpj: state.companyData?.cpfCnpj || "",
      cardNumber: "",
      cardHolder: "",
      cardExpiry: "",
      cardCvv: "",
    },
  });

  const handlePixPayment = () => {
    processPayment({
      method: "pix",
      cpfCnpj: state.companyData?.cpfCnpj || "",
    });
  };

  const handleCardSubmit = (data: CreditCardPaymentValues) => {
    processPayment({
      method: "credit-card",
      cpfCnpj: data.cpfCnpj,
      creditCard: {
        number: data.cardNumber,
        holder: data.cardHolder,
        expiry: data.cardExpiry,
        cvv: data.cardCvv,
      },
    });
  };

  const copyPixCode = async () => {
    if (state.pixCopiaECola) {
      await navigator.clipboard.writeText(state.pixCopiaECola);
      setPixCopied(true);
      toast({ title: "Código PIX copiado!" });
      setTimeout(() => setPixCopied(false), 3000);
    }
  };

  const showPixQrCode = state.pixQrCodeUrl && state.pixCopiaECola;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-1">
      <div className="flex-1 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">Pagamento</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Escolha a forma de pagamento
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "pix" | "credit-card")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pix" className="gap-2">
              <QrCode className="h-4 w-4" />
              PIX
            </TabsTrigger>
            <TabsTrigger value="credit-card" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Cartão
            </TabsTrigger>
          </TabsList>

          {/* PIX Tab */}
          <TabsContent value="pix" className="space-y-4 mt-4">
            {!showPixQrCode ? (
              <div className="text-center space-y-4">
                <div className="bg-muted/50 rounded-xl p-6">
                  <QrCode className="h-16 w-16 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Clique abaixo para gerar o QR Code PIX
                  </p>
                </div>
                <Button
                  className="w-full hero-button py-3"
                  onClick={handlePixPayment}
                  disabled={state.isLoading}
                >
                  {state.isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Gerando PIX...
                    </>
                  ) : (
                    "Gerar QR Code PIX"
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-xl shadow-card">
                    <img
                      src={state.pixQrCodeUrl!}
                      alt="QR Code PIX"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                {/* Copy and Paste */}
                <div className="space-y-2">
                  <Label className="text-xs">PIX Copia e Cola</Label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={state.pixCopiaECola || ""}
                      className="text-xs font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyPixCode}
                      className="flex-shrink-0"
                    >
                      {pixCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Check Payment */}
                <Button
                  className="w-full hero-button"
                  onClick={checkPixPayment}
                  disabled={state.isLoading}
                >
                  {state.isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Verificando pagamento...
                    </>
                  ) : (
                    "Verificar Pagamento"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Após realizar o pagamento, clique em "Verificar Pagamento"
                </p>
              </div>
            )}
          </TabsContent>

          {/* Credit Card Tab */}
          <TabsContent value="credit-card" className="mt-4">
            <form
              onSubmit={cardForm.handleSubmit(handleCardSubmit)}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="cardCpfCnpj">CPF / CNPJ do titular *</Label>
                <Input
                  id="cardCpfCnpj"
                  placeholder="000.000.000-00"
                  {...cardForm.register("cpfCnpj")}
                  onChange={(e) => {
                    const formatted = formatCPFCNPJ(e.target.value);
                    cardForm.setValue("cpfCnpj", formatted, {
                      shouldValidate: true,
                    });
                  }}
                />
                {cardForm.formState.errors.cpfCnpj && (
                  <p className="text-xs text-destructive mt-1">
                    {cardForm.formState.errors.cpfCnpj.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cardNumber">Número do cartão *</Label>
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  {...cardForm.register("cardNumber")}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    cardForm.setValue("cardNumber", formatted, {
                      shouldValidate: true,
                    });
                  }}
                />
                {cardForm.formState.errors.cardNumber && (
                  <p className="text-xs text-destructive mt-1">
                    {cardForm.formState.errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cardHolder">Nome do titular *</Label>
                <Input
                  id="cardHolder"
                  placeholder="Nome como no cartão"
                  {...cardForm.register("cardHolder")}
                />
                {cardForm.formState.errors.cardHolder && (
                  <p className="text-xs text-destructive mt-1">
                    {cardForm.formState.errors.cardHolder.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="cardExpiry">Validade *</Label>
                  <Input
                    id="cardExpiry"
                    placeholder="MM/AA"
                    {...cardForm.register("cardExpiry")}
                    onChange={(e) => {
                      const formatted = formatCardExpiry(e.target.value);
                      cardForm.setValue("cardExpiry", formatted, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {cardForm.formState.errors.cardExpiry && (
                    <p className="text-xs text-destructive mt-1">
                      {cardForm.formState.errors.cardExpiry.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardCvv">CVV *</Label>
                  <Input
                    id="cardCvv"
                    placeholder="123"
                    maxLength={4}
                    {...cardForm.register("cardCvv")}
                  />
                  {cardForm.formState.errors.cardCvv && (
                    <p className="text-xs text-destructive mt-1">
                      {cardForm.formState.errors.cardCvv.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full hero-button py-3"
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processando pagamento...
                  </>
                ) : (
                  `Pagar R$ ${(
                    (state.selectedPlan?.price || 0) +
                    (state.selectedPlan?.activationFee || 0)
                  ).toLocaleString("pt-BR")}`
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {state.error && (
          <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3">
            {state.error}
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => goToStep(2)}
          disabled={state.isLoading}
        >
          Voltar
        </Button>
      </div>

      {/* Order Summary - desktop sidebar */}
      {state.selectedPlan && (
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-4">
            <OrderSummary plan={state.selectedPlan} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPayment;
