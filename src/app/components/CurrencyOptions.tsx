import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { setCurrencyType } from "@/lib/features/currencySlice";

type ChildComponentProps = {
  setShowCurrencyOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const CurrencyOptions: React.FC<ChildComponentProps> = ({
  setShowCurrencyOptions,
}) => {
  const dispatch = useAppDispatch();
  const { currencyType } = useAppSelector((state) => state.currency);

  const handleCurrencyChange = (currency: string) => {
    dispatch(setCurrencyType(currency));
    setShowCurrencyOptions(false);
  };

  return (
    <div className="bg-[#ebebfd] rounded-lg  dark:bg-[#191925] w-[100px] flex justify-between items-center cursor-pointer absolute top-[-1px] left-[-1px] flex-col gap-3 p-2 py-4 border-[1px] border-[#6B7280] z-50">
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-24 max-w-24 hover:text-[#6161D6]"
        onClick={() => {
          handleCurrencyChange("USD");
        }}>
        <div className={`${currencyType === "USD" && "text-[#6161D6]"}`}>
          USD
        </div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16 hover:text-[#6161D6]"
        onClick={() => {
          handleCurrencyChange("EUR");
        }}>
        <div className={`${currencyType === "EUR" && "text-[#6161D6]"}`}>
          EUR
        </div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16 hover:text-[#6161D6]"
        onClick={() => {
          handleCurrencyChange("GBP");
        }}>
        <div className={`${currencyType === "GBP" && "text-[#6161D6]"}`}>
          GBP
        </div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16 hover:text-[#6161D6]"
        onClick={() => {
          handleCurrencyChange("BTC");
        }}>
        <div className={`${currencyType === "BTC" && "text-[#6161D6]"}`}>
          BTC
        </div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16 hover:text-[#6161D6]"
        onClick={() => {
          handleCurrencyChange("ETH");
        }}>
        <div className={`${currencyType === "ETH" && "text-[#6161D6]"}`}>
          ETH
        </div>
      </div>
    </div>
  );
};

export default CurrencyOptions;
