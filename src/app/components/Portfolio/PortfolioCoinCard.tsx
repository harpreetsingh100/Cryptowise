import React from "react";
import {
  addCommas,
  capitalizeFirstLetter,
  convertDate,
  convertDateFormat,
  formatDate,
} from "@/app/utils/helperFunctions";
import {
  useGetCoinDataQuery,
  useGetHistoryDateCoinDetailQuery,
} from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Line } from "rc-progress";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import DynamicCurrencyButton from "../DynamicCurrencyButton";
import PortfolioCoinCardLoader from "./PortfolioCoinCardLoader";
import { motion } from "framer-motion";

interface Coin {
  id: number;
  coinName: string;
  symbol: string;
  image: string;
  purchaseTime: string;
  amount: number;
}

interface PortfolioCoinCardProps {
  coin: Coin;
  showDeleteCoinPortal: boolean;
  setShowDeleteCoinPortal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  setShowPortfolioPortal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditCoinPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortfolioCoinCard = ({
  coin,
  setShowDeleteCoinPortal,
  setSelectedId,
  setShowPortfolioPortal,
  setShowEditCoinPortal,
}: PortfolioCoinCardProps) => {
  const purchaseTime = coin?.purchaseTime;
  const purchaseDate = convertDate(purchaseTime).slice(0, 8);
  const coinName = coin?.coinName;
  const dateInRightOrder = convertDateFormat(purchaseDate);
  const { currencyType } = useAppSelector((state: RootState) => state.currency);

  const {
    data,
    isLoading: isLoadingOfCurrentData,
    isError: isErrorOfCurrentData,
    isSuccess: isSuccessOfCurrentData,
  } = useGetCoinDataQuery({
    currencyType: currencyType?.toLowerCase(),
    coinName,
  });

  const {
    data: historyDateCoinData,
    isLoading: isLoadingOfHistoryData,
    isError: isErrorOfHistoryData,
    isSuccess: isSuccessOfHistoryData,
  } = useGetHistoryDateCoinDetailQuery({
    id: coin?.coinName,
    date: dateInRightOrder,
  });

  const purchasePrice =
    historyDateCoinData?.market_data?.current_price[
      currencyType.toLowerCase()
    ]?.toFixed(2);

  const priceChangeAmount =
    (data && data[0]?.current_price / Math.floor(purchasePrice)) * 100;
  const gainOrLossAmount = priceChangeAmount * coin.amount;

  return (
    <div>
      <div className="flex gap-8 flex-col my-8">
        {isSuccessOfCurrentData && isSuccessOfHistoryData && (
          <div className="h-[700px] lg:h-96 w-full flex flex-col lg:flex-row">
            <div className="dark:bg-[#1E1932] bg-white p-2 lg:p-0 w-full lg:w-[20%] h-full flex justify-center items-center flex-col">
              <div className="py-4 px-5 rounded-lg mb-3 bg-[#EBEBFC] dark:bg-[#2C2C4A] w-32 h-28 lg:w-auto lg:h-auto flex justify-center items-center lg:block">
                <Image
                  src={coin?.image}
                  alt="coin-image"
                  width={30}
                  height={10}
                  className="w-10 lg:w-8"
                />
              </div>
              <h2 className="text-xl lg:text-lg">
                {" "}
                {capitalizeFirstLetter(coin?.coinName)}
              </h2>
              <h2 className="mt-3 lg:mt-0">
                {"(" + coin?.symbol?.toUpperCase() + ")"}
              </h2>
            </div>
            <div className="dark:bg-[#191932] bg-[#EBEBFC] w-full lg:w-[80%] h-full flex flex-col pb-4 lg:pb-0 px-3 lg:px-0">
              <div className="h-1/2 w-full lg:mt-6 py-4">
                <div className="w-full flex justify-between text-center">
                  <div className="text-left ml-4 lg:text-center">
                    <h2 className="text-xl ml-4 lg:ml-16 mt-2">Market Price</h2>
                  </div>
                  <div className="text-center w-1/4 flex justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.09 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 rounded-lg text-white bg-[#A5A4DA] dark:bg-[#3A3978] sm:ml-14 lg:ml-0"
                      onClick={() => {
                        setShowDeleteCoinPortal(true);
                        setSelectedId(coin?.id);
                      }}>
                      <RiDeleteBin6Line size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-center lg:items-center mt-8 w-full flex-wrap gap-2 lg:gap-0">
                  <div className=" w-[45%] lg:w-1/4 text-center  flex flex-col gap-4 lg:block lg:gap-0 border-[1px] lg:border-0 border-black dark:border-white rounded-xl p-3">
                    <h2 className="text-sm">Current Price</h2>
                    <h3 className="text-[#20CAC0] text-sm flex justify-center items-center gap-2">
                      <p>
                        <DynamicCurrencyButton width={12} height={12} />
                      </p>
                      <p>
                        {data && addCommas(data[0]?.current_price?.toFixed(2))}
                      </p>
                    </h3>
                  </div>
                  <div className="w-[45%]  lg:w-1/4 text-center  flex flex-col gap-4 lg:block lg:gap-0 border-[1px] lg:border-0 border-black dark:border-white rounded-xl p-3">
                    <h2 className="text-sm">Price change 24h:</h2>
                    <h3
                      className={`${
                        data && data[0]?.price_change_percentage_24h < 0
                          ? "text-[#FE2264] text-sm flex items-center justify-center gap-1"
                          : "text-[#20CAC0] text-sm flex items-center justify-center gap-1"
                      }`}>
                      <p>
                        <DynamicCurrencyButton width={12} height={12} />
                      </p>
                      <p>{data && data[0]?.price_change_percentage_24h}</p>
                    </h3>
                  </div>
                  <div className="w-2/4 lg:w-1/4  text-center  flex flex-col mt-3 lg:mt-0 gap-4 hidden lg:block lg:gap-0">
                    <h2 className="text-sm">Market Cap vs Volume:</h2>
                    <div className="text-sm flex justify-center">
                      <div className="flex justify-center items-center gap-2">
                        <h2>
                          {data &&
                            Math.floor(
                              (data[0]?.total_volume / data[0]?.market_cap) *
                                100
                            ) + "%"}
                        </h2>
                        <Line
                          percent={
                            (data &&
                              data[0]?.total_volume / data[0]?.market_cap) * 100
                          }
                          strokeWidth={1}
                          strokeColor="#20CAC0"
                          trailWidth={10}
                          trailColor="#ABEEF2"
                          className="w-1/4 h-[6px] rounded-lg my-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/4 lg:w-1/4 text-center flex flex-col mt-3 lg:mt-0 gap-4 hidden lg:block lg:gap-0">
                    <h2 className="text-sm">Circ supply vs max:</h2>
                    <div className="text-[#20CAC0] text-sm flex justify-center">
                      <h3>
                        {data &&
                          (
                            data[0]?.max_supply / data[0]?.circulating_supply
                          )?.toFixed(2)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:border-[0.1px] w-[90%] border-[1px] border-white m-auto"></div>
              <div className="h-1/2 w-full lg:mt-6 py-6 lg:py-0">
                <div className="w-full flex justify-between text-center">
                  <div className="text-lg ml-4 mt-2">
                    <h2 className="text-xl ml-4 lg:ml-16 mt-2">Your Coin</h2>
                  </div>
                  <div className="text-center w-1/4 flex justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.09 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 rounded-lg text-white bg-[#A5A4DA] dark:bg-[#3A3978] mt-3 sm:lg-0 sm:ml-14 lg:ml-0"
                      onClick={() => {
                        setShowPortfolioPortal(true);
                        setShowEditCoinPortal(true);
                        setSelectedId(coin?.id);
                      }}>
                      <AiFillEdit size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-center lg:items-center mt-8 w-full gap-2 lg:gap-0">
                  <div className="w-[45%] lg:w-1/4 text-center border-[1px] lg:border-0 border-black dark:border-white rounded-xl p-3">
                    <h2 className="text-sm">Coin Amount</h2>
                    <h3 className="text-[#20CAC0] text-sm mt-4 lg:mt-0">
                      {coin?.amount}
                    </h3>
                  </div>
                  <div className="w-1/4 text-center hidden lg:block">
                    <h2 className="text-sm">Amount Value:</h2>
                    <h3 className="text-[#20CAC0] text-sm flex items-center justify-center gap-1">
                      <p>
                        <DynamicCurrencyButton width={12} height={12} />
                      </p>
                      <p>
                        {data &&
                          addCommas(
                            (data[0]?.current_price * coin?.amount).toFixed(2)
                          )}
                      </p>
                    </h3>
                  </div>
                  <div className="w-[45%] lg:w-1/4 text-center border-[1px] lg:border-0 border-black dark:border-white rounded-xl p-3">
                    <h2 className="text-sm">
                      <span className="text-[#20CAC0]"> Gain</span> /
                      <span className="text-[#FE2264]"> Loss</span>
                    </h2>
                    <div
                      className={`${
                        gainOrLossAmount && gainOrLossAmount < 0
                          ? "text-[#FE2264] text-sm flex items-center justify-center gap-1 mt-4 lg:mt-0"
                          : "text-[#20CAC0] text-sm flex items-center justify-center gap-1 mt-4 lg:mt-0"
                      }`}>
                      <p>
                        <DynamicCurrencyButton width={12} height={12} />
                      </p>
                      <p>
                        <h3>
                          {gainOrLossAmount && gainOrLossAmount == Infinity
                            ? "0.00"
                            : gainOrLossAmount.toFixed(2)}
                        </h3>
                      </p>
                    </div>
                  </div>
                  <div className="w-1/4 text-center hidden lg:block">
                    <h2 className="text-sm">Purchase Date:</h2>
                    <h3 className="text-[#20CAC0] text-sm">
                      {formatDate(coin?.purchaseTime)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {(isLoadingOfCurrentData || isLoadingOfHistoryData) && (
          <PortfolioCoinCardLoader />
        )}
        {(isErrorOfCurrentData || isErrorOfHistoryData) && (
          <div className="dark:bg-[#1E1932] bg-white w-full h-80 flex justify-center items-center flex-col">
            <h2 className="text-lg lg:text-2xl"> Failed to fetch data</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCoinCard;
