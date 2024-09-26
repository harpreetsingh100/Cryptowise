"use client";

import SkeletonLoader from "../SkeletonLoader";

const CoinInfoBulletPoint = ({
  heading,
  data,
  isLoading,
  isError,
}: {
  heading: string;
  data: number | string;
  isLoading: boolean;
  isError: boolean;
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-center gap-3">
        <span className="w-5 h-5 bg-[#B0B0EC] dark:bg-[#424286] rounded-2xl flex justify-center items-center text-white">
          +
        </span>
        <span>{heading}</span>
      </div>
      <div>
        {isLoading && (
          <div className="h-10 w-32 py-2">
            <SkeletonLoader height="full" width="full" />
          </div>
        )}
        {isError && (
          <div className="h-10 w-44 py-2">
            <h2 className="text-sm">Failed to fetch data</h2>
          </div>
        )}
        {!isLoading && !isError && <span>{data}</span>}
      </div>
    </div>
  );
};

export default CoinInfoBulletPoint;
