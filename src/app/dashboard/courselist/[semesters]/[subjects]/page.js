"use client";
import SubjectCard from "../../../../../app/dashboard/SubjectCard";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Subjects = (props) => {
  const [filteredCourse, setFilteredCourse] = useState();
  const { data: session } = useSession();

  const [semesters, setSemesters] = useState({});
  const [semesterSubjects, setSemesterSubjects] = useState([]);
  
  const semester = props.params.subjects;
  const courseId = props.params.semesters;
  const courses = JSON.parse(localStorage.getItem("courses"));

  useEffect(() => {
    courses.forEach((course) => {
      if (course._id === courseId) {
        setFilteredCourse(course);
      }
    });
  }, [courseId]);

  useEffect(() => {
    if (
      filteredCourse &&
      filteredCourse.subjects &&
      typeof filteredCourse.subjects === "object"
    ) {
      const updatedSemesters = {};
      for (const semester in filteredCourse.subjects) {
        if (filteredCourse.subjects.hasOwnProperty(semester)) {
          const subjectsArray = filteredCourse.subjects[semester];
          updatedSemesters[`Semester${parseInt(semester) + 1}`] = subjectsArray;
        }
      }
      setSemesters(updatedSemesters);
    }
  }, [filteredCourse]);

  useEffect(() => {
    // Update semesterSubjects when semesters[semester] changes
    const subjectsForSemester = semesters[semester];
    if (subjectsForSemester) {
      // Check if semesterSubjects is an array, if not, convert it to an array
      const semesterSubjectsArray = Array.isArray(subjectsForSemester)
        ? subjectsForSemester
        : [subjectsForSemester];

      setSemesterSubjects(semesterSubjectsArray);
    } else {
      // If there are no subjects for the selected semester, set semesterSubjects to an empty array
      setSemesterSubjects([]);
    }
  }, [semesters, semester]);

  return (
    <div className="lg:pl-28 pt-24 overflow-x-hidden bg-[#F4F6F8] py-6 h-screen">
      <div className="lg:mx-10 mx-2">
        <div className="flex justify-center items-center lg:text-5xl text-4xl text-white font-semibold m-4  ">
          <h1 className=" p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
            {semester}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {semesterSubjects.map((course) => (
            <SubjectCard
              key={course.Id}
              course={course.googleClassroomCourse}
              role={session?.user.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
