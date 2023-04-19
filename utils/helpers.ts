import { Database } from "@/types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const isEmpty=(obj: object):boolean => {
    return Object.keys(obj).length === 0;
}