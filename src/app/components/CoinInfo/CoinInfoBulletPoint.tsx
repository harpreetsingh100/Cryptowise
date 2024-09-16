"use client";

const CoinInfoBulletPoint = ({
  heading,
  data,
}: {
  heading: string;
  data: number | string;
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
        <span>{data}</span>
      </div>
    </div>
  );
};

export default CoinInfoBulletPoint;
