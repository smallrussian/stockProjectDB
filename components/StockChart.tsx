import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {Line as NewLine} from 'react-chartjs-2';
import { useIEXCloudAPI } from "../utils/useIEXCloudAPI";
import { useEffect, useState } from "react";
import BuyStockModal from "./BuyStockModal";

type Props = {
  symbol: string;
  setCurrentPrice : (price: number) => void;
  handleBuy : (symbol: string, shares: number) => void;
  handleSell : (symbol: string, shares: number) => void;
  currentPrice: number;
};

const StockChart = ({ symbol, setCurrentPrice, handleBuy, handleSell, currentPrice }: Props) => {
  const [isBuyModalOpen , setIsBuyModalOpen] = useState(false);
  

 /*  const LineChart = ({graphData}:any) => {
    const chartData = {
      labels: graphData.map((item: { date: any; }) => item.date),
      datasets: [
        {
          label: 'Closing Value',
          data: graphData.map((item: { close: any; }) => item.close),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          pointRadius: 2,
        }
      ]
    }
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    }
    return (
      <div className="w-full h-96">
        <NewLine data={chartData} options={options} />
      </div>
    )
  } */
        


  const handleBuyModalOpen = () => {
    setIsBuyModalOpen(true);
  };
  const handleBuyModalClose = () => {
    setIsBuyModalOpen(false);
  };
  //   const API_KEY = process.env.NEXT_SECRET_IEX_CLOUD_API_KEY;
  // const {data, loading, error}: any = undefined
  const [range, setRange] = useState("1m");
  const { data,  loading, error } = useIEXCloudAPI(symbol, range);
  // if (loading) return <Spinner />
  // if (error) return <div>Error fetching stock data</div>

  useEffect(() => {
    if (data && data.length > 0) {
      setCurrentPrice(data[data.length - 1].close);
    }
    }, [data, setCurrentPrice]);

  return (
    <>
      <div className="flex mt-5">
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => setRange("1w")}
          type="button"
        >
          1 Week
        </button>
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => setRange("1m")}
          type="button"
        >
          1 Month
        </button>
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => setRange("3m")}
          type="button"
        >
          3 Months
        </button>
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => setRange("6m")}
          type="button"
        >
          6 Months
        </button>
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => setRange("1y")}
          type="button"
        >
          1 Year
        </button>
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => setRange("5y")}
          type="button"
        >
          5 Years
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Stock Data for {symbol}</h1>
        <button
          className="border border-white text-white px-3 py-2 rounded mr-2 bg-transparent hover:bg-blue-500 hover:text-white"
          onClick={handleBuyModalOpen}
          type="button"
        >
          Buy
        </button>
        <BuyStockModal symbol={symbol}isOpen={isBuyModalOpen} onBuy={handleBuy} onClose={handleBuyModalClose} currentPrice={currentPrice} />
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="open" stroke="#82ca9d" />
        </LineChart>
        {/* <LineChart graphData={data} /> */}
      </div>
    </>
  );
};
export default StockChart;

export async function getStaticProps() {
  return {
    props: {
      key: process.env.NEXT_SECRET_IEX_CLOUD_API_KEY,
    },
  };
}
