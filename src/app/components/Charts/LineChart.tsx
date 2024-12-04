import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

import {
  chartData,
  chartOptions,
  getChartLabels,
  addCommas,
  capitalizeFirstLetter,
  getTodaysDate,
} from "@/app/utils/helperFunctions";
import { useAppSelector } from "@/lib/hooks";
import DynamicCurrencyButton from "../DynamicCurrencyButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  chartDataOfCoin,
  chartDataOfCoinTwo,
  chartDataOfCoinThree,
  days,
  converterCoinOneName,
  converterCoinTwoName,
  coinOneName,
  coinTwoName,
  coinThreeName,
}: {
  chartDataOfCoin?: any;
  chartDataOfCoinTwo?: any;
  chartDataOfCoinThree?: any;
  days: number;
  converterCoinOneName?: any;
  converterCoinTwoName?: any;
  coinOneName?: string;
  coinTwoName?: string;
  coinThreeName?: string;
}) => {
  const { selectedCoin, selectedCoinTwo, selectedCoinThree } = useAppSelector(
    (state) => state.chart
  );
  const pricesOfCoin = chartDataOfCoin?.prices?.map((item: any) => item[1]);
  const coinPrice = addCommas(
    pricesOfCoin?.at(pricesOfCoin?.length - 1)?.toFixed(2)
  );
  const pricesOfCoinTwo =
    chartDataOfCoinTwo?.prices?.map((item: any) => item[1]) || [];
  const coinPriceTwo = addCommas(
    pricesOfCoinTwo?.at(pricesOfCoinTwo?.length - 1)?.toFixed(2)
  );
  const pricesOfCoinThree =
    chartDataOfCoinThree?.prices?.map((item: any) => item[1]) || [];
  const coinPriceThree = addCommas(
    pricesOfCoinThree?.at(pricesOfCoinThree?.length - 1)?.toFixed(2)
  );

  const chartLabels = chartDataOfCoin?.prices?.map((item: any) =>
    getChartLabels(days, item[0])
  );

  const selectedCoins = [
    selectedCoin,
    selectedCoinTwo,
    selectedCoinThree,
  ].filter((coin) => !!coin);
  const isOnlyOneCoinSelected = selectedCoins.length === 1;
  const { currencyType } = useAppSelector((state) => state.currency);

  return (
    <div className="bg-white dark:bg-[#191934] py-2 lg:py-6 rounded-xl h-[280px] sm:h-[320px] lg:h-[420px] sm:px-3 lg:px-0">
      {!converterCoinOneName && !converterCoinTwoName ? (
        <div className="bg-white dark:bg-[#191934] text-white p-4 lg:p-6">
          <div className="text-black dark:text-white"></div>
          {isOnlyOneCoinSelected ? (
            <div>
              <div className="text-sm sm:text-lg md:text-lg lg:text-lg">
                {coinOneName?.toUpperCase() ||
                  coinTwoName?.toUpperCase() ||
                  coinThreeName?.toUpperCase()}
              </div>
              <div className="text-black dark:text-white text-sm sm:text-lg md:text-lg lg:text-lg pt-1 lg:pt-0">
                {(selectedCoin && coinPrice) ||
                  (selectedCoinTwo && coinPriceTwo) ||
                  (selectedCoinThree && coinPriceThree)}{" "}
                {currencyType}
              </div>
              <div className="text-black dark:text-white text-sm sm:text-lg md:text-lg lg:text-lg pt-1 lg:pt-0">
                {getTodaysDate()}
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:gap-1">
              <div className="mr-4">
                {selectedCoin ? (
                  <div className="flex items-center">
                    <div className="h-4 lg:h-5 w-4 lg:w-6 dark:bg-[#3D3D82] bg-[#7F7FFB] px-1 rounded-sm mr-2 text-sm sm:text-sm md:text-lg lg:text-lg"></div>
                    <span className="text-black dark:text-white text-sm lg:text-lg mt-[2px]">
                      {selectedCoin.toUpperCase()}
                    </span>
                    <span className="mx-1 text-black dark:text-white">
                      {"- "}
                    </span>
                    <span className="flex ml-1 text-black dark:text-white text-sm lg:text-lg">
                      <DynamicCurrencyButton />
                      <span className="ml-2 text-black dark:text-white text-sm lg:text-lg">
                        {coinPrice}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="h-2"></div>
                )}
              </div>
              <div className="mr-4">
                {selectedCoinTwo ? (
                  <div className="flex items-center">
                    <div className="h-4 lg:h-5 w-4 lg:w-6 bg-[#B165D2] px-1 rounded-sm mr-2"></div>
                    <span className="text-black dark:text-white text-sm lg:text-lg mt-[2px]">
                      {selectedCoinTwo.toUpperCase()}
                    </span>
                    <span className="mx-1 text-black dark:text-white">
                      {"- "}
                    </span>
                    <span className="flex ml-1 text-black dark:text-white text-sm lg:text-lg">
                      <DynamicCurrencyButton />
                      <span className="ml-2 text-black dark:text-white text-sm lg:text-lg">
                        {coinPriceTwo}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="h-2"></div>
                )}
              </div>
              <div className="mr-4">
                {selectedCoinThree ? (
                  <div className="flex items-center">
                    <div className="h-4 lg:h-5 w-4 lg:w-6 bg-[#FF9D3D] px-1 rounded-sm mr-2"></div>
                    <span className="text-black dark:text-white text-sm lg:text-lg mt-[2px]">
                      {selectedCoinThree.toUpperCase()}
                    </span>
                    <span className="mx-1 text-black dark:text-white">
                      {"- "}
                    </span>
                    <span className="flex ml-1 text-black dark:text-white text-sm lg:text-lg">
                      <DynamicCurrencyButton />
                      <span className="ml-2 text-black dark:text-white text-sm lg:text-lg">
                        {coinPriceThree}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="h-2"></div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8">
          <h2>
            {capitalizeFirstLetter(converterCoinOneName) +
              " " +
              "To" +
              " " +
              capitalizeFirstLetter(converterCoinTwoName)}
          </h2>
        </div>
      )}
      <div className="h-[150px] sm:h-[170px] lg:h-[250px] bg-white dark:bg-[#191934] px-4 lg:px-6 lg:py-6">
        <Line
          options={chartOptions}
          data={chartData(
            chartLabels,
            selectedCoin,
            selectedCoinTwo,
            selectedCoinThree,
            pricesOfCoin,
            pricesOfCoinTwo,
            pricesOfCoinThree,
            coinOneName
          )}
        />
      </div>
    </div>
  );
};

export default LineChart;
