import { useState } from "react";
import StockChart from "@/components/StockChart";
import StockSearch from "@/components/StockSearch";
import PortfolioTable from "@/components/PortfolioTable";
import { useUser } from "@/utils/useUser";
import axios from "axios";

export type PortfolioItem = {
  symbol: string;
  shares: number;
}
const App = () => {
  const [portfolio, setPortfolio] = useState<Record<string, PortfolioItem>>({});
  const [cashBalance, setCashBalance] = useState(10000);
  const [currentPrice , setCurrentPrice] = useState<number>(0);
  const [searchedSymbol , setSearchedSymbol] = useState<string>("AAPL");
  const {userDetails} = useUser()
  const user_id = userDetails?.id
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
    axios.post('/api/portfolio', { portfolio: newPortfolio, cashBalance, user_id });
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
      axios.post('/api/portfolio', { portfolio: newPortfolio, cashBalance, user_id });
    }
  };
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">Stock Search</h1>
      <div className="search">
        <StockSearch onSymbolSubmit={setSearchedSymbol}/>
        <StockChart symbol={searchedSymbol} setCurrentPrice={setCurrentPrice} handleBuy={handleBuy} handleSell={handleSell} />
      </div>
      <PortfolioTable currentPrice={currentPrice} handleBuy={handleBuy} handleSell={handleSell} portfolio={portfolio} cashBalance={cashBalance}/>
    </div>
  );
};
export default App;