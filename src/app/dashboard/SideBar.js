import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";
import {
  BsCalendarCheckFill,
  BsCameraVideo,
  BsFolder2Open,
  BsPersonVideo,
} from "react-icons/bs";
import Tooltip from "./Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPenNib } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoHelp } from "react-icons/io5";

const SideBar = ({ role, toggle }) => {
  const currentPath = usePathname();

  return (
    <nav className="fixed left-0 ">
      <div className="bg-white absolute top-0 left-0 mx-3 p-6 rounded-3xl my-4 h-auto lg:block md:block shadow-lg ">
        <button
          onClick={() => toggle()}
          className="absolute top-0 left-0 lg:hidden"
        >
          <RxCross2
            size={30}
            className=" text-gray-600 text-2xl p-1 bg-[#7EA8EB] rounded-2xl"
          />
        </button>
        {/* <Link href="/dashboard/test"> */}
        <div
          className={`flex justify-center items-center font-semibold p-2 rounded-2xl text-white bg-[#7EA8EB] transition ease-in-out duration-500 `}
        >
          CC
        </div>
        {/* </Link> */}
        <ul className="space-y-8 md:my-[23vh] my-16 ">
          <Tooltip text={"Home"}>
            <Link href="/dashboard">
              <li
                className={`sidebarTile ${
                  currentPath === "/dashboard" ? "bg-[#7EA8EB] text-white" : ""
                }`}
              >
                <AiOutlineHome className="text-3xl" />
              </li>
            </Link>
          </Tooltip>
          <Tooltip text={"Courses"}>
            <Link href="/dashboard/courselist">
              <li
                className={`sidebarTile ${
                  currentPath === "/dashboard/courselist"
                    ? "bg-[#7EA8EB] text-white"
                    : ""
                }`}
              >
                <BiBookContent className="text-3xl" />
              </li>
            </Link>
          </Tooltip>
          <Tooltip text={"Calendar"}>
            <Link href="/dashboard/calendar">
              <li
                className={`sidebarTile ${
                  currentPath === "/dashboard/calendar"
                    ? "bg-[#7EA8EB] text-white"
                    : ""
                }`}
              >
                <BsCalendarCheckFill className="text-3xl" />
              </li>
            </Link>
          </Tooltip>
          {role == "Admin" && (
            <Tooltip text={"Create Course"}>
              <Link href="/dashboard/createcourse">
                <li
                  className={`sidebarTile ${
                    currentPath === "/dashboard/createcourse"
                      ? "bg-[#7EA8EB] text-white"
                      : ""
                  }`}
                >
                  <FaPenNib className="text-3xl" />
                </li>
              </Link>
            </Tooltip>
          )}
          {/* <Tooltip text={"Doubts"}>
            <Link href="/dashboard/doubt">
              <li
                className={`sidebarTile ${
                  currentPath === "/dashboard/doubt"
                    ? "bg-[#7EA8EB] text-white"
                    : ""
                }`}
              >
                <IoHelp className="text-3xl" />
              </li>
            </Link>
          </Tooltip> */}
          {(role == "Admin" || role == "Teacher") && (
            <Tooltip text={"Host Lectures"}>
              <Link href="/dashboard/hostmeet">
                <li
                  className={`sidebarTile ${
                    currentPath === "/dashboard/hostmeet"
                      ? "bg-[#7EA8EB] text-white"
                      : ""
                  }`}
                >
                  <BsCameraVideo className="text-3xl" />
                </li>
              </Link>
            </Tooltip>
          )}
      
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
