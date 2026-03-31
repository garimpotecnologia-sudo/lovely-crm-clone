-- Tabela de trials do CRM AGENTPRO
CREATE TABLE IF NOT EXISTS trials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  contact_name TEXT,
  plan TEXT NOT NULL,
  asaas_customer_id TEXT,
  asaas_subscription_id TEXT,
  helena_token TEXT,
  trial_start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  trial_end_date TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  status TEXT NOT NULL DEFAULT 'trial_active'
    CHECK (status IN ('trial_active', 'paid', 'expired', 'deactivated')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para buscar por subscription_id (webhook do Asaas)
CREATE INDEX idx_trials_subscription ON trials(asaas_subscription_id);

-- Index para buscar trials ativos (cron job)
CREATE INDEX idx_trials_active ON trials(status) WHERE status = 'trial_active';

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trials_updated_at
  BEFORE UPDATE ON trials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS: desabilitar para Edge Functions (acessam via service_role key)
ALTER TABLE trials ENABLE ROW LEVEL SECURITY;

-- Policy: Edge Functions usam service_role que bypassa RLS
-- Se quiser acesso do frontend, adicione policies específicas
