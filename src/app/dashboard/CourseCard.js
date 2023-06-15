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
              <button className="btn-courselist">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  ></path>
                </svg>
                <span>View Course</span>
              </button>
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
                className="inline-block flex justify-center items-center bg-blue-500 hover:bg-blue-600/80 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline mr-2"
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
