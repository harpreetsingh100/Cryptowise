import React from "react";
import { useGetChartCoinDataQuery } from "@/lib/features/api";
import {
  capitalizeFirstLetter,
  chartOptions,
  converterChartData,
  getChartLabels,
} from "@/app/utils/helperFunctions";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "@/lib/hooks";

import {
  Title,
  Filler,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js/auto";

ChartJS.register(
  Title,
  Filler,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale
);

const ConverterChart = ({
  days,
  coinOne,
  coinTwo,
}: {
  days: number;
  coinOne: string;
  coinTwo: string;
}) => {
  const { currencyType } = useAppSelector((state) => state.currency);
  const { data: chartDataOne } = useGetChartCoinDataQuery(
    `${coinOne}/market_chart?vs_currency=${currencyType?.toLowerCase()}&days=${days}`
  );
  const { data: chartDataTwo } = useGetChartCoinDataQuery(
    `${coinTwo}/market_chart?vs_currency=${currencyType?.toLowerCase()}&days=${days}`
  );
  const chartLabels = chartDataOne?.prices?.map((item: any) =>
    getChartLabels(days, item[0])
  );
  const priceDataOne = chartDataOne?.prices?.map((item: any) => item[1]);
  const priceDataTwo = chartDataTwo?.prices?.map((item: any) => item[1]) || [];
  const priceOneToPriceTwo = priceDataOne?.map(
    (price: number, index: number) => price / priceDataTwo?.[index]
  );
  const label = `${capitalizeFirstLetter(coinOne)} to ${capitalizeFirstLetter(
    coinTwo
  )}`;
  const data = converterChartData(
    chartLabels,
    label,
    coinTwo,
    priceOneToPriceTwo,
    []
  );
  return (
    <div className="bg-white dark:bg-[#191934] p-6 rounded-xl h-[350px] w-full">
      <Line options={chartOptions} data={data} />
    </div>
  );
};

export default ConverterChart;
