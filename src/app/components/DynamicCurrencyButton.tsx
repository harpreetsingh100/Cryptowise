import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

const DynamicCurrencyButton = () => {
  const { currencySymbol } = useAppSelector((store) => store.currency);
  return (
    <div>
      {currencySymbol === "BTC" && (
        <Image src="/bitcoin.webp" alt="bitcoin image" width={20} height={10} />
      )}
      {currencySymbol === "ETH" && (
        <Image
          src="/ethereum.webp"
          alt="etherium image"
          width={20}
          height={10}
        />
      )}
      {currencySymbol !== "BTC" && currencySymbol !== "ETH" && (
        <div>{currencySymbol}</div>
      )}
    </div>
  );
};

export default DynamicCurrencyButton;
