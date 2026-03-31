import { z } from "zod";
import { isValidCPFCNPJ } from "@/lib/validators";
import { stripMask } from "@/lib/masks";

const baseSchema = z.object({
  cpfCnpj: z
    .string()
    .min(1, "CPF ou CNPJ obrigatório")
    .refine((val) => isValidCPFCNPJ(val), "CPF ou CNPJ inválido"),
});

export const pixPaymentSchema = baseSchema.extend({
  method: z.literal("pix"),
});

export const creditCardPaymentSchema = baseSchema.extend({
  method: z.literal("credit-card"),
  cardNumber: z
    .string()
    .min(1, "Número do cartão obrigatório")
    .refine(
      (val) => stripMask(val).length === 16,
      "Número do cartão deve ter 16 dígitos"
    ),
  cardHolder: z
    .string()
    .min(3, "Nome do titular deve ter pelo menos 3 caracteres"),
  cardExpiry: z
    .string()
    .min(1, "Validade obrigatória")
    .regex(/^\d{2}\/\d{2}$/, "Formato inválido (MM/AA)")
    .refine((val) => {
      const [month, year] = val.split("/").map(Number);
      if (month < 1 || month > 12) return false;
      const now = new Date();
      const expiry = new Date(2000 + year, month);
      return expiry > now;
    }, "Cartão expirado"),
  cardCvv: z
    .string()
    .min(3, "CVV obrigatório")
    .max(4, "CVV deve ter 3 ou 4 dígitos")
    .regex(/^\d{3,4}$/, "CVV inválido"),
});

export const paymentFormSchema = z.discriminatedUnion("method", [
  pixPaymentSchema,
  creditCardPaymentSchema,
]);

export type PixPaymentValues = z.infer<typeof pixPaymentSchema>;
export type CreditCardPaymentValues = z.infer<typeof creditCardPaymentSchema>;
export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
