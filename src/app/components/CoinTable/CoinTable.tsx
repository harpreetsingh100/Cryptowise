import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CoinTableHeader from "./CoinTableHeader";
import { useGetCoinTableListQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import CoinInfoItem from "./CoinInfoItem";
import { v4 as uuidv4 } from "uuid";

const CoinTable = () => {
  const { currencyType } = useAppSelector((state) => state.currency);
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState<any[]>([]);
  const { data, error, isLoading } = useGetCoinTableListQuery({
    currency: currencyType,
    page,
    limit: 50,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCoins((prevCoins) => [...prevCoins, ...data]);
    }
  }, [data]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="max-w-[85%] mx-auto mt-4">
      <CoinTableHeader />
      <InfiniteScroll
        dataLength={coins.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div>
            <p className="flex justify-center items-center">Loading</p>
          </div>
        }>
        {coins.map((coin, i) => (
          <CoinInfoItem key={uuidv4()} coin={coin} index={i} />
        ))}
      </InfiniteScroll>
      {isLoading && <div>Loading</div>}
      {error && <p>Error</p>}
    </div>
  );
};

export default CoinTable;
