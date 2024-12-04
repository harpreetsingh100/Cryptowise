import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { setCurrencyType } from "@/lib/features/currencySlice";
import { motion } from "framer-motion";

type ChildComponentProps = {
  setShowCurrencyOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const CurrencyOptions: React.FC<ChildComponentProps> = ({
  setShowCurrencyOptions,
}) => {
  const dispatch = useAppDispatch();
  const { currencyType } = useAppSelector((state) => state.currency);

  const handleCurrencyChange = (currency: string) => {
    dispatch(setCurrencyType(currency));
    setShowCurrencyOptions(false);
  };

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-[#ebebfd] rounded-lg dark:bg-[#191925] flex justify-between items-center cursor-pointer absolute top-[-1px] left-[-1px] flex-col gap-3 p-2 py-4 sm:border-[1px] sm:border-[#6B7280] z-50 w-[65px] sm:w-[90px] md:w-[100px] text-sm lg:text-lg">
      {["USD", "EUR", "GBP", "BTC", "ETH"].map((currency) => (
        <div
          key={currency}
          className="flex justify-center items-center gap-2 bg-[#ebebfd] dark:bg-[#191925] w-[45px] sm:w-full sm:min-w-16 hover:text-[#6161D6] text-sm lg:text-[16px]"
          onClick={() => handleCurrencyChange(currency)}>
          <div
            className={`${
              currencyType === currency &&
              "text-[#6161D6] text-sm lg:text-[16px]"
            }`}>
            {currency}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default CurrencyOptions;
