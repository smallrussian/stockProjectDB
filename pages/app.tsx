/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import StockChart from "@/components/StockChart";
import StockSearch from "@/components/StockSearch";
import PortfolioTable from "@/components/PortfolioTable";
import { useUser } from "@/utils/useUser";
import axios from "axios";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { fetchStockPrices } from "@/utils/useIEXCloudAPI";
import type { User } from "@supabase/auth-helpers-nextjs";
import Navbar from "@/components/ui/Navbar";

export interface StockPriceMap {
  [symbol: string]: number;
}

export type PortfolioItem = {
  symbol: string;
  shares: number;
};
type Props = {
  portfolioProp: Record<string, PortfolioItem>;
  cash_balance: number;
  total_value: number;
  user: User;
};

const App = ({ portfolioProp, cash_balance, total_value, user }: Props) => {
  const [portfolio, setPortfolio] =
    useState<Record<string, PortfolioItem>>(portfolioProp);
  const [cashBalance, setCashBalance] = useState(cash_balance);
  const [totalValue, setTotalValue] = useState<number>(total_value);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentPrices, setCurrentPrices] = useState<StockPriceMap>({});
  const [searchedSymbol, setSearchedSymbol] = useState<string>("AAPL");

  const fetchPrices = async () => {
    // an empty prices object with a
    const prices: StockPriceMap = {};
    console.log("something");
    // eslint-disable-next-line no-restricted-syntax
    for (const symbol of Object.keys(portfolio)) {
      // eslint-disable-next-line no-await-in-loop
      const price = await fetchStockPrices(symbol);
      console.log(`${symbol} is ${price}`);
      prices[symbol] = price;
    }
    setCurrentPrices(prices);
  };
  const { userDetails } = useUser();
  useEffect(() => {
    fetchPrices();
  }, []);
  useEffect(() => {
    if (Object.keys(portfolio).length > 0) {
      fetchPrices();
    }
  }, [portfolio]);
  const calculateTotalValue = (
    // eslint-disable-next-line no-shadow
    portfolio: Record<string, PortfolioItem>,
    // eslint-disable-next-line no-shadow
    currentPrices: StockPriceMap
  ) => {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const symbol of Object.keys(portfolio)) {
      // eslint-disable-next-line prefer-destructuring
      const shares = portfolio[symbol].shares;
      const price = currentPrices[symbol];
      total += shares * price;
    }
    return total;
  };
  const handleBuy = (symbol: string, shares: number) => {
    if (!currentPrice ?? currentPrice === null) return;

    const newPortfolio = { ...portfolio };
    if (newPortfolio[symbol]) {
      newPortfolio[symbol].shares += shares;
    } else {
      newPortfolio[symbol] = { symbol, shares };
    }
    setPortfolio(newPortfolio);
    setCashBalance(cashBalance - currentPrice * shares);
    const newTotalValue = calculateTotalValue(portfolio, currentPrices);
    setTotalValue(cashBalance + newTotalValue);
  };

  const handleSell = (symbol: string, shares: number) => {
    if (!currentPrice ?? currentPrice === null) return;

    const newPortfolio = { ...portfolio };
    if (newPortfolio[symbol] && newPortfolio[symbol].shares >= shares) {
      newPortfolio[symbol].shares -= shares;

      if (newPortfolio[symbol].shares === 0) {
        delete newPortfolio[symbol];
      }
      setPortfolio(newPortfolio);
      setCashBalance(cashBalance + currentPrice * shares);
      const newTotalValue = calculateTotalValue(portfolio, currentPrices);
      setTotalValue(cashBalance + newTotalValue);
    }
  };
  useEffect(() => {
    axios.post("/api/portfolio", {
      portfolio,
      cashBalance,
      totalValue,
      // eslint-disable-next-line camelcase
      user_id: user.id
    });
  }, [portfolio, cashBalance, totalValue]);
  return (
    <div>
      <Navbar userDetails={userDetails} />
      <div className="container p-4 mx-auto">
        <h1 className="text-2xl font-bold">Stock Search</h1>
        <div className="search">
          <StockSearch onSymbolSubmit={setSearchedSymbol} />
          <StockChart
            symbol={searchedSymbol}
            setCurrentPrice={setCurrentPrice}
            handleBuy={handleBuy}
            currentPrice={currentPrice}
          />
        </div>
        <div>
          <PortfolioTable
            handleBuy={handleBuy}
            handleSell={handleSell}
            portfolio={portfolio}
            cashBalance={cashBalance}
            totalValue={totalValue}
            currentPrices={currentPrices}
          />
        </div>
      </div>
    </div>
  );
};
export default App;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log("its trying");
  const supabase = createServerSupabaseClient(context);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  console.log(session.user.id);
  const { data: portfolios, error } = await supabase
    .from("portfolios")
    .select("portfolio, cash_balance, total_value")
    .eq("user_id", session.user.id);
  if (error) {
    console.log(error);
  }
  return {
    props: {
      user: session.user,
      portfolioProp: portfolios?.[0].portfolio,
      cash_balance: portfolios?.[0].cash_balance,
      total_value: portfolios?.[0].total_value
    }
  };
};
