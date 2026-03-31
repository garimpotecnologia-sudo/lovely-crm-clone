import { z } from "zod";
import { isValidCPFCNPJ } from "@/lib/validators";
import { stripMask } from "@/lib/masks";

export const companyFormSchema = z.object({
  name: z.string().min(3, "Nome da empresa deve ter pelo menos 3 caracteres"),
  cpfCnpj: z
    .string()
    .min(1, "CPF ou CNPJ obrigatório")
    .refine((val) => isValidCPFCNPJ(val), "CPF ou CNPJ inválido"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone obrigatório")
    .refine(
      (val) => {
        const digits = stripMask(val);
        return digits.length >= 10 && digits.length <= 11;
      },
      "Telefone inválido"
    ),
  address: z.object({
    zipCode: z
      .string()
      .min(1, "CEP obrigatório")
      .refine(
        (val) => stripMask(val).length === 8,
        "CEP deve ter 8 dígitos"
      ),
    street: z.string().min(1, "Rua obrigatória"),
    number: z.string().min(1, "Número obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
    state: z
      .string()
      .length(2, "Estado deve ter 2 letras")
      .toUpperCase(),
  }),
  contactPerson: z.object({
    name: z.string().min(3, "Nome do contato deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail do contato inválido"),
    phone: z
      .string()
      .min(1, "Telefone do contato obrigatório")
      .refine(
        (val) => {
          const digits = stripMask(val);
          return digits.length >= 10 && digits.length <= 11;
        },
        "Telefone inválido"
      ),
    role: z.string().min(1, "Cargo obrigatório"),
  }),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
