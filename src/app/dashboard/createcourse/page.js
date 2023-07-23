"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import createCourse from "@/lib/createCourse";

const CreateCourse = () => {
  const { data: session } = useSession();
  const [result, setResult] = useState();
  const [courseData, setCourseData] = useState();
  const [semesterSummary, setSemesterSummary] = useState({}); // State to store the summary of each semester

  const [courseName, setCourseName] = useState("");
  const [semesterCount, setSemesterCount] = useState("");
  const [subjectInput, setSubjectInput] = useState(""); // State to handle subject input for each semester
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Added state for the current card index
  const handleFinishCourse = async () => {
    try {
      setIsLoading(true); // Set isLoading state to true to indicate the process has started
      setErrorMessage(null); // Clear any previous error messages
      setIsSuccess(false); // Set isSuccess state to false initially

      // Append university and accessToken to the courseData
      courseData.university = session?.user?.university;
      courseData.accessToken = session?.accessToken;
      const adminEmail=session.user.email
      // Call the createCourse function with courseData as a parameter
      await createCourse(courseData,adminEmail);

      setIsLoading(false); // Set isLoading state to false as the course creation process is completed successfully
      setIsSuccess(true); // Set isSuccess state to true to indicate the course creation was successful
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error creating course:", error);
      setErrorMessage(
        "An error occurred while creating the course. Please try again later."
      ); // Set an error message to display to the user
      setIsLoading(false); // Set isLoading state to false in case of an error
      setIsSuccess(false); // Set isSuccess state to false as the course creation was not successful
    }
  };

  const handleSelectCourse = () => {
    // Create an array to store subjects
    const subjectsArray = [];
    for (let i = 0; i < parseInt(semesterCount); i++) {
      subjectsArray.push([]);
    }

    // Set the values of courseName, semesterCount, and subjects in courseData
    setCourseData({
      courseName: courseName,
      semesterCount: parseInt(semesterCount),
      subjects: subjectsArray,
      university: "",
      accessToken: "",
    });
  };

  const handleSubjectInputChange = (e) => {
    setSubjectInput(e.target.value);
  };

  const handleAddSubject = () => {
    if (subjectInput.trim() !== "") {
      setCourseData((prevCourseData) => {
        const updatedSubjects = [...prevCourseData.subjects];
        updatedSubjects[currentCardIndex].push(subjectInput.trim());
        return { ...prevCourseData, subjects: updatedSubjects };
      });
      setSubjectInput(""); // Clear the subject input field after adding the subject
    }
  };

  const handleNextButtonClick = () => {
    if (currentCardIndex + 1 < courseData?.semesterCount) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleFinishButtonClick = () => {
    // Prepare the semester summary data
    const summary = {};
    for (let i = 0; i < courseData?.semesterCount; i++) {
      summary[i + 1] = courseData?.subjects[i];
    }
    setSemesterSummary(summary);

    // Reset the card index to show the summary card
    setCurrentCardIndex(-1);
  };

  const handleClosePopup = () => {
    setIsSuccess(false);
    setErrorMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.5 } }}
      className="bg-blue-200 flex justify-center items-center h-screen"
    >
      <AnimatePresence>
        {currentCardIndex === 0 && !courseData?.courseName && (
          <motion.div
            initial={{ x: +1000 }}
            animate={{ x: 0 }}
            exit={{ x: -1000 }}
            className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-bold mb-4">Create Course</h1>
            <div className="w-full space-y-5 m-2">
              <div className="inputbox w-full">
                <input
                  required
                  name="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                <span>Course Name</span>
                <i />
              </div>

              <div className="inputbox w-full">
                <input
                  required
                  name="semesterCount"
                  type="text"
                  value={semesterCount}
                  onChange={(e) => setSemesterCount(e.target.value)}
                />
                <span>No of Semesters</span>
                <i />
              </div>
            </div>

            <button
              className="cta inline-flex items-center justify-center my-2"
              onClick={handleSelectCourse}
              disabled={isLoading}
            >
              <span className="hover-underline-animation">Next</span>
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="25px"
                height="25px"
                viewBox="0 0 340.034 340.034"
                xmlSpace="preserve"
              >
                {/* SVG path data here */}
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentCardIndex >= 0 &&
          currentCardIndex < courseData?.semesterCount &&
          courseData?.subjects[currentCardIndex] && (
            <AnimatePresence>
              <motion.div
                key={currentCardIndex}
                initial={{ x: +1000 }}
                animate={{ x: 0 }}
                exit={{ x: -1000 }}
                className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg"
              >
                <h1 className="text-2xl font-bold mb-4">
                  Semester {currentCardIndex + 1}
                </h1>
                <div className="w-full space-y-5 m-2 flex">
                  <div className="inputbox w-full">
                    <input
                      required
                      value={subjectInput}
                      onChange={handleSubjectInputChange}
                    />
                    <span>Subject Name</span>
                    <i />
                  </div>
                  <button
                    className="mx-2 px-3 py-1 rounded-full bg-blue-400 text-white font-semibold text-3xl text-center"
                    onClick={handleAddSubject}
                    disabled={isLoading}
                  >
                    +
                  </button>
                </div>

                {/* Display added subjects on top of the card */}
                <div className="w-full mt-4">
                  {courseData.subjects[currentCardIndex].map(
                    (subject, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded-md">
                        <p>{subject}</p>
                      </div>
                    )
                  )}
                </div>

                {currentCardIndex !== courseData.semesterCount - 1 && (
                  <button
                    className="cta inline-flex items-center justify-center my-2"
                    disabled={isLoading}
                    onClick={handleNextButtonClick}
                  >
                    <span className="hover-underline-animation">Next</span>
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="25px"
                      height="25px"
                      viewBox="0 0 340.034 340.034"
                      xmlSpace="preserve"
                    >
                      {/* SVG path data here */}
                    </svg>
                  </button>
                )}
                {currentCardIndex === courseData.semesterCount - 1 && (
                  <button
                    className="cta inline-flex items-center justify-center my-2"
                    disabled={isLoading}
                    onClick={handleFinishButtonClick}
                  >
                    <span className="hover-underline-animation">Finish</span>
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="25px"
                      height="25px"
                      viewBox="0 0 340.034 340.034"
                      xmlSpace="preserve"
                    >
                      {/* SVG path data here */}
                    </svg>
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          )}
      </AnimatePresence>

      {/* Display the summary card when semester summary is available */}
      <AnimatePresence>
        {Object.keys(semesterSummary).length > 0 && currentCardIndex === -1 && (
          <motion.div
            initial={{ x: +1000 }}
            animate={{ x: 0 }}
            exit={{ x: -1000 }}
            className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-bold mb-4">Summary</h1>
            <h2 className="text-2xl font-bold mb-4">{courseData.courseName}</h2>
            <div>
              {Object.entries(semesterSummary).map(
                ([semester, subjects], index) => (
                  <div key={index}>
                    <h2 className="text-xl font-bold mb-2">
                      Semester {semester}
                    </h2>
                    <ul>
                      {subjects.map((subject, i) => (
                        <li key={i}>{subject}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
            <button
              className="cta inline-flex items-center justify-center my-2"
              onClick={() => {
                // Reset the semester summary and courseData
                setSemesterSummary({});
                setCourseData(null);
                setCurrentCardIndex(0); // Reset to the initial card index
              }}
            >
              <span className="hover-underline-animation">Back</span>
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="25px"
                height="25px"
                viewBox="0 0 340.034 340.034"
                xmlSpace="preserve"
              >
                {/* SVG path data here */}
              </svg>
            </button>
            <button
              className="cta inline-flex items-center justify-center my-2"
              onClick={handleFinishCourse}
            >
              <span className="hover-underline-animation">Finish</span>
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="25px"
                height="25px"
                viewBox="0 0 340.034 340.034"
                xmlSpace="preserve"
              >
                {/* SVG path data here */}
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            {/* <p className="text-gray-700 mb-2">Course: {result.course.name}</p> */}
            <div className="flex justify-end">
              <p>
                Please{" "}
                {/* <Link href={result.course.alternateLink}>
                  <span className="underline text-blue-600 hover:text-blue-700">
                    Click Here
                  </span>
                </Link> */}
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