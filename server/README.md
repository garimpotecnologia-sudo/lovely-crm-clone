# Backend - CRM AGENTPRO Webhook Handler

## O que faz

1. **Recebe webhooks do Asaas** quando um pagamento é confirmado ou vence
2. **Desativa contas no Helena CRM** quando o trial expira ou pagamento falha
3. **Reativa contas** quando o pagamento é confirmado
4. **Envia e-mails** de boas-vindas, lembrete e expiração via Resend

## Variáveis de Ambiente

```env
ASAAS_WEBHOOK_TOKEN=seu_token_seguro_32_chars_min
HELENA_PARTNER_TOKEN=pn_seu_token_helena
HELENA_API_URL=https://api.helena.run/core/v1
RESEND_API_KEY=re_seu_api_key
NOTIFICATION_EMAIL_FROM=CRM AGENTPRO <noreply@agentpro.com.br>
```

## Deploy

### Opção 1: Netlify Functions
Crie `netlify/functions/asaas-webhook.ts` que importa `handleAsaasWebhook`.

### Opção 2: Vercel Serverless
Crie `api/webhooks/asaas.ts` que importa `handleAsaasWebhook`.

### Opção 3: Express Standalone
```ts
import express from 'express';
import { handleAsaasWebhook, checkExpiringTrials } from './webhook-handler';

const app = express();
app.use(express.json());

app.post('/api/webhooks/asaas', async (req, res) => {
  // Verificar token de autenticação
  const token = req.headers['asaas-access-token'];
  if (token !== process.env.ASAAS_WEBHOOK_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await handleAsaasWebhook(
    req.body,
    getTrialBySubscription, // implementar com seu banco de dados
    updateTrialStatus       // implementar com seu banco de dados
  );
  res.status(result.status).json({ message: result.message });
});

app.listen(3001);
```

## Configuração no Asaas

1. Acesse o painel Asaas → Configurações → Webhooks
2. Adicione URL: `https://seu-dominio/api/webhooks/asaas`
3. Selecione eventos: `PAYMENT_RECEIVED`, `PAYMENT_CONFIRMED`, `PAYMENT_OVERDUE`
4. Configure o authToken (mesmo valor de `ASAAS_WEBHOOK_TOKEN`)

## Cron Job (verificação diária de trials)

Configure um cron que rode `checkExpiringTrials()` diariamente:
- Netlify: use scheduled functions
- Vercel: use cron jobs
- Standalone: use node-cron ou similar

## Banco de Dados

Você precisa de uma tabela/collection para armazenar os trials:

```sql
CREATE TABLE trials (
  company_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  plan TEXT NOT NULL,
  asaas_customer_id TEXT,
  asaas_subscription_id TEXT,
  trial_start_date TIMESTAMP NOT NULL,
  trial_end_date TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'trial_active'
);
```
