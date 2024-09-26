"use client";

import React, { useRef, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import PortfolioSearchBar from "./PortfolioSearchBar";
import { RiArrowDownSFill } from "react-icons/ri";
import { useGetCoinDataQuery } from "@/lib/features/api";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/utils/helperFunctions";
import SkeletonLoader from "../SkeletonLoader";

interface CoinData {
  amount: number;
  coinName: string;
  id: number;
  image: string;
  purchaseTime: string;
  symbol: string;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  totalVolume: number;
  circulatingSupply: number;
  maxSupply: number;
}

interface PortfolioPortalProps {
  setShowPortfolioPortal: React.Dispatch<React.SetStateAction<boolean>>;
  portfolioCoinList: CoinData[];
  setPortfolioCoinList: React.Dispatch<React.SetStateAction<CoinData[]>>;
  coinName: string;
  setCoinName: React.Dispatch<React.SetStateAction<string>>;
  showEditCoinPortal: boolean;
  setShowEditCoinPortal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: number | null;
}

const PortfolioPortal = ({
  setShowPortfolioPortal,
  portfolioCoinList,
  setPortfolioCoinList,
  coinName,
  setCoinName,
  showEditCoinPortal,
  setShowEditCoinPortal,
  selectedId,
}: PortfolioPortalProps) => {
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const [showSelectCoinInput, setShowSelectCoinInput] = useState<boolean>(true);
  const [showPurchasedDateInput, setShowPurchasedDateInput] =
    useState<boolean>(false);
  const [purchasedDate, setPurchasedDate] = useState("");
  const [showSelectCoinAmount, setShowSelectCoinAmount] =
    useState<boolean>(false);

  const { currencyType } = useAppSelector((state: RootState) => state.currency);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const today = new Date().toISOString().slice(0, 16);

  const { data } = useGetCoinDataQuery({
    currencyType: currencyType?.toLowerCase(),
    coinName,
  });

  const selectedCoinToEdit = portfolioCoinList.filter((coin) => {
    return coin.id == selectedId;
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      coinAmount == 0 ||
      purchasedDate === "" ||
      (!showEditCoinPortal && coinName === "")
    ) {
      return;
    }
    if (showEditCoinPortal) {
      setPortfolioCoinList((prevList) =>
        prevList.map((coin) =>
          coin.id === selectedId
            ? {
                ...coin,
                amount: coinAmount,
                purchasedTime: purchasedDate,
              }
            : coin
        )
      );
    } else {
      const newCoin: CoinData = {
        amount: coinAmount,
        coinName: data && data[0]?.id,
        id: Math.random(),
        image: data[0]?.image,
        purchaseTime: purchasedDate,
        symbol: data[0]?.symbol,
        currentPrice: data[0]?.current_price,
        priceChange24h: data[0]?.price_change_24h,
        marketCap: data[0]?.market_cap,
        totalVolume: data[0]?.total_volume,
        circulatingSupply: data[0]?.circulating_supply,
        maxSupply: data[0]?.max_supply,
      };

      setPortfolioCoinList((prev: any) => {
        const updatedList = [...prev, newCoin];
        localStorage.setItem("portfolioCoinList", JSON.stringify(updatedList));
        return updatedList;
      });
    }

    setShowPortfolioPortal(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="h-screen w-screen absolute top-0 left-0 bg-[rgba(43,38,86,0.7)]">
        <div className="relative h-screen w-screen">
          <div className="w-[60%] h-1/2 py-10 px-12 z-40 rounded-xl inset-0 dark:bg-[#13121A] bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transform ">
            <div className="w-full flex justify-between items-center">
              <h2>Select Coins</h2>
              <span
                onClick={() => {
                  setShowPortfolioPortal(false);
                  setShowEditCoinPortal(false);
                }}
                className="cursor-pointer text-xl">
                <GiCancel />
              </span>
            </div>
            <form
              className="flex justify-between w-full mt-9"
              onSubmit={handleFormSubmit}>
              <div className="h-60 w-[49%] flex justify-center items-center dark:bg-[#1E1931] bg-[#EBEBFC] rounded-lg">
                <div className="dark:bg-[#2C2C4A] bg-white w-[25%] h-[30%] rounded-xl flex justify-center items-center">
                  {data && data[0]?.image ? (
                    <Image
                      src={
                        showEditCoinPortal
                          ? selectedCoinToEdit[0]?.image
                          : data && data[0]?.image
                      }
                      alt="coin-image"
                      width={30}
                      height={10}
                    />
                  ) : (
                    <div className="w-8 h-8">
                      <SkeletonLoader radius="2xl" />
                    </div>
                  )}
                </div>
              </div>
              <div className="h-60 w-[49%]">
                <div className="flex flex-col gap-6 h-[70%]">
                  <div className="h-[33.33%] dark:bg-[#191925] bg-[#EBEBFC] rounded-lg flex items-center py-2 dark:text-[#9CA3AF] text-[#353570]">
                    {showSelectCoinInput ? (
                      <div
                        className="relative w-full flex items-center h-full"
                        ref={inputRef}>
                        <input
                          type="text"
                          placeholder={`${
                            coinName !== ""
                              ? capitalizeFirstLetter(coinName)
                              : showEditCoinPortal
                              ? selectedCoinToEdit[0]?.coinName
                              : "Select Coins"
                          }
                        `}
                          className="h-full w-full dark:bg-[#191925] bg-[#EBEBFC] outline-none px-4 dark:text-[#9CA3AF] text-[#353570]"
                          disabled
                          required
                        />
                        {!showEditCoinPortal && (
                          <RiArrowDownSFill
                            className="absolute right-4 cursor-pointer text-black dark:text-white"
                            onClick={() =>
                              setShowSelectCoinInput((prev: boolean) => !prev)
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <PortfolioSearchBar
                        setCoinName={setCoinName}
                        setShowSelectCoinInput={setShowSelectCoinInput}
                        showSelectCoinInput={showSelectCoinInput}
                        setShowEditCoinPortal={setShowEditCoinPortal}
                      />
                    )}
                  </div>
                  <div className="h-[33.33%] dark:bg-[#191925] bg-[#EBEBFC] rounded-lg flex items-center py-2">
                    {showSelectCoinAmount ? (
                      <input
                        type="number"
                        value={coinAmount}
                        onChange={(e) => setCoinAmount(Number(e.target.value))}
                        min={0}
                        placeholder="Purchased Amount"
                        className="h-full w-full dark:bg-[#191925] bg-[#EBEBFC] outline-none px-4 dark:text-[#9CA3AF] text-[#353570]"
                        required
                      />
                    ) : (
                      <div className="flex items-center relative w-full h-full">
                        <input
                          className="h-full w-full dark:bg-[#191925] bg-[#EBEBFC] outline-none px-4 dark:text-[#9CA3AF] text-[#353570]"
                          placeholder="Purchased Amount"
                          ref={amountRef}
                          disabled
                          required
                        />
                        <RiArrowDownSFill
                          className="absolute right-4 cursor-pointer text-black dark:text-white"
                          onClick={() =>
                            setShowSelectCoinAmount((prev: boolean) => !prev)
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-[33.33%] dark:bg-[#191925] bg-[#EBEBFC] rounded-lg flex items-center py-2">
                    {showPurchasedDateInput ? (
                      <input
                        type="datetime-local"
                        value={purchasedDate}
                        onChange={(e) => setPurchasedDate(e.target.value)}
                        max={today}
                        placeholder="Purchased Amount"
                        className="h-full w-full dark:bg-[#191925] bg-[#EBEBFC] outline-none px-4 dark:text-[#9CA3AF] text-[#353570]"
                        required
                      />
                    ) : (
                      <div className="flex items-center relative w-full">
                        <input
                          className="h-full w-full dark:bg-[#191925] bg-[#EBEBFC] outline-none px-4 dark:text-[#9CA3AF] text-[#353570]"
                          placeholder="Purchased Date"
                          required
                          disabled
                        />
                        <RiArrowDownSFill
                          className="absolute right-4 cursor-pointer text-black dark:text-white"
                          onClick={() =>
                            setShowPurchasedDateInput((prev: boolean) => !prev)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-[30%] flex justify-between items-end ">
                  <button
                    type="button"
                    className="px-5 py-3 rounded-xl dark:bg-[#3A397C] bg-[#A5A4DA] text-white"
                    onClick={() => {
                      setShowPortfolioPortal(false);
                      setShowEditCoinPortal(false);
                    }}>
                    Cancel
                  </button>
                  <div>
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl dark:bg-[#3A397C] bg-[#A5A4DA] text-white">
                      Save and Continue
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPortal;
