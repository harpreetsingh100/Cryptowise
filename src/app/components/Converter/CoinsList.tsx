import React, { Dispatch, SetStateAction } from "react";
import { useGetSearchDataQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { roundToTwoDecimals } from "@/app/utils/helperFunctions";

const CoinsList = ({
  setCoin,
  setIsCoinListVisible,
}: {
  setCoin: Dispatch<SetStateAction<string>>;
  setIsCoinListVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currencyType } = useAppSelector((state) => state.currency);
  const { data } = useGetSearchDataQuery(currencyType);

  return (
    <div className="flex flex-col justify-between gap-3 z-40 rounded-2xl">
      {data?.map((coin: any) => {
        return (
          <div
            className="cursor-pointer flex items-center justify-between z-40"
            key={coin.id}
            onClick={() => {
              setCoin(coin.id);
              setIsCoinListVisible(false);
            }}>
            <div className="flex gap-4">
              <Image
                src={coin?.image}
                width={25}
                height={25}
                alt="coin-image"
                className="mt-2"
              />
              <h1 className="mt-2 hover:text-[#6161D6]">{coin.name}</h1>
            </div>

            <div className="flex justify-start items-center">
              <span className="flex justify-center items-center mx-1">
                {coin.price_change_percentage_24h > 0 ? (
                  <RiArrowUpSFill color="#02F1E3" />
                ) : (
                  <RiArrowDownSFill color="#FF0061" />
                )}
              </span>
              <span
                className={`${
                  coin.price_change_percentage_24h < 0
                    ? "text-[#FF0061]"
                    : "text-[#02F1E3]"
                }`}>
                {Math.abs(roundToTwoDecimals(coin.price_change_percentage_24h))}
                %
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoinsList;
