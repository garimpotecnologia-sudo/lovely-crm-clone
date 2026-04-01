import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";

interface CreateAccountResponse {
  success: boolean;
  companyId: string;
  token: string;
  asaasCustomerId: string;
  loginUrl: string;
  loginEmail: string;
}

export async function createAccount(data: {
  companyName: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  plan: string;
  planPrice: number;
  activationFee: number;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}): Promise<CreateAccountResponse> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao criar conta");
  }

  return response.json();
}
