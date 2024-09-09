import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

interface DynamicCurrencyButtonProps {
  width?: number;
  height?: number;
}

const DynamicCurrencyButton = ({
  width = 20,
  height = 10,
}: DynamicCurrencyButtonProps) => {
  const { currencySymbol } = useAppSelector((store) => store.currency);
  return (
    <div>
      {currencySymbol === "BTC" && (
        <Image
          src="/bitcoin.webp"
          alt="bitcoin image"
          width={width}
          height={height}
        />
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
