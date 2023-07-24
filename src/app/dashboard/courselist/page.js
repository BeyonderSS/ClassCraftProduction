"use client";

import React, {  useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WifiLoader from "@/app/WifiLoader";
import getMongoCourses from "@/lib/mongocoursefetch";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [databaseCourse, setDatabaseCourse] = useState();
  console.log(session);
  useEffect(() => {
    if (!session) {
      setLoading(true);
    } else {
      const initialCachedCourse = localStorage.getItem("courses");
      const cachedCourse = JSON.parse(initialCachedCourse);
      console.log("cached:", cachedCourse);
      if (!cachedCourse) {
        setLoading(true);
        console.log(session.accessToken);

        async function getCourses(access_token) {
          const accessToken = access_token;
          const Id = session?.user.id;
          console.log(Id);
          const mongo = await getMongoCourses(
            accessToken,
            session?.user.university,
            Id
          );
          setDatabaseCourse(mongo.databaseCourses);
          console.log("mongocourse:", databaseCourse);

          localStorage.setItem(
            "courses",
            JSON.stringify(mongo.databaseCourses)
          );
          setLoading(false);
        }

        getCourses(session.accessToken);
      } else {
        setDatabaseCourse(cachedCourse);
        setLoading(false);
      }
    }
  }, [session]);

  console.log("mongocourse:", databaseCourse);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F4F6F8]">
        <WifiLoader text={"Loading..."} />
      </div>
    );
  }
  if (databaseCourse.length == 0) {
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
            Your Courses
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {databaseCourse.map((course) => (
            <CourseCard
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

export default Courses;
