import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const HELENA_API_URL = Deno.env.get("HELENA_API_URL") || "https://api.helena.run/core/v1";
const HELENA_TOKEN = Deno.env.get("HELENA_PARTNER_TOKEN") || "";
const ASAAS_API_URL = Deno.env.get("ASAAS_API_URL") || "https://api.asaas.com/v3";
const ASAAS_TOKEN = Deno.env.get("ASAAS_TOKEN") || "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const IS_MOCK = Deno.env.get("MOCK_MODE") === "true";

interface CreateTrialRequest {
  companyName: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  plan: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: CreateTrialRequest = await req.json();

    // 1. Create company in Helena CRM
    let helenaCompanyId: string;
    let helenaToken: string;

    if (IS_MOCK) {
      helenaCompanyId = "mock_" + crypto.randomUUID().slice(0, 8);
      helenaToken = "pn_mock_" + crypto.randomUUID().slice(0, 16);
      await new Promise((r) => setTimeout(r, 500));
    } else {
      // Create company
      const cleanDoc = body.cpfCnpj.replace(/\D/g, "");
      const docType = cleanDoc.length <= 11 ? "CPF" : "CNPJ";
      const companyType = cleanDoc.length <= 11 ? "INDIVIDUAL" : "LIMITED";
      const phoneClean = body.phone.replace(/\D/g, "");

      const companyRes = await fetch(`${HELENA_API_URL}/company`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HELENA_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.companyName.toUpperCase(),
          legalName: body.companyName,
          documentType: docType,
          documentId: cleanDoc,
          category: "COMERCIO",
          type: companyType,
          status: "DEMO",
          owner: {
            name: body.contactName,
            email: body.contactEmail,
            phoneNumber: `+55${phoneClean}`,
          },
          apps: ["DIALOG"],
          resourcers: [],
          config: {
            session: 1000,
            agents: 3,
            panels: 0,
            chatBots: 2,
            chatbotAutomations: 1,
            whatsAppChannels: 1,
            instagramChannels: 0,
            messengerChannels: 0,
            sequences: 1,
            aiAgents: 0,
          },
          address: {
            country: "br",
            state: (body.address?.state || "").toLowerCase(),
            city: body.address?.city || "",
            neighborhood: body.address?.neighborhood || "",
            zipcode: (body.address?.zipCode || "").replace(/\D/g, ""),
            number: body.address?.number || "",
            address1: body.address?.street || "",
            address2: body.address?.complement || "",
          },
        }),
      });
      const company = await companyRes.json();

      if (company.error === true) {
        throw new Error(`Helena: ${company.text || company.key || "Erro ao criar empresa"}`);
      }

      helenaCompanyId = company.id;

      // Activate company
      await fetch(`${HELENA_API_URL}/company/${helenaCompanyId}/active`, {
        method: "POST",
        headers: { Authorization: `Bearer ${HELENA_TOKEN}` },
      });

      // Create token
      const tokenRes = await fetch(`${HELENA_API_URL}/company/${helenaCompanyId}/tokens`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HELENA_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const tokenData = await tokenRes.json();
      helenaToken = tokenData.token;

      // Create agent/user
      await fetch(`${HELENA_API_URL}/agent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HELENA_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.contactName,
          email: body.contactEmail,
          companyId: helenaCompanyId,
        }),
      });
    }

    // 2. Create Asaas customer + subscription with 7-day trial
    let asaasCustomerId: string;
    let asaasSubscriptionId: string;
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);
    const nextDueDate = trialEndDate.toISOString().split("T")[0];

    if (IS_MOCK) {
      asaasCustomerId = "cus_mock_" + crypto.randomUUID().slice(0, 8);
      asaasSubscriptionId = "sub_mock_" + crypto.randomUUID().slice(0, 8);
      await new Promise((r) => setTimeout(r, 500));
    } else {
      // Create customer
      const customerRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: {
          "access_token": ASAAS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.contactName,
          email: body.email,
          cpfCnpj: body.cpfCnpj.replace(/\D/g, ""),
          phone: body.phone.replace(/\D/g, ""),
        }),
      });
      const customer = await customerRes.json();
      asaasCustomerId = customer.id;

      // Create subscription with trial (first charge in 7 days)
      const subRes = await fetch(`${ASAAS_API_URL}/subscriptions`, {
        method: "POST",
        headers: {
          "access_token": ASAAS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: asaasCustomerId,
          billingType: "PIX",
          value: getPlanPrice(body.plan),
          nextDueDate,
          cycle: "MONTHLY",
          description: `CRM AGENTPRO - Plano ${body.plan} (Trial 7 dias)`,
        }),
      });
      const subscription = await subRes.json();
      asaasSubscriptionId = subscription.id;
    }

    // 3. Save trial to Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("trials").insert({
      company_id: helenaCompanyId,
      email: body.contactEmail,
      phone: body.contactPhone,
      company_name: body.companyName,
      contact_name: body.contactName,
      plan: body.plan,
      asaas_customer_id: asaasCustomerId,
      asaas_subscription_id: asaasSubscriptionId,
      helena_token: helenaToken,
      trial_end_date: trialEndDate.toISOString(),
      status: "trial_active",
    });

    if (dbError) {
      console.error("DB Error:", dbError);
    }

    // 4. Send welcome email
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CRM AGENTPRO <onboarding@resend.dev>",
          to: body.contactEmail,
          subject: "Bem-vindo ao CRM AGENTPRO! Seu trial de 7 dias começou",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #6a01b9;">Bem-vindo ao CRM AGENTPRO!</h1>
              <p>Seu trial grátis do plano <strong>${body.plan}</strong> foi ativado.</p>
              <div style="background: #f8f4ff; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #6a01b9;">
                <p><strong>Trial válido até:</strong> ${trialEndDate.toLocaleDateString("pt-BR")}</p>
                <p><strong>Acesso:</strong> <a href="https://app.agentpro.com.br">app.agentpro.com.br</a></p>
              </div>
              <a href="https://app.agentpro.com.br" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Acessar meu CRM</a>
            </div>
          `,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        companyId: helenaCompanyId,
        token: helenaToken,
        asaasCustomerId,
        asaasSubscriptionId,
        trialEndDate: trialEndDate.toISOString(),
        loginUrl: "https://app.agentpro.com.br",
        loginEmail: body.contactEmail,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

function getPlanPrice(planName: string): number {
  const prices: Record<string, number> = {
    Essential: 487,
    Pro: 687,
    "Plus+": 987,
    Advanced: 1487,
  };
  return prices[planName] || 687;
}
