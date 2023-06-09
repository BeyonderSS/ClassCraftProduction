import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import Invite from "./Invite";
import { LuMailPlus } from "react-icons/lu";
const CourseCardItem = ({ course, role }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <motion.div
      key={course.id}
      className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.1, duration: 0.5 },
      }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mr-2">
            {course.name}
          </h2>
          <span className="text-sm text-gray-600">({course.section})</span>
        </div>
        <p className="text-gray-700 text-base mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          {role === "Student" && (
            <Link
              href={`/dashboard/courselist/${course.id}?name=${course.name}`}
              legacyBehavior
            >
              <a className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
                View Course
              </a>
            </Link>
          )}
          {role === "Teacher" ||
            (role === "Admin" && (
              <Link href={course.alternateLink} legacyBehavior>
                <a className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
                  View Course
                </a>
              </Link>
            ))}

          {role === "Admin" && (
            <>
              <button
                onClick={() => setShowPopup(true)}
                className="inline-block flex justify-center items-center bg-blue-500/80 hover:bg-blue-600/80 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline mr-2"
              >
                <LuMailPlus className=" lg:text-3xl md:text-2xl text-2xl" />
              </button>
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm bg-gray-900  z-50 "
                  >
                    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-lg lg:mx-0 md:mx-0 mx-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <h1 className="text-2xl font-bold">
                            Invite - {course.name}
                          </h1>
                        </div>
                        <button onClick={handleClosePopup}>
                          <FiX className="text-gray-600 text-2xl cursor-pointer" />
                        </button>
                      </div>
                      <p className="text-gray-700 mb-2"></p>
                      <div className="">
                        <Invite courseId={course.id} />
                      </div>
                    </div>
                  </motion.div>
                )}{" "}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCardItem;
