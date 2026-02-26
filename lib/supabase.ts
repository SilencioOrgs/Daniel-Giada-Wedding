import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Support both public and server-side env naming conventions.
const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

const missingEnvMessage =
    "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.";

function createMissingEnvClient(): SupabaseClient {
    if (process.env.NODE_ENV !== "production") {
        console.warn(missingEnvMessage);
    }

    return new Proxy(
        {},
        {
            get() {
                throw new Error(missingEnvMessage);
            },
        }
    ) as SupabaseClient;
}

export const supabase: SupabaseClient =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : createMissingEnvClient();
