import { useTheme } from "next-themes";
import React from "react";
import { Circles } from "react-loader-spinner";

const ChartLoader = () => {
  const windowWidth = window.innerWidth;
  const { theme } = useTheme();
  return (
    <div className="bg-white dark:bg-[#191934] py-6 rounded-xl h-[280px] sm:h-[320px] lg:h-[420px] w-full flex justify-center items-center">
      <Circles
        height={windowWidth > 768 ? "100" : "60"}
        width={windowWidth > 768 ? "100" : "60"}
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
