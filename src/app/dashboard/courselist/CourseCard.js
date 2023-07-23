import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";
import Invite from "../Invite";

const CourseCard = ({ course, role }) => {
  const [showPopup, setShowPopup] = useState(false);
  // console.log("popup course:", course.subjects);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Extract all Id values from nested objects and store them in an array
  const extractIds = (subjects) => {
    const allIds = [];
    for (const key in subjects) {
      if (Array.isArray(subjects[key])) {
        for (const subject of subjects[key]) {
          if (subject.Id) {
            allIds.push(subject.Id);
          }
        }
      }
    }
    return allIds;
  };

  const allIds = extractIds(course.subjects);
  // console.log("All Ids:", allIds);
  if (role == "Student") {
    return (
      <div>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, duration: 0.5 },
          }}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />

          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">
                {course.courseName}
              </div>
              <div className="flex space-x-4">
                <Link href={`/dashboard/courselist/${course._id}`}>
                  <div className="project-hover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      color="#000"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M5 12L19 12" />
                      <path d="M12 5L19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="types"></div>
          </div>
        </motion.article>
      </div>
    );
  }
  if (role == "Admin" || role == "Teacher") {
    return (
      <div>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, duration: 0.5 },
          }}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />

          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">
                {course.courseName}
              </div>
              <div className="flex space-x-4">
                <Link href={`/dashboard/courselist/${course._id}`}>
                  <div className="project-hover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      color="#000"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M5 12L19 12" />
                      <path d="M12 5L19 12 12 19" />
                    </svg>
                  </div>
                </Link>

                {role === "Admin" && (
                  <div className="invite-hover ">
                    {" "}
                    <button onClick={() => setShowPopup(true)} className="">
                      <LuMailPlus className=" lg:text-3xl md:text-2xl text-2xl" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="types"></div>
          </div>
        </motion.article>
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
                      Invite - {course.courseName}
                    </h1>
                  </div>
                  <button onClick={handleClosePopup}>
                    <FiX className="text-gray-600 text-2xl cursor-pointer" />
                  </button>
                </div>
                <p className="text-gray-700 mb-2"></p>
                <div className="">
                  <Invite courseId={allIds} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

export default CourseCard;
