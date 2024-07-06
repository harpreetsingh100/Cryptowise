"use client";

import React from "react";
import { useGetMarketDataQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import { formatNumber } from "../../utils/helperFunctions";
import { Line } from "rc-progress";
import BitcoinIcon from "@/svg/BitcoinIcon";
import EtheriumIcon from "@/svg/EtheriumIcon";
import CoinIcon from "@/svg/CoinIcon";
import ExchangeIcon from "@/svg/ExchangeIcon";
import ArrowIcon from "@/svg/ArrowUpIcon";
import DynamicCurrencyButton from "../DynamicCurrencyButton";

const MarketDataBar = () => {
  const { data, error, isLoading, isSuccess, isUninitialized } =
    useGetMarketDataQuery("");
  const { currencyType } = useAppSelector((state) => state.currency);
  const formattedNumber: string = formatNumber(
    data?.data?.total_market_cap[currencyType.toLowerCase()]
  );
  const formattedVolume: string = formatNumber(
    data?.data.total_volume[currencyType.toLowerCase()]
  );

  if (error) {
    return <div>Something went wrong</div>;
  }
  if (isLoading || isUninitialized) {
    return (
      <div className="dark:bg-darkPurple bg-lightPurple text-lightText h-[6vh] flex justify-center items-center gap-10 text-sm">
        Loading
      </div>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className="dark:bg-darkPurple bg-lightPurple text-lightText h-[6vh] flex justify-center items-center gap-10 text-sm">
          <div className="flex items-center justify-center gap-2">
            <span>
              <CoinIcon />
            </span>
            <span className="text-xs">
              Coins : {data?.data.active_cryptocurrencies}
            </span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span>
              <ExchangeIcon />
            </span>
            <span className="text-xs">Exchange: {data?.data?.markets}</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span>
              <ArrowIcon />
            </span>
            <span className="text-xs"> {formattedNumber}</span>
          </div>
          <div className="text-xs flex justify-center items-center gap-1">
            <span>
              <DynamicCurrencyButton />
            </span>
            <span className="text-xs">{formattedVolume}</span>
            <div className="w-12 flex items-center justify-center">
              <Line
                percent={20}
                strokeWidth={10}
                strokeColor="white"
                trailWidth={10}
                trailColor="gray"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <BitcoinIcon />
            </div>
            <h2 className="text-xs">BTC</h2>
            <div className="w-12 flex items-center justify-center">
              <Line
                percent={data?.data?.market_cap_percentage?.btc.toFixed(0)}
                strokeWidth={10}
                strokeColor="#f7931a"
                trailWidth={10}
                trailColor="gray"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <EtheriumIcon />
            </div>
            <h2 className="text-xs">ETH</h2>
            <div className="w-12 flex items-center justify-center">
              <Line
                percent={data?.data?.market_cap_percentage?.eth.toFixed(0)}
                strokeWidth={10}
                strokeColor="#849dff"
                trailWidth={10}
                trailColor="gray"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketDataBar;
