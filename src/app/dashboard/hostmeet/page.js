"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WifiLoader from "@/app/WifiLoader";
import HostMeetCard from "./HostMeetCard";
import getMongoCourses from "@/lib/mongocoursefetch";

const HostMeet = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [databaseCourse, setDatabaseCourse] = useState();
  useEffect(() => {
    if (!session) {
      setLoading(true);
    } else {
      const cachedCourse = JSON.parse(localStorage.getItem("courses"));
      if (!cachedCourse) {
        setLoading(true);
        console.log(session.accessToken);

        async function getCourses(access_token) {
          const accessToken = access_token;
          const courseIds = session?.user.courses;
          const mongo = await getMongoCourses(
            accessToken,
            session?.user.university,
            courseIds
          );
          setDatabaseCourse(mongo.databaseCourses);
          console.log("mongocourse:", databaseCourse);

          localStorage.setItem(
            "hostMeetCourses",
            JSON.stringify(databaseCourse)
          );
          setLoading(false);
        }

        getCourses(session.accessToken);
      } else {
        setDatabaseCourse(cachedCourse);
        localStorage.setItem("hostMeetCourses", JSON.stringify(cachedCourse));
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
