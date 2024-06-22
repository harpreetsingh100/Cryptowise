import { useState } from "react";

const ConverterButtons = () => {
  const [isConverterVisible, setIsConverterVisible] = useState(false);
  return (
    <div className="max-w-[85%] m-auto pt-6">
      <button
        className={`${
          isConverterVisible
            ? "bg-lightBg text-[#7171a8] dark:bg-[#232337]"
            : "bg-[#B0B0F0] text-lightText dark:bg-[#3D3D82]"
        } w-56 rounded-md px-4 py-2 shadow-lg h-10 dark:text-lightText`}
        onClick={() => {
          setIsConverterVisible(false);
        }}>
        Coins
      </button>
      <button
        className={`${
          isConverterVisible
            ? "bg-[#B0B0F0] text-lightText dark:bg-[#3D3D82]"
            : "bg-lightBg text-[#7171a8] dark:bg-[#232337]"
        } w-56 rounded-md px-4 py-2 shadow-lg h-10 dark:text-lightText`}
        onClick={() => {
          setIsConverterVisible(true);
        }}>
        Converter
      </button>
    </div>
  );
};

export default ConverterButtons;
