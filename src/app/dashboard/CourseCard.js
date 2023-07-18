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
  if (role == "Student") {
    return (
      <Link href={`/dashboard/courselist/${course.id}?name=${course.name}`}>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, duration: 0.5 },
          }}
          key={course.id}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />

          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">{course.name}</div>
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
            </div>
            <div className="types">
              <span className="project-type">• {course.courseState}</span>
              <span className="project-type">• Batch - {course.section}</span>
            </div>
          </div>
        </motion.article>
      </Link>
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
          key={course.id}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />

          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">{course.name}</div>
              <div className="flex space-x-4">
                <Link href={course.alternateLink}>
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
              {/*
               */}
            </div>
            <div className="types">
              <span className="project-type">• {course.courseState}</span>
              <span className="project-type">• Section - {course.section}</span>
            </div>
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
      </div>
    );
  }
};

export default CourseCardItem;
