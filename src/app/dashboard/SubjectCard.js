import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";
import { UploadDropzone } from "@/utils/uploadthing";
import setNotesLink from "../../lib/setNotesLink";
import Tooltip from "./Tooltip";
const SubjectCard = ({ subjectName, role, subjectId, courseId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [alert, setAlert] = useState("");
  const [unitName, setUnitName] = useState("");

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
          </div>
          <Link href={`/dashboard/lectures/${subjectId}`}>
            <div className="invite-hover ">
              <Tooltip text={"Lectures"}>
                {" "}
                <div className="">
                  <LuMailPlus className=" lg:text-3xl md:text-2xl text-2xl" />
                </div>
              </Tooltip>
            </div>
          </Link>
          <div className="invite-hover ">
            <Tooltip text={"Raise A Doubt"}>
              {" "}
              <div className="">
                <LuMailPlus className=" lg:text-3xl md:text-2xl text-2xl" />
              </div>
            </Tooltip>
          </div>
          <div className="types"></div>
        </div>
      </motion.article>
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
                    <LuMailPlus className=" lg:text-3xl md:text-2xl text-2xl" />
                  </button>
                </Tooltip>
              </div>
              <Link href={`/dashboard/lectures/${subjectId}`}>
                <div className="invite-hover ">
                  <Tooltip text={"Lectures"}>
                    {" "}
                    <div className="">
                      <LuMailPlus className=" lg:text-3xl md:text-2xl text-2xl" />
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
