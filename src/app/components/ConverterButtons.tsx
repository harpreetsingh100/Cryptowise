"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        <motion.button
          className={`${
            isConverterVisible
              ? "bg-lightBg text-[#7171a8] dark:bg-[#232337]"
              : "bg-[#B0B0F0] text-lightText dark:bg-[#3D3D82]"
          } w-56 rounded-md px-4 py-2 shadow-lg h-10 dark:text-lightText z-10`}
          onClick={() => {
            setIsConverterVisible(false);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}>
          Coins
        </motion.button>
      </Link>

      <Link href="/converter">
        <motion.button
          className={`${
            isConverterVisible
              ? "bg-[#B0B0F0] text-lightText dark:bg-[#3D3D82] z-10"
              : "bg-lightBg text-[#7171a8] dark:bg-[#232337] z-10"
          } w-56 rounded-md px-4 py-2 shadow-lg h-10 dark:text-lightText z-10`}
          onClick={() => {
            setIsConverterVisible(true);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}>
          Converter
        </motion.button>
      </Link>
    </div>
  );
};

export default ConverterButtons;
