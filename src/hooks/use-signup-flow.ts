import { useMutation } from "@tanstack/react-query";
import { useSignupContext } from "@/contexts/SignupContext";
import { createAccount } from "@/services/account";
import { createTrialAccount } from "@/services/trial";
import { upgradeTrialAccount } from "@/services/upgrade";
import { stripMask } from "@/lib/masks";
import { saveTrialInfo } from "@/lib/trial";
import type { Plan } from "@/types/plans";
import type { CompanyFormData, PaymentFormData, SignupMode } from "@/types/signup";

export function useSignupFlow() {
  const { state, dispatch } = useSignupContext();

  const setMode = (mode: SignupMode) => {
    dispatch({ type: "SET_MODE", mode });
  };

  const selectPlan = (plan: Plan) => {
    dispatch({ type: "SET_PLAN", plan });
  };

  const goToStep = (step: 1 | 2 | 3 | 4) => {
    dispatch({ type: "SET_STEP", step });
  };

  // Step 2 → creates company via Edge Function, then goes to step 3 (purchase) or step 4 (trial)
  const companyMutation = useMutation({
    mutationFn: async (data: CompanyFormData & { mode: SignupMode; plan: Plan }) => {
      dispatch({ type: "SET_LOADING", isLoading: true });

      if (data.mode === "trial") {
        // Trial: create account + Asaas subscription with 7-day delay via Edge Function
        const result = await createTrialAccount(data, data.plan.name);
        dispatch({ type: "SET_HELENA_COMPANY", companyId: result.companyId });
        dispatch({ type: "SET_HELENA_TOKEN", token: result.token });
        dispatch({ type: "SET_ASAAS_CUSTOMER", customerId: result.asaasCustomerId });
        dispatch({ type: "SET_ASAAS_SUBSCRIPTION", subscriptionId: result.asaasSubscriptionId });

        saveTrialInfo({
          isActive: true,
          startDate: new Date().toISOString(),
          endDate: result.trialEndDate,
          daysRemaining: 7,
          companyId: result.companyId,
          email: result.loginEmail,
          plan: data.plan.name,
        });

        dispatch({
          type: "SET_LOGIN_INFO",
          url: result.loginUrl,
          email: result.loginEmail,
        });

        return { goToStep: 4 as const };
      } else {
        // Purchase: create company + Asaas customer via Edge Function, then go to payment
        const result = await createAccount({
          companyName: data.name,
          cpfCnpj: stripMask(data.cpfCnpj),
          email: data.email,
          phone: stripMask(data.phone),
          contactName: data.contactPerson.name,
          contactEmail: data.contactPerson.email,
          contactPhone: stripMask(data.contactPerson.phone),
          contactRole: data.contactPerson.role,
          plan: data.plan.name,
          planPrice: data.plan.price,
          activationFee: data.plan.activationFee,
          address: data.address,
        });

        dispatch({ type: "SET_HELENA_COMPANY", companyId: result.companyId });
        dispatch({ type: "SET_HELENA_TOKEN", token: result.token });
        dispatch({ type: "SET_ASAAS_CUSTOMER", customerId: result.asaasCustomerId });
        dispatch({
          type: "SET_LOGIN_INFO",
          url: result.loginUrl,
          email: result.loginEmail,
        });

        return { goToStep: 3 as const };
      }
    },
    onSuccess: (result) => {
      dispatch({ type: "SET_LOADING", isLoading: false });
      dispatch({ type: "SET_STEP", step: result.goToStep });
    },
    onError: (error: Error) => {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Erro ao criar conta. Tente novamente.",
      });
    },
  });

  const submitCompanyInfo = (data: CompanyFormData) => {
    dispatch({ type: "SET_COMPANY_DATA", data });
    companyMutation.mutate({
      ...data,
      mode: state.mode,
      plan: state.selectedPlan!,
    });
  };

  // Step 3 → process payment (PIX or credit card) via Asaas Edge Function
  const paymentMutation = useMutation({
    mutationFn: async (data: PaymentFormData) => {
      dispatch({ type: "SET_LOADING", isLoading: true });
      dispatch({ type: "SET_PAYMENT_DATA", data });

      const companyId = state.helenaCompanyId!;
      const plan = state.selectedPlan!;

      if (data.method === "pix") {
        // Generate PIX via upgrade function (reuses the same logic)
        const result = await upgradeTrialAccount({
          companyId,
          paymentMethod: "pix",
        });

        if (result.pixQrCode && result.pixCopiaECola) {
          dispatch({
            type: "SET_PIX_DATA",
            qrCodeUrl: result.pixQrCode,
            copiaECola: result.pixCopiaECola,
          });
        }
        dispatch({ type: "SET_LOADING", isLoading: false });
        return { requiresPolling: true };
      } else {
        // Credit card - immediate payment
        const [expiryMonth, expiryYear] = data.creditCard!.expiry.split("/");
        const result = await upgradeTrialAccount({
          companyId,
          paymentMethod: "credit-card",
          creditCard: {
            holderName: data.creditCard!.holder,
            number: stripMask(data.creditCard!.number),
            expiryMonth,
            expiryYear: `20${expiryYear}`,
            ccv: data.creditCard!.cvv,
          },
          creditCardHolderInfo: {
            name: data.creditCard!.holder,
            email: state.companyData!.email,
            cpfCnpj: stripMask(data.cpfCnpj),
            phone: stripMask(state.companyData!.phone),
          },
        });

        if (result.paymentStatus === "CONFIRMED" || result.paymentStatus === "RECEIVED") {
          dispatch({ type: "SET_LOADING", isLoading: false });
          dispatch({ type: "SET_STEP", step: 4 });
        }
        return { requiresPolling: false };
      }
    },
    onError: (error: Error) => {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Erro no pagamento. Tente novamente.",
      });
    },
  });

  const processPayment = (data: PaymentFormData) => {
    paymentMutation.mutate(data);
  };

  const checkPixPaymentMutation = useMutation({
    mutationFn: async () => {
      dispatch({ type: "SET_LOADING", isLoading: true });
      const companyId = state.helenaCompanyId!;

      const result = await upgradeTrialAccount({
        companyId,
        paymentMethod: "pix",
      });

      if (result.paymentStatus === "CONFIRMED" || result.paymentStatus === "RECEIVED") {
        dispatch({ type: "SET_LOADING", isLoading: false });
        dispatch({ type: "SET_STEP", step: 4 });
        return true;
      }
      dispatch({ type: "SET_LOADING", isLoading: false });
      return false;
    },
    onError: (error: Error) => {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Erro ao verificar pagamento.",
      });
    },
  });

  const checkPixPayment = () => {
    checkPixPaymentMutation.mutate();
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    state,
    setMode,
    selectPlan,
    goToStep,
    submitCompanyInfo,
    processPayment,
    checkPixPayment,
    reset,
  };
}
