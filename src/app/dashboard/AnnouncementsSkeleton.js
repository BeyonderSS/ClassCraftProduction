import React from "react";
import { motion } from "framer-motion";

const AnnouncementsSkeleton = ({ courseName }) => (
  <div className="">
    <div className="flex flex-col justify-center items-center lg:text-5xl text-4xl text-white/90 font-semibold m-4">
      <h1 className="p-3 px-6 rounded-lg bg-blue-400 flex justify-center items-center">
        Announcements
      </h1>
      <h1 className="text-gray-800/60 text-3xl lg:text-4xl my-2">
        {courseName}
      </h1>
    </div>
    <div className="animate-pulse flex flex-col">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="my-4 p-4 rounded-lg shadow-md bg-white flex flex-col mx-4"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: index * 0.1, duration: 0.5 },
          }}
        >
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AnnouncementsSkeleton;
