import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import { useGetSearchDataQuery } from "@/lib/features/api";
import { RootState } from "../../../lib/store";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import {
  truncateString,
  capitalizeFirstLetter,
  addCommas,
  roundToTwoDecimals,
} from "@/app/utils/helperFunctions";
import {
  setSelectedCoin,
  setSelectedCoinThree,
  setSelectedCoinTwo,
} from "@/lib/features/chartSlice";
import CarouselLoader from "./CarouselLoader";

type PropType = {
  options?: EmblaOptionsType;
};

interface CoinData {
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedCoin } = useAppSelector((state) => state.chart);
  const { selectedCoinTwo } = useAppSelector((state) => state.chart);
  const { selectedCoinThree } = useAppSelector((state) => state.chart);
  const { currencyType } = useAppSelector((state: RootState) => state.currency);
  const { data, isLoading, isUninitialized, isError } =
    useGetSearchDataQuery(currencyType);
  const dispatch = useAppDispatch();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleChangeSelectedCoin = (coinId: string) => {
    if (selectedCoin === coinId) {
      dispatch(setSelectedCoin(null));
    } else if (selectedCoinTwo === coinId) {
      dispatch(setSelectedCoinTwo(null));
    } else if (selectedCoinThree === coinId) {
      dispatch(setSelectedCoinThree(null));
    } else if (!selectedCoin) {
      dispatch(setSelectedCoin(coinId));
    } else if (!selectedCoinTwo) {
      dispatch(setSelectedCoinTwo(coinId));
    } else if (!selectedCoinThree) {
      dispatch(setSelectedCoinThree(coinId));
    }
  };

  return (
    <div className="relative">
      <div className="embla overflow-hidden">
        <div className="embla__viewport" ref={emblaRef}>
          <div
            className="embla__container flex gap-[2%] sm:gap-[1.2%] xl:gap-[1.2%] justify-between"
            role="status">
            {isLoading || isUninitialized || isError ? (
              <CarouselLoader />
            ) : (
              data?.map((coin: CoinData) => {
                return (
                  <div
                    key={coin.id}
                    className={`${
                      selectedCoin == coin.id ||
                      selectedCoinTwo == coin.id ||
                      selectedCoinThree == coin.id
                        ? "bg-[#A9AAEC] dark:bg-[#39397C] embla__slide flex-none w-[48%] sm:w-[32.2%] xl:w-[23.95%] rounded-xl h-14 sm:h-20  flex relative mx-[1px] cursor-pointer sm:gap-2 lg:gap-0"
                        : "bg-lightBg dark:bg-[#191926] embla__slide flex-none w-[48%] sm:w-[32.2%] xl:w-[23.95%] rounded-xl h-14 sm:h-20  flex relative mx-[1px] cursor-pointer sm:gap-2 lg:gap-0"
                    }`}
                    onClick={() => {
                      handleChangeSelectedCoin(coin.id);
                    }}>
                    <div className="w-[30%] flex justify-start lg:justify-center items-center pl-5">
                      <Image
                        src={coin.image}
                        alt={coin.id}
                        width={30}
                        height={50}
                        className="w-8 sm:w-8 lg:w-30"
                      />
                    </div>
                    <div className="w-[70%] flex flex-col items-center sm:items-start justify-center">
                      <div
                        className={`${
                          selectedCoin == coin?.id ||
                          selectedCoinTwo == coin?.id ||
                          selectedCoinThree == coin?.id
                            ? "text-white lg:flex lg:justify-center lg:items-center"
                            : "lg:flex lg:justify-center lg:items-center"
                        }`}>
                        <span className="hidden sm:block lg:text-lg truncate max-w-24">
                          {truncateString(capitalizeFirstLetter(coin.id), 15)}{" "}
                        </span>
                        <span className="hidden lg:block lg:ml-1">(</span>
                        <span className="sm:hidden md:hidden lg:block mr-6 lg:mr-1 lg:ml-1 text-sm sm:text-lg md:text-lg lg:text-[16px] lg:mt-[2px]">{`${coin.symbol.toUpperCase()}`}</span>
                        <span className="hidden lg:block lg:mr-1">)</span>
                      </div>
                      <div className="dark:text-[#D1D1D1] text-[#42428B] flex">
                        <span
                          className={`${
                            selectedCoin == coin.id ||
                            selectedCoinTwo == coin?.id ||
                            selectedCoinThree == coin?.id
                              ? "text-white text-xs sm:text-sm lg:mr-0 hidden sm:block"
                              : "text-xs sm:text-sm lg:mr-0 hidden sm:block"
                          }`}>
                          {addCommas(coin.current_price.toFixed(2))}{" "}
                        </span>
                        <span
                          className={`${
                            selectedCoin == coin.id ||
                            selectedCoinTwo == coin?.id ||
                            selectedCoinThree == coin?.id
                              ? "text-white ml-1 text-sm sm:text-lg md:text-sm hidden lg:block"
                              : "ml-1 text-xs sm:text-lg md:text-sm hidden lg:block"
                          }`}>
                          {currencyType}
                        </span>
                        <span className="hidden sm:flex justify-center items-center mx-1 text-xs sm:text-sm md:text-lg lg:text-xl">
                          {coin.price_change_percentage_24h > 0 ? (
                            <RiArrowUpSFill color="#02F1E3" />
                          ) : (
                            <RiArrowDownSFill color="#FF0061" />
                          )}
                        </span>
                        <span
                          className={`${
                            coin.price_change_percentage_24h < 0
                              ? "text-[#FF0061] text-xs hidden sm:block sm:text-sm md:text-sm mr-4 md:mr-0"
                              : "text-[#02F1E3] text-xs hidden sm:block sm:text-sm md:text-sm mr-4 md:mr-0"
                          }`}>
                          {Math.abs(
                            roundToTwoDecimals(coin.price_change_percentage_24h)
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="sm:flex items-center hidden sm:absolute sm:top-4 sm:-left-[2%] shadow-2xl">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="sm:flex items-center hidden sm:absolute sm:top-4 sm:-right-[2%] shadow-2xl">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
