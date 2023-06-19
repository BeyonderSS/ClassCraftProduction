"use client";

import React, { Suspense, useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import { useSession } from "next-auth/react";
import listCourses from "@/lib/listCourses";
import CourseCardSkeleton from "../CourseCardSkeleton";
import CourseCardItem from "../CourseCard";
import { motion } from "framer-motion";
import WifiLoader from "@/app/WifiLoader";

const Courses = () => {
  const [course, setCourse] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!session) {
      setLoading(true);
    } else {
      setLoading(true);
      console.log(session.accessToken);

      async function getCourses(access_token) {
        const accessToken = access_token;
        const courses = await listCourses(accessToken);
        console.log(courses);
        setCourse(courses);
        setLoading(false);
      }

      getCourses(session.accessToken);
    }
  }, [session]);
  const role = "Admin";
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
            Your Courses
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4">
          {course.map((course) => (
            <CourseCardItem key={course.id} course={course} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
