import React from "react";

const NavbarSkeletonLoader = () => {
  return (
    <div>
      <div className="flex fixed top-0 w-full items-center animate-pulse justify-between bg-gray-200 p-4">
        <div className="hidden lg:block"></div>
        <div className="lg:hidden block h-10 w-10 bg-gray-300 rounded"></div>
        <div className="h-10 w-40 bg-gray-300 rounded mx-4"></div>
        <div className="h-10 w-10 bg-gray-300 rounded-full "></div>
      </div>

      <div className="hidden lg:block absolute left-0 top-0 pt-10 h-screen px-10 flex flex-col w-80  animate-pulse space-y-4 bg-gray-200 ">
        <div className="h-6 w-40 bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-40 bg-gray-300 rounded-lg "></div>
        <div className="h-6 w-40 bg-gray-300 rounded-lg "></div>
      </div>
    </div>
  );
};

export default NavbarSkeletonLoader;
