"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import WifiLoader from "@/app/WifiLoader";
import feedLink from "@/lib/feedLink";
import CustomVideoPlayer from "../CustomVideoPlayer";
import { useSession } from "next-auth/react";
import getMongoLectures from "@/lib/fetchcalender";

const Lectures = () => {
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState("Lectures");
  const [showPopup, setShowPopup] = useState(false);
  const [fetchedLectures, setFetchedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [error, setError] = useState(null);
  const role = session?.user.role;

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleShowPopupAndSelectLecture = (lecture) => {
    setShowPopup(true);
    setSelectedLecture(lecture);
  };

  const handleLinkSubmit = async () => {
    try {
      setError(null);
      await feedLink(selectedLecture._id, youtubeLink);
      setShowPopup(false);
    } catch (error) {
      setError("Failed to update YouTube link. Please try again later.");
    }
  };

  const convertTo12HourFormat = (timeString) => {
    const time = new Date(timeString);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours %= 12;
    hours = hours || 12; // If hours is 0, set it to 12

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  useEffect(() => {
    if (session) {
      const courses = JSON.parse(localStorage.getItem("courses"));
      const idsArray = courses.map((course) => course._id);

      const fetchMongoLectures = async () => {
        return await getMongoLectures(session?.user.university, idsArray);
      };

      const fetchLecturesAndLog = async () => {
        setLoading(true);
        const fetchedLectures = await fetchMongoLectures();
        // Sort lectures by date in ascending order
        const sortedLectures = fetchedLectures.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setFetchedLectures(sortedLectures);
        setLoading(false);
        // Set the default selected lecture as the first lecture in the array
        if (sortedLectures.length > 0) {
          setSelectedLecture(sortedLectures[0]);
        }
      };

      fetchLecturesAndLog();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <WifiLoader text={"Loading"} />
      </div>
    );
  }

  return (
    <div className="">
      {role === "Admin" && (
        <div className="flex justify-center items-center my-10">
          <div className="flex justify-between mt-24">
            <button
              className={`${
                selectedTab === "Lectures"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 rounded-md mr-2 transition-colors duration-300`}
              onClick={() => setSelectedTab("Lectures")}
            >
              Lectures
            </button>
            <button
              className={`${
                selectedTab === "Add Link"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 rounded-md transition-colors duration-300`}
              onClick={() => setSelectedTab("Add Link")}
            >
              Add Link
            </button>
          </div>
        </div>
      )}

      {selectedTab === "Lectures" && (
        <div
          className={`flex md:flex-row flex-col ${
            role != "Admin" ? "mt-24" : ""
          }`}
        >
          <div className="md:ml-36 w-full h-[90vh] ">
            {selectedLecture.youtubeLink && (
              <CustomVideoPlayer videoLink={selectedLecture.youtubeLink} />
            )}
            {!selectedLecture.youtubeLink && (
              <div className="flex justify-center items-center bg-blue-600 rounded-lg p-8 shadow-md">
                <h1 className="text-4xl font-bold text-white text-center">
                  Oopsie-daisy! 🌸 Lecture Not Uploaded Yet!
                </h1>
              </div>
            )}
          </div>
          <div className=" p-2 mx-4 bg-gray-100 rounded-xl">
            {fetchedLectures.map((lecture) => (
              <div
                key={lecture._id}
                className={`md:w-96 rounded-xl p-2 cursor-pointer ${
                  selectedLecture === lecture ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleLectureClick(lecture)}
              >
                <h2 className="text-xl font-semibold">{lecture.topic}</h2>
                <p>Date: {new Date(lecture.date).toLocaleDateString()}</p>
                <p>
                  Start Time: {convertTo12HourFormat(lecture.startTime)}
                  <br />
                  End Time: {convertTo12HourFormat(lecture.endTime)}
                </p>
                <p>Duration: {lecture.durationInMinutes} minutes</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedTab === "Add Link" && (
        <div className="flex justify-center items-center">
          <div className="z-50 p-2 mx-4 bg-gray-100 rounded-xl">
            {fetchedLectures.map((lecture) => (
              <div
                key={lecture._id}
                className={`md:w-[50vh] rounded-xl p-2 cursor-pointer ${
                  selectedLecture === lecture ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleShowPopupAndSelectLecture(lecture)}
              >
                <h2 className="text-xl font-semibold">{lecture.topic}</h2>
                <p>Date: {new Date(lecture.date).toLocaleDateString()}</p>
                <p>
                  Start Time: {convertTo12HourFormat(lecture.startTime)}
                  <br />
                  End Time: {convertTo12HourFormat(lecture.endTime)}
                </p>
                <p>Duration: {lecture.durationInMinutes} minutes</p>
              </div>
            ))}
          </div>
        </div>
      )}
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
                <h1>{selectedLecture.topic}</h1>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPopup(false)}
                >
                  <CgClose size={20} />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">YouTube Link:</label>
                <input
                  type="text"
                  className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleLinkSubmit}
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lectures;
