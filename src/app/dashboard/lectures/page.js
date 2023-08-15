"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import WifiLoader from "@/app/WifiLoader";
import feedLink from "@/lib/feedLink";
import CustomVideoPlayer from "../CustomVideoPlayer";
import { useSession } from "next-auth/react";
import getMongoLectures from "@/lib/fetchcalender";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";
import { BarLoader } from "react-spinners";

const Lectures = () => {
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState("Lectures");
  const [showPopup, setShowPopup] = useState(false);
  const [showAddLecturesPopup, setShowAddLecturesPopup] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [fetchedLectures, setFetchedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressloading, setProgressLoading] = useState(false);

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [error, setError] = useState(null);
  const role = session?.user.role;
  const [meetingData, setMeetingData] = useState({
    topic: "",
    location: "Online",
    description: "",
    startDateTime: "", // Will be set by user input
    endDateTime: "", // Will be set by user input
    timeZone: "America/New_York",
    semester: "",
    youtubeLink: "",
  });
  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleInputChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(coursesData);
  }, []);
  const handleCourseChange = (event) => {
    const selectedCourseName = event.target.value;
    const selectedCourse = courses.find(
      (course) => course.courseName === selectedCourseName
    );
    if (selectedCourse) {
      setSelectedCourseId(selectedCourse._id);
    } else {
      setSelectedCourseId("");
    }
  };

  const handleGenerateLectures = async () => {
    try {
      setProgressLoading(true);
      setError(null);
      // Convert the startDateTime and endDateTime to ISO 8601 format
      const startDateString = `${meetingData.date}T${meetingData.startDateTime}:00`;
      const endDateString = `${meetingData.date}T${meetingData.endDateTime}:00`;

      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);

      meetingData.startDateTime = startDate.toISOString();
      meetingData.endDateTime = endDate.toISOString();
      var formattedSemester = "Semester" + meetingData.semester;

      const hostMeetRequest = await fetch("/api/hostmeet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          university: session.user.university,
          date: meetingData.date, // Use the user-provided date
          startTime: meetingData.startDateTime,
          endTime: meetingData.endDateTime,
          topic: meetingData.topic,
          subjectId: null,
          semester: formattedSemester,
          courseId: selectedCourseId,
          meetlink: null,
          youtubeLink: meetingData.youtubeLink,
        }),
      });
      console.log(meetingData);
      setShowAddLecturesPopup(false);
      setProgressLoading(false);
    } catch (error) {
      setError("Failed to Create an Lecture. Please try again later.");
    }
  };
  const handleShowPopupAndSelectLecture = (lecture) => {
    setShowPopup(true);
    setSelectedLecture(lecture);
  };

  const handleShowAddLecturesPopup = () => {
    setShowAddLecturesPopup(true);
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
  console.log(selectedTab);
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
        <div className="flex justify-center items-center py-10">
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
              } px-4 py-2 rounded-md mr-2 transition-colors duration-300`}
              onClick={() => setSelectedTab("Add Link")}
            >
              Add Link
            </button>
            <button
              className={`${
                selectedTab === "Add Lectures"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 rounded-md transition-colors duration-300`}
              onClick={() => setSelectedTab("Add Lectures")}
            >
              Add Lectures
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

          <div className="p-2 mx-4 bg-gray-50 rounded-xl md:h-[75vh] overflow-x-hidden overflow-y-auto md:w-[70vh] scrollbar-thumb-blue-400 scrollbar-thin space-y-2 ">
            {fetchedLectures.map((lecture) => (
              <div
                key={lecture._id}
                className={`md:w-96 rounded-xl p-2 cursor-pointer flex flex-col justify-between items-start ${
                  selectedLecture === lecture
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-100 transition ease-in-out duration-300"
                }`}
                onClick={() => handleLectureClick(lecture)}
              >
                <h2 className="text-lg font-semibold mb-2">{lecture.topic}</h2>
                <div
                  className={`flex items-center text-sm  mb-1 ${
                    selectedLecture == lecture
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  <FaCalendarAlt className="mr-1" />
                  {new Date(lecture.date).toLocaleDateString()}
                </div>
                <div
                  className={`flex items-center text-sm  mb-1 ${
                    selectedLecture == lecture
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  <FaClock className="mr-1" />
                  {convertTo12HourFormat(lecture.startTime)} -{" "}
                  {convertTo12HourFormat(lecture.endTime)}
                </div>
                <p
                  className={`text-sm  mb-1  ${
                    selectedLecture == lecture
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  Duration: {lecture.durationInMinutes} minutes
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedTab === "Add Link" && (
        <div className="flex justify-center items-center">
          <div className=" p-2 mx-4 bg-gray-100 rounded-xl">
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
      {selectedTab === "Add Lectures" && (
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow transition ease-in-out duration-500"
            onClick={handleShowAddLecturesPopup}
          >
            Make a Lecture Entry
          </button>
        </div>
      )}
      <AnimatePresence>
        {showAddLecturesPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm bg-gray-900 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <div className="flex items-center justify-between mb-4">
                <h1>Generate Lectures</h1>
                <button
                  className="text-gray-500 hover:text-gray-700 "
                  onClick={() => setShowAddLecturesPopup(false)}
                >
                  <CgClose size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {/* User input for date */}
                <div>
                  <label className="font-bold">Date</label>
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="date"
                    name="date"
                    value={meetingData.date}
                    onChange={handleInputChange}
                  />
                </div>
                {/* User input for start time */}
                <div className="flex items-center space-x-4">
                  <AiOutlineClockCircle size={24} />
                  <label className="font-bold">Start Time</label>
                  <input
                    className="border border-gray-300 rounded-md p-2"
                    type="time"
                    name="startDateTime"
                    value={meetingData.startDateTime}
                    onChange={handleInputChange}
                  />
                </div>
                {/* User input for end time */}
                <div className="flex items-center space-x-4">
                  <BiCalendarPlus size={24} />
                  <label className="font-bold">End Time</label>
                  <input
                    className="border border-gray-300 rounded-md p-2"
                    type="time"
                    name="endDateTime"
                    value={meetingData.endDateTime}
                    onChange={handleInputChange}
                  />
                </div>
                {/* User input for topic */}
                <div>
                  <label className="font-bold">Topic</label>
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="text"
                    name="topic"
                    value={meetingData.topic}
                    onChange={handleInputChange}
                  />
                </div>
                {/* User input for batch */}
                <div>
                  <label className="font-bold">Semester</label>
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="number"
                    name="semester"
                    value={meetingData.semester}
                    onChange={handleInputChange}
                  />
                </div>
                {/* User input for Youtube Link */}
                <div>
                  <label className="font-bold">Youtube Link</label>
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="text"
                    name="youtubeLink"
                    value={meetingData.youtubeLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <select onChange={handleCourseChange}>
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course.courseName}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                  {selectedCourseId && <p>Course ID: {selectedCourseId}</p>}
                </div>
                {progressloading ? (
                  <button className="p-2 text-white font-semibold bg-blue-400 rounded-3xl hover:bg-blue-800 hover:text-gray-100 transition ease-in-out duration-500">
                    <BarLoader />
                  </button>
                ) : (
                  <button
                    className="p-2 text-white font-semibold bg-blue-400 rounded-3xl hover:bg-blue-800 hover:text-gray-100 transition ease-in-out duration-500"
                    onClick={handleGenerateLectures}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
