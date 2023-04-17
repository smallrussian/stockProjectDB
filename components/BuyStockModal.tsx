import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
type BuyStockModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onBuy: (symbol: string, shares: number) => void;
    symbol: string ;
    currentPrice: number;
}


const BuyStockModal = ({isOpen, onClose, onBuy, symbol, currentPrice}: BuyStockModalProps) => {
    const [shares, setShares] = useState(0);
    const handleConfirmBuy = () => {
        onBuy(symbol, shares);
        onClose();
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-800"
                        >
                            Buy {symbol} for ${(shares*currentPrice).toFixed(2)}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                How many shares would you like to buy?
                            </p>
                        </div>
                        <div className="mt-4">
                            <input
                                type="number"
                                className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 w-fit"
                                value={shares}
                                onChange={(e) => setShares(parseInt(e.target.value))}
                                min={0}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={handleConfirmBuy}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default BuyStockModal;