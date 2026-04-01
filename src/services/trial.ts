import { IS_MOCK_MODE } from "./config";
import type { CompanyFormData } from "@/types/signup";

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";

interface CreateTrialResponse {
  success: boolean;
  companyId: string;
  token: string;
  asaasCustomerId: string;
  asaasSubscriptionId: string;
  trialEndDate: string;
  loginUrl: string;
  loginEmail: string;
}

export async function createTrialAccount(
  data: CompanyFormData,
  planName: string
): Promise<CreateTrialResponse> {
  if (IS_MOCK_MODE) {
    // Mock mode - simulate the response
    await new Promise((r) => setTimeout(r, 1500));
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 7);

    return {
      success: true,
      companyId: "mock_" + Math.random().toString(36).slice(2, 10),
      token: "pn_mock_" + Math.random().toString(36).slice(2, 18),
      asaasCustomerId: "cus_mock_" + Math.random().toString(36).slice(2, 10),
      asaasSubscriptionId: "sub_mock_" + Math.random().toString(36).slice(2, 10),
      trialEndDate: trialEnd.toISOString(),
      loginUrl: "https://app.agentpro.com.br",
      loginEmail: data.contactPerson.email,
    };
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-trial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      companyName: data.name,
      cpfCnpj: data.cpfCnpj,
      email: data.email,
      phone: data.phone,
      contactName: data.contactPerson.name,
      contactEmail: data.contactPerson.email,
      contactPhone: data.contactPerson.phone,
      contactRole: data.contactPerson.role,
      plan: planName,
      address: data.address,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao criar trial");
  }

  return response.json();
}
