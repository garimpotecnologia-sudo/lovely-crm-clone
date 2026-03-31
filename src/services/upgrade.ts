import { IS_MOCK_MODE } from "./config";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

interface UpgradeResponse {
  success: boolean;
  paymentStatus: "PENDING" | "CONFIRMED" | "RECEIVED";
  pixQrCode: string | null;
  pixCopiaECola: string | null;
  plan: string;
}

export async function upgradeTrialAccount(data: {
  companyId: string;
  paymentMethod: "pix" | "credit-card";
  creditCard?: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
  };
}): Promise<UpgradeResponse> {
  if (IS_MOCK_MODE) {
    await new Promise((r) => setTimeout(r, 1500));

    if (data.paymentMethod === "pix") {
      return {
        success: true,
        paymentStatus: "PENDING",
        pixQrCode:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iOTAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
        pixCopiaECola:
          "00020126580014br.gov.bcb.pix0136upgrade-key-agentpro520400005303986540510.005802BR5925CRM AGENTPRO6304UPGR",
        plan: "Pro",
      };
    }

    return {
      success: true,
      paymentStatus: "CONFIRMED",
      pixQrCode: null,
      pixCopiaECola: null,
      plan: "Pro",
    };
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/upgrade-trial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao processar upgrade");
  }

  return response.json();
}
