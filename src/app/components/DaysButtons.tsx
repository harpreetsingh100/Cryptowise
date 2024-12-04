import React from "react";
import { motion } from "framer-motion";

const DaysButtons = ({ days, setDays }: { days: number; setDays: any }) => {
  return (
    <div className="w-full lg:w-auto">
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`${
          days === 1
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
            : "py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
        }`}
        onClick={() => setDays(1)}>
        1D
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`${
          days === 7
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
            : "py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
        }`}
        onClick={() => setDays(7)}>
        7D
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`${
          days === 14
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
            : "py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
        }`}
        onClick={() => setDays(14)}>
        14D
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`${
          days === 30
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
            : "py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
        }`}
        onClick={() => setDays(30)}>
        1M
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`${
          days === 180
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
            : "py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
        }`}
        onClick={() => setDays(180)}>
        6M
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`${
          days === 365
            ? "bg-[#A2A3ED] dark:bg-[#42428B] py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
            : "py-2 px-4 rounded-lg text-sm sm:text-sm md:text-sm lg:text-lg"
        }`}
        onClick={() => setDays(365)}>
        1Y
      </motion.button>
    </div>
  );
};

export default DaysButtons;
