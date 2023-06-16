"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion, progress } from "framer-motion";
import listCourses from "@/lib/listCourses";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
      <div className="h-screen bg-[#F4F6F8] lg:pl-32 py-10  ">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-600">
              Hi, {session?.user?.name.split(" ")[0]}
            </h1>
            <div className="my-10 mx-10">
              <h1 className=" text-6xl text-gray-700">Become The Best</h1>
              <h1 className=" text-6xl text-gray-700">Version Of Your Self</h1>
            </div>
            <a
              class="fancy w-52 p-6 my-10 rounded-full flex justify-center items-center  mx-10"
              href="#"
            >
              <span class="top-key"></span>
              <span class="text">Get Started</span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
            </a>

            {/* <button className="get-started-button w-52 mx-10 rounded-full p-2">
              <span>Get Started</span>
            </button> */}
          </div>
          <div className="flex justify-end items-center">
            <img src="/dashHome.svg" alt="" className="h-96 " />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ">
            {progresses.map((progress) => (
              <div
                key={progress.id}
                className="progressCard md:h-56 h-40 w-72 md:w-96 m-6"
              >
                <img className="progressImg h-40" src="/eth.svg" alt="" />
                <div className="progressTextBox">
                  <p className="text head">{progress.Name}</p>
                  <span>{progress.courseName}</span>
                  <p className="text price">{progress.percent}%</p>
                </div>
              </div>
            ))}
            <div className="progressCard md:h-56 h-40 w-72 md:w-96 m-6">
              <img className="progressImg h-40" src="/eth.svg" alt="" />
              <div className="progressTextBox">
                <p className="text head">Explore</p>
                <span>Possibilities</span>
                <p className="text price">Learn More ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed  right-0 md:block hidden">
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
            interval={5000}
          > */}
           
            {course.length != 0 &&
              
              <div className="card h-[50vh] w-80">
                    <div className="card__img">
                      <img src="/landingCard.svg" alt="" />
                    </div>
                    <div className="card__title">{course[0].name}</div>
                    <div className="card__subtitle">{course[0].section}</div>
                    <div className="card__wrapper ">
                      <button class="learnmore button">
                        <span class="circle" aria-hidden="true">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Learn More</span>
                      </button>
                    </div>
                  </div>
              
              }
          {/* </Carousel> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
