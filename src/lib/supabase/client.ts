import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project') && !supabaseUrl.includes('mock.')) {
      return createClient(supabaseUrl, supabaseAnonKey);
    }
    return null;
  }

  if (client) return client;

  if (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseUrl.includes('mock.')
  ) {
    try {
      client = createClient(supabaseUrl, supabaseAnonKey);
      return client;
    } catch (e) {
      console.warn('Supabase initialization failed, running in resilient local state mode:', e);
      return null;
    }
  }

  return null;
}
