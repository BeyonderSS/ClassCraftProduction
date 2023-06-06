"use client";

import React, { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { SlArrowRight } from "react-icons/sl";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  console.log("session:", session);
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="py-2 bg-blue-600 ">
      <div className=" lg:hidden block flex justify-between mx-5">
        <button
          onClick={handleSideBar}
          className="text-gray-100 text-2xl lg:hidden z-50"
        >
          {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
        <p className="text-2xl font-semibold text-gray-100">ClassCraft</p>
        <div></div>
        <motion.nav
          initial={{ x: "100%" }}
          animate={isOpen ? { x: -710 } : { x: "-1000%" }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 right-0 h-full bg-blue-600 w-64 lg:w-auto lg:static lg:bg-transparent lg:h-auto lg:flex lg:items-center lg:w-full"
        >
          <ul className="lg:flex lg:items-center lg:w-full">
            <li className="text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100">
              Home
            </li>
            <li className="text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100">
              About
            </li>
            <li className="text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100">
              Contact
            </li>
          </ul>
        </motion.nav>
      </div>

      <div className=" flex justify-between mx-4">
        <div></div>
        <h1 className=" text-3xl font-semibold py-2 pb-2 text-gray-100">
          ClassCraft
        </h1>
        <div className=" lg:block hidden justify-center items-center lg:flex relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <nav className="lg:block hidden bg-blue-600 w-80 absolute left-0 top-0 py-2 h-screen">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-100 bg-black/50 rounded-md px-4 my-2">
            Flourishers Edge
          </p>
          <p className="text-sm  text-gray-100 ">Admin</p>
         {session&& <p className="text-lg  text-gray-100">{session.user.name}</p>}
        </div>

        <ul className="lg:flex flex-col lg:w-full mt-4">
       {session?(   <li
            onClick={signOut}
            className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100"
          >
            <SlArrowRight className="pr-2 text-xl" /> SignOut
          </li>):(   <li
            onClick={signIn}
            className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100"
          >
            <SlArrowRight className="pr-2 text-xl" /> SignIn
          </li>)}
          <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100">
            <SlArrowRight className="pr-2 text-xl" /> About
          </li>
          <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-gray-100">
            <SlArrowRight className="pr-2 text-xl" /> Contact
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
