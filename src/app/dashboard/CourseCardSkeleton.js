import React from "react";
import { motion } from "framer-motion";

const CourseCardSkeleton = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center lg:text-5xl text-4xl text-white font-semibold m-4 lg:mx-6 md:mx-4 mx-2">
        <h1 className="p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
          Your Courses
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: index * 0.1, duration: 0.5 },
            }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-8 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded ml-2"></div>
              </div>
              <div className="h-16 bg-gray-300 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
