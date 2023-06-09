"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import generateMeeting from "@/lib/generateMeeting";
import listCourses from "@/lib/listCourses";
import createAnnouncement from "@/lib/createAnnouncement";
import { BarLoader } from "react-spinners";
import SkeletonLoaderHostmeet from "./SkeletonLoaderHostmeet";

const HostMeet = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const [meetingData, setMeetingData] = useState({
    summary: "",
    location: "Online",
    description: "",
    startDateTime: new Date().toISOString(),
    endDateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    timeZone: "America/New_York",
  });

  useEffect(() => {
    if (session) {
      setSkeletonLoading(true);
      async function fetchCourses(accessToken) {
        try {
          const courses = await listCourses(accessToken);
          setCourses(courses);
          setSkeletonLoading(false);
        } catch (error) {
          console.log("Failed to fetch courses:", error);
        }
      }

      fetchCourses(session.accessToken);
    }
  }, [session]);

  const handleGenerateMeeting = async () => {
    try {
      setLoading(true);
      if (!selectedCourse) {
        console.log("No course selected.");
        return;
      }

      console.log("Course ID:", selectedCourse.id);
      console.log("Meeting data:", meetingData);

      const meetingResult = await generateMeeting(
        session.accessToken,
        meetingData
      );
      const announcementData = {
        text: `Meeting: ${meetingResult.summary}\nStart Time: ${meetingResult.start.dateTime}`,
        materials: [
          {
            link: {
              url: meetingResult.hangoutLink,
              title: "Meeting Link",
            },
          },
        ],
      };
      const announcementResult = await createAnnouncement(
        session.accessToken,
        selectedCourse.id,
        announcementData
      );
      console.log(announcementResult);

      console.log("Meeting result:", meetingResult);
      setLoading(false);
      setSuccessMessage("Announcement Created Successfully");
    } catch (error) {
      setSuccessMessage("Failed To Create Announcement Please Retry!");

      console.log("Failed to generate meeting:", error);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
    setCourseName(course.name);
  };

  const handleInputChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value,
    });
  };
  if (skeletonLoading) {
    return <SkeletonLoaderHostmeet />;
  }
  return (
    <div className="lg:pl-80 pt-20 lg:mx-6 md:mx-4 mx-2">
      <div className="flex justify-center items-center lg:text-5xl text-4xl text-white/90 font-semibold m-4 my-4 ">
        <h1 className=" p-3 px-6 rounded-lg bg-blue-400 flex justify-center items-center">
          HostMeet &amp; Push Announcements
        </h1>
      </div>
      {courses.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 bg-blue-200  rounded-md cursor-pointer hover:bg-blue-300"
              onClick={() => handleCourseSelect(course)}
            >
              <p className="text-lg font-bold">{course.name}</p>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}
      {courses.length == 0 && (
        <div className="flex justify-center items-center text-2xl lg:text-3xl font-semibold text-gray-800/75">
          <h1>Opps it Looks Like you are not enrolled in any courses!</h1>
        </div>
      )}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm  bg-gray-900  z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  Schedule Meeting - {courseName}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPopup(false)}
                >
                  <CgClose size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <AiOutlineClockCircle size={24} />
                  <p>
                    Start Time: {new Date(meetingData.startDateTime).toString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <BiCalendarPlus size={24} />
                  <p>
                    End Time: {new Date(meetingData.endDateTime).toString()}
                  </p>
                </div>
                <div>
                  <label className="font-bold">Topic</label>
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="text"
                    name="summary"
                    value={meetingData.summary}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Batch</label>
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="text"
                    name="description"
                    value={meetingData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6"
                onClick={handleGenerateMeeting}
              >
                {loading ? ( // Display loader when loading
                  <div className="flex justify-center items-center">
                    <BarLoader color="#ffffff" loading={loading} />
                  </div>
                ) : (
                  "  Host Meet & Push Announcement"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {successMessage && ( // Display success message
        <div className="mt-4 text-green-600">{successMessage}</div>
      )}
    </div>
  );
};

export default HostMeet;
