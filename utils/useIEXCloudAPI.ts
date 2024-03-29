import { StockItem } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.iex.cloud/v1/data/core";
const API_KEY = "pk_d6fc2206e9d043759c2c58ccd5531fba";
// https://api.iex.cloud/v1/data/core/historical_prices/
export const useIEXCloudAPI = (
  symbol: string | null,
  range: string
): { data: StockItem[]; loading: boolean; error: string } => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/historical_prices/${symbol}?range=${range}&token=${API_KEY}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("it failed");
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, range]);
  return { data, loading, error };
};

export const fetchStockPrices = async (symbol: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/${symbol}/chart/1w?token=${API_KEY}`
  );
  console.log(data);
  return data[0].close;
};
