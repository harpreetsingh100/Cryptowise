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
    <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[420px]">
      {isOnlyOneCoinSelected ? (
        <div className="bg-white dark:bg-[#191934] text-white p-6">
          <div className="text-black dark:text-white">Volume 24h </div>
          <div className="text-black dark:text-white">
            <span>
              {(selectedCoin && coinVolumesAmountsOne) ||
                (selectedCoinTwo && coinVolumesAmountsTwo) ||
                (selectedCoinThree && coinVolumesAmountsThree)}
            </span>
          </div>
          <div className="text-black dark:text-white">{formattedDate}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-1 m-6">
          <div className="mr-4">
            {selectedCoin ? (
              <div className="flex items-center">
                <div className="h-5 w-6 bg-[#3D3D82] px-1 rounded-sm mr-2"></div>
                <span>{selectedCoin.toUpperCase()}</span>
                <span className="mx-1">{"- "}</span>
                <span className="flex ml-1">
                  <DynamicCurrencyButton />
                  <span className="ml-2">{coinVolumesAmountsOne}</span>
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
                <span>{selectedCoinTwo.toUpperCase()}</span>
                <span className="mx-1">{"- "}</span>
                <span className="flex ml-1">
                  <DynamicCurrencyButton />
                  <span className="ml-2">{coinVolumesAmountsTwo}</span>
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
                <span>{selectedCoinThree.toUpperCase()}</span>
                <span className="mx-1">{"- "}</span>
                <span className="flex ml-1">
                  <DynamicCurrencyButton />
                  <span className="ml-2">{coinVolumesAmountsThree}</span>
                </span>
              </div>
            ) : (
              <div className="h-2"></div>
            )}
          </div>
        </div>
      )}
      <div className="h-[250px] bg-white dark:bg-[#191934] px-6">
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
