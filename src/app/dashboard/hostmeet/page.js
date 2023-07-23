"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import listCourses from "@/lib/listCourses";
import WifiLoader from "@/app/WifiLoader";
import HostMeetCard from "./HostMeetCard";
import getMongoCourses from "@/lib/mongocoursefetch";

const HostMeet = () => {
  const [course, setCourse] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [databaseCourse, setDatabaseCourse] = useState();
  useEffect(() => {
    if (!session) {
      setLoading(true);
    } else {
      setLoading(true);
      console.log(session.accessToken);

      async function getCourses(access_token) {
        const accessToken = access_token;
        const courses = await listCourses(accessToken);
        const mongo = await getMongoCourses(
          accessToken,
          session?.user.university
        );
        setDatabaseCourse(mongo.databaseCourses);
        console.log("mongocourse:", databaseCourse);
        console.log(courses);

        // Filter courses based on room and batch condition
        const filteredCourses = courses.filter((course) => {
          return course.room === session?.user.university;
        });

        setCourse(filteredCourses);
        setLoading(false);
      }

      getCourses(session.accessToken);
    }
  }, [session]);
  localStorage.setItem("hostMeetCourses", JSON.stringify(databaseCourse));
  console.log("mongocourse:", databaseCourse);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F4F6F8]">
        <WifiLoader text={"Loading..."} />
      </div>
    );
  }
  if (course.length == 0) {
    return (
      <div className="lg:pl-28 pt-24 h-screen bg-[#F4F6F8]">
        <div className="flex justify-center items-center lg:text-5xl text-4xl text-white font-semibold m-4  ">
          <h1 className=" p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
            Your Courses
          </h1>
        </div>
        Opps it Looks Like you are not enrolled in any courses!
      </div>
    );
  }
  return (
    <div className="lg:pl-28 pt-24 overflow-x-hidden bg-[#F4F6F8] py-6 h-screen">
    <div className="lg:mx-10 mx-2">
      <div className="flex justify-center items-center lg:text-5xl text-4xl text-white font-semibold m-4  ">
        <h1 className=" p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
          Select Courses to Host Meet
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {databaseCourse.map((course) => (
          <HostMeetCard
            key={course._id}
            course={course}
            role={session?.user.role}
          />
        ))}
      </div>
    </div>
  </div>
  );
};

export default HostMeet;