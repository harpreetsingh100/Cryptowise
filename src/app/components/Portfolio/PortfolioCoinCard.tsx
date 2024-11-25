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
          <div className="h-80 w-full flex">
            <div className="dark:bg-[#1E1932] bg-white w-[20%] h-full flex justify-center items-center flex-col">
              <div className="py-4 px-5 rounded-lg mb-3 bg-[#EBEBFC] dark:bg-[#2C2C4A]">
                <Image
                  src={coin?.image}
                  alt="coin-image"
                  width={30}
                  height={10}
                />
              </div>
              <h2> {capitalizeFirstLetter(coin?.coinName)}</h2>
              <h2>{"(" + coin?.symbol?.toUpperCase() + ")"}</h2>
            </div>
            <div className="dark:bg-[#191932] bg-[#EBEBFC] w-[80%] h-full flex flex-col">
              <div className="h-1/2 w-full mt-6">
                <div className="w-full flex justify-between text-center">
                  <div className="text-center">
                    <h2 className="text-lg ml-16">Market Price</h2>
                  </div>
                  <div className="text-center w-1/4 flex justify-center items-center ">
                    <motion.button
                      whileHover={{ scale: 1.09 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 rounded-lg text-white bg-[#A5A4DA] dark:bg-[#3A3978] "
                      onClick={() => {
                        setShowDeleteCoinPortal(true);
                        setSelectedId(coin?.id);
                      }}>
                      <RiDeleteBin6Line size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="flex items-center mt-8 w-full ">
                  <div className="w-1/4 text-center">
                    <h2 className="text-sm">Current Price</h2>
                    <h3 className="text-[#20CAC0] text-sm flex justify-center items-center gap-1">
                      <p>
                        <DynamicCurrencyButton width={12} height={12} />
                      </p>
                      <p>
                        {data && addCommas(data[0]?.current_price?.toFixed(2))}
                      </p>
                    </h3>
                  </div>
                  <div className="w-1/4 text-center">
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
                  <div className="w-1/4 text-center">
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
                  <div className="w-1/4 text-center">
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
              <div className="border-[0.1px] border-white"></div>
              <div className="h-1/2 w-full mt-6">
                <div className="w-full flex justify-between text-center">
                  <div className="text-center ml-4">
                    <h2 className="text-lg ml-16">Your Coin</h2>
                  </div>
                  <div className="text-center w-1/4 flex justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.09 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 rounded-lg text-white bg-[#A5A4DA] dark:bg-[#3A3978]"
                      onClick={() => {
                        setShowPortfolioPortal(true);
                        setShowEditCoinPortal(true);
                        setSelectedId(coin?.id);
                      }}>
                      <AiFillEdit size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="flex items-center mt-8 w-full">
                  <div className="w-1/4 text-center">
                    <h2 className="text-sm">Coin Amount</h2>
                    <h3 className="text-[#20CAC0] text-sm">{coin?.amount}</h3>
                  </div>
                  <div className="w-1/4 text-center">
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
                  <div className="w-1/4 text-center">
                    <h2 className="text-sm">
                      <span className="text-[#20CAC0]"> Gain</span>/
                      <span className="text-[#FE2264]"> Loss</span>
                    </h2>
                    <div
                      className={`${
                        gainOrLossAmount && gainOrLossAmount < 0
                          ? "text-[#FE2264] text-sm flex items-center justify-center gap-1"
                          : "text-[#20CAC0] text-sm flex items-center justify-center gap-1"
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
                  <div className="w-1/4 text-center">
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
            <h2 className="text-2xl"> Failed to fetch data</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCoinCard;
