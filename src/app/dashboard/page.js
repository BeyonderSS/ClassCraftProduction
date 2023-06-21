"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion, progress } from "framer-motion";
import listCourses from "@/lib/listCourses";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import WifiLoader from "../WifiLoader";
function Dashboard() {
  const role = "Teacher";
  const progresses = [
    { id: 1, Name: "Sumit", percent: 10, courseName: "Maths" },
    { id: 2, Name: "Puneet", percent: 80, courseName: "Maths" },
    { id: 3, Name: "Raghav", percent: 75, courseName: "Maths" },
  ];
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
    Student: "Unleash your potential, embrace excellence.",
    Teacher: "Inspire minds, ignite lifelong learning.",
    Admin: "Efficiency empowered, systems perfected.",
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <WifiLoader text={"Loading..."} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="  flex justify-between items-center"
    >
      <div className="h-screen  lg:pl-32 py-10 mx-auto pr-[50vh] w-full  ">
        <div className="flex justify-between">
          <div className="flex flex-col w-[70vh]">
            <h1 className="text-sm text-gray-600">
              Hi, {session?.user?.name.split(" ")[0]}
            </h1>
            <div className="my-10 mx-10">
              <p className=" lg:text-8xl text-6xl font-semibold opacity-80 text-gray-700">
                {slogans[role]}
              </p>
            </div>
            <Link
              className="fancy w-72 p-10 my-10 rounded-full flex justify-center items-center  mx-10"
              href="/"
            >
              <span className="top-key"></span>
              <span className="text text-2xl">Get Started</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </Link>
          </div>
          <div className="flex justify-end items-center w-[60vh]">
            <img
              src="/dashHome.svg"
              alt=""
              className="h-[60vh] lg:block md:block hidden "
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full ">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full ">
            {progresses.map((progress, index) => (
              <div
                key={progress.id}
                className="progressCard md:h-80 h-40 w-72 md:w-[55vh] m-6"
              >
                <img
                  className="progressImg md:h-72 h-36"
                  src={`/progressCard${index + 1}.svg`}
                  alt=""
                />
                <div className="progressTextBox">
                  <p className="text head">{progress.Name}</p>
                  <span>{progress.courseName}</span>
                  <p className="text price">{progress.percent}%</p>
                </div>
              </div>
            ))}

            <div className="progressCard md:h-80 h-40 w-72 md:w-[55vh] m-6">
              <img
                className="progressImg md:h-72 h-36"
                src="/learnMore.svg"
                alt=""
              />
              <div className="progressTextBox">
                <p className="text head">Explore</p>
                <span>Possibilities</span>
                <p className="text price">Learn More ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed  right-0 md:block hidden z-50">
        <div className=" h-screen bg bg-gray-200 w-[50vh] py-8 rounded-xl flex flex-col items-center justify-between overflow-hidden">
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
          {/* <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={4000}
          > */}
          {course.length != 0 && (
            <Link
              href={`${
                role === "Student"
                  ? `/dashboard/courselist/${course[0].id}?name=${course[0].name}`
                  : `${course[0].alternateLink}`
              }`}
            >
              <article className="article-wrapper w-80">
                <img src="/landingCard.svg" alt="" className="rounded-lg" />

                <div className="project-info">
                  <div className="flex-pr">
                    <div className="project-title text-nowrap">
                      {course[0].name}
                    </div>
                    <button
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
                  <div className="types">
                    <span className="project-type">
                      • {course[0].courseState}
                    </span>
                    <span className="project-type">
                      • Section - {course[0].section}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}
          {/* </Carousel> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
