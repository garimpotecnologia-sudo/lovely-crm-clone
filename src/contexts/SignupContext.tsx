import { createContext, useContext, useReducer, type ReactNode } from "react";
import {
  type SignupState,
  type SignupAction,
  initialSignupState,
} from "@/types/signup";

function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "SET_STEP":
      return { ...state, currentStep: action.step, error: null };
    case "SET_PLAN":
      return { ...state, selectedPlan: action.plan };
    case "SET_COMPANY_DATA":
      return { ...state, companyData: action.data };
    case "SET_PAYMENT_DATA":
      return { ...state, paymentData: action.data };
    case "SET_HELENA_COMPANY":
      return { ...state, helenaCompanyId: action.companyId };
    case "SET_HELENA_TOKEN":
      return { ...state, helenaToken: action.token };
    case "SET_ASAAS_CUSTOMER":
      return { ...state, asaasCustomerId: action.customerId };
    case "SET_ASAAS_SUBSCRIPTION":
      return { ...state, asaasSubscriptionId: action.subscriptionId };
    case "SET_PIX_DATA":
      return {
        ...state,
        pixQrCodeUrl: action.qrCodeUrl,
        pixCopiaECola: action.copiaECola,
      };
    case "SET_LOGIN_INFO":
      return { ...state, loginUrl: action.url, loginEmail: action.email };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_ERROR":
      return { ...state, error: action.error, isLoading: false };
    case "RESET":
      return initialSignupState;
    default:
      return state;
  }
}

interface SignupContextValue {
  state: SignupState;
  dispatch: React.Dispatch<SignupAction>;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(signupReducer, initialSignupState);

  return (
    <SignupContext.Provider value={{ state, dispatch }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignupContext() {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
}
