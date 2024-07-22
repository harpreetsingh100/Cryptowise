import { useState } from "react";
import { CgArrowsExchangeV } from "react-icons/cg";

interface Coin {
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  circulating_supply: number;
}

interface CoinsProps {
  setCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
}

const CoinTableHeader = ({ setCoins }: CoinsProps) => {
  const [isToggleByName, setIsToggleByName] = useState(false);
  const [isToggleByPrice, setIsToggleByPrice] = useState(false);
  const [isToggleByOneHour, setIsToggleByOneHour] = useState(false);
  const [isToggleBy24Hours, setIsToggleBy24Hours] = useState(false);
  const [isToggleBy7Days, setIsToggleBy7Days] = useState(false);
  const [isToggleByTotalVolume, setIsToggleByTotalVolume] = useState(false);
  const [isToggleByCirculatingSupply, setIsToggleByCirculatingSupply] =
    useState(false);

  const handleSortAlphabetically = () => {
    if (!isToggleByName) {
      setCoins((prevCoins) => {
        return [...prevCoins].sort((a, b) => a.name.localeCompare(b.name));
      });
      setIsToggleByName(!isToggleByName);
    } else {
      setCoins((prevCoins) => {
        return [...prevCoins].sort((a, b) => b.name.localeCompare(a.name));
      });
      setIsToggleByName(!isToggleByName);
    }
  };

  const handleSort = (
    toggleType: boolean,
    toggleBy: keyof Coin,
    setToggleType: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setCoins((prevCoins) => {
      const sortedCoins = [...prevCoins].sort((a, b) => {
        if (toggleType) {
          return (a[toggleBy] as number) - (b[toggleBy] as number);
        } else {
          return (b[toggleBy] as number) - (a[toggleBy] as number);
        }
      });
      return sortedCoins;
    });
    setToggleType(!toggleType);
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-[5%] flex justify-center items-center text-sm text-gray-600">
        <p> #</p>
      </div>
      <div
        className="w-[20%] flex justify-center text-sm text-gray-600 cursor-pointer"
        onClick={handleSortAlphabetically}>
        <p> Name</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[10%] flex justify-start text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(isToggleByPrice, "current_price", setIsToggleByPrice);
        }}>
        <p> Price</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[8%] flex justify-start text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(
            isToggleByOneHour,
            "price_change_percentage_1h_in_currency",
            setIsToggleByOneHour
          );
        }}>
        <p> 1h%</p>
        <div className="flex justify-center items-center ml-1">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[8%] flex justify-start text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(
            isToggleBy24Hours,
            "price_change_percentage_24h_in_currency",
            setIsToggleBy24Hours
          );
        }}>
        <p> 24h%</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[8%] flex justify-start text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(
            isToggleBy7Days,
            "price_change_percentage_7d_in_currency",
            setIsToggleBy7Days
          );
        }}>
        <p> 7d%</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[18%] flex justify-center text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(
            isToggleByTotalVolume,
            "total_volume",
            setIsToggleByTotalVolume
          );
        }}>
        <p> 24h volume / Market Cap</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[18%] flex justify-center text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(
            isToggleByCirculatingSupply,
            "circulating_supply",
            setIsToggleByCirculatingSupply
          );
        }}>
        <p> Circulating / Total Supply</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
      <div
        className="w-[10%] flex justify-center text-gray-600 cursor-pointer"
        onClick={() => {
          handleSort(
            isToggleBy7Days,
            "price_change_percentage_7d_in_currency",
            setIsToggleBy7Days
          );
        }}>
        <p>Last 7d</p>
        <div className="flex justify-center items-center ml-2">
          <CgArrowsExchangeV size={20} color="#6161D6" />
        </div>
      </div>
    </div>
  );
};

export default CoinTableHeader;
