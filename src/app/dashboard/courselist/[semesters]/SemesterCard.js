import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { LuMailPlus } from "react-icons/lu";
const SemesterCard = ({ SemesterName, subjects, semesterId }) => {
  console.log(subjects[0].Id);
  return (
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
          <div className="project-title text-nowrap">{SemesterName}</div>
          <Link href={`/dashboard/courselist/${semesterId}/${SemesterName}`}>
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

        <div className="types"></div>
      </div>
    </motion.article>
  );
};

export default SemesterCard;
