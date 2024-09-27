import { useGetChartCoinDataQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { useState } from "react";
import DaysButtons from "../DaysButtons";
import ChartLoader from "./ChartLoader";

const Chart = () => {
  const [days, setDays] = useState(1);
  const { selectedCoin } = useAppSelector((state) => state.chart);
  const { currencyType } = useAppSelector((state) => state.currency);

  const {
    data: chartDataOfCoin,
    isLoading,
    isError,
  } = useGetChartCoinDataQuery(
    `${selectedCoin}/market_chart?vs_currency=${currencyType}&days=${days}`
  );

  return (
    <div className="w-[85%] mx-auto mt-8 h-[500px]">
      <div className="flex justify-between items-center gap-[2%]">
        <div className="h-full w-[49%]">
          {isError && (
            <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[420px] w-full flex justify-center items-center text-2xl">
              Failed to fetch data
            </div>
          )}
          {isLoading && (
            <div className="h-full w-full">
              <ChartLoader />
            </div>
          )}
          {!isLoading && !isError && (
            <LineChart chartDataOfCoin={chartDataOfCoin} days={days} />
          )}
        </div>
        <div className="h-full w-[49%]">
          {isError && (
            <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[420px] w-full flex justify-center items-center text-2xl">
              Failed to fetch data
            </div>
          )}
          {isLoading && (
            <div className="h-full w-full">
              <ChartLoader />
            </div>
          )}
          {!isLoading && !isError && (
            <BarChart
              chartDataOfCoin={chartDataOfCoin}
              days={days}
              isLoading={isLoading}
              isError={isError}
            />
          )}
        </div>
      </div>
      <div className=" w-[315px] flex gap-2 bg-[#E3E5FB] dark:bg-[#232337] rounded-lg mt-6 text-black dark:text-white">
        <DaysButtons days={days} setDays={setDays} />
      </div>
    </div>
  );
};

export default Chart;
