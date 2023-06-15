"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import createCourse from "@/lib/createCourse";
import Link from "next/link";

const CreateCourse = () => {
  const { data: session } = useSession();
  const [result, setResult] = useState();
  const [courseData, setCourseData] = useState({
    name: "",
    section: "",
    description: "",
    room: "",
    ownerId: "me",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateCourse = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const resultRecived = await createCourse(session.accessToken, courseData);
      setIsSuccess(true);
      setResult(resultRecived);
      console.log(resultRecived);
      // Do something with the result if needed
    } catch (error) {
      setErrorMessage("Failed to create the course.");
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClosePopup = () => {
    setIsSuccess(false);
    setErrorMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } }}
      className="lg:pl-28 pt-24  bg-blue-200 h-screen"
    >
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg lg:my-40">
        <h1 className="text-2xl font-bold mb-4">Create Course</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            name="name"
            value={courseData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Section</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            name="section"
            value={courseData.section}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="border border-gray-300 rounded p-2 w-full"
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            name="room"
            value={courseData.room}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          onClick={handleCreateCourse}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Course"}
        </button>
      </div>
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-500 z-50"
        >
          <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BiCheckCircle className="text-green-500 mr-2 text-4xl" />
                <h1 className="text-2xl font-bold">Course Created!</h1>
              </div>
              <button onClick={handleClosePopup}>
                <FiX className="text-gray-600 text-2xl cursor-pointer" />
              </button>
            </div>
            <p className="text-gray-700 mb-2">Course: {result.name}</p>
            <div className="flex justify-end">
              <p>
                Please{" "}
                <Link href={result.alternateLink}>
                  <span className="underline text-blue-600 hover:text-blue-700">
                    Click Here
                  </span>
                </Link>{" "}
                and accept the course in Google Classroom to invite teachers and
                students, After accepcting the request please head to courses
                section to invite teachers and students in the course
              </p>
            </div>
          </div>
        </motion.div>
      )}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-gray-500 z-50"
        >
          <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FiAlertTriangle className="text-red-500 mr-2 text-4xl" />
                <h1 className="text-xl font-bold">Error</h1>
              </div>
              <button onClick={handleClosePopup}>
                <FiX className="text-gray-600 text-2xl cursor-pointer" />
              </button>
            </div>
            <p className="text-red-500">{errorMessage}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CreateCourse;
