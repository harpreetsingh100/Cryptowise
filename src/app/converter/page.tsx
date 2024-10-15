"use client";

import Navbar from "../components/Navbar/Navbar";
import ConverterButtons from "../components/ConverterButtons";
import ConverterTime from "../components/Converter/ConverterTime";
import ConverterBoxes from "../components/Converter/ConverterBoxes";
import MarketDataBar from "../components/Navbar/MarketDataBar";

const page = () => {
  return (
    <div>
      <MarketDataBar />
      <Navbar />
      <main className="h-auto pb-20 w-screen bg-[#F2F5F9] dark:bg-darkBg dark:text-lightText text-darkText">
        <ConverterButtons />
        <div className="max-w-[85%] m-auto pt-6 h-full">
          <ConverterTime />
          <div className="relative w-full">
            <div className="flex w-full justify-between">
              <ConverterBoxes />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
