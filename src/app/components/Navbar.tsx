"use client";

import Link from "next/link";
import Logo from "@/svg/Logo";
import HomeIcon from "@/svg/HomeIcon";
import PortfolioIcon from "@/svg/PortfolioIcon";
import SearchIcon from "@/svg/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrencyType } from "@/lib/features/currencySlice";
import { RootState } from "../../lib/store";
import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { currencyType, currencySymbol } = useAppSelector(
    (state: RootState) => state.currency
  );
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const handleCurrencyChange = (currency: string) => {
    dispatch(setCurrencyType(currency));
    setShowCurrencyOptions(false);
  };

  return (
    <div className="w-screen bg-lightBg dark:bg-darkBg dark:text-lightText text-purpleText">
      <div className="flex justify-between items-center max-w-[85%] h-[8vh] bg-lightBg dark:bg-darkBg dark:text-lightText text-purpleText w-screen m-auto">
        <div className="flex gap-20">
          <div className="flex justify-center items-center">
            <Logo />
          </div>
          <div className="font-extrabold text-xl">Crypto Wise</div>
          <div className="flex gap-8 justify-center items-center ml-8 text-xl">
            <div className="flex justify-center items-center">
              <span
                className={`${
                  pathName === "/"
                    ? "text-black dark:text-[#6161D6]"
                    : "text-gray-500"
                } w-6`}>
                <HomeIcon />
              </span>
              <span className="ml-2">
                <Link
                  href="/"
                  className={`${
                    pathName === "/"
                      ? "text-black dark:text-[#6161D6]"
                      : "text-gray-500"
                  }`}>
                  Home
                </Link>
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span
                className={`${
                  pathName === "/portfolio"
                    ? "text-black dark:text-[#6161D6]"
                    : "text-gray-500"
                } w-6`}>
                <PortfolioIcon />
              </span>
              <span className="ml-2">
                <Link
                  href="/portfolio"
                  className={`${
                    pathName === "/portfolio"
                      ? "text-black dark:text-[#6161D6]"
                      : "text-gray-500"
                  }`}>
                  Portfolio
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              className="w-64 bg-[#ebebfd] rounded-lg h-10 pl-8 dark:bg-[#191925]"
              placeholder="Search..."
            />
            <div className="absolute left-2  top-[11px] w-4">
              <SearchIcon />
            </div>
          </div>
          <div className="bg-[#ebebfd] rounded-lg h-10 px-3 dark:bg-[#191925] min-w-18 flex justify-between items-center cursor-pointer relative">
            <div
              className="flex justify-between items-center gap-2"
              onClick={() => {
                setShowCurrencyOptions((prev) => {
                  return !prev;
                });
              }}>
              <div>{currencySymbol}</div>
              <div> {currencyType}</div>
              {<FaArrowDown className="text-xs" />}
            </div>
            {showCurrencyOptions && (
              <div className="bg-[#ebebfd] rounded-lg  px-3 dark:bg-[#191925] min-w-16 flex justify-between items-center cursor-pointer absolute top-12 border-2 left-0 flex-col gap-3 p-2">
                <div
                  className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16 "
                  onClick={() => {
                    handleCurrencyChange("USD");
                  }}>
                  <div>USD</div>
                </div>
                <div
                  className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16"
                  onClick={() => {
                    handleCurrencyChange("EUR");
                  }}>
                  <div>EUR</div>
                </div>
                <div
                  className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] min-w-16"
                  onClick={() => {
                    handleCurrencyChange("GBP");
                  }}>
                  <div>GBP</div>
                </div>
              </div>
            )}
            <div></div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
