import React, { Dispatch, SetStateAction } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import CoinsList from "./CoinsList";

interface ConverterErrorPropsTypes {
  sell: boolean;
  inputValue: number | string;
  setInputValue: Dispatch<SetStateAction<string | number>>;
  inputName: string;
  isCoinListVisible: boolean;
  setIsCoinListVisible: Dispatch<SetStateAction<boolean>>;
  setCoin: Dispatch<SetStateAction<string>>;
  handleInputChange: any;
}

const ConverterBoxError = ({
  sell,
  setIsCoinListVisible,
  isCoinListVisible,
  setCoin,
}: ConverterErrorPropsTypes) => {
  return (
    <div className=" flex-col flex justify-around">
      <h4 className="pt-4 ">You {sell ? "Sell" : "Buy"}</h4>
      <div className="flex w-full">
        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <div className="w-64 flex h-10 items-center mt-4 justify-between relative">
              <div
                className="flex items-center z-40 cursor-pointer w-[300px]"
                onClick={() => {
                  setIsCoinListVisible(
                    (prevCoinList: boolean) => !prevCoinList
                  );
                }}>
                <h2 className="text-xl ml-3 mt-2 w-full">
                  Failed to fetch data
                </h2>

                <RiArrowDownSFill
                  color="white"
                  className="ml-3 mt-2 z-50 cursor-pointer"
                  size={25}
                />
              </div>
              {isCoinListVisible && (
                <div className="absolute top-16 w-[400px] left-[-10px] h-80 overflow-y-auto bg-[#191925] px-8 py-4 rounded-2xl">
                  <CoinsList
                    setCoin={setCoin}
                    setIsCoinListVisible={setIsCoinListVisible}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="h-1 dark:bg-white bg-[#9A9ABA] w-full rounded-2xl mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default ConverterBoxError;
