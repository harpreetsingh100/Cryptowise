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
  const { selectedCoinTwo } = useAppSelector((state) => state.chart);
  const { selectedCoinThree } = useAppSelector((state) => state.chart);
  const { currencyType } = useAppSelector((state) => state.currency);

  const {
    data: chartDataOfCoin,
    isLoading: isLoadingOne,
    isError: isErrorOne,
    isSuccess: isSuccessOne,
  } = useGetChartCoinDataQuery(
    selectedCoin
      ? `${selectedCoin}/market_chart?vs_currency=${currencyType}&days=${days}`
      : null,
    { skip: !selectedCoin }
  );

  const {
    data: chartDataOfCoinTwo,
    isLoading: isLoadingTwo,
    isError: isErrorTwo,
    isSuccess: isSuccessTwo,
  } = useGetChartCoinDataQuery(
    selectedCoinTwo
      ? `${selectedCoinTwo}/market_chart?vs_currency=${currencyType}&days=${days}`
      : null,
    { skip: !selectedCoinTwo }
  );

  const {
    data: chartDataOfCoinThree,
    isLoading: isLoadingThree,
    isError: isErrorThree,
    isSuccess: isSuccessThree,
  } = useGetChartCoinDataQuery(
    selectedCoinThree
      ? `${selectedCoinThree}/market_chart?vs_currency=${currencyType}&days=${days}`
      : null,
    { skip: !selectedCoinThree }
  );

  const isLoading = isLoadingOne || isLoadingTwo || isLoadingThree;
  const isError = isErrorOne || isErrorTwo || isErrorThree;
  const isSuccess = isSuccessOne || isSuccessTwo || isSuccessThree;

  return (
    <div className="w-[85%] mx-auto mt-8 h-[500px] md:h-[500px]">
      <div className="flex flex-col lg:justify-between lg:flex-row items-center gap-[2%]">
        <div className="h-full w-full lg:w-[49%]">
          {!selectedCoin && !selectedCoinTwo && !selectedCoinThree && (
            <div className="h-[280px] sm:h-[320px] lg:h-[420px] bg-white dark:bg-[#191934] px-6 flex justify-center items-center rounded-xl">
              <h2 className="text-sm sm:text-sm md:text-lg lg:text-lg">
                Select a coin to see the chart data
              </h2>
            </div>
          )}
          {isError && (
            <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[280px] sm:h-[320px] lg:h-[420px]  w-full flex justify-center items-center text-sm sm:text-sm md:text-lg lg:text-lg">
              Failed to fetch data
            </div>
          )}
          {isLoading && (
            <div className="h-full w-full">
              <ChartLoader />
            </div>
          )}
          {!isError && !isLoading && isSuccess && (
            <div>
              <LineChart
                days={days}
                chartDataOfCoin={chartDataOfCoin ? chartDataOfCoin : []}
                chartDataOfCoinTwo={selectedCoinTwo ? chartDataOfCoinTwo : []}
                chartDataOfCoinThree={
                  selectedCoinThree ? chartDataOfCoinThree : []
                }
                coinOneName={selectedCoin}
                coinTwoName={selectedCoinTwo}
                coinThreeName={selectedCoinThree}
              />
            </div>
          )}
        </div>
        <div className="h-full w-full lg:w-[49%] mt-8 lg:mt-0">
          {!selectedCoin && !selectedCoinTwo && !selectedCoinThree && (
            <div className="h-[280px] sm:h-[320px] lg:h-[420px]  bg-white dark:bg-[#191934] px-6 flex justify-center items-center rounded-xl">
              <h2 className="text-sm sm:text-sm md:text-lg lg:text-lg">
                Select a coin to see the chart data
              </h2>
            </div>
          )}
          {isError && (
            <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[280px] sm:h-[320px] lg:h-[420px]  w-full flex justify-center items-center text-sm sm:text-sm md:text-lg lg:text-lg">
              Failed to fetch data
            </div>
          )}
          {isLoading && (
            <div className="h-full w-full">
              <ChartLoader />
            </div>
          )}
          {!isLoading && !isError && isSuccess && (
            <BarChart
              chartDataOfCoin={chartDataOfCoin ? chartDataOfCoin : []}
              chartDataOfCoinTwo={selectedCoinTwo ? chartDataOfCoinTwo : []}
              chartDataOfCoinThree={
                selectedCoinThree ? chartDataOfCoinThree : []
              }
              days={days}
              coinOneName={selectedCoin}
              coinTwoName={selectedCoinTwo}
              coinThreeName={selectedCoinThree}
            />
          )}
        </div>
      </div>
      <div className="w-[298px] lg:w-[330px] m-auto sm:m-0 sm:mt-6 lg:mt-8 flex justify-center lg:gap-2 bg-[#E3E5FB] dark:bg-[#232337] rounded-lg mt-6 text-black dark:text-white">
        <DaysButtons days={days} setDays={setDays} />
      </div>
    </div>
  );
};

export default Chart;
