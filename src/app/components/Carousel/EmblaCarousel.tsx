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
import { setSelectedCoin } from "@/lib/features/chartSlice";
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
    dispatch(setSelectedCoin(coinId));
  };

  return (
    <div className="relative">
      <div className="embla overflow-hidden">
        <div className="embla__viewport" ref={emblaRef}>
          <div
            className="embla__container flex gap-[1%] justify-between"
            role="status">
            {isLoading || isUninitialized || isError ? (
              <CarouselLoader />
            ) : (
              data?.map((coin: CoinData) => {
                return (
                  <div
                    key={coin.id}
                    className={`${
                      selectedCoin == coin.id
                        ? "bg-[#A9AAEC] dark:bg-[#39397C] embla__slide flex-none w-[24.3%] rounded-xl h-20  flex relative mx-[1px] cursor-pointer"
                        : "bg-lightBg dark:bg-[#191926] embla__slide flex-none w-[24%] rounded-xl h-20  flex relative mx-[1px] cursor-pointer"
                    }`}
                    onClick={() => {
                      handleChangeSelectedCoin(coin.id);
                    }}>
                    <div className="w-[30%] flex justify-center items-center">
                      <Image
                        src={coin.image}
                        alt={coin.id}
                        width={30}
                        height={50}
                      />
                    </div>
                    <div className="w-[70%] flex flex-col items-start justify-center">
                      <div
                        className={`${
                          selectedCoin == coin.id ? "text-white" : ""
                        }`}>
                        <span>
                          {truncateString(capitalizeFirstLetter(coin.id), 15)}{" "}
                        </span>
                        <span>{`(${coin.symbol.toUpperCase()})`}</span>
                      </div>
                      <div className="dark:text-[#D1D1D1] text-[#42428B] flex">
                        <span
                          className={`${
                            selectedCoin == coin.id ? "text-white" : ""
                          }`}>
                          {addCommas(coin.current_price.toFixed(2))}{" "}
                        </span>
                        <span
                          className={`${
                            selectedCoin == coin.id ? "text-white ml-1" : "ml-1"
                          }`}>
                          {currencyType}
                        </span>
                        <span className="flex justify-center items-center mx-1">
                          {coin.price_change_percentage_24h > 0 ? (
                            <RiArrowUpSFill color="#02F1E3" />
                          ) : (
                            <RiArrowDownSFill color="#FF0061" />
                          )}
                        </span>
                        <span
                          className={`${
                            coin.price_change_percentage_24h < 0
                              ? "text-[#FF0061]"
                              : "text-[#02F1E3]"
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

        <div className="flex items-center absolute top-4 -left-[5%]">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="flex items-center absolute top-4 -right-[4.5%]">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
