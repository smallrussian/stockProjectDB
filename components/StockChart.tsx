import { useIEXCloudAPI } from "@/utils/useIEXCloudAPI"
import axios from "axios"
import { Spinner } from "flowbite-react"

type Props = {
    symbol: string
    range: string
}
export default function StockChart({symbol, range}: Props) {
    const {stockData, loading, error} = useIEXCloudAPI(symbol, range)
    if (loading) return <Spinner /> 
    if (error) return <div>Error fetching stock data</div>

    return (
        <div>