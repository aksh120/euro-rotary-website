import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (typeof window === 'undefined') {
      return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aksh.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'aksh'
      );
    }
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};
