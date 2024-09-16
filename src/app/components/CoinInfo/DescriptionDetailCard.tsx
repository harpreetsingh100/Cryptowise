import { handleCopy } from "@/app/utils/helperFunctions";
import { IoCopyOutline } from "react-icons/io5";

interface DescriptionDetailCoinCard {
  description: string;
  link1: string;
  link2: string;
  link3: string;
}

const DescriptionDetailCard = ({
  description,
  link1,
  link2,
  link3,
}: DescriptionDetailCoinCard) => {
  return (
    <div className="w-[55%] h-full flex flex-col">
      {description && (
        <div className="max-h-[60%] overflow-y-auto w-full h-auto">
          <h2 className="text-gray-400 text-sm h-auto">{description}</h2>
        </div>
      )}
      <div
        className={`${
          description
            ? "h-[40%] flex gap-6 flex-wrap pt-6"
            : "h-[40%] flex gap-6  flex-wrap"
        }`}>
        {link1 && (
          <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-16 shadow-xl">
            <a href={link1} target="_blank" rel="noopener noreferrer">
              {link1}
            </a>
            <span className="ml-2" onClick={() => handleCopy(link1)}>
              <IoCopyOutline />
            </span>
          </button>
        )}
        {link2 && (
          <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-16 shadow-xl">
            <a href={link2} target="_blank" rel="noopener noreferrer">
              {link2}
            </a>
            <span className="ml-2" onClick={() => handleCopy(link2)}>
              <IoCopyOutline />
            </span>
          </button>
        )}
        {link3 && (
          <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-16 shadow-xl">
            <a href={link3} target="_blank" rel="noopener noreferrer">
              {link3}
            </a>
            <span className="ml-2" onClick={() => handleCopy(link3)}>
              <IoCopyOutline />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionDetailCard;
