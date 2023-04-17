import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createServerSupabaseClient<Database> ({
        req,
        res
    })
    const { portfolio, cashBalance, user_id } = req.body // this is the data from the client

    if (req.method === 'POST') {
       /* const { data, error } = await supabase
            .from('portfolios')
            .upsert({
                portfolio: portfolio,
                cash_balance: cashBalance,
                user_id
            })
            .select() */
        res.status(200).json({posted: true})
                
    }
    if (req.body === 'GET') {
        const { data, error } = await supabase
            .from('portfolios')
            .select('portfolio')
            .eq('user_id', user_id)
            
        const portfolio = data[0].portfolio
        return res.status(200).json({ portfolio })
    }
}
export default handler
        