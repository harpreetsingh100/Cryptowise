"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioPortal from "./PortfolioPortal";
import MarketDataBar from "../Navbar/MarketDataBar";
import PortfolioCoinCard from "./PortfolioCoinCard";
import PortfolioDeletePortal from "./PortfolioDeletePortal";

const Portfolio = () => {
  const [portfolioCoinList, setPortfolioCoinList] = useState<any>([]);
  const [showPortfolioPortal, setShowPortfolioPortal] =
    useState<boolean>(false);
  const [showEditCoinPortal, setShowEditCoinPortal] = useState<boolean>(false);
  const [showDeleteCoinPortal, setShowDeleteCoinPortal] =
    useState<boolean>(false);
  const [coinName, setCoinName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const savedList = localStorage.getItem("portfolioCoinList");
    let storedPortfolioCoins = [];
    storedPortfolioCoins = savedList ? JSON.parse(savedList) : [];
    setPortfolioCoinList(storedPortfolioCoins);
  }, []);

  useEffect(() => {
    if (showPortfolioPortal || showDeleteCoinPortal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPortfolioPortal, showDeleteCoinPortal]);

  return (
    <div>
      <div className=" w-full relative bg-[#F3F5F9] dark:bg-black h-auto min-h-screen max-h-auto">
        <MarketDataBar />
        <Navbar />
        <div className="max-w-[85%] m-auto mt-4">
          <PortfolioHeader setShowPortfolioPortal={setShowPortfolioPortal} />
        </div>
        <div className="w-full h-full">
          {showPortfolioPortal && (
            <PortfolioPortal
              setShowPortfolioPortal={setShowPortfolioPortal}
              portfolioCoinList={portfolioCoinList}
              setPortfolioCoinList={setPortfolioCoinList}
              coinName={coinName}
              setCoinName={setCoinName}
              showEditCoinPortal={showEditCoinPortal}
              setShowEditCoinPortal={setShowEditCoinPortal}
              selectedId={selectedId}
            />
          )}
          {showDeleteCoinPortal && (
            <PortfolioDeletePortal
              setShowDeleteCoinPortal={setShowDeleteCoinPortal}
              portfolioCoinList={portfolioCoinList}
              setPortfolioCoinList={setPortfolioCoinList}
              selectedId={selectedId}
            />
          )}
        </div>
        <div className="max-w-[85%] m-auto mt-4 h-full">
          {portfolioCoinList.length > 0 ? (
            <div>
              {portfolioCoinList.map((coin: any) => {
                return (
                  <PortfolioCoinCard
                    coin={coin}
                    key={coin.id}
                    showDeleteCoinPortal={showDeleteCoinPortal}
                    setShowDeleteCoinPortal={setShowDeleteCoinPortal}
                    setSelectedId={setSelectedId}
                    setShowPortfolioPortal={setShowPortfolioPortal}
                    setShowEditCoinPortal={setShowEditCoinPortal}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-2xl flex justify-center items-center mt-8">
              <p>Your portfolio is currently empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
