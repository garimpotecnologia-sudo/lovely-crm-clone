import type { Plan } from "./plans";

export type SignupStep = 1 | 2 | 3 | 4;

export type SignupMode = "purchase" | "trial";

export type PaymentMethod = "pix" | "credit-card";

export interface CompanyAddress {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface CompanyFormData {
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  address: CompanyAddress;
  contactPerson: ContactPerson;
}

export interface CreditCardData {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

export interface PaymentFormData {
  method: PaymentMethod;
  cpfCnpj: string;
  creditCard?: CreditCardData;
}

export interface TrialInfo {
  isActive: boolean;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  companyId: string;
  email: string;
  plan: string;
}

export interface SignupState {
  mode: SignupMode;
  currentStep: SignupStep;
  selectedPlan: Plan | null;
  companyData: CompanyFormData | null;
  paymentData: PaymentFormData | null;
  helenaCompanyId: string | null;
  helenaToken: string | null;
  asaasCustomerId: string | null;
  asaasSubscriptionId: string | null;
  pixQrCodeUrl: string | null;
  pixCopiaECola: string | null;
  loginUrl: string | null;
  loginEmail: string | null;
  isLoading: boolean;
  error: string | null;
}

export type SignupAction =
  | { type: "SET_MODE"; mode: SignupMode }
  | { type: "SET_STEP"; step: SignupStep }
  | { type: "SET_PLAN"; plan: Plan }
  | { type: "SET_COMPANY_DATA"; data: CompanyFormData }
  | { type: "SET_PAYMENT_DATA"; data: PaymentFormData }
  | { type: "SET_HELENA_COMPANY"; companyId: string }
  | { type: "SET_HELENA_TOKEN"; token: string }
  | { type: "SET_ASAAS_CUSTOMER"; customerId: string }
  | { type: "SET_ASAAS_SUBSCRIPTION"; subscriptionId: string }
  | { type: "SET_PIX_DATA"; qrCodeUrl: string; copiaECola: string }
  | { type: "SET_LOGIN_INFO"; url: string; email: string }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET" };

export const initialSignupState: SignupState = {
  mode: "purchase",
  currentStep: 1,
  selectedPlan: null,
  companyData: null,
  paymentData: null,
  helenaCompanyId: null,
  helenaToken: null,
  asaasCustomerId: null,
  asaasSubscriptionId: null,
  pixQrCodeUrl: null,
  pixCopiaECola: null,
  loginUrl: null,
  loginEmail: null,
  isLoading: false,
  error: null,
};
