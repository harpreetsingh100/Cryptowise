import { CgArrowsExchangeV } from "react-icons/cg";

const CoinTableSingleHeading = ({
  title,
  width,
  justifyContent,
  handleSort,
}: {
  title: string;
  width: string;
  justifyContent: string;
  handleSort: any;
}) => {
  return (
    <div
      className={`w-[${width}%] flex justify-${justifyContent} items-center text-sm text-gray-600 cursor-pointer`}
      onClick={handleSort}>
      <p> {title}</p>
      <div className="flex justify-center items-center ml-2">
        <CgArrowsExchangeV size={20} color="#6161D6" />
      </div>
    </div>
  );
};
export default CoinTableSingleHeading;
