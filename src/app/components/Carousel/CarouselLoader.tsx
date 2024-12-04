import React from "react";
import SkeletonLoader from "../SkeletonLoader";

const CarouselLoader = () => {
  return (
    <div className="w-full flex justify-between items-center gap-[2%] sm:gap-[1%] lg:gap-[1%]">
      {Array(4)
        .fill(null)
        .map((i) => (
          <div
            key={i}
            className="rounded-lg dark:bg-[#191926] flex justify-between bg-white flex-none w-[48%] sm:w-[32.2%] lg:w-[23.95%] h-20 sm:h-20 relative mx-[1px] cursor-pointer sm:gap-2 lg:gap-0 px-3 lg:px-0">
            <div className="w-[30%] flex justify-center items-center h-full">
              <SkeletonLoader width={10} height={10} radius="2xl" />
            </div>
            <div className="w-[70%] flex flex-col items-between justify-center ml-2 sm:ml-0">
              <div className="w-[80%]">
                <SkeletonLoader height={3} width="full" />
              </div>
              <div className="flex justify-start gap-[5%] ">
                <div className="w-[60%] h-3 mt-2">
                  <SkeletonLoader width="full" height="full" />
                </div>
                <div className="w-[20%] h-3 mt-2">
                  <SkeletonLoader width="full" height="full" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CarouselLoader;
