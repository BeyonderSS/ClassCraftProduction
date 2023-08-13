"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WifiLoader from "@/app/WifiLoader";
import HostMeetCard from "./HostMeetCard";
import getMongoCourses from "@/lib/mongocoursefetch";
import NotAuthorizedPage from "../NotAuthorizedPage";

const HostMeet = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [databaseCourse, setDatabaseCourse] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    if (!session) {
      setLoading(true);
    } else {
      setRole(session?.user.role)
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
        setDatabaseCourse(cachedCourse);
        setLoading(false);
      }
    }
  }, [session]);
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
  console.log("mongocourse:", databaseCourse);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F4F6F8]">
        <WifiLoader text={"Loading..."} />
      </div>
    );
  }
  if (role == "Student" || role == null) {
    return (
      <main>
        <NotAuthorizedPage />
      </main>
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