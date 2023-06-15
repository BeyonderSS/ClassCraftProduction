"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import listCourses from "@/lib/listCourses";

function Dashboard() {
  const role = "Teacher";
  const [course, setCourse] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session) {
      setLoading(true);
      console.log(session.accessToken);

      async function getCourses(access_token) {
        const accessToken = access_token;
        const courses = await listCourses(session?.accessToken);
        console.log(courses);
        setCourse(courses);
        setLoading(false);
      }

      getCourses(session.accessToken);
    }
  }, [session]);
  console.log(course);
  console.log("ses", session);
  const colors = {
    Student: "bg-gradient-to-r from-[#6DA9E4] to-[#009FBD]",
    Teacher: "bg-gradient-to-r from-[#3F72AF] to-[#112D4E]",
    Admin: "bg-gradient-to-r from-[#3282B8] to-[#0F4C75]",
  };
  const slogans = {
    Student: "Discover new horizons and grow with us!",
    Teacher: "Plant the seeds of knowledge and watch them flourish!",
    Admin: "Make managing your garden a breeze with us!",
  };

  return (
    <div className=" bg-[#F4F6F8] flex justify-between items-center">
      <div className="h-screen lg:pl-32 py-10  ">
        <div className="flex">
          <div className="">
            <h1 className="text-sm text-gray-600">
              Hi, {session?.user?.name.split(" ")[0]}
            </h1>
            <div className="my-10 mx-10">
              <h1 className=" text-6xl text-gray-700">Become The Best</h1>
              <h1 className=" text-6xl text-gray-700">Version Of Your Self</h1>
            </div>
            <button className="font-semibold text-sm text-white bg bg-gray-800 hover:bg-gray-900 rounded-full p-10 mx-10 my-8 transition ease-in-out duration-500">
              Get Started!
            </button>
          </div>
          <img src="/dashHome.svg" alt="" className="h-[50vh] w-[50vh] mx-32" />
        </div>
      </div>

      <div className="h-screen bg bg-gray-200 w-[50vh] py-8 rounded-xl flex flex-col items-center justify-between overflow-hidden">
        <div className="flex flex-col justify-center items-center">
          <img
            src={session?.user?.image}
            alt=""
            className="rounded-full h-36 w-36"
          />
          <h1 className="text-2xl my-7  text-gray-600">
            {session?.user?.name}
          </h1>
        </div>
        {course.length != 0 && (
          <div class="card h-[50vh] w-96">
            <div class="card__img">
              <img src="/landingCard.svg" alt="" />
            </div>
            <div class="card__title">{course[0].name}</div>
            <div class="card__subtitle">{course[0].section}</div>
            <div class="card__wrapper ">
              <button className="bg-yellow-300 p-2 px-5 my-2 rounded-full">
                View more
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
