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
import { motion } from "framer-motion";

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
    <div className="w-full bg-lightBg dark:bg-darkBg dark:text-lightText text-purpleText shadow-xl py-2 z-30">
      <div className="flex justify-between sm:justify-between items-center  max-w-[85%] h-[8vh] bg-lightBg dark:bg-darkBg dark:text-lightText text-purpleText w-screen m-auto">
        <div className="flex gap-20">
          <div className="hidden xl:flex justify-center items-center">
            <Logo />
          </div>
          <div className="hidden font-extrabold text-xl xl:flex justify-center items-center relative right-16">
            CryptoWise
          </div>
          <div className="flex gap-2 sm:gap-8 md:gap-8 lg:gap-8 xl:gap-8 2xl:gap-8 justify-start sm:justify-center relative right-8 items-center ml-8 sm:ml-[24px] md:ml-[16px] text-xl">
            <motion.div
              className="flex justify-center items-center bg-[#EBEBFC] dark:bg-[#191925] sm:bg-transparent sm:dark:bg-transparent rounded-lg pr-[10px] sm:pr-2 p-[2px] px-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <span
                className={`${
                  pathName === "/"
                    ? "text-black dark:text-[#6161D6] p-[8px] mt-1 sm:mt-0"
                    : "text-gray-500 p-[8px] mt-1 sm:mt-0"
                } w-6 sm:hidden md:block`}>
                <HomeIcon />
              </span>
              <span className="md:ml-2">
                <Link
                  href="/"
                  className={`${
                    pathName === "/"
                      ? "text-black dark:text-[#6161D6] hidden sm:block text-sm sm:text-lg md:text-xl lg:text-xl"
                      : "text-gray-500 text-sm sm:text-lg md:text-xl lg:text-xl"
                  }`}>
                  Home
                </Link>
              </span>
            </motion.div>
            <motion.div
              className="flex justify-center items-center bg-[#EBEBFC] dark:bg-[#191925] sm:bg-transparent sm:dark:bg-transparent rounded-lg pr-[10px] sm:pr-2 p-[2px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <span
                className={`${
                  pathName === "/portfolio"
                    ? "text-black dark:text-[#6161D6] p-[8px] mt-1 sm:mt-0 ml-1"
                    : "text-gray-500 p-[8px] mt-1 sm:mt-0 ml-1"
                } w-6 sm:hidden md:block`}>
                <PortfolioIcon />
              </span>
              <span className="md:ml-2">
                <Link
                  href="/portfolio"
                  className={`${
                    pathName === "/portfolio"
                      ? "text-black dark:text-[#6161D6] hidden sm:block text-sm sm:text-lg md:text-lg lg:text-xl"
                      : "text-gray-500 text-sm sm:text-lg md:text-lg lg:text-xl"
                  }`}>
                  Portfolio
                </Link>
              </span>
            </motion.div>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 z-50 mx-1">
          <div className="hidden md:relative lg:relative xl:relative 2xl:relative z-50 lg:block">
            <SearchBar />
          </div>
          <div className="bg-[#ebebfd] sm:rounded-lg h-10 px-3 dark:bg-[#191925] w-[65px] sm:w-[90px] md:w-[100px] flex justify-around items-center cursor-pointer relative sm:border-[1px] sm:border-[#6B7280] rounded-xl">
            <div
              className="flex justify-between items-center gap-1"
              onClick={() => {
                setShowCurrencyOptions((prev) => {
                  return !prev;
                });
              }}>
              <div className="min-w-4 sm:flex justify-center items-center text-sm lg:text-[16px] hidden">
                <DynamicCurrencyButton />
              </div>
              <div className="text-sm lg:text-[16px] text-gray-500 sm:dark:text-white sm:text-[#343470] mt-1 sm:mt-0">
                {currencyType}
              </div>
              <div>
                <RiArrowDownSFill className="text-gray-500 sm:dark:text-white sm:text-[#343470] mt-1 sm:mt-0" />
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
          <div className="">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
