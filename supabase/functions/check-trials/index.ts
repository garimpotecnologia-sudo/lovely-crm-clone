import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const HELENA_API_URL = Deno.env.get("HELENA_API_URL") || "https://api.helena.run/core/v1";
const HELENA_TOKEN = Deno.env.get("HELENA_PARTNER_TOKEN") || "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

/**
 * Cron job: roda diariamente para verificar trials expirando
 * Configure no Supabase: Schedule > Cron Jobs > 0 9 * * * (todo dia às 9h)
 *
 * Ou chame via HTTP: POST /functions/v1/check-trials
 * com header Authorization: Bearer <SUPABASE_ANON_KEY>
 */
serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get all active trials
    const { data: trials, error } = await supabase
      .from("trials")
      .select("*")
      .eq("status", "trial_active");

    if (error) throw error;
    if (!trials || trials.length === 0) {
      return new Response(JSON.stringify({ message: "No active trials" }), { status: 200 });
    }

    const now = new Date();
    const results: string[] = [];

    for (const trial of trials) {
      const endDate = new Date(trial.trial_end_date);
      const diffMs = endDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (daysRemaining <= 0) {
        // Trial expired → deactivate
        await supabase
          .from("trials")
          .update({ status: "expired" })
          .eq("company_id", trial.company_id);

        // Deactivate in Helena
        await fetch(`${HELENA_API_URL}/company/${trial.company_id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${HELENA_TOKEN}` },
        });

        await sendEmail(
          trial.email,
          "Seu trial do CRM AGENTPRO expirou",
          `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #c62828;">Seu trial expirou</h1>
            <p>O período de teste do plano <strong>${trial.plan}</strong> chegou ao fim.</p>
            <p>Seus dados estão seguros. Ative um plano para retomar o acesso.</p>
            <a href="https://agentpro.com.br/#pricing" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Escolher um plano</a>
          </div>`
        );

        results.push(`EXPIRED: ${trial.company_id} (${trial.email})`);
      } else if (daysRemaining === 2) {
        await sendEmail(
          trial.email,
          "Seu trial do CRM AGENTPRO expira em 2 dias",
          `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #e65100;">Seu trial expira em 2 dias!</h1>
            <p>O teste grátis do plano <strong>${trial.plan}</strong> termina em <strong>2 dias</strong>.</p>
            <p>Ative seu plano para continuar usando sem interrupção.</p>
            <a href="https://agentpro.com.br/#pricing" style="display: inline-block; background: #6a01b9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Ativar meu plano</a>
          </div>`
        );
        results.push(`REMINDER_2D: ${trial.company_id} (${trial.email})`);
      } else if (daysRemaining === 1) {
        await sendEmail(
          trial.email,
          "ÚLTIMO DIA: Seu trial do CRM AGENTPRO expira amanhã",
          `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #c62828;">Último dia do seu trial!</h1>
            <p>O teste grátis do plano <strong>${trial.plan}</strong> termina <strong>amanhã</strong>.</p>
            <p>Ative agora para não perder acesso aos seus dados e configurações.</p>
            <a href="https://agentpro.com.br/#pricing" style="display: inline-block; background: #c62828; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Ativar agora</a>
          </div>`
        );
        results.push(`REMINDER_1D: ${trial.company_id} (${trial.email})`);
      }
    }

    return new Response(
      JSON.stringify({ message: "Check completed", results }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Cron error:", error);
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
      from: "CRM AGENTPRO <noreply@agentpro.com.br>",
      to,
      subject,
      html,
    }),
  });
}
