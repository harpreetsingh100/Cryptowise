import { useState } from "react";
import CoinTableSingleHeading from "./CoinTableSingleHeading";

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
        const first: any = a[toggleBy];
        const second: any = b[toggleBy];
        if (toggleType) {
          return first - second;
        } else {
          return second - first;
        }
      });
      return sortedCoins;
    });
    setToggleType(!toggleType);
  };

  return (
    <div className="w-full flex items-center justify-between gap-4 lg:gap-0 lg:justfiy-start mt-6 lg:mt-0 mb-4">
      <div className="w-[5%] justify-center items-center text-sm text-gray-600 hidden lg:flex">
        <p> #</p>
      </div>
      <div className="sm:w-[20%] lg:w-[20%] flex justify-center ml-6 lg:ml-0">
        <CoinTableSingleHeading
          title="Name"
          width="20"
          justifyContent="center"
          handleSort={handleSortAlphabetically}
        />
      </div>
      <div className="w-[33.33%] sm:w-[20%] lg:w-[10%]  flex justify-center lg:justify-start sm:flex  lg:pl-1">
        <CoinTableSingleHeading
          title="Price"
          width="10"
          justifyContent="start"
          handleSort={() => {
            handleSort(isToggleByPrice, "current_price", setIsToggleByPrice);
          }}
        />
      </div>
      <div className="lg:w-[8%] sm:w-[20%] hidden sm:flex justify-center lg:justify-start">
        <CoinTableSingleHeading
          title="1h%"
          width="8"
          justifyContent="start"
          handleSort={() => {
            handleSort(
              isToggleByOneHour,
              "price_change_percentage_1h_in_currency",
              setIsToggleByOneHour
            );
          }}
        />
      </div>
      <div className="w-[33.33%] sm:w-[20%] lg:w-[8%] justify-center lg:justify-start hidden sm:flex">
        <CoinTableSingleHeading
          title="24h%"
          width="8"
          justifyContent="start"
          handleSort={() => {
            handleSort(
              isToggleBy24Hours,
              "price_change_percentage_24h_in_currency",
              setIsToggleBy24Hours
            );
          }}
        />
      </div>
      <div className="w-[8%] hidden lg:flex">
        <CoinTableSingleHeading
          title="7d%"
          width="8"
          justifyContent="start"
          handleSort={() => {
            handleSort(
              isToggleBy7Days,
              "price_change_percentage_7d_in_currency",
              setIsToggleBy7Days
            );
          }}
        />
      </div>
      <div className="w-[18%] justify-center hidden lg:flex">
        <CoinTableSingleHeading
          title="24h volume / Market Cap"
          width="18"
          justifyContent="center"
          handleSort={() => {
            handleSort(
              isToggleByTotalVolume,
              "total_volume",
              setIsToggleByTotalVolume
            );
          }}
        />
      </div>
      <div className="w-[18%] justify-center hidden lg:flex">
        <CoinTableSingleHeading
          title="Circulating / Total Supply"
          width="18"
          justifyContent="center"
          handleSort={() => {
            handleSort(
              isToggleByCirculatingSupply,
              "circulating_supply",
              setIsToggleByCirculatingSupply
            );
          }}
        />
      </div>

      <div className="w-[33.33%] sm:w-[20%] lg:w-[10%] flex justify-center whitespace-nowrap lg:whitespace-normal  ml-2 lg:ml-0">
        <CoinTableSingleHeading
          title="Last 7d"
          width="10"
          justifyContent="center"
          handleSort={() => {
            handleSort(
              isToggleBy7Days,
              "price_change_percentage_7d_in_currency",
              setIsToggleBy7Days
            );
          }}
        />
      </div>
    </div>
  );
};

export default CoinTableHeader;
