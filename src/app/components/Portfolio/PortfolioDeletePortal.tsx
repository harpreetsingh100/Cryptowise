import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CoinData {
  id: number;
  image: string;
}

interface PortfolioDeletePortalProps {
  portfolioCoinList: CoinData[];
  setPortfolioCoinList: React.Dispatch<React.SetStateAction<CoinData[]>>;
  selectedId: number | null;
  setShowDeleteCoinPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortfolioDeletePortal = ({
  portfolioCoinList,
  setPortfolioCoinList,
  selectedId,
  setShowDeleteCoinPortal,
}: PortfolioDeletePortalProps) => {
  const [imageUrl, setImagrUrl] = useState("");

  useEffect(() => {
    const image = portfolioCoinList.filter((coin: CoinData) => {
      return coin.id === selectedId;
    });
    setImagrUrl(image[0]?.image);
  }, [portfolioCoinList, selectedId]);

  return (
    <div className="fixed inset-0">
      <div className="h-screen w-screen absolute top-0 left-0 bg-[rgba(43,38,86,0.7)] overflow-y-hidden">
        <div className="relative h-screen w-screen overflow-y-hidden">
          <div className="w-[40%] h-1/2 py-10 px-12 z-40 rounded-xl inset-0 dark:bg-[#13121A] bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transform ">
            <div className="flex flex-col gap-3">
              <div className="flex justify-center items-center">
                <h2 className="text-xl">
                  Are you sure you want to delete this coin ?
                </h2>
              </div>
              <div className="flex justify-center items-center w-full h-60">
                <div className="py-4 px-5 rounded-lg mb-3 bg-[#EBEBFC] dark:bg-[#1E1931] w-1/2 h-[80%] flex justify-center items-center">
                  <div className="bg-white p-4 rounded-xl dark:bg-[#2C2C4A]">
                    <Image
                      src={imageUrl}
                      alt="coin-image"
                      width={30}
                      height={10}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.09 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-[#B0B0EC] dark:bg-[#3A3A78] px-20 py-2 rounded-xl text-white"
                  onClick={() => {
                    setShowDeleteCoinPortal(false);
                  }}>
                  No
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.09 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-[#B0B0EC] dark:bg-[#3A3A78] px-20 py-2 rounded-xl text-white"
                  onClick={() => {
                    const filteredList = portfolioCoinList.filter((coin) => {
                      return coin.id !== selectedId;
                    });
                    setPortfolioCoinList(filteredList);
                    setShowDeleteCoinPortal(false);
                  }}>
                  Yes
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDeletePortal;
