import { handleCopy } from "@/app/utils/helperFunctions";
import { IoCopyOutline } from "react-icons/io5";

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
    <div className="overflow-y-auto w-[55%] h-full flex flex-col">
      {isLoading || isError ? (
        <div className="w-[55%] h-full flex flex-col"></div>
      ) : (
        <div className="w-full h-full flex flex-col">
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
              <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-16 shadow-xl w-full">
                <a
                  href={link1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {link1}
                </a>
                <span className="ml-2" onClick={() => handleCopy(link1)}>
                  <IoCopyOutline />
                </span>
              </button>
            )}
            {link2 && (
              <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-16 shadow-xl w-full">
                <a
                  href={link2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {link2}
                </a>
                <span className="ml-2" onClick={() => handleCopy(link2)}>
                  <IoCopyOutline />
                </span>
              </button>
            )}
            {link3 && (
              <button className="bg-[#FFFFFF] dark:bg-[#1E1932] px-4  rounded-lg flex items-center justify-center h-16 shadow-xl  w-full">
                <a
                  href={link3}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {link3}
                </a>
                <span className="ml-2" onClick={() => handleCopy(link3)}>
                  <IoCopyOutline />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionDetailCard;
