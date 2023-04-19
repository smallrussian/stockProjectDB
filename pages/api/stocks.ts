/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient<Database>({
    req,
    res
  });
  const { portfolio, cashBalance, user_id } = req.body; // this is the data from the client

  if (req.body === "POST") {
    const { error } = await supabase
      .from("portfolio")
      .upsert({
        portfolio,
        cash_balance: cashBalance,
        user_id
      })
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
};
export default handler;
