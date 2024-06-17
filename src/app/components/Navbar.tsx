"use client";

import Link from "next/link";
import Logo from "@/svg/Logo";
import HomeIcon from "@/svg/HomeIcon";
import PortfolioIcon from "@/svg/PortfolioIcon";
import SearchIcon from "@/svg/SearchIcon";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useRef, useState } from "react";
import { RootState } from "../../lib/store";
import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { FaArrowDown } from "react-icons/fa";
import CurrencyOptions from "./CurrencyOptions";
import { useHandleClickOutside } from "@/lib/hooks/useHandleClickOutside";

const Navbar = () => {
  const [showCurrencyOptions, setShowCurrencyOptions] =
    useState<boolean>(false);
  const { currencyType, currencySymbol } = useAppSelector(
    (state: RootState) => state.currency
  );
  const pathName = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const closeDropdown = () => {
    setShowCurrencyOptions(false);
  };

  const handleDropdownDisplay = () => {
    setShowCurrencyOptions(showCurrencyOptions === true ? false : true);
  };

  useHandleClickOutside(ref, closeDropdown);

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
              className="w-64 bg-[#ebebfd] rounded-lg h-10 pl-10 dark:bg-[#191925] outline-none "
              placeholder="Search..."
            />
            <div className="absolute left-3  top-[11px] w-4">
              <SearchIcon />
            </div>
          </div>
          <div className="bg-[#ebebfd] rounded-lg h-10 px-3 dark:bg-[#191925] max-w-18  flex justify-around items-center cursor-pointer relative">
            <div
              className="flex justify-between items-center gap-2"
              onClick={() => {
                setShowCurrencyOptions((prev) => {
                  return !prev;
                });
              }}>
              <div className="min-w-4 flex justify-center items-center">
                {currencySymbol === "BTC" && (
                  <Image
                    src="/bitcoin.webp"
                    alt="bitcoin image"
                    width={20}
                    height={10}
                  />
                )}
                {currencySymbol === "ETH" && (
                  <Image
                    src="/ethereum.webp"
                    alt="bitcoin image"
                    width={20}
                    height={10}
                  />
                )}
                {currencySymbol !== "BTC" && currencySymbol !== "ETH" && (
                  <div>{currencySymbol}</div>
                )}
              </div>
              <div>{currencyType}</div>
              <div>
                <FaArrowDown className="text-xs" />
              </div>
            </div>
            <div ref={ref} onClick={handleDropdownDisplay}>
              {showCurrencyOptions && (
                <div>
                  <CurrencyOptions
                    setShowCurrencyOptions={setShowCurrencyOptions}
                  />
                </div>
              )}
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
