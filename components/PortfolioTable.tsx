import { PortfolioItem } from "@/pages/app";
import { Listbox, Transition } from "@headlessui/react";
import { TextInput } from "flowbite-react";
import React, { useState, Fragment, useEffect } from "react";
import {CheckIcon} from "@heroicons/react/20/solid";
import { isEmpty } from "@/utils/helpers";


type Props = {
    currentPrice : number
    handleBuy : (symbol: string, shares: number) => void;
    handleSell : (symbol: string, shares: number) => void;
    portfolio: {
        [symbol: string]: {
          shares: number;
        }
    }
    cashBalance: number;
    totalValue: number
    currentPrices : {
        [symbol: string]: number;
    }
}

const PortfolioTable = ({currentPrice, handleBuy, handleSell, portfolio, cashBalance, totalValue,
currentPrices}: Props) => {
    const [selectedStock , setSelectedStock] = useState<string>("AAPL");
    const [shareQuantity , setShareQuantity] = useState<number>(0);

    const actions = [
        { id: 1, name: "Buy" },
        { id: 2, name: "Sell" },
    ]
    const [selectedAction, setSelectedAction] = useState(actions[0]);
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShareQuantity(parseInt(e.target.value));
        };
    const handleCheckboxChange = (symbol: string) => {
        setSelectedStock(symbol);
        };
      
      
      console.log(portfolio);
        return ( 
        <div className="w-fit">
            <h1 className="text-center py-1">Portfolio</h1>
            <table>
                <thead>
                    <tr>
                        <th className="px-2">Symbol</th>
                        <th className="px-2">Shares</th>
                        <th className="px-2">Value</th>
                        <th className="px-2">Buy/Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(portfolio).map( ([symbol, item]) => (
                        <tr key={symbol}>
                            <td>{symbol}</td>
                            <td>{item.shares}</td>
                            <td>${(item.shares * currentPrices[symbol]).toFixed(2)}</td>
                            <td className="grid">
                                <input
                                    className="items-center" 
                                    type="checkbox"
                                    checked = {selectedStock === symbol}
                                    onChange = {() => handleCheckboxChange(symbol)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            
        <div className="flex flex-row justify-between items-center mt-4">
        <TextInput
          style={{color: "white !important"}}
          name="quantity"
          type={"number" || "text"}
          value={shareQuantity}
          onChange={handleQuantityChange}
          placeholder="Enter quantity"
        />
        <div className="relative px-4">
          <Listbox value={selectedAction} onChange={(value) => setSelectedAction(value)}>
            <Listbox.Button className="relative w-32 py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="text-black block truncate">{selectedAction.name}</span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 w-32 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {actions.map((action) => (
                  <Listbox.Option key={action.id} value={action} as={Fragment}>
                    {({ selected, active }) => (
                      <li
                        className={`${
                          active ? 'bg-blue-500 text-black' : 'bg-white text-gray-800'} py-2 pl-3 pr-4 cursor-default select-none`}
                      >
                        {selected && <CheckIcon />}
                        {action.name}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
          <button
            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"  
            onClick={() => {
                if (selectedAction.name === "Buy") {
                    handleBuy(selectedStock, shareQuantity);
                } else {
                    handleSell(selectedStock, shareQuantity);
                }
            }}
          >
            OK
          </button>
        </div>
      
        
            </div>
            <div className="relative mt-1">
          
            <div className = "mt-4">
                <p>Cash Balance: ${cashBalance.toFixed(2)}</p>
                <p>Total Value: ${totalValue.toFixed(2)}</p>
            </div>
        </div>
            </div>
          
    );
  
}
export default PortfolioTable;