"use client";

import Navbar from "./components/Navbar/Navbar";
import CoinCarousel from "./components/Carousel/CoinCarousel";
import ConverterButtons from "./components/ConverterButtons";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="h-96 w-screen bg-[#F2F5F9] dark:bg-darkBg dark:text-lightText text-darkText">
        <ConverterButtons />
        <CoinCarousel />
      </main>
    </div>
  );
}
