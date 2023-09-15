import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { BarLoader } from "react-spinners";
import generateMeeting from "../../../../../lib/generateMeeting";
import createAnnouncement from "../../../../../lib/createAnnouncement";
import Link from "next/link";
import fetchUserEmail from "../../../../../lib/fetchUserEmailUsingCourseId";

const HostMeetSubjectCard = ({ course, semester, courseId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [meetLink, setMeetLink] = useState();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [meetingData, setMeetingData] = useState({
    summary: "",
    location: "Online",
    description: "",
    startDateTime: "", // Will be set by user input
    endDateTime: "", // Will be set by user input
    timeZone: "America/New_York",
  });
  useEffect(() => {
    const fetchUserEmailAsync = async () => {
      if (courseId && session) {
        console.log("hello");
        try {
          const emailArray = await fetchUserEmail(
            session?.user.university,
            courseId
          );

          // Convert the array of email addresses to the desired format for attendees
          const attendees = emailArray.map((email, index) => ({
            email: email,
            // You can also add more properties for each attendee if needed
          }));

          // Set the attendees in the meetingData
          meetingData.attendees = attendees;

          console.log("Attendees:", meetingData.attendees);
        } catch (error) {
          console.error("Error fetching user email:", error);
        }
      }
    };

    fetchUserEmailAsync();
  }, [courseId, session]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
    setCourseName(course);
  };

  const handleGenerateMeeting = async () => {
    try {
      setLoading(true);
      if (!selectedCourse) {
        console.log("No course selected.");
        return;
      }

      // Convert the startDateTime and endDateTime to ISO 8601 format
      const startDateString = `${meetingData.date}T${meetingData.startDateTime}:00`;
      const endDateString = `${meetingData.date}T${meetingData.endDateTime}:00`;

      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);

      meetingData.startDateTime = startDate.toISOString();
      meetingData.endDateTime = endDate.toISOString();

      const meetingResult = await generateMeeting(
        session.accessToken,
        meetingData
      );

   

    

      setMeetLink(meetingResult.hangoutLink);

      const hostMeetRequest = await fetch("/api/hostmeet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          university: session.user.university,
          date: meetingData.date, // Use the user-provided date
          startTime: meetingResult.start.dateTime,
          endTime: meetingResult.end.dateTime,
          topic: meetingResult.summary,
          subjectId: course.id,
          semester: semester,
          courseId: courseId,
          meetlink: meetingResult.hangoutLink,
        }),
      });

      if (!hostMeetRequest.ok) {
        throw new Error("Failed to request hostmeet API");
      }

      setLoading(false);
      setSuccessMessage("Announcement Created Successfully");
    } catch (error) {
      setSuccessMessage("Failed To Create Announcement Please Retry!");
      console.log("Failed to generate meeting:", error);
    }
  };

  return (
    <div>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.1, duration: 0.5 },
        }}
        key={course?.Id}
        className="article-wrapper lg:w-96 w-auto"
      >
        <img src="/landingCard.svg" alt="" className="rounded-lg" />

        <div className="project-info">
          <div className="flex-pr">
            <div className="project-title text-nowrap">{course}</div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleCourseSelect(course)}
                className="project-hover"
              >
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
              </button>
            </div>
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
                    name="summary"
                    value={meetingData.summary}
                    onChange={handleInputChange}
                  />
                </div>
                {/* User input for batch */}
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
                {loading ? (
                  <div className="flex justify-center items-center">
                    <BarLoader color="#ffffff" loading={loading} />
                  </div>
                ) : (
                  "Host Meet & Push Announcement"
                )}
              </button>
              {successMessage && (
                <h1 className="text-green-600">{successMessage}!</h1>
              )}
              {meetLink && successMessage && (
                <h1 className="text-gray-600">
                  <Link href={meetLink}>
                    <span className="cursor-pointer underline text-blue-600">
                      Click Here
                    </span>{" "}
                  </Link>
                  to Join the meet.
                </h1>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HostMeetSubjectCard;
