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
import CrosshairPlugin from "chartjs-plugin-crosshair";

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
  Legend,
  CrosshairPlugin
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
    <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[420px]">
      {!converterCoinOneName && !converterCoinTwoName ? (
        <div className="bg-white dark:bg-[#191934] text-white p-6">
          <div className="text-black dark:text-white"></div>
          {isOnlyOneCoinSelected ? (
            <div>
              <div>
                {coinOneName?.toUpperCase() ||
                  coinTwoName?.toUpperCase() ||
                  coinThreeName?.toUpperCase()}
              </div>
              <div className="text-black dark:text-white">
                {(selectedCoin && coinPrice) ||
                  (selectedCoinTwo && coinPriceTwo) ||
                  (selectedCoinThree && coinPriceThree)}{" "}
                {currencyType}
              </div>
              <div className="text-black dark:text-white">
                {getTodaysDate()}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="mr-4">
                {selectedCoin ? (
                  <div className="flex items-center">
                    <div className="h-5 w-6 dark:bg-[#3D3D82] bg-[#7F7FFB] px-1 rounded-sm mr-2"></div>
                    <span className="text-black dark:text-white">
                      {selectedCoin.toUpperCase()}
                    </span>
                    <span className="mx-1 text-black dark:text-white">
                      {"- "}
                    </span>
                    <span className="flex ml-1 text-black dark:text-white">
                      <DynamicCurrencyButton />
                      <span className="ml-2 text-black dark:text-white">
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
                    <div className="h-5 w-6 bg-[#B165D2] px-1 rounded-sm mr-2"></div>
                    <span className="text-black dark:text-white">
                      {selectedCoinTwo.toUpperCase()}
                    </span>
                    <span className="mx-1 text-black dark:text-white">
                      {"- "}
                    </span>
                    <span className="flex ml-1 text-black dark:text-white">
                      <DynamicCurrencyButton />
                      <span className="ml-2 text-black dark:text-white">
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
                    <div className="h-5 w-6 bg-[#FF9D3D] px-1 rounded-sm mr-2"></div>
                    <span className="text-black dark:text-white">
                      {selectedCoinThree.toUpperCase()}
                    </span>
                    <span className="mx-1 text-black dark:text-white">
                      {"- "}
                    </span>
                    <span className="flex ml-1 text-black dark:text-white">
                      <DynamicCurrencyButton />
                      <span className="ml-2 text-black dark:text-white">
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
      <div className="h-[250px] bg-white dark:bg-[#191934] px-6">
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
