"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Dashboard() {
  const { data: session } = useSession();
  const role = "Admin";
  useEffect(() => {
    console.log("test overload");
  }, [session]);
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
    <div className="overflow-x-hidden bg-[#F4F6F8]">
      {session && (
        <div>
          {/* <motion.img
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            src="hero.svg"
            className="absolute md:top-0 w-full h-full md:h-screen"
            alt=""
          /> */}
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.2 }}
              className={`lg:pl-28 flex items-center justify-center h-screen text-gray-400 ${colors[role]}`}
            >
              <div className="z-10 text-center">
                <h1 className="font-sans text-4xl md:text-5xl lg:text-8xl font-extrabold mb-4 text-white/80">
                  ClassCraft
                </h1>
                {session && (
                  <p className="font-sans font-semibold text-lg md:text-xl lg:text-2xl mb-8 text-white">
                    Welcome back, {session?.user?.name}!
                  </p>
                )}
                <p className="font-sans font-semibold text-lg sm:text-xl md:text-2xl mb-8 text-gray-800/75">
                  {slogans[role]}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
