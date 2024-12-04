"use client";

import { useGetOneCoinDetailQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  addCommas,
  calculateSupplyPercentage,
} from "@/app/utils/helperFunctions";
import { Line } from "rc-progress";
import CoinInfoBulletPoint from "./CoinInfoBulletPoint";
import { useTheme } from "next-themes";
import TopLeftCoinDetailCard from "./TopLeftCoinDetailCard";
import DescriptionDetailCard from "./DescriptionDetailCard";
import SkeletonLoader from "../SkeletonLoader";

const CoinInfo = ({ coinName }: { coinName: string }) => {
  const { currencyType } = useAppSelector((state: RootState) => state.currency);
  const { data, isLoading, isError } = useGetOneCoinDetailQuery(coinName);
  const { theme } = useTheme();

  const allTimeHighDate =
    data?.market_data.ath_date?.[currencyType.toLowerCase()];
  const allTimeHighMoney =
    data?.market_data.ath?.[currencyType.toLowerCase()].toFixed(2);
  const allTimeLowDate =
    data?.market_data.atl_date?.[currencyType.toLowerCase()];
  const allTimeLowMoney =
    data?.market_data.atl?.[currencyType.toLowerCase()].toFixed(2);
  const priceChangePercentage =
    data?.market_data.price_change_percentage_24h_in_currency?.[
      currencyType.toLowerCase()
    ];
  const supplyPercentage: any = calculateSupplyPercentage(
    data?.market_data?.circulating_supply,
    data?.market_data?.max_supply
  )?.toFixed(2);

  return (
    <div className="pb-8">
      <h2 className="text-lg lg:text-2xl">Coin Details</h2>
      <div className="h-auto sm:h-auto lg:h-[460px] flex justify-between mt-6 gap-6 flex-col lg:flex-row">
        <TopLeftCoinDetailCard
          imgUrl={data?.image?.large}
          coinName={data?.name}
          coinSymbol={data?.symbol?.toUpperCase()}
          linkUrl={data?.links?.homepage[0]}
          coinPrice={
            data?.market_data?.current_price[currencyType.toLowerCase()]
          }
          priceChangePercentage={priceChangePercentage}
          capRank={data?.market_cap_rank}
          allTimeHighMoney={allTimeHighMoney}
          allTimeLowMoney={allTimeLowMoney}
          allTimeLowDate={allTimeLowDate}
          allTimeHighDate={allTimeHighDate}
          isLoading={isLoading}
          isError={isError}
        />
        <DescriptionDetailCard
          description={data?.description?.en}
          link1={data?.links?.blockchain_site[0]}
          link2={data?.links?.blockchain_site[1]}
          link3={data?.links?.blockchain_site[2]}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <div className="border-1 border-white my-8">
        <hr />
      </div>
      <div className="flex justify-between gap-6 lg:gap-[2%]  h-full lg:h-[200px] flex-col lg:flex-row">
        <div className="w-full lg:w-[49%] p-6 bg-[#FFFFFF] dark:bg-[#1E1932] flex flex-col justify-between rounded-xl shadow-sm gap-4 lg:gap-0">
          <CoinInfoBulletPoint
            heading="Total Volume"
            data={addCommas(
              data?.market_data?.total_volume[currencyType.toLowerCase()]
            )}
            isLoading={isLoading}
            isError={isError}
          />
          <CoinInfoBulletPoint
            heading="Volume 24h"
            data={addCommas(
              Math.abs(
                data?.market_data.market_cap_change_24h_in_currency?.[
                  currencyType.toLowerCase()
                ]
              ).toFixed(0)
            )}
            isLoading={isLoading}
            isError={isError}
          />
          <CoinInfoBulletPoint
            heading="Volume/Market"
            data={(
              data?.market_data.total_volume?.[currencyType.toLowerCase()] /
              data?.market_data?.market_cap?.[currencyType.toLowerCase()]
            ).toFixed(5)}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <div className="w-full lg:w-[49%] bg-[#FFFFFF] dark:bg-[#1E1932] flex flex-col justify-between p-6 rounded-xl shadow-sm gap-4 lg:gap-0">
          <CoinInfoBulletPoint
            heading="Max Supply"
            data={
              data?.market_data?.max_supply
                ? addCommas(data?.market_data?.max_supply)
                : addCommas(
                    Math.abs(data?.market_data?.circulating_supply).toFixed(0)
                  )
            }
            isLoading={isLoading}
            isError={isError}
          />
          <CoinInfoBulletPoint
            heading="Circulating Supply"
            data={addCommas(
              Math.abs(data?.market_data?.circulating_supply).toFixed(0)
            )}
            isLoading={isLoading}
            isError={isError}
          />
          <div>
            <div className="flex justify-between w-full">
              {supplyPercentage && (
                <div className="flex justify-between w-full text-sm lg:text-lg">
                  <span>
                    {data?.market_data?.circulating_supply &&
                      calculateSupplyPercentage(
                        data?.market_data?.circulating_supply,
                        data?.market_data?.max_supply
                      )?.toFixed(2) + "%"}
                  </span>
                  <span>
                    {supplyPercentage &&
                      (100 - supplyPercentage).toFixed(2) + "%"}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-2">
              {isLoading && (
                <div className="w-full h-6">
                  <SkeletonLoader />
                </div>
              )}
              {!isLoading && !isError && (
                <Line
                  className="rounded-xl"
                  percent={supplyPercentage}
                  strokeWidth={2}
                  strokeColor="#F5AC37"
                  trailWidth={10}
                  trailColor={theme === "dark" ? "#745439" : "#FCDEB4"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[140px] w-full lg:w-[49%] p-6 bg-[#FFFFFF] dark:bg-[#1E1932] flex flex-col justify-between gap-[4%] mt-6 rounded-xl shadow-sm">
        <CoinInfoBulletPoint
          heading="Market Cap"
          data={addCommas(
            data?.market_data.market_cap?.[currencyType.toLowerCase()].toFixed(
              2
            )
          )}
          isLoading={isLoading}
          isError={isError}
        />
        <CoinInfoBulletPoint
          heading="Fully Deluted Valuation"
          data={addCommas(
            data?.market_data.fully_diluted_valuation?.[
              currencyType.toLowerCase()
            ].toFixed(2)
          )}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default CoinInfo;
