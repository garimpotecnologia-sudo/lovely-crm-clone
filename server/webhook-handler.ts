/**
 * Asaas Webhook Handler + Trial Management Backend
 *
 * Deploy como:
 * - Netlify Function
 * - Vercel Serverless Function
 * - Express standalone
 * - Supabase Edge Function
 *
 * Variáveis de ambiente necessárias:
 * - ASAAS_WEBHOOK_TOKEN: Token de autenticação do webhook Asaas
 * - HELENA_PARTNER_TOKEN: Token de parceiro da Helena CRM
 * - HELENA_API_URL: https://api.helena.run/core/v1
 * - RESEND_API_KEY: API key do Resend (para e-mails)
 * - NOTIFICATION_EMAIL_FROM: E-mail remetente
 */

// ─── Types ───

interface AsaasWebhookPayload {
  id: string;
  event: string;
  payment?: {
    id: string;
    subscription?: string;
    customer: string;
    value: number;
    dueDate: string;
    status: "PENDING" | "CONFIRMED" | "RECEIVED" | "OVERDUE" | "REFUNDED";
  };
}

interface TrialRecord {
  companyId: string;
  email: string;
  plan: string;
  asaasCustomerId: string;
  asaasSubscriptionId: string;
  trialStartDate: string;
  trialEndDate: string;
  status: "trial_active" | "paid" | "expired" | "deactivated";
}

// ─── Helena CRM API ───

const HELENA_API_URL = process.env.HELENA_API_URL || "https://api.helena.run/core/v1";
const HELENA_TOKEN = process.env.HELENA_PARTNER_TOKEN || "";

async function deactivateHelenaCompany(companyId: string): Promise<void> {
  const response = await fetch(`${HELENA_API_URL}/company/${companyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${HELENA_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to deactivate company ${companyId}: ${response.status}`);
  }

  console.log(`[Helena] Company ${companyId} deactivated`);
}

async function reactivateHelenaCompany(companyId: string): Promise<void> {
  const response = await fetch(`${HELENA_API_URL}/company/${companyId}/active`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HELENA_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to reactivate company ${companyId}: ${response.status}`);
  }

  console.log(`[Helena] Company ${companyId} reactivated`);
}

// ─── Email Notifications ───

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const EMAIL_FROM = process.env.NOTIFICATION_EMAIL_FROM || "CRM AGENTPRO <noreply@agentpro.com.br>";

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.log(`[Email] Would send to ${to}: ${subject}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    console.error(`[Email] Failed to send to ${to}: ${response.status}`);
  } else {
    console.log(`[Email] Sent to ${to}: ${subject}`);
  }
}

function sendTrialWelcomeEmail(email: string, plan: string, endDate: string): Promise<void> {
  return sendEmail(
    email,
    "Bem-vindo ao CRM AGENTPRO! Seu trial de 7 dias começou",
    `
    <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #6a01b9; font-size: 24px; margin-bottom: 16px;">Bem-vindo ao CRM AGENTPRO!</h1>
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Seu trial grátis do plano <strong>${plan}</strong> foi ativado com sucesso.
      </p>
      <div style="background: #f8f4ff; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #6a01b9;">
        <p style="margin: 0; color: #333; font-size: 14px;">
          <strong>Trial válido até:</strong> ${endDate}<br/>
          <strong>Plano:</strong> ${plan}<br/>
          <strong>Acesso:</strong> <a href="https://agentprocrm.com.br" style="color: #6a01b9;">agentprocrm.com.br</a>
        </p>
      </div>
      <p style="color: #666; font-size: 14px;">
        Aproveite todos os recursos disponíveis durante o período de teste.
        Após 7 dias, você poderá escolher um plano para continuar utilizando.
      </p>
      <a href="https://agentprocrm.com.br" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
        Acessar meu CRM
      </a>
    </div>
    `
  );
}

function sendTrialExpiringEmail(email: string, plan: string, daysRemaining: number): Promise<void> {
  return sendEmail(
    email,
    `Seu trial do CRM AGENTPRO expira em ${daysRemaining} dia${daysRemaining > 1 ? "s" : ""}`,
    `
    <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #e65100; font-size: 24px; margin-bottom: 16px;">Seu trial está acabando!</h1>
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Seu trial grátis do plano <strong>${plan}</strong> expira em
        <strong style="color: #e65100;">${daysRemaining} dia${daysRemaining > 1 ? "s" : ""}</strong>.
      </p>
      <div style="background: #fff3e0; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #e65100;">
        <p style="margin: 0; color: #333; font-size: 14px;">
          Para continuar usando o CRM AGENTPRO sem interrupção, ative seu plano agora.
        </p>
      </div>
      <a href="https://agentpro.com.br/#pricing" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
        Ativar meu plano
      </a>
    </div>
    `
  );
}

function sendTrialExpiredEmail(email: string, plan: string): Promise<void> {
  return sendEmail(
    email,
    "Seu trial do CRM AGENTPRO expirou",
    `
    <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #c62828; font-size: 24px; margin-bottom: 16px;">Seu trial expirou</h1>
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        O período de teste grátis do plano <strong>${plan}</strong> chegou ao fim.
        Seu acesso ao CRM AGENTPRO foi pausado.
      </p>
      <div style="background: #ffebee; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #c62828;">
        <p style="margin: 0; color: #333; font-size: 14px;">
          Não se preocupe! Seus dados estão seguros. Ative um plano para retomar o acesso imediatamente.
        </p>
      </div>
      <a href="https://agentpro.com.br/#pricing" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
        Escolher um plano
      </a>
    </div>
    `
  );
}

function sendPaymentConfirmedEmail(email: string, plan: string): Promise<void> {
  return sendEmail(
    email,
    "Pagamento confirmado - CRM AGENTPRO",
    `
    <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #2e7d32; font-size: 24px; margin-bottom: 16px;">Pagamento confirmado!</h1>
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Seu plano <strong>${plan}</strong> foi ativado com sucesso.
        Agora você tem acesso completo ao CRM AGENTPRO.
      </p>
      <a href="https://agentprocrm.com.br" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
        Acessar meu CRM
      </a>
    </div>
    `
  );
}

// ─── Webhook Handler ───

/**
 * Main webhook handler - receives Asaas webhook events
 * Route: POST /api/webhooks/asaas
 */
export async function handleAsaasWebhook(
  payload: AsaasWebhookPayload,
  getTrialBySubscription: (subscriptionId: string) => Promise<TrialRecord | null>,
  updateTrialStatus: (companyId: string, status: TrialRecord["status"]) => Promise<void>
): Promise<{ status: number; message: string }> {
  const { event, payment } = payload;

  console.log(`[Webhook] Received event: ${event}`);

  if (!payment?.subscription) {
    return { status: 200, message: "No subscription linked, ignoring" };
  }

  const trial = await getTrialBySubscription(payment.subscription);
  if (!trial) {
    return { status: 200, message: "No trial found for this subscription" };
  }

  switch (event) {
    case "PAYMENT_RECEIVED":
    case "PAYMENT_CONFIRMED": {
      // Payment successful - trial converted to paid
      await updateTrialStatus(trial.companyId, "paid");
      await reactivateHelenaCompany(trial.companyId);
      await sendPaymentConfirmedEmail(trial.email, trial.plan);
      return { status: 200, message: `Payment confirmed for ${trial.companyId}` };
    }

    case "PAYMENT_OVERDUE": {
      // Payment failed - deactivate account
      await updateTrialStatus(trial.companyId, "deactivated");
      await deactivateHelenaCompany(trial.companyId);
      await sendTrialExpiredEmail(trial.email, trial.plan);
      return { status: 200, message: `Account deactivated for ${trial.companyId}` };
    }

    default:
      return { status: 200, message: `Event ${event} not handled` };
  }
}

// ─── Cron Job: Check Expiring Trials ───

/**
 * Run daily via cron to send trial reminder emails
 * Route: GET /api/cron/check-trials (protected)
 */
export async function checkExpiringTrials(
  getActiveTrials: () => Promise<TrialRecord[]>,
  updateTrialStatus: (companyId: string, status: TrialRecord["status"]) => Promise<void>
): Promise<void> {
  const trials = await getActiveTrials();
  const now = new Date();

  for (const trial of trials) {
    const endDate = new Date(trial.trialEndDate);
    const diffMs = endDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      // Trial expired - deactivate
      console.log(`[Cron] Trial expired for ${trial.companyId}`);
      await deactivateHelenaCompany(trial.companyId);
      await updateTrialStatus(trial.companyId, "expired");
      await sendTrialExpiredEmail(trial.email, trial.plan);
    } else if (daysRemaining === 2 || daysRemaining === 1) {
      // Send reminder email
      console.log(`[Cron] Trial expiring in ${daysRemaining} days for ${trial.companyId}`);
      await sendTrialExpiringEmail(trial.email, trial.plan, daysRemaining);
    }
  }
}

// ─── Export for different deployment targets ───

export {
  sendTrialWelcomeEmail,
  sendTrialExpiringEmail,
  sendTrialExpiredEmail,
  sendPaymentConfirmedEmail,
  deactivateHelenaCompany,
  reactivateHelenaCompany,
};

export type { AsaasWebhookPayload, TrialRecord };
