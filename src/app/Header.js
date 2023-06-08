"use client";

import React, { useEffect, useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { SlArrowRight } from "react-icons/sl";
import { signIn, signOut, useSession } from "next-auth/react";
import NavbarSkeletonLoader from "./NavbarSkeletonLoader";
import { CgLogIn } from "react-icons/cg";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";
const Header = () => {
  const { data: session } = useSession();
  // console.log("session:", session);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const role = "Admin";
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };
  if (loading) {
    return <NavbarSkeletonLoader />;
  }
  return (
    <header className="py-2 bg-blue-600 fixed top-0 w-full z-50">
      <div className=" lg:hidden block flex justify-between ">
        <button
          onClick={handleSideBar}
          className="text-gray-100 text-2xl lg:hidden hover:bg-blue-700 hover:text-white rounded-xl p-2 "
        >
          {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
        <p className="text-2xl font-semibold text-gray-100 flex justify-center items-center">
          ClassCraft
        </p>
        <div className="px-2">
          {" "}
          {session ? (
            <div className="lg:hidden ">
              <ProfileDropdown user={session?.user} />
            </div>
          ) : (
            <div className=" lg:hidden  justify-center items-center lg:flex relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
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
          )}
        </div>
        <nav
          className={`fixed top-0 left-0 h-full bg-blue-600 w-72 lg:w-auto lg:static lg:bg-transparent lg:h-auto lg:flex lg:items-center lg:w-full transition ease-in-out duration-700
          ${isOpen ? "translate-x-0" : "-translate-x-96"}`}
        >
          <div className="absolute bottom-0 flex justify-center items-center w-full bg-gray-800 hover:bg-gray-900">
            {session ? (
              <div
                onClick={signOut}
                className="  flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700   lg:hover:text-gray-100  transition ease-in-out duration-500 rounded-xl"
              >
                <CgLogIn className="pr-2 text-3xl hover:bg-blue-700 transition ease-in-out duration-500" />{" "}
                SignOut
              </div>
            ) : (
              <div
                onClick={signIn}
                className="  flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700   lg:hover:text-gray-100  transition ease-in-out duration-500 rounded-xl"
              >
                <CgLogIn className="pr-2 text-3xl hover:bg-blue-700 transition ease-in-out duration-500" />{" "}
                SignIn
              </div>
            )}
          </div>
          <button
            onClick={handleSideBar}
            className="text-gray-100 text-2xl lg:hidden absolute right-0 top-0 p-4 hover:bg-blue-700 hover:text-white rounded-xl"
          >
            <RxCross1 />
          </button>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl text-gray-100 bg-black/50 rounded-md px-4 my-2">
              Flourishers Edge
            </p>
            <p className="text-sm  text-gray-100 ">{role}</p>
            {session && (
              <p className="text-lg  text-gray-100">{session.user.name}</p>
            )}
          </div>
          {role === "Admin" && (
            <ul className="lg:flex flex-col lg:w-full mt-4">
              <Link href="/dashboard/createcourse">
                <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                  <SlArrowRight className="pr-2 text-xl" /> Create Course
                </li>
              </Link>
              <Link href="/dashboard/courselist">
                <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                  <SlArrowRight className="pr-2 text-xl" /> View Courses
                </li>
              </Link>
              <Link href="/dashboard/hostmeet">
                <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                  <SlArrowRight className="pr-2 text-xl" /> Host Meet
                </li>
              </Link>
            </ul>
          )}

          {role === "Student" && (
            <ul className="lg:flex flex-col lg:w-full mt-4">
              <Link href="/dashboard/courselist">
                <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                  <SlArrowRight className="pr-2 text-xl" /> View Courses
                </li>
              </Link>

              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Lectures
              </li>
            </ul>
          )}

          {role === "SuperAdmin" && (
            <ul className="lg:flex flex-col lg:w-full mt-4">
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Manage Admins
              </li>
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Manage Teachers
              </li>
            </ul>
          )}

          {role === "Teacher" && (
            <ul className="lg:flex flex-col lg:w-full mt-4">
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Courses
              </li>
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Upload Lectures
              </li>
            </ul>
          )}
        </nav>
      </div>

      <div className="pl-80 flex justify-between mx-4">
        <div></div>
        <h1 className="hidden lg:block text-3xl font-semibold py-2 pb-2 text-gray-100">
          ClassCraft
        </h1>
        {session ? (
          <div className="lg:block hidden">
            <ProfileDropdown user={session?.user} />
          </div>
        ) : (
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
        )}
      </div>
      <nav className="lg:block hidden bg-blue-600 w-80 absolute top-0 left-0  py-2 h-screen  ">
        <div className="absolute bottom-0 flex justify-center items-center w-full  bg-gray-800 hover:bg-gray-900 hover:text-blue-700">
          {session ? (
            <div
              onClick={signOut}
              className="  flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700   lg:hover:text-gray-100  transition ease-in-out duration-500 rounded-xl"
            >
              <CgLogIn className="pr-2 text-3xl  transition ease-in-out duration-500" />{" "}
              SignOut
            </div>
          ) : (
            <div
              onClick={signIn}
              className="  flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700   lg:hover:text-gray-100  transition ease-in-out duration-500 rounded-xl"
            >
              <CgLogIn className="pr-2 text-3xl transition ease-in-out duration-500" />{" "}
              SignIn
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-100 bg-black/50 rounded-md px-4 my-2">
            Flourishers Edge
          </p>
          <p className="text-sm  text-gray-100 ">{role}</p>
          {session && (
            <p className="text-lg  text-gray-100">{session.user.name}</p>
          )}
        </div>

        {role === "Admin" && (
          <ul className="lg:flex flex-col lg:w-full mt-4">
            <Link href="/dashboard/createcourse">
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Create Course
              </li>
            </Link>
            <Link href="/dashboard/courselist">
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> View Courses
              </li>
            </Link>
            <Link href="/dashboard/hostmeet">
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> Host Meet
              </li>
            </Link>
          </ul>
        )}

        {role === "Student" && (
          <ul className="lg:flex flex-col lg:w-full mt-4">
            <Link href="/dashboard/courselist">
              <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
                <SlArrowRight className="pr-2 text-xl" /> View Courses
              </li>
            </Link>

            <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
              <SlArrowRight className="pr-2 text-xl" /> Lectures
            </li>
          </ul>
        )}

        {role === "SuperAdmin" && (
          <ul className="lg:flex flex-col lg:w-full mt-4">
            <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
              <SlArrowRight className="pr-2 text-xl" /> Manage Admins
            </li>
            <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
              <SlArrowRight className="pr-2 text-xl" /> Manage Teachers
            </li>
          </ul>
        )}

        {role === "Teacher" && (
          <ul className="lg:flex flex-col lg:w-full mt-4">
            <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
              <SlArrowRight className="pr-2 text-xl" /> Courses
            </li>
            <li className="flex items-center text-gray-100 py-2 px-4 cursor-pointer hover:bg-blue-700 transition ease-in-out duration-500">
              <SlArrowRight className="pr-2 text-xl" /> Upload Lectures
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
