interface SkeletonLoaderPropTypes {
  height?: number | string;
  width?: number | string;
  radius?: string;
}

const SkeletonLoader = ({
  height = "full",
  width = "full",
  radius = "xl",
}: SkeletonLoaderPropTypes) => {
  return (
    <div
      className={`animate-pulse dark:bg-gray-600  bg-gray-300 h-${height} w-${width} rounded-${radius}`}></div>
  );
};

export default SkeletonLoader;
