"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ConverterButtons = () => {
  const [isConverterVisible, setIsConverterVisible] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    if (pathName === "/converter") {
      setIsConverterVisible(true);
    } else {
      setIsConverterVisible(false);
    }
  }, [pathName]);
  return (
    <div className="max-w-[85%] m-auto pt-6">
      <Link href="/">
        <button
          className={`${
            isConverterVisible
              ? "bg-lightBg text-[#7171a8] dark:bg-[#232337]"
              : "bg-[#B0B0F0] text-lightText dark:bg-[#3D3D82]"
          } w-56 rounded-md px-4 py-2 shadow-lg h-10 dark:text-lightText`}
          onClick={() => {
            setIsConverterVisible(false);
          }}>
          Coins
        </button>
      </Link>

      <Link href="/converter">
        <button
          className={`${
            isConverterVisible
              ? "bg-[#B0B0F0] text-lightText dark:bg-[#3D3D82]"
              : "bg-lightBg text-[#7171a8] dark:bg-[#232337]"
          } w-56 rounded-md px-4 py-2 shadow-lg h-10 dark:text-lightText`}
          onClick={() => {
            setIsConverterVisible(true);
          }}>
          Converter
        </button>
      </Link>
    </div>
  );
};

export default ConverterButtons;
