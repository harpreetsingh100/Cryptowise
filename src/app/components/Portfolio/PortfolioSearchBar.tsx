import { useGetSearchQueryDataQuery } from "@/lib/features/api";
import SearchIcon from "@/svg/SearchIcon";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../lib/hooks/useDebounce";
import { useHandleClickOutside } from "@/lib/hooks/useHandleClickOutside";
import { GiCancel } from "react-icons/gi";
import Image from "next/image";

interface PortfolioSearchBarProps {
  setCoinName: React.Dispatch<React.SetStateAction<string>>;
  setShowSelectCoinInput: React.Dispatch<React.SetStateAction<boolean>>;
  showSelectCoinInput: boolean;
  setShowEditCoinPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortfolioSearchBar = ({
  setCoinName,
  setShowSelectCoinInput,
  showSelectCoinInput,
}: PortfolioSearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 400);
  const [showPortfolioSearchBar, setShowPortfolioSearchBar] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, error } =
    useGetSearchQueryDataQuery(debouncedSearchValue);

  const closeDropdown = () => {
    setShowSelectCoinInput(true);
  };

  useHandleClickOutside(ref, closeDropdown);

  useEffect(() => {
    if (!showSelectCoinInput) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [showSelectCoinInput]);

  return (
    <div className="relative w-full flex items-center z-50">
      <input
        ref={inputRef}
        type="text"
        className="w-full bg-[#ebebfd] rounded-lg  pl-10 dark:bg-[#191925] outline-none h-full"
        placeholder="Search...."
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setShowPortfolioSearchBar(true);
        }}
      />
      <div className="absolute left-3 w-4">
        <SearchIcon />
      </div>
      <div
        className="absolute right-3 w-4 cursor-pointer"
        onClick={() => {
          setShowSelectCoinInput(true);
        }}>
        <GiCancel />
      </div>
      {isLoading && <div>Loading</div>}
      {showPortfolioSearchBar && (
        <div
          ref={ref}
          className={`${
            debouncedSearchValue == ""
              ? "hidden z-50"
              : "h-[420px] w-full absolute top-6 dark:bg-[#191925] bg-[#EBEBFC] z-50 overflow-y-scroll flex flex-col gap-4 transition delay-200 duration-500 py-4 pr-4 rounded-b-lg"
          }`}>
          {data &&
            data?.coins.map((coin: any) => {
              return (
                <div
                  key={coin.id}
                  className="ml-10 mb-3 cursor-pointer hover:text-[#6161D6] z-50 flex"
                  onClick={() => {
                    setShowSelectCoinInput(true);
                    setCoinName(coin?.id?.toLowerCase());
                  }}>
                  <Image
                    src={coin.large}
                    width={20}
                    height={10}
                    alt="coin-image"
                    className="object-contain"
                  />
                  <h2 className="ml-3">{coin.name}</h2>
                </div>
              );
            })}
          {isLoading && <div>Loading</div>}
          {error && <div className="text-center">Something went wrong</div>}
        </div>
      )}
    </div>
  );
};

export default PortfolioSearchBar;
