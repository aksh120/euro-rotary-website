import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for backend operations (checking payments, updating secure fields)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
