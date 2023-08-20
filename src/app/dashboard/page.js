"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion, progress } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import WifiLoader from "../WifiLoader";
import getMongoCourses from "@/lib/mongocoursefetch";
function Dashboard() {
  const role = "Teacher";

  const [course, setCourse] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  console.log(session);
  useEffect(() => {
    if (!session) {
      setLoading(true);
    } else {
      const cachedCourse = JSON.parse(localStorage.getItem("courses"));
      console.log("cached:", cachedCourse);
      if (!cachedCourse) {
        setLoading(true);
        console.log(session.accessToken);

        async function getCourses(access_token) {
          const accessToken = access_token;
          const Id = session?.user.id;
          const mongo = await getMongoCourses(
            accessToken,
            session?.user.university,
            Id
          );
          setCourse(mongo.databaseCourses);
          localStorage.setItem(
            "courses",
            JSON.stringify(mongo.databaseCourses)
          );
          // Get the current time in milliseconds
          const currentTime = new Date().getTime();

          // Calculate 1 hour in milliseconds (1 hour = 60 minutes * 60 seconds * 1000 milliseconds)
          const oneHourInMilliseconds = 60 * 60 * 1000;

          // Calculate the expiry time by adding 1 hour to the current time
          const expiryTime = currentTime + oneHourInMilliseconds;

          // Store the expiry time in localStorage
          localStorage.setItem("coursesExpiry", expiryTime);

          setLoading(false);
        }

        getCourses(session.accessToken);
      } else {
        setCourse(cachedCourse);
        setLoading(false);
      }
    }
  }, [session]);
  console.log("mongocourse:", course);
  useEffect(() => {
    // Function to check and delete "hostMeetCourses" from localStorage
    const checkAndDeleteCourses = () => {
      const expiryTime = localStorage.getItem("coursesExpiry");

      if (expiryTime) {
        // Convert the expiry time from string to a numeric value (milliseconds)
        const expiryTimeInMilliseconds = parseInt(expiryTime, 10);

        // Get the current time in milliseconds
        const currentTime = new Date().getTime();

        // Calculate the difference between current time and expiry time in milliseconds
        const timeDifference = Math.abs(currentTime - expiryTimeInMilliseconds);

        // Check if the difference is more than 1 hour (3600000 milliseconds)
        if (timeDifference >= 3600000) {
          // Delete "hostMeetCourses" from localStorage
          localStorage.removeItem("courses");
        }
      }
    };

    // Call the function when the component mounts
    checkAndDeleteCourses();

    // You can also set an interval to check periodically if needed.
    // For example, to check every minute, you can uncomment the following code:

    const interval = setInterval(() => {
      checkAndDeleteCourses();
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
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
      <div className="h-screen  lg:pl-32 py-10 mx-auto lg:pr-[50vh] w-full  ">
        <div className="flex justify-between">
          <div className="flex flex-col w-[70vh]">
            <h1 className="text-sm text-gray-600 md:hidden">
              Hi, {session?.user?.name.split(" ")[0]}
            </h1>
            <div className="my-10 mx-10">
              <p className=" lg:text-8xl text-6xl font-semibold opacity-80 text-gray-700">
                {slogans[role]}
              </p>
            </div>
          </div>
          <div className="flex justify-end items-center w-[60vh]">
            <img
              src="/dashHome.svg"
              alt=""
              className="h-[60vh] lg:block  hidden "
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full ">
          <div className="grid lg:grid-cols-2  grid-cols-1 w-full ">
            <div className="progressCard lg:h-80 h-52 w-auto lg:w-[55vh] m-6">
              <img
                className="progressImg lg:h-72 h-36"
                src={`/progressCard1.svg`}
                alt=""
              />
              <div className="progressTextBox">
                <p className="text head">Under Development</p>
                <span>...</span>
                <p className="text price">Comming Soon</p>
              </div>
            </div>
            <div className="progressCard lg:h-80 h-52 w-auto lg:w-[55vh] m-6">
              <img
                className="progressImg lg:h-72 h-36"
                src={`/progressCard1.svg`}
                alt=""
              />
              <div className="progressTextBox">
                <p className="text head">Under Development</p>
                <span>...</span>
                <p className="text price">Comming Soon</p>
              </div>
            </div>{" "}
            <div className="progressCard lg:h-80 h-52 w-auto lg:w-[55vh] m-6">
              <img
                className="progressImg lg:h-72 h-36"
                src={`/progressCard1.svg`}
                alt=""
              />
              <div className="progressTextBox">
                <p className="text head">Under Development</p>
                <span>...</span>
                <p className="text price">Comming Soon</p>
              </div>
            </div>
            <div className="progressCard lg:h-80 h-52 w-auto lg:w-[55vh] m-6">
              <img
                className="progressImg lg:h-72 h-36"
                src="/learnMore.svg"
                alt=""
              />
              <div className="progressTextBox">
                <p className="text head">Explore</p>
                <Link href={"https://www.parasmanieducation.com/#courses"}>
                  <span>Possibilities</span>
                  <p className="text price">Learn More ...</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed  right-0 lg:block hidden z-50">
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
            <button
              onClick={signOut}
              className="fancy   my-10 rounded-full flex justify-center items-center  mx-10"
              href="/"
            >
              <span className="top-key"></span>
              <span className="text ">Sign Out</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
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
            <Link href={`/dashboard/courselist/${course[0]._id}`}>
              <article className="article-wrapper w-80">
                <img src="/landingCard.svg" alt="" className="rounded-lg" />

                <div className="project-info">
                  <div className="flex-pr">
                    <div className="project-title text-nowrap">
                      {course[0].courseName}
                    </div>
                    <button className="project-hover">
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
                </div>
              </article>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
