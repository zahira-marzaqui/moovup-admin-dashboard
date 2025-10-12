import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

// Client “user” (RLS appliquées via token du user)
export const createUserClient = (accessToken) =>
  createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {} }
  })

// Client “admin” (bypass RLS) – à réserver aux routes managers/super-admin
export const createAdminClient = () =>
  createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)
