import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import Invite from "./Invite";
import { LuMailPlus } from "react-icons/lu";
const SubjectCard = ({ course, role }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  if (role == "Student") {
    return (
      <Link href={`/dashboard/announcement/${course.id}?name=${course.name}`}>
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
          key={course?.id}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />


          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">{course?.name}</div>
              <div className="flex space-x-4">
                <Link href={course?.alternateLink}>
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
              {/*
               */}
            </div>
            <div className="types">
              <span className="project-type">• {course?.courseState}</span>
              <span className="project-type">• Section - {course?.section}</span>
            </div>
          </div>
        </motion.article>
       
      </div>
    );
  }
};

export default SubjectCard;
