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
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const IS_MOCK = Deno.env.get("MOCK_MODE") === "true";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: CreateAccountRequest = await req.json();

    let helenaCompanyId: string;
    let helenaToken: string;

    if (IS_MOCK) {
      helenaCompanyId = "mock_" + crypto.randomUUID().slice(0, 8);
      helenaToken = "pn_mock_" + crypto.randomUUID().slice(0, 16);
      await new Promise((r) => setTimeout(r, 500));
    } else {
      // Create company in Helena
      const companyRes = await fetch(`${HELENA_API_URL}/company`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HELENA_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.companyName,
          cpfCnpj: body.cpfCnpj,
          email: body.email,
          phone: body.phone,
        }),
      });
      const company = await companyRes.json();
      helenaCompanyId = company.id;

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

    // Create Asaas customer
    let asaasCustomerId: string;

    if (IS_MOCK) {
      asaasCustomerId = "cus_mock_" + crypto.randomUUID().slice(0, 8);
      await new Promise((r) => setTimeout(r, 300));
    } else {
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
    }

    // Save to database
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
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
