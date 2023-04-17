import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createServerSupabaseClient<Database> ({
        req,
        res
    })
    const { portfolio, cashBalance, user_id } = req.body // this is the data from the client

    if (req.body === 'POST') {
       const { data, error } = await supabase
            .from('portfolio')
            .upsert({
                portfolio: portfolio,
                cash_balance: cashBalance,
                user_id
            })
            .select()
                
    }
    if (req.body === 'GET') {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('user_id', user_id)
            
    }
}
 