import { useGetChartCoinDataQuery } from "@/lib/features/api";
import { useAppSelector } from "@/lib/hooks";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { useState } from "react";
import DaysButtons from "../DaysButtons";

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
          <LineChart
            chartDataOfCoin={chartDataOfCoin}
            days={days}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <div className="h-full w-[49%]">
          <BarChart
            chartDataOfCoin={chartDataOfCoin}
            days={days}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
      <div className=" w-[360px] flex gap-2 bg-[#E3E5FB] dark:bg-[#232337] rounded-lg mt-6 text-black dark:text-white">
        <DaysButtons days={days} setDays={setDays} />
      </div>
    </div>
  );
};

export default Chart;
