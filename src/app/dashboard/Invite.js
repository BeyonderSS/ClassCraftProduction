import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { BarLoader } from "react-spinners";

import inviteStudentsToCourse from "../../lib/addStudentsToCourse";
import inviteTeachersToCourse from "../../lib/inviteTeachersToCourse";
import updateCourseStudentEnrolled from "../../lib/updateCourseStudentEnrolled";

const Invite = ({ courseId, documentId }) => {
  const [selectedTab, setSelectedTab] = useState("Student");
  const [disabled, setDisabled] = useState(true);
  const [emails, setEmails] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const access_token = session.accessToken;
  const university = session.user.university;

  const subjectNames = courseId.map((course) => course.subjectName);
  const subjectIdMap = {};
  courseId.forEach((course) => {
    subjectIdMap[course.subjectName] = course.Id;
  });

  console.log(teacherSubjects);
  const handleEmailInput = (e) => {
    const value = e.target.value.trim();
    if (value && !emails.includes(value)) {
      setEmails([...emails, value]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (emails.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [emails]);

  const handleRemoveEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleInviteClick = async () => {
    try {
      setIsLoading(true);

      // First, invite students or teachers using the existing functions

      try {
        await updateCourseStudentEnrolled(
          emails,
          documentId,
          university,
          selectedTab,
          teacherSubjects
        );
      } catch (updateError) {
        console.error("Error updating course:", updateError);
        setErrorMessage("Error updating course. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage(
        `Invited ${emails.length} ${selectedTab} successfully and updated the course!`
      );
      setEmails([]);
      setErrorMessage("");
    } catch (error) {
      console.error("Unknown error:", error);
      setErrorMessage("An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleEmailInput(e);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className={`${
            selectedTab === "Student"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md mr-2 transition-colors duration-300`}
          onClick={() => setSelectedTab("Student")}
        >
          <FaUserGraduate className="inline-block mr-2" />
          Students
        </button>
        <button
          className={`${
            selectedTab === "Teacher"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md transition-colors duration-300`}
          onClick={() => setSelectedTab("Teacher")}
        >
          <FaChalkboardTeacher className="inline-block mr-2" />
          Teachers
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap">
          {emails.map((email) => (
            <div
              key={email}
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2 flex items-center"
            >
              <span>{email}</span>
              <button
                className="ml-2 text-sm font-bold focus:outline-none transition-colors duration-300 hover:text-red-500"
                onClick={() => handleRemoveEmail(email)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type email and hit space"
          className="border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onKeyDown={handleKeyDown}
        />
        {selectedTab === "Teacher" && (
          <div className="mt-2 max-h-40 overflow-y-auto">
            <label className="block font-medium">Select Subjects:</label>
            <div className="mt-2 space-y-2">
              {subjectNames.map((subjectName) => (
                <label key={subjectName} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 form-checkbox"
                    checked={teacherSubjects.includes(
                      subjectIdMap[subjectName]
                    )}
                    onChange={() => {
                      if (teacherSubjects.includes(subjectIdMap[subjectName])) {
                        setTeacherSubjects(
                          teacherSubjects.filter(
                            (id) => id !== subjectIdMap[subjectName]
                          )
                        );
                      } else {
                        setTeacherSubjects([
                          ...teacherSubjects,
                          subjectIdMap[subjectName],
                        ]);
                      }
                    }}
                  />
                  {subjectName}
                </label>
              ))}
            </div>
          </div>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
          onClick={handleInviteClick}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <BarLoader color="#ffffff" loading={isLoading} />
            </div>
          ) : (
            "Invite"
          )}
        </button>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-blue-500/40 text-white px-4 py-2 rounded-md mt-4"
          >
            {successMessage}
          </motion.div>
        )}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-red-500/50 text-white px-4 py-2 rounded-md mt-4"
          >
            {errorMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Invite;
