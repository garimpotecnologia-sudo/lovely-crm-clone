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

async function safeJson(response: Response, label: string): Promise<any> {
  const text = await response.text();
  console.log(`[${label}] Status: ${response.status}, Body: ${text.slice(0, 500)}`);
  if (!text) {
    throw new Error(`${label} retornou resposta vazia (status ${response.status})`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${label} retornou resposta inválida: ${text.slice(0, 200)}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: CreateAccountRequest = await req.json();
    console.log("[create-account] Request:", JSON.stringify({ companyName: body.companyName, plan: body.plan }));

    // 1. Create company in Helena
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
        name: body.companyName,
        legalName: body.companyName,
        documentType: docType,
        documentId: cleanDoc,
        category: "COMERCIO",
        type: companyType,
        email: body.email,
        phoneNumber: `+55|${phoneClean}`,
        address: {
          country: "br",
          state: body.address.state?.toLowerCase() || null,
          city: body.address.city || null,
          neighborhood: body.address.neighborhood || null,
          zipcode: body.address.zipCode?.replace(/\D/g, "") || null,
          number: body.address.number || null,
          address1: body.address.street || null,
          address2: body.address.complement || null,
        },
      }),
    });
    const company = await safeJson(companyRes, "Helena CreateCompany");

    // Helena returns error: true even with an ID when creation fails
    if (company.error === true) {
      throw new Error(`Helena erro ao criar empresa: ${company.text || company.key || JSON.stringify(company)}`);
    }

    // Helena returns id as object {value, shortValue} or string
    const rawId = company.id;
    const helenaCompanyId = typeof rawId === "object" && rawId?.value ? rawId.value : String(rawId);

    if (!helenaCompanyId) {
      throw new Error(`Helena não retornou ID da empresa: ${JSON.stringify(company)}`);
    }
    console.log("[create-account] Company created:", helenaCompanyId);

    // 2. Create token
    let helenaToken = "";
    try {
      const tokenRes = await fetch(`${HELENA_API_URL}/company/${helenaCompanyId}/tokens`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HELENA_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const tokenData = await safeJson(tokenRes, "Helena CreateToken");
      helenaToken = tokenData.token || "";
    } catch (e) {
      console.error("[create-account] Token creation failed (non-blocking):", e.message);
    }

    // 3. Create agent/user
    try {
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
    } catch (e) {
      console.error("[create-account] Agent creation failed (non-blocking):", e.message);
    }

    // 4. Create Asaas customer
    let asaasCustomerId = "";
    try {
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
      const customer = await safeJson(customerRes, "Asaas CreateCustomer");
      asaasCustomerId = customer.id || "";
    } catch (e) {
      console.error("[create-account] Asaas customer creation failed (non-blocking):", e.message);
    }

    // 5. Save to database
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

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
      console.error("[create-account] DB insert failed (non-blocking):", e.message);
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
