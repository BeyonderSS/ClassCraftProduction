"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrHelp } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { useSession } from "next-auth/react";

const Doubt = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  const doubts = [
    {
      id: 1,
      title: "How to start coding?",
      description: "I am new to coding and need some guidance.",
    },
    {
      id: 2,
      title: "React component not rendering",
      description: "My React component is not rendering. Can someone help?",
    },
    // Add more doubts here
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 pt-24 lg:pl-24">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Ask Your Doubt</h1>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 ">
          <motion.button
            onClick={() => setShowPopup(true)}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-3xl overflow-hidden h-96  w-auto flex justify-center items-center flex-col"
          >
            <div className="text-2xl text-center mb-4">
              <Image
                width={100}
                height={100}
                src="/doubts.svg"
                className="text-blue-500 inline-block "
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">Raise a Doubt</h2>
            <p className="text-gray-700">
              Click here to raise a new doubt and get help from the community.
            </p>
          </motion.button>

          {doubts.map((doubt) => (
            <Link
            
              key={doubt.id}
            href={`/dashboard/doubt/${doubt.id}`}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-3xl overflow-hidden h-96  w-auto flex justify-center items-center flex-col"
              >
                <h2 className="text-xl font-semibold mb-2">{doubt.title}</h2>
                <p className="text-gray-700">{doubt.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm  bg-gray-900  z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Raise a New Doubt</h1>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPopup(false)}
                >
                  <CgClose size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Doubt;
