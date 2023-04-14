import { useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
type BuyStockModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onBuy: (symbol: string, shares: number) => void;
    symbol: string
}


const BuyStockModal = ({isOpen, onClose, onBuy, symbol}: BuyStockModalProps) => {
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
                    
                    