import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";
import { MdSlowMotionVideo } from "react-icons/md";
import { IoHelp } from "react-icons/io5";
import { UploadDropzone } from "@/utils/uploadthing";
import setNotesLink from "../../lib/setNotesLink";
import Tooltip from "./Tooltip";
import { useSession } from "next-auth/react";
import { BarLoader } from "react-spinners";
import { AiOutlineUpload } from "react-icons/ai";
const SubjectCard = ({ subjectName, role, subjectId, courseId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [doubtQuestion, setDoubtQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [unitName, setUnitName] = useState("");
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log(session);
  console.log(doubtQuestion);
  // function to raise a doubt
  async function raiseADoubt() {
    setErrorMessage("");
    setSuccessMessage("");
    // Define the data you want to send in the request
    const requestData = {
      subject: subjectId, // Replace with the actual subject ID
      student: session?.user?.id, // Replace with the actual student user ID
      message: doubtQuestion, // Replace with the actual doubt message
    };

    // Initialize a loading state variable

    try {
      // Set loading to true when the request starts
      setIsLoading(true);

      // Make a POST request to the API route
      const response = await fetch("/api/raisedoubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          // Doubt raised successfully
          setSuccessMessage("Doubt raised successfully!");

          console.log("Doubt raised successfully!");
        } else {
          // Handle API error
          setErrorMessage(`Failed to raise doubt: ${responseData.error}`);

          console.error("Failed to raise doubt:", responseData.error);
        }
      } else {
        // Handle HTTP error
        setErrorMessage(`HTTP error: ${response.statusText}`);

        console.error("HTTP error:", response.statusText);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);

      // Handle network or other errors
      console.error("Error:", error);
    } finally {
      // Set loading back to false when the request is completed
      setDoubtQuestion("");
      setIsLoading(false);
    }
  }

  const handleInputChange = (event) => {
    setUnitName(event.target.value);
  };
  const handleUploadComplete = (res) => {
    console.log("Files: ", res);

    // Assuming that res.fileUrl represents the file link and res.unitName represents the unit name
    const fileLink = res[0].fileUrl;

    setNotesLink(subjectId, unitName, fileLink, courseId)
      .then((result) => {
        console.log(result); // Output success or error message from setNotesLink
        setAlert("Upload Completed");
      })
      .catch((error) => {
        console.error("Error updating notes link:", error);
        setAlert("Upload Failed");
      });
  };

  // Define a function for handling upload errors
  const handleUploadError = (error) => {
    // Do something with the error.
    setAlert(`ERROR! ${error.message}`);
    console.log(alert);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  if (role == "Student" && subjectName) {
    return (
      <section>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, duration: 0.5 },
          }}
          key={subjectId}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />

          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">{subjectName}</div>
              <Tooltip text={"Notes"}>
                <Link
                  href={`/dashboard/notes/${subjectId}?courseId=${courseId}&subjectName=${subjectName}`}
                >
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
              </Tooltip>
              <Link href={`/dashboard/lectures/${subjectId}`}>
                <div className="invite-hover ">
                  <Tooltip text={"Lectures"}>
                    {" "}
                    <div className="">
                      <MdSlowMotionVideo className=" lg:text-3xl md:text-2xl text-2xl" />
                    </div>
                  </Tooltip>
                </div>
              </Link>
              {/* <button
                onClick={() => setShowPopup(true)}
                className="invite-hover "
              >
                <Tooltip text={"Raise A Doubt"}>
                  {" "}
                  <div className="">
                    <IoHelp className=" lg:text-3xl md:text-2xl text-2xl" />
                  </div>
                </Tooltip>
              </button> */}
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
              className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm bg-gray-900 z-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold">
                    Raise a New Doubt - {subjectName}
                  </h1>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleClosePopup}
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Enter your doubt here"
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  className="w-full p-2 border rounded-md mb-4"
                />

                {/* Raise a Ticket Button */}
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={raiseADoubt}
                  >
                    Raise a Question
                  </button>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="mt-4 text-red-500">{errorMessage}</div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="mt-4 text-green-500">{successMessage}</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  if (role == "Admin" || role == "Teacher") {
    return (
      <section>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, duration: 0.5 },
          }}
          key={subjectId}
          className="article-wrapper lg:w-96 w-auto"
        >
          <img src="/landingCard.svg" alt="" className="rounded-lg" />

          <div className="project-info">
            <div className="flex-pr">
              <div className="project-title text-nowrap">{subjectName}</div>
              <Tooltip text={"Notes"}>
                <Link
                  href={`/dashboard/notes/${subjectId}?courseId=${courseId}&subjectName=${subjectName}`}
                >
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
              </Tooltip>
              <div className="invite-hover ">
                <Tooltip text={"Upload Notes"}>
                  {" "}
                  <button onClick={() => setShowPopup(true)} className="">
                    <AiOutlineUpload className=" lg:text-3xl md:text-2xl text-2xl" />
                  </button>
                </Tooltip>
              </div>
              <Link href={`/dashboard/lectures/${subjectId}`}>
                <div className="invite-hover ">
                  <Tooltip text={"Lectures"}>
                    {" "}
                    <div className="">
                      <MdSlowMotionVideo className=" lg:text-3xl md:text-2xl text-2xl" />
                    </div>
                  </Tooltip>
                </div>
              </Link>
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
                      Upload Notes To {subjectName}
                    </h1>
                  </div>
                  <button onClick={handleClosePopup}>
                    <FiX className="text-gray-600 text-2xl cursor-pointer" />
                  </button>
                </div>
                <p className="text-gray-700 mb-2"></p>
                {/* <div className="">{subjectId}</div> */}
                <div className="bg-white  rounded shadow-md">
                  <input
                    type="text"
                    value={unitName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Unit Name"
                  />
                </div>
                <UploadDropzone
                  endpoint="pdfUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }
};

export default SubjectCard;
