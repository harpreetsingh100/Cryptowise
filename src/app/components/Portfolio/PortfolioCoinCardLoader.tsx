import SkeletonLoader from "../SkeletonLoader";

const PortfolioCoinCardLoader = () => {
  return (
    <div className="flex gap-8 flex-col my-8">
      <div className="h-80 w-full flex">
        <div className="dark:bg-[#1E1932] bg-white w-[20%] h-full flex justify-center items-center flex-col">
          <div className="py-4 px-5 rounded-lg mb-3 bg-[#EBEBFC] dark:bg-[#2C2C4A]">
            <div className="h-8 w-8">
              <SkeletonLoader width="full" height="full" radius="2xl" />
            </div>
          </div>

          <div className="h-10 w-40 mt-4">
            <SkeletonLoader width="full" height="full" />
          </div>
        </div>
        <div className="dark:bg-[#191932] bg-[#EBEBFC] w-[80%] h-full flex flex-col">
          <div className="h-1/2 w-full mt-6">
            <div className="w-full flex justify-between text-center">
              <div className="text-center">
                <h2 className="text-lg ml-16">Market Price</h2>
              </div>
              <div className="text-center w-1/4 flex justify-center items-center "></div>
            </div>
            <div className="flex items-center mt-8 w-full ">
              <div className="w-1/4 text-center">
                <h2 className="text-sm">Current Price</h2>
                <div className="text-[#20CAC0] text-sm flex justify-center items-center gap-1">
                  <div className="w-20 h-6 my-3">
                    <SkeletonLoader />
                  </div>
                </div>
              </div>
              <div className="w-1/4 text-center">
                <h2 className="text-sm">Price change 24h:</h2>

                <div className="w-1/2 h-6 my-3 flex items-center justify-center m-auto">
                  <SkeletonLoader />
                </div>
              </div>
              <div className="w-1/4 text-center">
                <h2 className="text-sm">Market Cap vs Volume:</h2>
                <div className="w-1/2 h-6 my-3 flex items-center justify-center m-auto">
                  <SkeletonLoader />
                </div>
              </div>
              <div className="w-1/4 text-center">
                <h2 className="text-sm">Circ supply vs max:</h2>
                <div className="text-[#20CAC0] text-sm flex justify-center">
                  <div className="w-1/2 h-6 my-3 flex items-center justify-center m-auto">
                    <SkeletonLoader />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-[0.1px] border-white"></div>
          <div className="h-1/2 w-full mt-6">
            <div className="w-full flex justify-between text-center">
              <div className="text-center ml-4">
                <h2 className="text-lg ml-16">Your Coin</h2>
              </div>
              <div className="text-center w-1/4 flex justify-center items-center"></div>
            </div>
            <div className="flex items-start mt-8 w-full">
              <div className="w-1/4 text-center">
                <div className=" relative bottom-2">
                  <h2 className="text-sm">Coin Amount</h2>
                  <div className="m-auto w-1/2 my-2">
                    <SkeletonLoader height={6} width="full" />
                  </div>
                </div>
              </div>
              <div className="w-1/4 text-center">
                <div className=" relative bottom-2">
                  <h2 className="text-sm"> Amount Value</h2>
                  <div className="m-auto w-1/2 my-2">
                    <SkeletonLoader height={6} width="full" />
                  </div>
                </div>
              </div>
              <div className="w-1/4 text-center">
                <div className=" relative bottom-2">
                  <h2 className="text-sm">
                    <h2 className="text-sm">
                      <span className="text-[#20CAC0]"> Gain</span>/
                      <span className="text-[#FE2264]"> Loss</span>
                    </h2>
                  </h2>
                  <div className="m-auto w-1/2 my-2">
                    <SkeletonLoader height={6} width="full" />
                  </div>
                </div>
              </div>
              <div className="w-1/4 text-center">
                <div className=" relative bottom-2">
                  <h2 className="text-sm"> Amount Value</h2>
                  <div className="m-auto w-1/2 my-2">
                    <SkeletonLoader height={6} width="full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCoinCardLoader;
