import React from "react";
import LineChart from "./LineChart";

const ConverterChart = ({
  chartDataOfCoin,
  days,
  coinOneName,
  coinTwoName,
}: {
  chartDataOfCoin: any;
  days: number;
  coinOneName: string;
  coinTwoName: string;
}) => {
  return (
    <div>
      <LineChart
        chartDataOfCoin={chartDataOfCoin}
        days={days}
        converterCoinOneName={coinOneName}
        converterCoinTwoName={coinTwoName}
      />
    </div>
  );
};

export default ConverterChart;
