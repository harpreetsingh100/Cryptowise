"use client";

import React from "react";
import { motion } from "framer-motion";

interface PortfolioHeaderProps {
  setShowPortfolioPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortfolioHeader = ({ setShowPortfolioPortal }: PortfolioHeaderProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Your Statistics</h2>
        <motion.button
          whileHover={{ scale: 1.09 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="dark:bg-[#3A397C] bg-[#A5A4DA] px-4 py-2 rounded-lg w-40 text-white"
          onClick={() => {
            setShowPortfolioPortal((prev: boolean) => !prev);
          }}>
          Add Asset
        </motion.button>
      </div>
    </div>
  );
};

export default PortfolioHeader;
