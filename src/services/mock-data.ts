import type {
  HelenaCompanyResponse,
  HelenaActivateResponse,
  HelenaTokenResponse,
  HelenaAgentResponse,
  AsaasCustomerResponse,
  AsaasSubscriptionResponse,
  AsaasPaymentResponse,
} from "@/types/api";

function randomDelay(): Promise<void> {
  const ms = 800 + Math.random() * 700;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(): string {
  return "mock_" + Math.random().toString(36).substring(2, 15);
}

// Helena CRM Mocks

export async function mockCreateCompany(
  name: string
): Promise<HelenaCompanyResponse> {
  await randomDelay();
  return {
    id: generateId(),
    name,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export async function mockActivateCompany(
  companyId: string
): Promise<HelenaActivateResponse> {
  await randomDelay();
  return {
    id: companyId,
    status: "active",
  };
}

export async function mockCreateToken(
  _companyId: string
): Promise<HelenaTokenResponse> {
  await randomDelay();
  return {
    token: "pn_" + Math.random().toString(36).substring(2, 24),
    expiresAt: null,
  };
}

export async function mockCreateAgent(
  name: string,
  email: string
): Promise<HelenaAgentResponse> {
  await randomDelay();
  return {
    id: generateId(),
    name,
    email,
  };
}

// Asaas Payment Mocks

export async function mockCreateCustomer(
  name: string,
  email: string,
  cpfCnpj: string
): Promise<AsaasCustomerResponse> {
  await randomDelay();
  return {
    id: "cus_" + generateId(),
    name,
    email,
    cpfCnpj,
  };
}

export async function mockCreateSubscription(
  value: number,
  billingType: string
): Promise<AsaasSubscriptionResponse> {
  await randomDelay();
  const nextDueDate = new Date();
  nextDueDate.setMonth(nextDueDate.getMonth() + 1);
  return {
    id: "sub_" + generateId(),
    status: billingType === "CREDIT_CARD" ? "ACTIVE" : "PENDING",
    nextDueDate: nextDueDate.toISOString().split("T")[0],
    value,
    billingType,
  };
}

let pixPollCount = 0;

export async function mockGetPaymentDetails(
  _paymentId: string,
  billingType: "pix" | "credit-card"
): Promise<AsaasPaymentResponse> {
  await randomDelay();

  if (billingType === "credit-card") {
    return {
      id: "pay_" + generateId(),
      status: "CONFIRMED",
      value: 0,
      invoiceUrl: "https://www.asaas.com/i/mock-invoice",
      creditCard: {
        creditCardNumber: "****1234",
        creditCardBrand: "VISA",
      },
    };
  }

  // PIX: simulate confirmation after 3 polls
  pixPollCount++;
  const isConfirmed = pixPollCount >= 3;
  if (isConfirmed) pixPollCount = 0;

  return {
    id: "pay_" + generateId(),
    status: isConfirmed ? "CONFIRMED" : "PENDING",
    value: 0,
    invoiceUrl: "https://www.asaas.com/i/mock-invoice",
    pixQrCode:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iOTAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
    pixCopiaECola:
      "00020126580014br.gov.bcb.pix0136mock-pix-key-agentpro-crm-payment520400005303986540510.005802BR5925CRM AGENTPRO6009SAO PAULO62070503***6304MOCK",
  };
}

export function resetPixPollCount(): void {
  pixPollCount = 0;
}
