// Helena CRM API Response Types

export interface HelenaCompanyResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

export interface HelenaActivateResponse {
  id: string;
  status: "active";
}

export interface HelenaTokenResponse {
  token: string;
  expiresAt: string | null;
}

export interface HelenaAgentResponse {
  id: string;
  name: string;
  email: string;
}

// Asaas Payment API Response Types

export interface AsaasCustomerResponse {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
}

export interface AsaasSubscriptionResponse {
  id: string;
  status: string;
  nextDueDate: string;
  value: number;
  billingType: string;
}

export interface AsaasPaymentResponse {
  id: string;
  status: "PENDING" | "CONFIRMED" | "RECEIVED" | "OVERDUE" | "REFUNDED";
  value: number;
  invoiceUrl: string;
  pixQrCode?: string;
  pixCopiaECola?: string;
  creditCard?: {
    creditCardNumber: string;
    creditCardBrand: string;
  };
}
