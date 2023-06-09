"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
const CCHeader = () => {
  const { data: session } = useSession();
  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white bg-opacity-10  backdrop-blur-xl">
     <div></div>
      <div className="lg:hidden">
      {session ? (
        <button
          className="lg:hidden lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className=" lg:hidden py-2 px-4 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          onClick={signIn}
        >
          Sign In
        </button>
      )}
      </div>
      <ul className=" absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        <motion.li
          whileHover={{ scale: 1.1 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
        >
          <Link className="lg:text-4xl md:text-3xl text-3xl text-gray-200 font-bold" href="/">
            ClassCraft
          </Link>
        </motion.li>
      </ul>
      {session ? (
        <button
          className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          onClick={signIn}
        >
          Sign In
        </button>
      )}
    </nav>
  );
};

export default CCHeader;
