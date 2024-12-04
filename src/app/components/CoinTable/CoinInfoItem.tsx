"use client";

import {
  addCommas,
  formatNumber,
  roundToTwoDecimals,
} from "@/app/utils/helperFunctions";
import React from "react";
import Image from "next/image";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { Line } from "rc-progress";
import TableChart from "../Charts/TableChart";
import { useTheme } from "next-themes";
import DynamicCurrencyButton from "../DynamicCurrencyButton";
import { motion } from "framer-motion";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  index: number;
  image: string;
  total_volume: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  sparkline_in_7d: any;
}

interface CoinInfoItemProps {
  coin: Coin;
  index: number;
}

const CoinInfoItem: React.FC<CoinInfoItemProps> = ({ coin, index }) => {
  const {
    id,
    name,
    symbol,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    image,
    total_volume,
    market_cap,
    total_supply,
    circulating_supply,
    sparkline_in_7d,
  } = coin;
  const { theme } = useTheme();
  const trailColorLightMode =
    price_change_percentage_7d_in_currency > 0 ? "#FFB7D2" : "#9FE7E6";
  const trailColorDarkMode =
    price_change_percentage_7d_in_currency > 0 ? "#aa003e" : "#004848";
  const lightDotLightMode =
    price_change_percentage_7d_in_currency > 0
      ? "bg-[#FFB7D2] w-2 h-2 rounded-xl"
      : "bg-[#4CEEE5] w-2 h-2 rounded-xl";
  const lightDotDarkMode =
    price_change_percentage_7d_in_currency > 0
      ? "bg-[#AA013E] w-2 h-2 rounded-xl"
      : "bg-[#004848] w-2 h-2 rounded-xl";

  const trailColor =
    theme === "dark" ? trailColorDarkMode : trailColorLightMode;
  const dotStyling = theme === "dark" ? lightDotDarkMode : lightDotLightMode;

  return (
    <div className="h-full w-full">
      <motion.div
        className="flex justify-between bg-lightBg dark:bg-[#191926] my-3 rounded-xl lg:h-20 h-[80px]"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}>
        <div className="w-[5%] justify-start items-center hidden lg:flex">
          <h1 className="ml-4 text-gray-600">{index + 1}</h1>
        </div>
        <div className="w-[33.33%] sm:w-[20%] lg:w-[20%] flex justify-start items-center text-sm">
          <div className="ml-4 lg:ml-0">
            <Image src={image} alt={id} width={25} height={50} />
          </div>
          <div className="ml-4 text-gray-600 dark:text-lightText flex sm:flex-col lg:flex-row">
            <span className="hidden sm:block max-w-20 truncate">{name} </span>
            <span className="sm:flex lg:ml-1">
              <span className="hidden sm:block">{"("}</span>
              {symbol.toUpperCase()}
              <span className="hidden sm:block">{")"}</span>
            </span>
          </div>
        </div>
        <div className="w-[33.33%] sm:w-[20%] lg:w-[8%] flex justify-center lg:justify-start items-center text-sm text-gray-600 dark:text-lightText">
          <DynamicCurrencyButton />
          <div className="pl-1">{addCommas(current_price.toFixed(2))}</div>
        </div>
        <div className="lg:w-[8%] sm:w-[20%] justify-start items-center text-sm hidden sm:flex pl-6 lg:pl-0">
          <span className="flex justify-center items-center mx-1">
            {price_change_percentage_1h_in_currency > 0 ? (
              <RiArrowUpSFill color="#02F1E3" />
            ) : (
              <RiArrowDownSFill color="#FF0061" />
            )}
          </span>
          <span
            className={`${
              price_change_percentage_1h_in_currency < 0
                ? "text-[#FF0061]"
                : "text-[#02F1E3]"
            }`}>
            {Math.abs(
              roundToTwoDecimals(price_change_percentage_1h_in_currency)
            )}
            %
          </span>
        </div>
        <div className="w-[8%] justify-start items-center text-sm hidden sm:flex">
          <span className="flex justify-center items-center mx-1">
            {price_change_percentage_24h_in_currency > 0 ? (
              <RiArrowUpSFill color="#02F1E3" />
            ) : (
              <RiArrowDownSFill color="#FF0061" />
            )}
          </span>
          <span
            className={`${
              price_change_percentage_24h_in_currency < 0
                ? "text-[#FF0061]"
                : "text-[#02F1E3]"
            }`}>
            {Math.abs(
              roundToTwoDecimals(price_change_percentage_24h_in_currency)
            )}
            %
          </span>
        </div>
        <div className="w-[10%] justify-start items-center hidden lg:flex">
          <span className="flex justify-center items-center mx-1">
            {price_change_percentage_7d_in_currency > 0 ? (
              <RiArrowUpSFill color="#02F1E3" />
            ) : (
              <RiArrowDownSFill color="#FF0061" />
            )}
          </span>
          <span
            className={`${
              price_change_percentage_7d_in_currency < 0
                ? "text-[#FF0061]"
                : "text-[#02F1E3]"
            }`}>
            {Math.abs(
              roundToTwoDecimals(price_change_percentage_7d_in_currency)
            )}
            %
          </span>
        </div>
        <div className="w-[18%]  justify-start items-center flex-col px-2 h-full hidden lg:flex">
          <div className="flex justify-between w-full h-full mt-4">
            <div className="flex justify-center items-center">
              <p
                className={`${
                  price_change_percentage_7d_in_currency > 0
                    ? "bg-[#FF0061] w-2 h-2 rounded-xl"
                    : "bg-[#00B4A8] w-2 h-2 rounded-xl"
                }`}></p>
              <p
                className={`${
                  price_change_percentage_7d_in_currency > 0
                    ? "text-[#FE2264] text-xs pl-1"
                    : "text-[#00B4A8] text-xs pl-1"
                }`}>
                {total_volume && addCommas(formatNumber(total_volume))}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className={dotStyling}></p>
              <p className="text-xs pl-1 text-gray-600 dark:text-lightText">
                {market_cap && formatNumber(market_cap)}
              </p>
            </div>
          </div>
          <div className="w-full h-full hidden lg:flex">
            <Line
              percent={(total_volume / market_cap) * 100}
              strokeWidth={1}
              strokeColor={`${
                price_change_percentage_7d_in_currency > 0
                  ? "#FF0061"
                  : "#00B4A8"
              }`}
              trailWidth={10}
              trailColor={trailColor}
              className="w-full h-[6px] rounded-lg"
            />
            <div></div>
          </div>
        </div>
        <div className="w-[18%]  justify-start items-center flex-col px-2 h-full hidden lg:flex">
          <div className="flex justify-between w-full h-full mt-4">
            <div className="flex justify-center items-center">
              <p
                className={`${
                  price_change_percentage_7d_in_currency > 0
                    ? "bg-[#FE2264] w-2 h-2 rounded-xl"
                    : "bg-[#00B4A8] w-2 h-2 rounded-xl"
                }`}></p>
              <p
                className={`${
                  price_change_percentage_7d_in_currency > 0
                    ? "text-[#FE2264] text-xs pl-1"
                    : "text-[#00B4A8] text-xs pl-1"
                }`}>
                {circulating_supply &&
                  addCommas(formatNumber(circulating_supply))}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className={dotStyling}></p>
              <p className="text-xs pl-1 text-gray-600 dark:text-lightText">
                {total_supply && addCommas(formatNumber(total_supply))}
              </p>
            </div>
          </div>
          <div className="w-full h-full">
            <Line
              percent={(circulating_supply / total_supply) * 100}
              strokeWidth={1}
              strokeColor={`${
                price_change_percentage_7d_in_currency > 0
                  ? "#FF0061"
                  : "#00B4A8"
              }`}
              trailWidth={10}
              trailColor={trailColor}
              className="w-full h-[6px] rounded-lg"
            />
          </div>
        </div>
        <div className="w-[33.33%] sm:w-[20%] lg:w-[10%] px-4 flex justify-center items-center h-full">
          <div className="lg:w-full h-[50%] lg:h-[75%] w-20 sm:w-16">
            <TableChart
              index={index}
              chartData={sparkline_in_7d.price}
              color={
                price_change_percentage_7d_in_currency > 0
                  ? "#FF0061"
                  : "#00B4A8"
              }
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoinInfoItem;
