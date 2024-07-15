import { useGetSearchQueryDataQuery } from "@/lib/features/api";
import SearchIcon from "@/svg/SearchIcon";
import { useState } from "react";
import { useDebounce } from "../../../lib/hooks/useDebounce";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 400);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const { data, isLoading, error } =
    useGetSearchQueryDataQuery(debouncedSearchValue);

  return (
    <div className="relative">
      <input
        type="text"
        className="w-64 bg-[#ebebfd] rounded-lg h-10 pl-10 dark:bg-[#191925] outline-none border-[#6B7280] border-[1px]"
        placeholder="Search...."
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setShowSearchBar(true);
        }}
        onBlur={() => {
          setShowSearchBar(false);
        }}
      />
      <div className="absolute left-3  top-[11px] w-4">
        <SearchIcon />
      </div>
      {isLoading && <div>Loading</div>}
      {showSearchBar && (
        <div
          className={`${
            debouncedSearchValue == ""
              ? "hidden"
              : "h-[420px] w-full absolute top-9 dark:bg-[#191925] bg-[#EBEBFC] z-50 overflow-y-scroll flex flex-col gap-4 transition delay-200 duration-500 py-4 pr-4 rounded-b-lg border-[#6B7280] border-[1px]"
          }`}>
          {data &&
            data?.coins.map((coin: any) => {
              return (
                <Link
                  href="/portfolio"
                  key={uuidv4()}
                  className="ml-10 cursor-pointer hover:text-[#6161D6]">
                  {coin.name}
                </Link>
              );
            })}
          {isLoading && <div>Loading</div>}
          {error && <div className="text-center">Something went wrong</div>}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
