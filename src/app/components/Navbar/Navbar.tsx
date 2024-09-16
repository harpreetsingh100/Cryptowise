"use client";

import Link from "next/link";
import Logo from "@/svg/Logo";
import HomeIcon from "@/svg/HomeIcon";
import PortfolioIcon from "@/svg/PortfolioIcon";
import { useAppSelector } from "@/lib/hooks";
import { useRef, useState } from "react";
import { RootState } from "@/lib/store";
import ThemeSwitcher from "../ThemeSwitcher";
import { usePathname } from "next/navigation";
import CurrencyOptions from "../CurrencyOptions";
import { useHandleClickOutside } from "@/lib/hooks/useHandleClickOutside";
import { RiArrowDownSFill } from "react-icons/ri";
import DynamicCurrencyButton from "../DynamicCurrencyButton";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const [showCurrencyOptions, setShowCurrencyOptions] =
    useState<boolean>(false);
  const { currencyType } = useAppSelector((state: RootState) => state.currency);
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
    <div className="w-screen bg-lightBg dark:bg-darkBg dark:text-lightText text-purpleText shadow-xl py-2 z-30">
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
        <div className="flex gap-3 z-50">
          <div className="relative z-50">
            <SearchBar />
          </div>
          <div className="bg-[#ebebfd] rounded-lg h-10 px-3 dark:bg-[#191925] w-[100px] flex justify-around items-center cursor-pointer relative border-[1px] border-[#6B7280]">
            <div
              className="flex justify-between items-center gap-2"
              onClick={() => {
                setShowCurrencyOptions((prev) => {
                  return !prev;
                });
              }}>
              <div className="min-w-4 flex justify-center items-center">
                <DynamicCurrencyButton />
              </div>
              <div>{currencyType}</div>
              <div>
                <RiArrowDownSFill />
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
