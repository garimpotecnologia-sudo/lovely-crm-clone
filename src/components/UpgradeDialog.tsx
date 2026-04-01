import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Copy,
  Check,
  QrCode,
  CreditCard,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  creditCardPaymentSchema,
  type CreditCardPaymentValues,
} from "@/schemas/payment";
import {
  formatCPFCNPJ,
  formatCardNumber,
  formatCardExpiry,
  stripMask,
} from "@/lib/masks";
import { getTrialInfo, clearTrialInfo } from "@/lib/trial";
import { upgradeTrialAccount } from "@/services/upgrade";
import { useToast } from "@/hooks/use-toast";

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type UpgradeStep = "payment" | "pix-waiting" | "success";

const UpgradeDialog = ({ isOpen, onClose }: UpgradeDialogProps) => {
  const trial = getTrialInfo();
  const { toast } = useToast();
  const [step, setStep] = useState<UpgradeStep>("payment");
  const [isLoading, setIsLoading] = useState(false);
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixCopiaECola, setPixCopiaECola] = useState<string | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardForm = useForm<CreditCardPaymentValues>({
    resolver: zodResolver(creditCardPaymentSchema),
    defaultValues: {
      method: "credit-card",
      cpfCnpj: "",
      cardNumber: "",
      cardHolder: "",
      cardExpiry: "",
      cardCvv: "",
    },
  });

  if (!trial) return null;

  const planPrices: Record<string, string> = {
    Essential: "R$ 487",
    Pro: "R$ 687",
    "Plus+": "R$ 987",
    Advanced: "R$ 1.487",
  };

  const handlePixPayment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await upgradeTrialAccount({
        companyId: trial.companyId,
        paymentMethod: "pix",
      });
      if (result.pixQrCode) {
        setPixQrCode(result.pixQrCode);
        setPixCopiaECola(result.pixCopiaECola);
        setStep("pix-waiting");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao gerar PIX");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPayment = async (data: CreditCardPaymentValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const [expiryMonth, expiryYear] = data.cardExpiry.split("/");
      const result = await upgradeTrialAccount({
        companyId: trial.companyId,
        paymentMethod: "credit-card",
        creditCard: {
          holderName: data.cardHolder,
          number: stripMask(data.cardNumber),
          expiryMonth,
          expiryYear: `20${expiryYear}`,
          ccv: data.cardCvv,
        },
        creditCardHolderInfo: {
          name: data.cardHolder,
          email: trial.email,
          cpfCnpj: stripMask(data.cpfCnpj),
          phone: "",
        },
      });

      if (
        result.paymentStatus === "CONFIRMED" ||
        result.paymentStatus === "RECEIVED"
      ) {
        clearTrialInfo();
        setStep("success");
      }
    } catch (err: any) {
      setError(err.message || "Erro no pagamento");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPix = async () => {
    setIsLoading(true);
    try {
      const result = await upgradeTrialAccount({
        companyId: trial.companyId,
        paymentMethod: "pix",
      });
      if (
        result.paymentStatus === "CONFIRMED" ||
        result.paymentStatus === "RECEIVED"
      ) {
        clearTrialInfo();
        setStep("success");
      } else {
        toast({ title: "Pagamento ainda não confirmado. Tente novamente em instantes." });
      }
    } catch {
      toast({ title: "Erro ao verificar. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const copyPixCode = async () => {
    if (pixCopiaECola) {
      await navigator.clipboard.writeText(pixCopiaECola);
      setPixCopied(true);
      toast({ title: "Código PIX copiado!" });
      setTimeout(() => setPixCopied(false), 3000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">Ativar Plano CRM AGENTPRO</DialogTitle>

        <div className="flex flex-col">
          {/* Header */}
          <div className="border-b border-border/50 px-6 pt-6 pb-4 bg-gradient-to-b from-muted/30 to-transparent">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-brand-purple" />
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                Ativar Plano <span className="gradient-text">{trial.plan}</span>
              </h2>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {planPrices[trial.plan] || "R$ 687"}/mês · Sem taxa de ativação no upgrade do trial
            </p>
          </div>

          <div className="p-6">
            {/* Payment Step */}
            {step === "payment" && (
              <div className="space-y-5">
                <Tabs defaultValue="pix">
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

                  <TabsContent value="pix" className="space-y-4 mt-4">
                    <div className="text-center bg-muted/50 rounded-xl p-6">
                      <QrCode className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Pague com PIX e seu plano será ativado imediatamente
                      </p>
                    </div>
                    <Button
                      className="w-full hero-button py-3"
                      onClick={handlePixPayment}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <><Loader2 className="h-4 w-4 animate-spin mr-2" />Gerando PIX...</>
                      ) : (
                        "Gerar QR Code PIX"
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="credit-card" className="mt-4">
                    <form onSubmit={cardForm.handleSubmit(handleCardPayment)} className="space-y-4">
                      <div>
                        <Label>CPF / CNPJ do titular *</Label>
                        <Input
                          placeholder="000.000.000-00"
                          {...cardForm.register("cpfCnpj")}
                          onChange={(e) => cardForm.setValue("cpfCnpj", formatCPFCNPJ(e.target.value), { shouldValidate: true })}
                        />
                        {cardForm.formState.errors.cpfCnpj && (
                          <p className="text-xs text-destructive mt-1">{cardForm.formState.errors.cpfCnpj.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Número do cartão *</Label>
                        <Input
                          placeholder="0000 0000 0000 0000"
                          {...cardForm.register("cardNumber")}
                          onChange={(e) => cardForm.setValue("cardNumber", formatCardNumber(e.target.value), { shouldValidate: true })}
                        />
                        {cardForm.formState.errors.cardNumber && (
                          <p className="text-xs text-destructive mt-1">{cardForm.formState.errors.cardNumber.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Nome do titular *</Label>
                        <Input placeholder="Nome como no cartão" {...cardForm.register("cardHolder")} />
                        {cardForm.formState.errors.cardHolder && (
                          <p className="text-xs text-destructive mt-1">{cardForm.formState.errors.cardHolder.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Validade *</Label>
                          <Input
                            placeholder="MM/AA"
                            {...cardForm.register("cardExpiry")}
                            onChange={(e) => cardForm.setValue("cardExpiry", formatCardExpiry(e.target.value), { shouldValidate: true })}
                          />
                          {cardForm.formState.errors.cardExpiry && (
                            <p className="text-xs text-destructive mt-1">{cardForm.formState.errors.cardExpiry.message}</p>
                          )}
                        </div>
                        <div>
                          <Label>CVV *</Label>
                          <Input placeholder="123" maxLength={4} {...cardForm.register("cardCvv")} />
                          {cardForm.formState.errors.cardCvv && (
                            <p className="text-xs text-destructive mt-1">{cardForm.formState.errors.cardCvv.message}</p>
                          )}
                        </div>
                      </div>
                      <Button type="submit" className="w-full hero-button py-3" disabled={isLoading}>
                        {isLoading ? (
                          <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processando...</>
                        ) : (
                          `Pagar ${planPrices[trial.plan] || "R$ 687"}`
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {error && (
                  <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3">{error}</div>
                )}
              </div>
            )}

            {/* PIX Waiting Step */}
            {step === "pix-waiting" && (
              <div className="space-y-4 text-center">
                {pixQrCode && (
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-card">
                      <img src={pixQrCode} alt="QR Code PIX" className="w-48 h-48" />
                    </div>
                  </div>
                )}

                {pixCopiaECola && (
                  <div className="space-y-2">
                    <Label className="text-xs">PIX Copia e Cola</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={pixCopiaECola} className="text-xs font-mono" />
                      <Button variant="outline" size="icon" onClick={copyPixCode} className="flex-shrink-0">
                        {pixCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}

                <Button className="w-full hero-button" onClick={handleVerifyPix} disabled={isLoading}>
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" />Verificando...</>
                  ) : (
                    "Verificar Pagamento"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  Após pagar, clique em "Verificar Pagamento"
                </p>
              </div>
            )}

            {/* Success Step */}
            {step === "success" && (
              <div className="text-center space-y-5 py-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-500/20 animate-[pulse-ring_1.5s_ease-out_infinite]" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-[bounceIn_0.6s_ease-out]">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-foreground">Plano ativado!</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Seu plano {trial.plan} está ativo. Aproveite o CRM AGENTPRO!
                  </p>
                </div>

                <div className="space-y-3 max-w-xs mx-auto">
                  <Button
                    className="w-full hero-button py-3 gap-2"
                    onClick={() => window.open("https://agentprocrm.com.br", "_blank")}
                  >
                    Acessar meu CRM
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
