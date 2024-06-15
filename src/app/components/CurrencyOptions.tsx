import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import { setCurrencyType } from "@/lib/features/currencySlice";

type ChildComponentProps = {
  setShowCurrencyOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const CurrencyOptions: React.FC<ChildComponentProps> = ({
  setShowCurrencyOptions,
}) => {
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (currency: string) => {
    dispatch(setCurrencyType(currency));
    setShowCurrencyOptions(false);
  };

  return (
    <div className="bg-[#ebebfd] rounded-lg  px-3 dark:bg-[#191925] min-w-18 max-w-24 flex justify-between items-center cursor-pointer absolute top-14 left-0 flex-col gap-3 p-2">
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-24 max-w-24"
        onClick={() => {
          handleCurrencyChange("USD");
        }}>
        <div>USD</div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16"
        onClick={() => {
          handleCurrencyChange("EUR");
        }}>
        <div>EUR</div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16"
        onClick={() => {
          handleCurrencyChange("GBP");
        }}>
        <div>GBP</div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16"
        onClick={() => {
          handleCurrencyChange("BTC");
        }}>
        <div>BTC</div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16"
        onClick={() => {
          handleCurrencyChange("ETH");
        }}>
        <div>ETH</div>
      </div>
    </div>
  );
};

export default CurrencyOptions;
