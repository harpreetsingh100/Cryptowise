import CoinInfo from "@/app/components/CoinInfo/CoinInfo";
import MarketDataBar from "@/app/components/Navbar/MarketDataBar";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";

const page = ({ params }: { params: { coinName: string } }) => {
  return (
    <div className="bg-[#F3F5F9] dark:bg-black">
      <MarketDataBar />
      <Navbar />
      <div className="max-w-[85%] m-auto pt-6">
        <CoinInfo coinName={params?.coinName} />
      </div>
    </div>
  );
};

export default page;
