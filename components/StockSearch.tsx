import { useState } from "react";
import { TextInput, Label } from "flowbite-react";



type Props = {
  onSymbolSubmit: (symbol: string) => void;
};

const StockSearch = ({ onSymbolSubmit }: Props) => {
  const [symbol, setSymbol] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSymbolSubmit(symbol);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">
      <Label className="fixtext text-white" htmlFor="symbol">Symbol</Label>
      <TextInput
        style={{color: "white !important"}}
        id="symbol"
        name="symbol"
        type="text"
        sizing = "md"
        value={symbol}
        onChange={handleInputChange}
        placeholder="Enter a stock symbol"
        // className="border-2 text-white border-gray-300 p-2 focus:outline-none focus:border-blue-500 w-fit"
        className="text-white"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-1-md p-2 mt-2 w-fit"
      >
        Search
      </button>
    </form>
  );
};
export default StockSearch;
