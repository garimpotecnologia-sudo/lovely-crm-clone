import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://lpsglzzolyzrwdakhzes.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2dsenpvbHl6cndkYWtoemVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODMxMDAsImV4cCI6MjA5MDU1OTEwMH0.DT0Kjgnsa6yeGOGQEnZp8wp7kpSCOz8ODcBtG3jEbXs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
