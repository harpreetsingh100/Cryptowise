const CoinTableHeader = () => {
  return (
    <div className="w-full flex items-center">
      <div className="w-[5%] flex justify-center items-center text-sm text-gray-600">
        #
      </div>
      <div className="w-[20%] flex justify-center text-sm text-gray-600">
        Name
      </div>
      <div className="w-[10%] flex justify-start text-sm text-gray-600">
        Price
      </div>
      <div className="w-[8%] flex justify-start text-sm text-gray-600">1h%</div>
      <div className="w-[8%] flex justify-start text-sm text-gray-600">
        24h%
      </div>
      <div className="w-[8%] flex justify-start text-sm text-gray-600">7d%</div>
      <div className="w-[18%] flex justify-start text-sm text-gray-600">
        24h volume / Market Cap
      </div>
      <div className="w-[18%] flex justify-start text-sm text-gray-600">
        Circulating / Total Supply
      </div>
      <div className="w-[10%] flex justify-start text-gray-600">Last 7d</div>
    </div>
  );
};

export default CoinTableHeader;
