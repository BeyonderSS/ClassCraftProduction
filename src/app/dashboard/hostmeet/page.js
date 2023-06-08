"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import generateMeeting from "@/lib/generateMeeting";
import listCourses from "@/lib/listCourses";
import createAnnouncement from "@/lib/createAnnouncement";

const HostMeet = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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
      async function fetchCourses(accessToken) {
        try {
          const courses = await listCourses(accessToken);
          setCourses(courses);
        } catch (error) {
          console.log("Failed to fetch courses:", error);
        }
      }

      fetchCourses(session.accessToken);
    }
  }, [session]);

  const handleGenerateMeeting = async () => {
    try {
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
    } catch (error) {
      console.log("Failed to generate meeting:", error);
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="lg:pl-80 pt-20">
      <h1 className="text-3xl font-bold mb-4">HostMeet</h1>

      {courses.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              onClick={() => handleCourseSelect(course)}
            >
              <p className="text-lg font-bold">{course.name}</p>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Schedule Meeting</h2>
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
                <p>End Time: {new Date(meetingData.endDateTime).toString()}</p>
              </div>
              <div>
                <label className="font-bold">Summary</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  type="text"
                  name="summary"
                  value={meetingData.summary}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="font-bold">Description</label>
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
              Host Meet &amp; Push Announcement
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HostMeet;
