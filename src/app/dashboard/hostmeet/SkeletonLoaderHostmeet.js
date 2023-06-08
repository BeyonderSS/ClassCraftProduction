import React from "react";
import { motion } from "framer-motion";

const SkeletonLoaderHostmeet = () => {
  const skeletonLoaderVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <div className="lg:pl-80 pt-20">
      <h1 className="text-3xl font-bold mb-4">HostMeet</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {Array.from(Array(20).keys()).map((index) => (
          <motion.div
            key={index}
            className="p-4 bg-gray-200 rounded-md"
            variants={skeletonLoaderVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="h-6 bg-gray-300 rounded w-3/4 mb-2"
              variants={skeletonLoaderVariants}
            ></motion.div>
            <motion.div
              className="h-4 bg-gray-300 rounded w-1/2"
              variants={skeletonLoaderVariants}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoaderHostmeet;
