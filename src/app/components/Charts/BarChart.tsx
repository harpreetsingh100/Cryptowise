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
  const coinVolumes = chartDataOfCoin?.total_volumes.map(
    (item: any) => item[1]
  );
  const chartLabels = chartDataOfCoin?.total_volumes.map((item: any) =>
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
  const coinOneVolumes = chartDataOfCoin?.total_volumes.map(
    (item: any) => item[1]
  );
  const coinVolumesAmountsOne =
    String(
      formatNumber(coinOneVolumes?.at(coinOneVolumes?.length - 1)?.toFixed(2))
    ).toLowerCase() + "ln";

  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div className="bg-white dark:bg-[#191934] py-6 rounded-xl">
      <div className="bg-white dark:bg-[#191934] text-white p-6">
        <div className="text-black dark:text-white">Volume 24h </div>
        <div className="text-black dark:text-white">
          <span>{coinVolumesAmountsOne}</span>
        </div>
        <div className="text-black dark:text-white">{formattedDate}</div>
      </div>
      <div className="h-[250px] bg-white dark:bg-[#191934] px-6">
        <Bar
          options={chartOptions}
          data={chartData(chartLabels, selectedCoin, coinVolumes)}
        />
      </div>
    </div>
  );
};

export default LineChart;
