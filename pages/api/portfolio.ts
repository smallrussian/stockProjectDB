/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient<Database>({
    req,
    res
  });
  // this is the data from the client

  if (req.method === "POST") {
    const { portfolio, cashBalance, totalValue, user_id } = req.body;
    console.log(portfolio, cashBalance, totalValue, user_id);
    const { error } = await supabase
      .from("portfolios")
      .update({
        portfolio,
        cash_balance: cashBalance,
        total_value: totalValue
      })
      .eq("user_id", user_id)
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(portfolio);
  }
  if (req.body === "GET") {
    const { data, error } = await supabase
      .from("portfolios")
      .select("portfolio");
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const portfolio = data?.[0].portfolio;
    return res.status(200).json({ portfolio });
  }
  return res.status(405).json({ error: "Method not allowed" });
};
export default handler;
