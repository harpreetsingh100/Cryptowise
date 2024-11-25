import { CgArrowsExchangeV } from "react-icons/cg";
import { motion } from "framer-motion";

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
      <motion.div
        className="flex justify-center items-center ml-2"
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}>
        <CgArrowsExchangeV size={20} color="#6161D6" />
      </motion.div>
    </div>
  );
};
export default CoinTableSingleHeading;
