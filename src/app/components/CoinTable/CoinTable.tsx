"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinTableHeader from "./CoinTableHeader";
import { useGetCoinTableListQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import CoinInfoItem from "./CoinInfoItem";
import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "next-themes";

const CoinTable = () => {
  const { currencyType } = useAppSelector((state) => state.currency);
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState<any[]>([]);

  const { data, error } = useGetCoinTableListQuery({
    currency: currencyType,
    page,
    limit: 50,
  });
  const { theme } = useTheme();

  useEffect(() => {
    if (data && Array.isArray(data) && !error) {
      setCoins(data);
    }
  }, [data, error]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="max-w-[85%] mx-auto mt-4">
      <CoinTableHeader setCoins={setCoins} />
      <InfiniteScroll
        dataLength={coins.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <p className="flex justify-center items-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color={`${theme === "light" ? "#A9AAEC" : "#6161D6"}`}
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </p>
        }>
        {coins.map((coin, i) => (
          <CoinInfoItem key={coin.id} coin={coin} index={i} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CoinTable;
