"use client";

import Navbar from "./components/Navbar/Navbar";
import CoinCarousel from "./components/Carousel/CoinCarousel";
import ConverterButtons from "./components/ConverterButtons";
import Chart from "./components/Charts/Chart";
import Compare from "./components/Compare";
import CoinTable from "./components/CoinTable/CoinTable";
import MarketDataBar from "./components/Navbar/MarketDataBar";
export default function Home() {
  return (
    <div>
      <MarketDataBar />
      <Navbar />
      <main className="h-auto pb-20 w-screen bg-[#F2F5F9] dark:bg-darkBg dark:text-lightText text-darkText">
        <ConverterButtons />
        <Compare />
        <CoinCarousel />
        <Chart />
        <CoinTable />
      </main>
    </div>
  );
}
