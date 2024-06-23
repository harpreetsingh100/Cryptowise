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
  days,
}: {
  chartDataOfCoin: any;
  days: number;
  isLoading: boolean;
  isError: any;
}) => {
  const { selectedCoin } = useAppSelector((state) => state.chart);
  const pricesOfCoin = chartDataOfCoin?.prices.map((item: any) => item[1]);
  const coinPrice = addCommas(
    pricesOfCoin?.at(pricesOfCoin?.length - 1)?.toFixed(2)
  );
  const chartLabels = chartDataOfCoin?.prices.map((item: any) =>
    getChartLabels(days, item[0])
  );
  const { currencyType } = useAppSelector((state) => state.currency);

  return (
    <div className="bg-white dark:bg-[#191934] py-6 rounded-xl">
      <div className="bg-white dark:bg-[#191934] text-white p-6">
        <div className="text-black dark:text-white">
          {capitalizeFirstLetter(selectedCoin)}
        </div>
        <div className="text-black dark:text-white">
          {coinPrice} {currencyType}
        </div>
        <div className="text-black dark:text-white">{getTodaysDate()}</div>
      </div>
      <div className="h-[250px] bg-white dark:bg-[#191934] px-6">
        <Line
          options={chartOptions}
          data={chartData(chartLabels, selectedCoin, pricesOfCoin)}
        />
      </div>
    </div>
  );
};

export default LineChart;
