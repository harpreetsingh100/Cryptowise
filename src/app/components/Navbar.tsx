"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/svg/Logo";
import HomeIcon from "@/svg/HomeIcon";
import PortfolioIcon from "@/svg/PortfolioIcon";
import SearchIcon from "@/svg/SearchIcon";
import Moon from "@/svg/Moon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeCurrencyType } from "@/lib/features/currencySlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const currencyType = useAppSelector((state) => state.currency.value);

  const handleCurrencyChange = (e: { target: { value: string } }) => {
    dispatch(changeCurrencyType(e.target.value));
  };
  return (
    <div className="w-screen border-2 border-purple-600">
      <div className="flex justify-between items-center max-w-[1500px] h-[6vh] bg-lightBg text-purpleText w-screen m-auto">
        {/* left div  */}
        <div className="flex gap-6">
          <div className="flex justify-center items-center">
            <Logo />
          </div>
          <div className="font-extrabold text-2xl">Crypto Wise</div>
          <div className="flex gap-8 justify-center items-center ml-8 text-xl">
            <div className="flex justify-center items-center">
              <span className="w-6">
                <HomeIcon />
              </span>
              <span className="ml-2">
                <Link href="/">Home</Link>
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="w-6">
                <PortfolioIcon />
              </span>
              <span className="ml-2">
                <Link href="/portfolio">Portfolio</Link>
              </span>
            </div>
          </div>
        </div>
        {/* // right div */}
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              className="w-64 bg-[#ebebfd] rounded-lg h-10 pl-8"
              placeholder="Search..."
            />
            <div className="absolute left-2  top-[11px] w-4">
              <SearchIcon />
            </div>
          </div>
          <div>
            <select
              className="bg-[#ebebfd] rounded-lg h-10 px-2"
              value={currencyType}
              onChange={handleCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="flex justify-center items-center bg-[#ebebfd] rounded-2xl h-10 px-[14px]">
            <button>
              <Moon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
