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

import { Bar } from "react-chartjs-2";

import {
  chartData,
  chartOptions,
  getChartLabels,
  formatNumber,
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
}: {
  chartDataOfCoin: any;
  chartDataOfCoinTwo: any;
  chartDataOfCoinThree: any;
  days: number;
  coinOneName: string;
  coinTwoName: string;
  coinThreeName: string;
}) => {
  const { selectedCoin } = useAppSelector((state) => state.chart);
  const { selectedCoinTwo } = useAppSelector((state) => state.chart);
  const { selectedCoinThree } = useAppSelector((state) => state.chart);
  const coinVolumes = chartDataOfCoin?.total_volumes?.map(
    (item: any) => item[1]
  );
  const coinTwoVolumes = chartDataOfCoinTwo?.total_volumes?.map(
    (item: any) => item[1]
  );
  const coinThreeVolumes = chartDataOfCoinThree?.total_volumes?.map(
    (item: any) => item[1]
  );
  const chartLabels = chartDataOfCoin?.total_volumes?.map((item: any) =>
    getChartLabels(days, item[0])
  );
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };
  const coinOneVolumes = chartDataOfCoin?.total_volumes?.map(
    (item: any) => item[1]
  );
  const coinVolumesAmountsOne =
    String(
      formatNumber(coinOneVolumes?.at(coinOneVolumes?.length - 1)?.toFixed(2))
    ).toLowerCase() + "ln";
  const coinOneVolumesTwo = chartDataOfCoinTwo?.total_volumes?.map(
    (item: any) => item[1]
  );
  const coinVolumesAmountsTwo =
    String(
      formatNumber(
        coinOneVolumesTwo?.at(coinOneVolumesTwo?.length - 1)?.toFixed(2)
      )
    ).toLowerCase() + "ln";

  const coinOneVolumesThree = chartDataOfCoinThree?.total_volumes?.map(
    (item: any) => item[1]
  );
  const coinVolumesAmountsThree =
    String(
      formatNumber(
        coinOneVolumesThree?.at(coinOneVolumesThree?.length - 1)?.toFixed(2)
      )
    ).toLowerCase() + "ln";

  const today = new Date();
  const formattedDate = formatDate(today);

  const selectedCoins = [
    selectedCoin,
    selectedCoinTwo,
    selectedCoinThree,
  ].filter((coin) => !!coin);
  const isOnlyOneCoinSelected = selectedCoins.length === 1;

  return (
    <div className="bg-white dark:bg-[#191934] py-2 lg:py-6 rounded-xl h-[280px] sm:h-[320px] lg:h-[420px] sm:px-3 lg:px-0">
      {isOnlyOneCoinSelected ? (
        <div className="bg-white dark:bg-[#191934] text-white p-4 lg:p-6">
          <div className="text-black dark:text-white text-sm sm:text-lg md:text-lg lg:text-lg">
            Volume 24h{" "}
          </div>
          <div className="text-black dark:text-white">
            <span className="text-black dark:text-white text-sm sm:text-lg md:text-lg lg:text-lg pt-1 lg:pt-0">
              {(selectedCoin && coinVolumesAmountsOne) ||
                (selectedCoinTwo && coinVolumesAmountsTwo) ||
                (selectedCoinThree && coinVolumesAmountsThree)}
            </span>
          </div>
          <div className="text-black dark:text-white text-sm sm:text-lg md:text-lg lg:text-lg">
            {formattedDate}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:gap-1 p-4 lg:p-[22px]">
          <div className="mr-4">
            {selectedCoin ? (
              <div className="flex items-center">
                <div className=" dark:bg-[#3D3D82] bg-[#7F7FFB] px-1 rounded-sm mr-2 h-4 lg:h-5 w-4 lg:w-6"></div>
                <span className="text-black dark:text-white text-sm lg:text-lg mt-[2px]">
                  {selectedCoin.toUpperCase()}
                </span>
                <span className="mx-1">{"- "}</span>
                <span className="flex ml-1 text-sm lg:text-lg">
                  <DynamicCurrencyButton />
                  <span className="ml-2 text-sm lg:text-lg">
                    {coinVolumesAmountsOne}
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
                <div className=" bg-[#B165D2] px-1 rounded-sm mr-2 h-4 lg:h-5 w-4 lg:w-6"></div>
                <span className="text-black dark:text-white text-sm lg:text-lg mt-[2px]">
                  {selectedCoinTwo.toUpperCase()}
                </span>
                <span className="mx-1">{"- "}</span>
                <span className="flex ml-1 text-sm lg:text-lg">
                  <DynamicCurrencyButton />
                  <span className="ml-2 text-sm lg:text-lg">
                    {coinVolumesAmountsTwo}
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
                <div className=" bg-[#FF9D3D] px-1 rounded-sm mr-2 h-4 lg:h-5 w-4 lg:w-6"></div>
                <span className="text-black dark:text-white text-sm lg:text-lg mt-[2px]">
                  {selectedCoinThree.toUpperCase()}
                </span>
                <span className="mx-1">{"- "}</span>
                <span className="flex ml-1 text-sm lg:text-lg">
                  <DynamicCurrencyButton />
                  <span className="ml-2 text-sm lg:text-lg">
                    {coinVolumesAmountsThree}
                  </span>
                </span>
              </div>
            ) : (
              <div className="h-2"></div>
            )}
          </div>
        </div>
      )}
      <div className="h-[150px] sm:h-[170px] lg:h-[250px] bg-white dark:bg-[#191934] px-4 lg:px-6 lg:py-6 lg:mt-1">
        <Bar
          options={chartOptions}
          data={chartData(
            chartLabels,
            selectedCoin,
            selectedCoinTwo,
            selectedCoinThree,
            coinVolumes,
            coinTwoVolumes,
            coinThreeVolumes
          )}
        />
      </div>
    </div>
  );
};

export default LineChart;
