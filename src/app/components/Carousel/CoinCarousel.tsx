"use client";

import { useGetSearchDataQuery } from "@/lib/features/api";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
  loop: true,
};

const CoinCarousel = () => {
  const { data } = useGetSearchDataQuery("USD");
  //eslint-disable-next-line
  console.log(data);
  return (
    <div className="max-w-[85%] m-auto pt-8 ">
      <EmblaCarousel options={OPTIONS} />
    </div>
  );
};

export default CoinCarousel;
