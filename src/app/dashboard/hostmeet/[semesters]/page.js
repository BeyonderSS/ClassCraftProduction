"use client";
import React, { useEffect, useState } from "react";
import HostMeetSemesterCard from "./HostMeetSemesterCard";

const Semesters = (props) => {
  const [filteredCourse, setFilteredCourse] = useState();
  const [semesters, setSemesters] = useState({});
  const courseId = props.params.semesters;
  const courses = JSON.parse(localStorage.getItem("hostMeetCourses"));
  console.log(courses);
  useEffect(() => {
    if(courses){
      courses.forEach((course) => {
        if (course._id === courseId) {
          setFilteredCourse(course);
        }
      });
    }
   
  }, [courseId,courses]);

  useEffect(() => {
    // Check if filteredCourse and subjects exist and if subjects is an object
    if (
      filteredCourse &&
      filteredCourse.subjects &&
      typeof filteredCourse.subjects === "object"
    ) {
      // Initialize an empty object to store semester data
      const updatedSemesters = {};

      // Loop through each semester in filteredCourse.subjects
      for (const semester in filteredCourse.subjects) {
        if (filteredCourse.subjects.hasOwnProperty(semester)) {
          const subjectsArray = filteredCourse.subjects[semester];
          // Assuming your subject data contains a property named "semester"
          // Assign subject data to the respective semester key in the object
          updatedSemesters[`Semester${parseInt(semester) + 1}`] = subjectsArray;
        }
      }

      // Update the semesters state with the new object
      setSemesters(updatedSemesters);
    }
  }, [filteredCourse]);

  // console log data in the desired format
  useEffect(() => {
    console.log("Formatted Semester Data:", semesters);
  }, [semesters]);

  return (
    <div className="lg:pl-28 pt-24 overflow-x-hidden bg-[#F4F6F8] py-6 h-screen">
      <div className="lg:mx-10 mx-2">
        <div className="flex justify-center items-center lg:text-5xl text-4xl text-white font-semibold m-4  ">
          <h1 className=" p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
            Semesters
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {/* Render SemesterCard for each semester */}
          {Object.keys(semesters).map((semesterKey) => (
            <HostMeetSemesterCard
              key={semesterKey}
              SemesterName={semesterKey}
              subjects={semesters[semesterKey]}
              semesterId={courseId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Semesters;
