import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const HELENA_API_URL = Deno.env.get("HELENA_API_URL") || "https://api.helena.run/core/v1";
const HELENA_TOKEN = Deno.env.get("HELENA_PARTNER_TOKEN") || "";
const ASAAS_API_URL = Deno.env.get("ASAAS_API_URL") || "https://sandbox.asaas.com/api/v3";
const ASAAS_TOKEN = Deno.env.get("ASAAS_TOKEN") || "";

interface CreateAccountRequest {
  companyName: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  plan: string;
  planPrice: number;
  activationFee: number;
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

function getPlanConfig(plan: string) {
  const configs: Record<string, any> = {
    Essential: { session: 1000, agents: 3, panels: 0, chatBots: 2, chatbotAutomations: 1, whatsAppChannels: 1, instagramChannels: 0, messengerChannels: 0, sequences: 1, aiAgents: 0 },
    Pro: { session: 1000, agents: 5, panels: 2, chatBots: 3, chatbotAutomations: 2, whatsAppChannels: 1, instagramChannels: 1, messengerChannels: 1, sequences: 2, aiAgents: 0 },
    "Plus+": { session: 1000, agents: 10, panels: 5, chatBots: 5, chatbotAutomations: 3, whatsAppChannels: 2, instagramChannels: 1, messengerChannels: 1, sequences: 2, aiAgents: 0 },
    Advanced: { session: 1000, agents: 20, panels: 10, chatBots: 10, chatbotAutomations: 4, whatsAppChannels: 3, instagramChannels: 1, messengerChannels: 1, sequences: 4, aiAgents: 0 },
  };
  return configs[plan] || configs.Pro;
}

function getPlanApps(plan: string): string[] {
  const base = ["DIALOG"];
  if (plan === "Pro" || plan === "Plus+" || plan === "Advanced") {
    base.push("CAMPAIGN", "PANEL");
  }
  if (plan === "Plus+" || plan === "Advanced") {
    base.push("WEBHOOK", "SEQUENCE");
  }
  return base;
}

async function safeJson(response: Response, label: string): Promise<any> {
  const text = await response.text();
  console.log(`[${label}] Status: ${response.status}, Body: ${text.slice(0, 500)}`);
  if (!text) throw new Error(`${label} retornou resposta vazia (status ${response.status})`);
  try { return JSON.parse(text); } catch { throw new Error(`${label} resposta inválida: ${text.slice(0, 200)}`); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: CreateAccountRequest = await req.json();
    console.log("[create-account] Request:", JSON.stringify({ companyName: body.companyName, plan: body.plan }));

    const cleanDoc = body.cpfCnpj.replace(/\D/g, "");
    const docType = cleanDoc.length <= 11 ? "CPF" : "CNPJ";
    const companyType = cleanDoc.length <= 11 ? "INDIVIDUAL" : "LIMITED";
    const phoneClean = body.phone.replace(/\D/g, "");

    // 1. Create company in Helena with correct schema
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
        apps: getPlanApps(body.plan),
        resourcers: [],
        config: getPlanConfig(body.plan),
        address: {
          country: "br",
          state: (body.address.state || "").toLowerCase(),
          city: body.address.city || "",
          neighborhood: body.address.neighborhood || "",
          zipcode: (body.address.zipCode || "").replace(/\D/g, ""),
          number: body.address.number || "",
          address1: body.address.street || "",
          address2: body.address.complement || "",
        },
      }),
    });
    const company = await safeJson(companyRes, "Helena CreateCompany");

    if (company.error === true) {
      throw new Error(`Helena: ${company.text || company.key || "Erro desconhecido"}`);
    }

    const helenaCompanyId = company.id;
    console.log("[create-account] Company created:", helenaCompanyId);

    // 2. Create token
    let helenaToken = "";
    try {
      const tokenRes = await fetch(`${HELENA_API_URL}/company/${helenaCompanyId}/tokens`, {
        method: "POST",
        headers: { Authorization: `Bearer ${HELENA_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const tokenData = await safeJson(tokenRes, "Helena CreateToken");
      helenaToken = tokenData.token || tokenData.key || "";
    } catch (e) {
      console.error("[create-account] Token creation failed:", e.message);
    }

    // 3. Create Asaas customer
    let asaasCustomerId = "";
    try {
      const customerRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: { "access_token": ASAAS_TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: body.contactName,
          email: body.email,
          cpfCnpj: cleanDoc,
          phone: phoneClean,
        }),
      });
      const customer = await safeJson(customerRes, "Asaas CreateCustomer");
      asaasCustomerId = customer.id || "";
    } catch (e) {
      console.error("[create-account] Asaas customer failed:", e.message);
    }

    // 4. Save to database
    try {
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
      await supabase.from("trials").insert({
        company_id: helenaCompanyId,
        email: body.contactEmail,
        phone: body.contactPhone,
        company_name: body.companyName,
        contact_name: body.contactName,
        plan: body.plan,
        asaas_customer_id: asaasCustomerId,
        helena_token: helenaToken,
        status: "paid",
      });
    } catch (e) {
      console.error("[create-account] DB insert failed:", e.message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        companyId: helenaCompanyId,
        token: helenaToken,
        asaasCustomerId,
        loginUrl: "https://app.agentpro.com.br",
        loginEmail: body.contactEmail,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("[create-account] Error:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
