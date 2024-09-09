"use client";

import { useEffect, useState } from "react";
import ConverterBox from "./ConverterBox";
import { useGetChartCoinDataQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import { PiArrowsDownUp } from "react-icons/pi";
import ConverterChart from "../Charts/ConverterChart";
import DaysButtons from "../DaysButtons";

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
  const { data: coinOneData } = useGetChartCoinDataQuery(coinOne);
  const { data: coinTwoData } = useGetChartCoinDataQuery(coinTwo);
  const { currencyType } = useAppSelector((state) => state.currency);

  const { data: chartDataOfCoin } = useGetChartCoinDataQuery(
    `${coinOne}/market_chart?vs_currency=${currencyType}&days=${days}`
  );
  const coinOnePrice = coinOneData?.market_data.current_price;
  const coinTwoPrice = coinOneData?.market_data.current_price;

  useEffect(() => {
    if (inputName === "input1") {
      setInputRight(
        (
          (inputLeft * coinOnePrice?.[currencyType?.toLowerCase()]) /
          coinTwoPrice?.[currencyType?.toLowerCase()]
        ).toFixed(2)
      );
    } else {
      setInputLeft(
        (
          (inputRight * coinTwoPrice?.[currencyType?.toLowerCase()]) /
          coinOnePrice?.[currencyType?.toLowerCase()]
        ).toFixed(2)
      );
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
      <div className="flex justify-between w-full relative">
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
      <div className="mt-6">
        <ConverterChart
          chartDataOfCoin={chartDataOfCoin}
          days={days}
          coinOneName={coinOne}
          coinTwoName={coinTwo}
        />
      </div>
      <div className="w-[315px] flex gap-2 bg-[#E3E5FB] dark:bg-[#232337] rounded-lg mt-6 text-black dark:text-white">
        <DaysButtons days={days} setDays={setDays} />
      </div>
    </div>
  );
};

export default ConverterBoxes;
