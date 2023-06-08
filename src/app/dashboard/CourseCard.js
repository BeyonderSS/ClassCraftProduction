"use client";
import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const CourseCard = ({ courses, role }) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <motion.div
          key={course.id}
          className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mr-2">
                {course.name}
              </h2>
              <span className="text-sm text-gray-600">{course.section}</span>
            </div>
            <p className="text-gray-700 text-base mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
              <Link href={`/dashboard/courselist/${course.id}?name=${course.name}`} legacyBehavior>
                <a className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  View Course
                </a>
              </Link>
              {role === "Teacher" && (
                <Link href={course.alternateLink} legacyBehavior>
                  <a className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit Course
                  </a>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CourseCard;
