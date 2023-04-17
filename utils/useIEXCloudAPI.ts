import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://cloud.iexapis.com/stable/stock";
const API_KEY = "pk_d6fc2206e9d043759c2c58ccd5531fba";

export const useIEXCloudAPI = (
  symbol: string | null,
  range: string
): { data: any[]; loading: boolean; error: string } => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  console.log(symbol);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${symbol}/chart/${range}?token=${API_KEY}`
        );
        setData(response.data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError("it failed");
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, range]);
  return { data, loading, error };
};