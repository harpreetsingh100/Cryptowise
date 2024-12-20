import Image from "next/image";
import DynamicCurrencyButton from "../DynamicCurrencyButton";
import {
  addCommas,
  changeDateType,
  handleCopy,
} from "@/app/utils/helperFunctions";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import { Toaster } from "sonner";
import { Circles } from "react-loader-spinner";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface TopLeftCoinDetailCardProps {
  imgUrl: string;
  coinName: string;
  coinSymbol: string;
  linkUrl: string;
  coinPrice: number;
  priceChangePercentage: number;
  capRank: number;
  allTimeHighMoney: number;
  allTimeLowMoney: number;
  allTimeLowDate: string;
  allTimeHighDate: string;
  isLoading: boolean;
  isError: boolean;
}

const TopLeftCoinDetailCard = ({
  imgUrl,
  coinName,
  coinSymbol,
  linkUrl,
  coinPrice,
  priceChangePercentage,
  capRank,
  allTimeHighMoney,
  allTimeLowMoney,
  allTimeLowDate,
  allTimeHighDate,
  isLoading,
  isError,
}: TopLeftCoinDetailCardProps) => {
  const windowWidth = window.innerWidth;
  const { theme } = useTheme();
  return (
    <>
      {isError && (
        <div className="w-full lg:w-[45%] h-[340px] sm:h-[380px] lg:h-full bg-[#FFFFFF] dark:bg-[#1E1932] rounded-xl p-8 shadow-sm flex justify-center items-center">
          <h2 className="text-lg lg:text-2xl">Failed to fetch data</h2>
        </div>
      )}
      {isLoading && (
        <div className="w-full lg:w-[45%] h-[340px] sm:h-[380px] lg:h-full bg-[#FFFFFF] dark:bg-[#1E1932] rounded-xl p-8 shadow-sm flex justify-center items-center">
          <Circles
            height={windowWidth > 768 ? "100" : "70"}
            width={windowWidth > 768 ? "100" : "70"}
            color={`${theme === "light" ? "#A9AAEC" : "#6161D6"}`}
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {!isLoading && !isError && (
        <div className="w-full lg:w-[45%] h-full bg-[#FFFFFF] dark:bg-[#1E1932] rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
          <Toaster position="top-right" richColors />
          <div className="flex gap-4 mt-2 lg:mt-4">
            {
              <Image
                className="object-contain"
                src={imgUrl}
                alt="coin-image"
                width={30}
                height={30}
              />
            }
            <div>
              <h2 className="text-xl">
                {coinName}
                <span className="ml-1">{`(${coinSymbol})`}</span>
              </h2>
              <div className="flex items-center justify-center gap-2">
                <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                  {linkUrl}
                </a>
                <motion.span
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer"
                  onClick={() => handleCopy(linkUrl)}>
                  <IoCopyOutline />
                </motion.span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex gap-1 items-center font-extrabold text-2xl lg:text-4xl">
              <DynamicCurrencyButton height={28} width={28} />
              <span className="text-2xl lg:text-4xl font-extrabold">
                {addCommas(coinPrice)}
              </span>
              <span className="text-lg">(24h)</span>
              <div className="text-lg flex gap-1 items-center">
                {priceChangePercentage > 0 ? (
                  <RiArrowUpSFill color="#02F1E3" />
                ) : (
                  <RiArrowDownSFill color="#FF0061" />
                )}

                <h2
                  className={`${
                    priceChangePercentage > 0
                      ? "text-[#02F1E3]"
                      : "text-[#FF0061]"
                  }`}>
                  {priceChangePercentage?.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
          <div className="text-lg flex items-center mt-4">
            <h2>Cap rank : {capRank}</h2>
          </div>
          <div className="my-3 lg:my-6">
            <hr />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex justify-between items-center">
              <RiArrowUpSFill color="#02F1E3" size={30} />
              <h2 className="text-lg lg:text-2xl ml-2">All time high : </h2>
            </div>
            <div className="flex justify-between items-center text-lg lg:text-2xl">
              <DynamicCurrencyButton />
              <h2 className="text-lg lg:text-2xl">
                {addCommas(allTimeHighMoney)}
              </h2>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-sm lg:text-lg text-gray-400">
              {changeDateType(allTimeLowDate)}
            </h2>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex justify-between items-center">
              <RiArrowDownSFill color="#FF0061" size={30} />
              <h2 className="text-lg lg:text-2xl ml-2">All time low : </h2>
            </div>
            <div className="flex justify-between items-center text-lg lg:text-2xl">
              <DynamicCurrencyButton />
              <h2 className="text-lg lg:text-2xl">
                {addCommas(allTimeLowMoney)}
              </h2>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-sm lg:text-lg text-gray-400">
              {changeDateType(allTimeHighDate)}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default TopLeftCoinDetailCard;
