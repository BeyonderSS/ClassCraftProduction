"use client";
import React, { useEffect, useState } from "react";
import AnnouncementCard from "../../AnnouncementCard";
import listAnnouncements from "@/lib/listAnnouncements";
import { useSession } from "next-auth/react";
import AnnouncementsSkeleton from "../../AnnouncementsSkeleton";

const Announcements = (props) => {
  const { data: session } = useSession();
  const courseId = props.params.announcements;
  const courseName = props.searchParams.name;
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(true);
      console.log(session.accessToken);

      async function getAnnouncements(access_token) {
        const accessToken = access_token;

        const announcements = await listAnnouncements(accessToken, courseId);
        console.log("announcement of" + " " + courseId, announcements);
        setAnnouncements(announcements);
        setLoading(false);
      }

      getAnnouncements(session.accessToken);
    }
  }, [session, courseId]);
  console.log(courseName);
  if (loading) {
    return (
      <div className=" lg:pl-28 pt-24 bg-[#F4F6F8] h-screen">
        {" "}
        <AnnouncementsSkeleton courseName={courseName}/>
      </div>
    );
  }
  if (announcements.length == 0) {
    return (
      <div className="lg:pl-28 pt-24 h-screen bg-[#F4F6F8]">
        <div className="flex flex-col justify-center items-center lg:text-5xl text-4xl text-white/90 font-semibold m-4  ">
          <h1 className=" p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
            Announcements
          </h1>
          <h1 className="text-gray-800/60 text-3xl lg:text-4xl my-2">
            {courseName}
          </h1>
        </div>
        <p className="flex justify-center items-center font-semibold text-gray-800/60 text-2xl">
          It Looks Like there are no announcements in the Course!
        </p>
      </div>
    );
  }
  return (
    <div className="lg:pl-28 pt-24 overflow-x-hidden bg-[#F4F6F8] py-6  h-screen  ">
      <div className="flex flex-col justify-center items-center lg:text-5xl text-4xl text-white/90 font-semibold m-4  ">
        <h1 className=" p-3 px-6 rounded-lg bg-[#7EA8EB] flex justify-center items-center">
          Announcements
        </h1>
        <h1 className="text-gray-800/60 text-3xl lg:text-4xl my-2">
          {courseName}
        </h1>
      </div>
      <AnnouncementCard announcements={announcements} />
    </div>
  );
};

export default Announcements;
