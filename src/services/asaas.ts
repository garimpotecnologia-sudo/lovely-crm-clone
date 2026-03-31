import { IS_MOCK_MODE } from "./config";
import { asaasApi } from "./api-client";
import {
  mockCreateCustomer,
  mockCreateSubscription,
  mockGetPaymentDetails,
} from "./mock-data";
import type {
  AsaasCustomerResponse,
  AsaasSubscriptionResponse,
  AsaasPaymentResponse,
} from "@/types/api";
import type { PaymentMethod } from "@/types/signup";

const ASAAS_TOKEN = import.meta.env.VITE_ASAAS_TOKEN || "";

export async function createCustomer(data: {
  name: string;
  email: string;
  cpfCnpj: string;
  phone?: string;
}): Promise<AsaasCustomerResponse> {
  if (IS_MOCK_MODE) {
    return mockCreateCustomer(data.name, data.email, data.cpfCnpj);
  }
  return asaasApi.post<AsaasCustomerResponse>(
    "/customers",
    data,
    ASAAS_TOKEN
  );
}

export async function createSubscription(data: {
  customer: string;
  billingType: "PIX" | "CREDIT_CARD";
  value: number;
  nextDueDate: string;
  description: string;
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
}): Promise<AsaasSubscriptionResponse> {
  if (IS_MOCK_MODE) {
    return mockCreateSubscription(data.value, data.billingType);
  }
  return asaasApi.post<AsaasSubscriptionResponse>(
    "/subscriptions",
    {
      ...data,
      cycle: "MONTHLY",
    },
    ASAAS_TOKEN
  );
}

export async function getPaymentDetails(
  paymentId: string,
  method: PaymentMethod
): Promise<AsaasPaymentResponse> {
  if (IS_MOCK_MODE) {
    return mockGetPaymentDetails(paymentId, method);
  }
  return asaasApi.get<AsaasPaymentResponse>(
    `/payments/${paymentId}`,
    ASAAS_TOKEN
  );
}
