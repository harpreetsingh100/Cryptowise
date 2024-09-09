"use client";

import React from "react";

interface PortfolioHeaderProps {
  setShowPortfolioPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortfolioHeader = ({ setShowPortfolioPortal }: PortfolioHeaderProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Your Statistics</h2>
        <button
          className="dark:bg-[#3A397C] bg-[#A5A4DA] px-4 py-2 rounded-lg w-40 text-white"
          onClick={() => {
            setShowPortfolioPortal((prev: boolean) => !prev);
          }}>
          Add Asset
        </button>
      </div>
    </div>
  );
};

export default PortfolioHeader;
