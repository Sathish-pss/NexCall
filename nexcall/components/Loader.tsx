import Image from "next/image";

/**
 * Functional component returns the loader function
 */
const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src={"/icons/loading-circle.svg"}
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
