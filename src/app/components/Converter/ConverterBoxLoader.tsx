import React from "react";
import SkeletonLoader from "../SkeletonLoader";

const ConverterBoxLoader = () => {
  return (
    <div className="w-32 flex h-10 items-center mt-4 justify-between relative pt-2">
      <div className="w-[100px] h-[30px] ">
        <SkeletonLoader height="full" width="full" />
      </div>
      <div className="flex items-center z-40 cursor-pointer">
        <h2 className="text-2xl ml-3 mt-2">
          <SkeletonLoader height={8} width={56} />
        </h2>
      </div>
    </div>
  );
};

export default ConverterBoxLoader;
