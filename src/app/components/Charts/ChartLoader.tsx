import { useTheme } from "next-themes";
import React from "react";
import { Circles } from "react-loader-spinner";

const ChartLoader = () => {
  const { theme } = useTheme();
  return (
    <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[420px] w-full flex justify-center items-center">
      <Circles
        height="100"
        width="100"
        color={`${theme === "light" ? "#A9AAEC" : "#6161D6"}`}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default ChartLoader;
