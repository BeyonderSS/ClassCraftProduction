"use client";

import React, { Suspense, useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import { useSession } from "next-auth/react";
import listCourses from "@/lib/listCourses";
import CourseCardSkeleton from "../CourseCardSkeleton";
import CourseCardItem from "../CourseCard";

const Courses = () => {
  const [course, setCourse] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session) {
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
      <div className="lg:pl-80 pt-20">
        <CourseCardSkeleton />
      </div>
    );
  }
  if (course.length == 0) {
    return (
      <div className="lg:pl-80 pt-20 h-screen bg-blue-200">
        <div className="flex justify-center items-center lg:text-5xl text-4xl text-white/90 font-semibold m-4  ">
          <h1 className=" p-3 px-6 rounded-lg bg-blue-400 flex justify-center items-center">
            Your Courses
          </h1>
        </div>
        Opps it Looks Like you are not enrolled in any courses!
      </div>
    );
  }
  return (
    <div className="lg:pl-80 pt-20 overflow-x-hidden bg-blue-200 py-6 h-screen">
      <div className="mx-10">
        <div className="flex justify-center items-center lg:text-5xl text-4xl text-white/90 font-semibold m-4  ">
          <h1 className=" p-3 px-6 rounded-lg bg-blue-400 flex justify-center items-center">
            Your Courses
          </h1>
        </div>
        <Suspense
          fallback={
            <p className="flex justify-center items-center">loading....</p>
          }
        ><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.map((course) => (
          <CourseCardItem key={course.id} course={course} role={role} />
        ))}
      </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Courses;
