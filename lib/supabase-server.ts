import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client for use in Server Actions / Route Handlers.
 * Uses the service-role key when available for full write access,
 * otherwise falls back to the anon key.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseServer = createClient(supabaseUrl, supabaseKey)
