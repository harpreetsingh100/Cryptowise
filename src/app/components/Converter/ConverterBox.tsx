"use client";

import React, { Dispatch, SetStateAction, useRef } from "react";
import { useAppSelector } from "@/lib/hooks";
import DynamicCurrencyButton from "../DynamicCurrencyButton";
import Image from "next/image";
import CoinsList from "./CoinsList";
import { RiArrowDownSFill } from "react-icons/ri";
import { useHandleClickOutside } from "@/lib/hooks/useHandleClickOutside";
import ConverterBoxLoader from "./ConverterBoxLoader";
import SkeletonLoader from "../SkeletonLoader";
import ConverterBoxError from "./ConverterBoxError";
import { motion } from "framer-motion";

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
  isLoading,
  isError,
  isSuccess,
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
  isLoading: boolean;
  isUninitialized: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  const { currencyType } = useAppSelector((state) => state.currency);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

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
          ? "w-full lg:w-[49%] flex mt-4 h-56  dark:bg-[#191934] rounded-lg flex-col p-4 justify-around"
          : "w-full lg:w-[49%] flex mt-4 h-56  dark:bg-[#1F1934] rounded-lg flex-col p-4 justify-around"
      }relative bg-white`}
      ref={ref}>
      {isSuccess && (
        <div className=" flex-col flex justify-around">
          <h4 className="pt-4">You {sell ? "Sell" : "Buy"}</h4>
          <div className="flex w-full">
            <div className="w-full">
              <div className="flex justify-between items-center w-full">
                <div className="w-5 lg:w-10 flex h-10 items-center mt-4 justify-between relative">
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
                    {data ? (
                      <div>
                        <div className="ml-3 mt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-28 sm:max-w-60 lg:max-w-48 xl:max-w-60 text-lg sm:text-lg md:text-lg lg:text-2xl">
                          <div className="sm:flex max-w-28 sm:max-w-60 lg:max-w-48 xl:max-w-60  truncate sm:overflow-visible">
                            <span className="max-w-10 sm:max-w-40 truncate">
                              {data?.name}
                            </span>
                            <span className="ml-1 lg:ml-0 hidden sm:block">
                              ({data?.symbol?.toUpperCase()})
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <h2 className="text-lg sm:text-lg md:text-lg lg:text-2xl ml-3 mt-2 overflow-hidden text-ellipsis whitespace-nowrap w-60">
                        Failed to fetch data
                      </h2>
                    )}

                    <RiArrowDownSFill
                      className="lg:ml-3 mt-2 z-50 cursor-pointer dark:text-white text-black"
                      size={25}
                    />
                  </div>
                  {isCoinListVisible && (
                    <motion.div
                      className="absolute top-16 w-[290px] sm:w-[360px] z-50 lg:w-[400px] lg:left-[-10px] h-80 overflow-y-auto dark:bg-[#191925] bg-[#EBEBFC] px-4 sm:px-8 py-4 rounded-2xl"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit">
                      <CoinsList
                        setCoin={setCoin}
                        setIsCoinListVisible={setIsCoinListVisible}
                      />
                    </motion.div>
                  )}
                </div>
                <div className="mt-6 mr-3 z-30">
                  <input
                    type="text"
                    value={inputValue}
                    name={inputName}
                    className="py-2 rounded-xl w-28 lg:w-20 xl:w-full px-4 cursor-pointer bg-[#B0B0F0] dark:bg-black "
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
                  1 {data?.symbol?.toUpperCase()} ={" "}
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
      )}
      {isLoading && (
        <div className=" flex-col flex justify-around">
          <h4 className="pt-4 ">You {sell ? "Sell" : "Buy"}</h4>
          <div className="flex w-full">
            <div className="w-full">
              <div className="flex justify-between items-center w-full">
                <ConverterBoxLoader />
                <div className="mt-6 mr-3 z-30">
                  <SkeletonLoader width={40} height={8} />
                </div>
              </div>

              <div className="h-1 dark:bg-white bg-[#9A9ABA] w-full rounded-2xl mt-5"></div>
              <div className="pt-4 ml-4">
                <SkeletonLoader width={40} height={8} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isError && (
        <ConverterBoxError
          sell={sell}
          setIsCoinListVisible={setIsCoinListVisible}
          isCoinListVisible={isCoinListVisible}
          setCoin={setCoin}
          inputValue={inputValue}
          inputName={inputName}
          setInputValue={setInputValue}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ConverterBox;
