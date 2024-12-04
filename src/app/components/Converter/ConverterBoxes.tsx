"use client";

import { useEffect, useState } from "react";
import ConverterBox from "./ConverterBox";
import {
  useGetChartCoinDataQuery,
  useGetOneCoinDetailQuery,
} from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import { PiArrowsDownUp } from "react-icons/pi";
import ConverterChart from "../Charts/ConverterChart";
import DaysButtons from "../DaysButtons";
import { Circles } from "react-loader-spinner";
import { useTheme } from "next-themes";

const ConverterBoxes = () => {
  const [coinOne, setCoinOne] = useState<string>("bitcoin");
  const [coinTwo, setCoinTwo] = useState<string>("ethereum");
  const [inputName, setInputName] = useState<string>("input1");
  const [inputLeft, setInputLeft] = useState<any>(1);
  const [inputRight, setInputRight] = useState<any>(1);
  const [isLeftCoinListVisible, setIsLeftCoinListVisible] =
    useState<boolean>(false);
  const [isRightCoinListVisible, setIsRightCoinListVisible] =
    useState<boolean>(false);
  const [days, setDays] = useState(1);
  const {
    data: coinOneData,
    isSuccess: isSuccessCoinOne,
    isLoading: isLoadingCoinOne,
    isUninitialized: isUninitializedCoinOne,
    isError: isErrorCoinOne,
  } = useGetOneCoinDetailQuery(coinOne);
  const {
    data: coinTwoData,
    isSuccess: isSuccessCoinTwo,
    isLoading: isLoadingCoinTwo,
    isUninitialized: isUninitializedCoinTwo,
    isError: isErrorCoinTwo,
  } = useGetOneCoinDetailQuery(coinTwo);
  const { currencyType } = useAppSelector((state) => state.currency);
  const windowWidth = window.innerWidth;
  const { theme } = useTheme();

  const {
    isSuccess: isSuccessChartData,
    isError: isErrorChartData,
    isLoading: isLoadingChartData,
  } = useGetChartCoinDataQuery(
    `${coinOne}/market_chart?vs_currency=${currencyType}&days=${days}`
  );
  const coinOnePrice =
    coinOneData?.market_data?.current_price[currencyType?.toLowerCase()];
  const coinTwoPrice =
    coinTwoData?.market_data?.current_price[currencyType?.toLowerCase()];

  useEffect(() => {
    if (inputName === "input1") {
      setInputRight(((inputLeft * coinOnePrice) / coinTwoPrice).toFixed(2));
    } else {
      setInputLeft(((inputRight * coinTwoPrice) / coinOnePrice).toFixed(2));
    }
  }, [
    inputLeft,
    inputRight,
    currencyType,
    coinOne,
    coinTwo,
    coinOnePrice,
    coinTwoPrice,
    inputName,
  ]);

  return (
    <div className="w-full">
      <div className="flex justify-between w-full relative flex-col lg:flex-row">
        <ConverterBox
          sell
          data={coinOneData}
          inputValue={inputLeft}
          setInputValue={setInputLeft}
          setInputName={setInputName}
          inputName="input1"
          isCoinListVisible={isLeftCoinListVisible}
          setIsCoinListVisible={setIsLeftCoinListVisible}
          setCoin={setCoinOne}
          isLoading={isLoadingCoinOne}
          isUninitialized={isUninitializedCoinOne}
          isError={isErrorCoinOne}
          isSuccess={isSuccessCoinOne}
        />
        <ConverterBox
          sell={false}
          data={coinTwoData}
          inputValue={inputRight}
          setInputValue={setInputRight}
          setInputName={setInputName}
          inputName="input2"
          isCoinListVisible={isRightCoinListVisible}
          setIsCoinListVisible={setIsRightCoinListVisible}
          setCoin={setCoinTwo}
          isLoading={isLoadingCoinTwo}
          isUninitialized={isUninitializedCoinTwo}
          isError={isErrorCoinTwo}
          isSuccess={isSuccessCoinTwo}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PiArrowsDownUp
            size={50}
            className="dark:bg-white bg-[#353574] rounded-full dark:text-black text-white p-3  cursor-pointer"
            onClick={() => {
              setCoinOne(coinTwo);
              setCoinTwo(coinOne);
              setInputRight(inputLeft);
              setInputLeft(inputRight);
            }}
          />
        </div>
      </div>
      <div className="my-6">
        {(isErrorChartData || isErrorCoinOne || isErrorCoinTwo) && (
          <div className="h-[400px] bg-white dark:bg-[#191934] py-6 rounded-xl my-6 flex justify-center items-center">
            <h2 className="text-lg sm:text-lg md:text-lg lg:text-2xl">
              Failed to fetch data
            </h2>
          </div>
        )}
        {isLoadingChartData && (
          <div className="h-[400px] bg-white dark:bg-[#191934] py-6 rounded-xl my-6 flex justify-center items-center">
            <Circles
              height={windowWidth > 768 ? "100" : "70"}
              width={windowWidth > 768 ? "100" : "70"}
              color={`${theme === "light" ? "#A9AAEC" : "#6161D6"}`}
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        {isSuccessChartData &&
          !isErrorChartData &&
          !isErrorCoinOne &&
          !isErrorCoinTwo && (
            <ConverterChart days={days} coinOne={coinOne} coinTwo={coinTwo} />
          )}
      </div>
      <div>
        {isSuccessChartData && (
          <div className="w-[298px] lg:w-[330px] flex gap-2 m-auto sm:m-0 bg-[#E3E5FB] dark:bg-[#232337] rounded-lg mt-6 text-black dark:text-white">
            <DaysButtons days={days} setDays={setDays} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConverterBoxes;
