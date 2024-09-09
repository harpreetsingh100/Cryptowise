"use client";

import React, { Dispatch, SetStateAction, useRef } from "react";
import { useAppSelector } from "@/lib/hooks";
import DynamicCurrencyButton from "../DynamicCurrencyButton";
import Image from "next/image";
import CoinsList from "./CoinsList";
import { RiArrowDownSFill } from "react-icons/ri";
import { useHandleClickOutside } from "@/lib/hooks/useHandleClickOutside";

const ConverterBox = ({
  sell,
  data,
  inputValue,
  setInputValue,
  setInputName,
  inputName,
  isCoinListVisible,
  setIsCoinListVisible,
  setCoin,
}: {
  sell: boolean;
  data: {
    image: {
      large: string;
    };
    name: string;
    symbol: string;
    market_data: any;
  };
  inputValue: number | string;
  setInputValue: Dispatch<SetStateAction<string | number>>;
  setInputName: Dispatch<SetStateAction<string>>;
  inputName: string;
  isCoinListVisible: boolean;
  setIsCoinListVisible: Dispatch<SetStateAction<boolean>>;
  setCoin: Dispatch<SetStateAction<string>>;
}) => {
  const { currencyType } = useAppSelector((state) => state.currency);

  const ref = useRef<HTMLDivElement>(null);

  const closeCoinList = () => {
    setIsCoinListVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.name);
  };

  useHandleClickOutside(ref, closeCoinList);

  return (
    <div
      className={`${
        sell
          ? "w-[49%] flex mt-4 h-56  dark:bg-[#191934] rounded-lg flex-col p-4 justify-around"
          : "w-[49%] flex mt-4 h-56  dark:bg-[#1F1934] rounded-lg flex-col p-4 justify-around"
      }relative bg-white`}
      ref={ref}>
      <h4 className="pt-4 ">You {sell ? "Sell" : "Buy"}</h4>
      <div className="flex w-full">
        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <div className="w-10 flex h-10 items-center mt-4 justify-between relative">
              <Image
                src={data?.image?.large}
                width={100}
                height={10}
                alt="coin-image"
                className="mt-2"
              />
              <div
                className="flex items-center z-40 cursor-pointer"
                onClick={() => {
                  setIsCoinListVisible(
                    (prevCoinList: boolean) => !prevCoinList
                  );
                }}>
                <h2 className="text-2xl ml-3 mt-2">
                  {data?.name}({data?.symbol.toUpperCase()})
                </h2>

                <RiArrowDownSFill
                  color="white"
                  className="ml-3 mt-2 z-50 cursor-pointer"
                  size={25}
                />
              </div>
              {isCoinListVisible && (
                <div className="absolute top-16 w-[400px] left-[-10px] h-80 overflow-y-auto bg-[#191925] px-8 py-4 rounded-2xl">
                  <CoinsList
                    setCoin={setCoin}
                    setIsCoinListVisible={setIsCoinListVisible}
                  />
                </div>
              )}
            </div>
            <div className="mt-8 mr-3 z-30">
              <input
                type="text"
                value={inputValue}
                name={inputName}
                className="py-2 rounded-xl px-4 cursor-pointer"
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleInputChange(e);
                }}
              />
            </div>
          </div>

          <div className="h-1 dark:bg-white bg-[#9A9ABA] w-full rounded-2xl mt-5"></div>
          <div>
            <h2 className="pt-4 flex ">
              1 {data?.symbol.toUpperCase()} ={" "}
              <span className="mx-1">
                <DynamicCurrencyButton />
              </span>
              {data?.market_data?.current_price[
                currencyType.toLowerCase()
              ].toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverterBox;