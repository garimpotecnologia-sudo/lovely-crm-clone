import { useMutation } from "@tanstack/react-query";
import { useSignupContext } from "@/contexts/SignupContext";
import {
  createCompany,
  activateCompany,
  createToken,
  createAgent,
} from "@/services/helena";
import {
  createCustomer,
  createSubscription,
  getPaymentDetails,
} from "@/services/asaas";
import { resetPixPollCount } from "@/services/mock-data";
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

  const companyMutation = useMutation({
    mutationFn: async (data: CompanyFormData) => {
      dispatch({ type: "SET_LOADING", isLoading: true });
      const company = await createCompany(data);
      dispatch({ type: "SET_HELENA_COMPANY", companyId: company.id });
      return company;
    },
    onSuccess: () => {
      dispatch({ type: "SET_LOADING", isLoading: false });
      if (state.mode === "trial") {
        // Trial: skip payment, go straight to finalization
        trialFinalizeMutation.mutate();
      } else {
        dispatch({ type: "SET_STEP", step: 3 });
      }
    },
    onError: (error: Error) => {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Erro ao criar empresa. Tente novamente.",
      });
    },
  });

  const submitCompanyInfo = (data: CompanyFormData) => {
    dispatch({ type: "SET_COMPANY_DATA", data });
    companyMutation.mutate(data);
  };

  // Trial finalization - create account, create Asaas subscription with future date, activate
  const trialFinalizeMutation = useMutation({
    mutationFn: async () => {
      dispatch({ type: "SET_LOADING", isLoading: true });

      const companyId = state.helenaCompanyId!;
      const companyData = state.companyData!;
      const plan = state.selectedPlan!;

      // Activate account for trial
      await activateCompany(companyId);
      const tokenResult = await createToken(companyId);
      dispatch({ type: "SET_HELENA_TOKEN", token: tokenResult.token });

      await createAgent({
        name: companyData.contactPerson.name,
        email: companyData.contactPerson.email,
        companyId,
      });

      // Create Asaas customer + subscription with nextDueDate = today + 7 days
      const customer = await createCustomer({
        name: companyData.contactPerson.name,
        email: companyData.email,
        cpfCnpj: stripMask(companyData.cpfCnpj),
        phone: stripMask(companyData.phone),
      });
      dispatch({ type: "SET_ASAAS_CUSTOMER", customerId: customer.id });

      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);
      const nextDueDate = trialEndDate.toISOString().split("T")[0];

      const subscription = await createSubscription({
        customer: customer.id,
        billingType: "PIX",
        value: plan.price,
        nextDueDate,
        description: `CRM AGENTPRO - Plano ${plan.name} (Trial 7 dias)`,
      });
      dispatch({
        type: "SET_ASAAS_SUBSCRIPTION",
        subscriptionId: subscription.id,
      });

      // Save trial info locally
      const trialStart = new Date().toISOString();
      const trialEnd = trialEndDate.toISOString();
      saveTrialInfo({
        isActive: true,
        startDate: trialStart,
        endDate: trialEnd,
        daysRemaining: 7,
        companyId,
        email: companyData.contactPerson.email,
        plan: plan.name,
      });

      dispatch({
        type: "SET_LOGIN_INFO",
        url: "https://app.agentpro.com.br",
        email: companyData.contactPerson.email,
      });
      dispatch({ type: "SET_LOADING", isLoading: false });
      dispatch({ type: "SET_STEP", step: 4 });
    },
    onError: (error: Error) => {
      dispatch({
        type: "SET_ERROR",
        error: error.message || "Erro ao ativar trial. Tente novamente.",
      });
    },
  });

  const paymentMutation = useMutation({
    mutationFn: async (data: PaymentFormData) => {
      dispatch({ type: "SET_LOADING", isLoading: true });
      dispatch({ type: "SET_PAYMENT_DATA", data });

      const companyData = state.companyData!;
      const plan = state.selectedPlan!;

      const customer = await createCustomer({
        name: companyData.contactPerson.name,
        email: companyData.email,
        cpfCnpj: stripMask(data.cpfCnpj),
        phone: stripMask(companyData.phone),
      });
      dispatch({ type: "SET_ASAAS_CUSTOMER", customerId: customer.id });

      const nextDueDate = new Date().toISOString().split("T")[0];
      const billingType =
        data.method === "pix" ? ("PIX" as const) : ("CREDIT_CARD" as const);

      const subscriptionPayload: Parameters<typeof createSubscription>[0] = {
        customer: customer.id,
        billingType,
        value: plan.price + plan.activationFee,
        nextDueDate,
        description: `CRM AGENTPRO - Plano ${plan.name}`,
      };

      if (data.method === "credit-card" && data.creditCard) {
        const [expiryMonth, expiryYear] = data.creditCard.expiry.split("/");
        subscriptionPayload.creditCard = {
          holderName: data.creditCard.holder,
          number: stripMask(data.creditCard.number),
          expiryMonth,
          expiryYear: `20${expiryYear}`,
          ccv: data.creditCard.cvv,
        };
        subscriptionPayload.creditCardHolderInfo = {
          name: data.creditCard.holder,
          email: companyData.email,
          cpfCnpj: stripMask(data.cpfCnpj),
          phone: stripMask(companyData.phone),
        };
      }

      const subscription = await createSubscription(subscriptionPayload);
      dispatch({
        type: "SET_ASAAS_SUBSCRIPTION",
        subscriptionId: subscription.id,
      });

      if (data.method === "pix") {
        resetPixPollCount();
        const payment = await getPaymentDetails(subscription.id, "pix");
        if (payment.pixQrCode && payment.pixCopiaECola) {
          dispatch({
            type: "SET_PIX_DATA",
            qrCodeUrl: payment.pixQrCode,
            copiaECola: payment.pixCopiaECola,
          });
        }
        dispatch({ type: "SET_LOADING", isLoading: false });
        return { requiresPolling: true };
      }

      await finalizeAccount();
      return { requiresPolling: false };
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
      const subscriptionId = state.asaasSubscriptionId!;
      const payment = await getPaymentDetails(subscriptionId, "pix");

      if (payment.status === "CONFIRMED" || payment.status === "RECEIVED") {
        await finalizeAccount();
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

  async function finalizeAccount() {
    const companyId = state.helenaCompanyId!;
    const companyData = state.companyData!;

    await activateCompany(companyId);
    const tokenResult = await createToken(companyId);
    dispatch({ type: "SET_HELENA_TOKEN", token: tokenResult.token });

    await createAgent({
      name: companyData.contactPerson.name,
      email: companyData.contactPerson.email,
      companyId,
    });

    dispatch({
      type: "SET_LOGIN_INFO",
      url: "https://app.agentpro.com.br",
      email: companyData.contactPerson.email,
    });
    dispatch({ type: "SET_LOADING", isLoading: false });
    dispatch({ type: "SET_STEP", step: 4 });
  }

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
