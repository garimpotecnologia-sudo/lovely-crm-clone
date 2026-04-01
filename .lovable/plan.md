

## Configure Supabase Credentials

The project uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` via `import.meta.env` in two service files (`trial.ts`, `upgrade.ts`). These are **public/publishable keys** (anon key), so they can be stored directly in the codebase.

### Plan

1. **Create `src/integrations/supabase/client.ts`** — Initialize a shared Supabase client with the provided URL and anon key, so all services can use a single client instance.

2. **Update `src/services/trial.ts` and `src/services/upgrade.ts`** — Import the Supabase client or use the centralized constants instead of duplicating `import.meta.env` reads.

3. **Hardcode the public keys** in the Supabase client file:
   - URL: `https://lpsglzzolyzrwdakhzes.supabase.co`
   - Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. **Set `IS_MOCK_MODE` to `false`** in `src/services/config.ts` so the app uses real Supabase edge functions instead of mock data.

### Files to create/edit
- **Create**: `src/integrations/supabase/client.ts`
- **Edit**: `src/services/config.ts` (mock mode → false)
- **Edit**: `src/services/trial.ts` (use centralized constants)
- **Edit**: `src/services/upgrade.ts` (use centralized constants)

