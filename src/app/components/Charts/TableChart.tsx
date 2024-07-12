import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { formatMonthAndTime } from "../../utils/helperFunctions";
import { useAppSelector } from "@/lib/hooks";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  radius: 3,
  hitRadius: 20,
  hoverRadius: 6,

  scales: {
    y: {
      display: false,

      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      display: false,
      stacked: true,
      ticks: {
        maxTicksLimit: 8,
        align: "inner",
      },
      // beforeFit(axis: any) {
      //   const labels = axis.chart.config._config.data.labels;
      //   const length = labels.length - 1;
      //   axis.ticks.push({
      //     value: length,
      //     label: labels[length],
      //   });
      // },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      titleColor: "#ffffff",
      titleFont: {
        family: "Arial",
        size: 10,
      },

      borderWidth: 0.3,
      padding: {
        top: 2,
        left: 5,
        right: 5,
      },
      cornerRadius: 5,
    },
    legend: {
      display: false,
    },
  },
};

const TableChart = ({
  chartData,
  color,
}: {
  index: number;
  chartData: any;
  color: string;
}) => {
  const totalMillisecondInWeek = Array.from(
    { length: 168 },
    (_, i) => (i + 1) * 60 * 60 * 1000
  );
  const { currencyType } = useAppSelector((store) => store.currency);
  const { theme } = useTheme();

  const data = {
    labels: totalMillisecondInWeek.map((time) => formatMonthAndTime(time)),
    datasets: [
      {
        fill: true,
        tension: 0.75,
        label: currencyType,
        data: chartData,
        borderColor: color,
        borderWidth: 1.5,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 380);
          gradient.addColorStop(0, color);
          if (theme === "light") {
            gradient.addColorStop(0.15, "rgba(255, 250, 250, 0.302)");
          } else {
            gradient.addColorStop(0.15, "rgba(12, 12, 12, 0.051)");
          }
          return gradient;
        },
      },
    ],
  };
  return (
    <div className="w-full h-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default TableChart;
