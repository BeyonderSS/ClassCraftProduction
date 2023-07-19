"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import createCourse from "@/lib/createCourse";
import Link from "next/link";
import { BarLoader } from "react-spinners";

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
      const url = "http://localhost:3000/api/createcourse";
      const params = new URLSearchParams({
        name: courseData.name,
        section: courseData.section,
        description: courseData.description,
        room: courseData.room,
        ownerId: courseData.ownerId,
        accessToken: session.accessToken,
      });

      const response = await fetch(`${url}?${params}`, {
        method: "POST",
      });

      if (response.ok) {
        const resultRecived = await response.json();
        setIsSuccess(true);
        setResult(resultRecived);
        console.log(resultRecived);
        // Do something with the result if needed
      } else {
        throw new Error("Failed to create the course.");
      }
    } catch (error) {
      setErrorMessage(error.message);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.5 } }}
      className="  bg-blue-200 flex justify-center items-center h-screen"
    >
      <div className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg  ">
        <h1 className="text-2xl font-bold mb-4">Create Course</h1>
        <div className="w-full space-y-5 m-2">
          <div className="inputbox w-full">
            <input
              required="required"
              name="name"
              value={courseData.name}
              onChange={handleChange}
              type="text"
            />
            <span>Course Name </span>
            <i />
          </div>

          <div className="inputbox w-full">
            <input
              required="required"
              name="section"
              value={courseData.section}
              onChange={handleChange}
              type="text"
            />
            <span>Batch</span>
            <i />
          </div>

          <div className="inputbox w-full">
            <input
              required="required"
              name="room"
              value={courseData.room}
              onChange={handleChange}
              type="text"
            />
            <span>University </span>
            <i />
          </div>
          <div className="textarea-box w-full">
            <textarea
              className="textarea-box__input"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              required
            ></textarea>
            <span className="textarea-box__span">Description</span>
            <i className="textarea-box__i"></i>
          </div>
        </div>

        <button
          className="cta inline-flex items-center justify-center"
          onClick={handleCreateCourse}
          disabled={isLoading}
        >
          <span className="hover-underline-animation">
            {" "}
            {isLoading ? <BarLoader color="#FFFFFF" /> : "Create"}{" "}
          </span>
          <svg
            height="25px"
            viewBox="0 0 50 50"
            width="25px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#234567"
              stroke="#234567"
              strokeMiterlimit={10}
              strokeWidth={4}
              d="M9 25L41 25"
            />
            <path
              fill="#234567"
              stroke="#234567"
              strokeMiterlimit={10}
              strokeWidth={4}
              d="M25 9L25 41"
            />
          </svg>
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
                <p className="text-gray-700 mb-2">Course: {result.course.name}</p>
                <div className="flex justify-end">
                  <p>
                    Please{" "}
                    <Link href={result.course.alternateLink}>
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
