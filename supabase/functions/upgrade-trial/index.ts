import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ASAAS_API_URL = Deno.env.get("ASAAS_API_URL") || "https://api.asaas.com/v3";
const ASAAS_TOKEN = Deno.env.get("ASAAS_TOKEN") || "";
const HELENA_API_URL = Deno.env.get("HELENA_API_URL") || "https://api.helena.run/core/v1";
const HELENA_TOKEN = Deno.env.get("HELENA_PARTNER_TOKEN") || "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const IS_MOCK = Deno.env.get("MOCK_MODE") === "true";

interface UpgradeRequest {
  companyId: string;
  paymentMethod: "pix" | "credit-card";
  creditCard?: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: UpgradeRequest = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find the trial
    const { data: trial, error: findError } = await supabase
      .from("trials")
      .select("*")
      .eq("company_id", body.companyId)
      .single();

    if (findError || !trial) {
      return new Response(
        JSON.stringify({ success: false, error: "Trial não encontrado" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    let pixQrCode: string | null = null;
    let pixCopiaECola: string | null = null;
    let paymentStatus = "PENDING";

    if (IS_MOCK) {
      await new Promise((r) => setTimeout(r, 1000));

      if (body.paymentMethod === "pix") {
        pixQrCode = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMTIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iOTAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=";
        pixCopiaECola = "00020126580014br.gov.bcb.pix0136upgrade-pix-key-agentpro520400005303986540510.005802BR5925CRM AGENTPRO6009SAO PAULO62070503***6304UPGR";
        paymentStatus = "PENDING";
      } else {
        paymentStatus = "CONFIRMED";
      }
    } else {
      // Real Asaas: update subscription billing type or create a new payment
      const billingType = body.paymentMethod === "pix" ? "PIX" : "CREDIT_CARD";

      const paymentPayload: Record<string, unknown> = {
        customer: trial.asaas_customer_id,
        billingType,
        value: getPlanPrice(trial.plan),
        dueDate: new Date().toISOString().split("T")[0],
        description: `CRM AGENTPRO - Ativação Plano ${trial.plan}`,
      };

      if (body.paymentMethod === "credit-card" && body.creditCard) {
        paymentPayload.creditCard = body.creditCard;
        paymentPayload.creditCardHolderInfo = body.creditCardHolderInfo;
      }

      // Create a one-time payment for activation
      const payRes = await fetch(`${ASAAS_API_URL}/payments`, {
        method: "POST",
        headers: {
          "access_token": ASAAS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentPayload),
      });
      const payment = await payRes.json();

      if (body.paymentMethod === "pix" && payment.id) {
        // Get PIX QR code
        const pixRes = await fetch(`${ASAAS_API_URL}/payments/${payment.id}/pixQrCode`, {
          headers: { "access_token": ASAAS_TOKEN },
        });
        const pixData = await pixRes.json();
        pixQrCode = pixData.encodedImage ? `data:image/png;base64,${pixData.encodedImage}` : null;
        pixCopiaECola = pixData.payload || null;
      }

      paymentStatus = payment.status || "PENDING";

      // Update subscription to start charging monthly going forward
      if (trial.asaas_subscription_id) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        await fetch(`${ASAAS_API_URL}/subscriptions/${trial.asaas_subscription_id}`, {
          method: "PUT",
          headers: {
            "access_token": ASAAS_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            billingType,
            nextDueDate: nextMonth.toISOString().split("T")[0],
          }),
        });
      }
    }

    // If credit card payment was confirmed immediately, mark as paid
    if (paymentStatus === "CONFIRMED" || paymentStatus === "RECEIVED") {
      await supabase
        .from("trials")
        .update({ status: "paid" })
        .eq("company_id", body.companyId);

      // Ensure Helena account is active
      if (!IS_MOCK) {
        await fetch(`${HELENA_API_URL}/company/${body.companyId}/active`, {
          method: "POST",
          headers: { Authorization: `Bearer ${HELENA_TOKEN}` },
        });
      }

      // Send confirmation email
      if (RESEND_API_KEY) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "CRM AGENTPRO <onboarding@resend.dev>",
            to: trial.email,
            subject: "Plano ativado - CRM AGENTPRO",
            html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #2e7d32;">Plano ${trial.plan} ativado!</h1>
              <p>Seu pagamento foi confirmado. Agora você tem acesso completo e permanente ao CRM AGENTPRO.</p>
              <a href="https://app.agentpro.com.br" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Acessar meu CRM</a>
            </div>`,
          }),
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentStatus,
        pixQrCode,
        pixCopiaECola,
        plan: trial.plan,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Upgrade error:", error);
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
