"use client";

import React from "react";
import { useGetMarketDataQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import { formatNumber } from "../utils/formatMarketData";
import { Line } from "rc-progress";

const GlobalNavbar = () => {
  const { data, error, isLoading, isSuccess, isUninitialized } =
    useGetMarketDataQuery("");
  const currencyType = useAppSelector((state) => state.currency.value);
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
    return <div>Loading</div>;
  }

  return (
    isSuccess && (
      <div className="dark:bg-darkPurple bg-lightPurple text-lightText h-[4vh] flex justify-center items-center gap-10 text-sm">
        <div>Coins : {data?.data.active_cryptocurrencies} </div>
        <div>Exchange: {data?.data?.markets}</div>
        <div>MarketCap : {formattedNumber}</div>
        <div>Volume : {formattedVolume}</div>
        <div className="flex gap-2">
          <h2>BTC</h2>
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
          <h2>ETH</h2>
          <div className="w-12 flex items-center justify-center">
            <Line
              percent={data?.data?.market_cap_percentage?.eth.toFixed(0)}
              strokeWidth={10}
              strokeColor="#849dff"
              trailWidth={10}
              trailColor="gray"
            />{" "}
          </div>
        </div>
      </div>
    )
  );
};

export default GlobalNavbar;
