import { handleCopy } from "@/app/utils/helperFunctions";
import { IoCopyOutline } from "react-icons/io5";
import parse from "html-react-parser";
import { motion } from "framer-motion";

interface DescriptionDetailCoinCard {
  description: string;
  link1: string;
  link2: string;
  link3: string;
  isLoading: boolean;
  isError: boolean;
}

const DescriptionDetailCard = ({
  description,
  link1,
  link2,
  link3,
  isLoading,
  isError,
}: DescriptionDetailCoinCard) => {
  return (
    <div className="overflow-y-auto w-full lg:w-[55%] h-full flex flex-col">
      {isLoading || isError ? (
        <div className="w-[55%] h-full flex flex-col"></div>
      ) : (
        <div className="w-full h-full flex flex-col">
          {description && (
            <div className="max-h-[60%] overflow-y-auto w-full lg:h-auto hidden lg:block">
              <h2 className="text-gray-400 text-sm h-auto dynamic-content text-justify">
                {parse(description)}
              </h2>
            </div>
          )}
          <div
            className={`${
              description
                ? "h-[40%] flex gap-6 flex-wrap lg:pt-6"
                : "h-[40%] flex gap-6  flex-wrap"
            }`}>
            {link1 && (
              <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-[68px] shadow-sm w-full">
                <motion.a
                  href={link1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm lg:text-lg"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {link1}
                </motion.a>
                <motion.span
                  className="ml-2"
                  onClick={() => handleCopy(link1)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <IoCopyOutline />
                </motion.span>
              </button>
            )}
            {link2 && (
              <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-[68px] shadow-sm w-full">
                <motion.a
                  href={link2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm lg:text-lg"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {link2}
                </motion.a>
                <motion.span
                  className="ml-2"
                  onClick={() => handleCopy(link2)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <IoCopyOutline />
                </motion.span>
              </button>
            )}
            {link3 && (
              <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-[68px] shadow-sm  w-full">
                <motion.a
                  href={link3}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm lg:text-lg"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  {link3}
                </motion.a>
                <motion.span
                  className="ml-2"
                  onClick={() => handleCopy(link3)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <IoCopyOutline />
                </motion.span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionDetailCard;
