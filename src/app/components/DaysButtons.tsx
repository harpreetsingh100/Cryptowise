import React from "react";

const DaysButtons = ({ days, setDays }: { days: number; setDays: any }) => {
  return (
    <>
      <button
        className={`${
          days === 1
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg"
            : "py-2 px-4 rounded-lg"
        }`}
        onClick={() => setDays(1)}>
        1D
      </button>
      <button
        className={`${
          days === 7
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg"
            : "py-2 px-4 rounded-lg"
        }`}
        onClick={() => setDays(7)}>
        7D
      </button>
      <button
        className={`${
          days === 14
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg"
            : "py-2 px-4 rounded-lg"
        }`}
        onClick={() => setDays(14)}>
        14D
      </button>
      <button
        className={`${
          days === 30
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg"
            : "py-2 px-4 rounded-lg"
        }`}
        onClick={() => setDays(30)}>
        1M
      </button>
      <button
        className={`${
          days === 180
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg"
            : "py-2 px-4 rounded-lg"
        }`}
        onClick={() => setDays(180)}>
        6M
      </button>
      <button
        className={`${
          days === 365
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg"
            : "py-2 px-4 rounded-lg"
        }`}
        onClick={() => setDays(365)}>
        1Y
      </button>
    </>
  );
};

export default DaysButtons;
