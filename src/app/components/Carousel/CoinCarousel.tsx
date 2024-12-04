"use client";

import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
  loop: true,
};

const CoinCarousel = () => {
  return (
    <div className="max-w-[85%] m-auto pt-5 sm:pt-8 ">
      <EmblaCarousel options={OPTIONS} />
    </div>
  );
};

export default CoinCarousel;
