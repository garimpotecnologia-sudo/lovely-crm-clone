import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const HELENA_API_URL = Deno.env.get("HELENA_API_URL") || "https://api.helena.run/core/v1";
const HELENA_TOKEN = Deno.env.get("HELENA_PARTNER_TOKEN") || "";
const ASAAS_WEBHOOK_TOKEN = Deno.env.get("ASAAS_WEBHOOK_TOKEN") || "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

serve(async (req) => {
  try {
    // Verify Asaas webhook token
    const authToken = req.headers.get("asaas-access-token");
    if (ASAAS_WEBHOOK_TOKEN && authToken !== ASAAS_WEBHOOK_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = await req.json();
    const { event, payment } = payload;

    console.log(`[Webhook] Event: ${event}`);

    if (!payment?.subscription) {
      return new Response(JSON.stringify({ message: "No subscription, ignoring" }), { status: 200 });
    }

    // Find trial by subscription ID
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: trial } = await supabase
      .from("trials")
      .select("*")
      .eq("asaas_subscription_id", payment.subscription)
      .single();

    if (!trial) {
      return new Response(JSON.stringify({ message: "No trial found" }), { status: 200 });
    }

    switch (event) {
      case "PAYMENT_RECEIVED":
      case "PAYMENT_CONFIRMED": {
        // Payment OK → activate/keep account active
        await supabase
          .from("trials")
          .update({ status: "paid" })
          .eq("company_id", trial.company_id);

        // Reactivate in Helena if it was deactivated
        await fetch(`${HELENA_API_URL}/company/${trial.company_id}/active`, {
          method: "POST",
          headers: { Authorization: `Bearer ${HELENA_TOKEN}` },
        });

        // Send confirmation email
        await sendEmail(
          trial.email,
          "Pagamento confirmado - CRM AGENTPRO",
          `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #2e7d32;">Pagamento confirmado!</h1>
            <p>Seu plano <strong>${trial.plan}</strong> foi ativado com sucesso.</p>
            <a href="https://agentprocrm.com.br" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Acessar meu CRM</a>
          </div>`
        );

        console.log(`[Webhook] Payment confirmed for ${trial.company_id}`);
        break;
      }

      case "PAYMENT_OVERDUE": {
        // Payment failed → deactivate account
        await supabase
          .from("trials")
          .update({ status: "deactivated" })
          .eq("company_id", trial.company_id);

        // Deactivate in Helena
        await fetch(`${HELENA_API_URL}/company/${trial.company_id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${HELENA_TOKEN}` },
        });

        // Send expired email
        await sendEmail(
          trial.email,
          "Seu acesso ao CRM AGENTPRO foi pausado",
          `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #c62828;">Acesso pausado</h1>
            <p>O pagamento do plano <strong>${trial.plan}</strong> não foi confirmado. Seu acesso foi pausado temporariamente.</p>
            <p>Seus dados estão seguros. Ative um plano para retomar o acesso.</p>
            <a href="https://agentpro.com.br/#pricing" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Escolher um plano</a>
          </div>`
        );

        console.log(`[Webhook] Account deactivated for ${trial.company_id}`);
        break;
      }
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[Email] Would send to ${to}: ${subject}`);
    return;
  }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CRM AGENTPRO <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
}
