import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";
import { BsCameraVideo, BsFolder2Open, BsPersonVideo } from "react-icons/bs";
import Tooltip from "./Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPenNib } from "react-icons/fa";

const SideBar = ({ role }) => {
  const currentPath = usePathname();

  return (
    <nav className="fixed left-0">
      <div className="bg-white absolute top-0 left-0 mx-3 p-6 rounded-3xl my-4 lg:h-[740px] md:h-full  lg:block md:block shadow-lg ">
        <Link href="/dashboard/test">
          <div
            className={`flex justify-center items-center font-semibold p-2 rounded-2xl text-white bg-[#7EA8EB] transition ease-in-out duration-500 `}
          >
            CC
          </div>
        </Link>
        <ul className="space-y-8 md:my-28 my-16">
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
          <Tooltip text={"Lectures"}>
            <Link href="/dashboard/lectures">
              <li
                className={`sidebarTile ${
                  currentPath === "/dashboard/lectures"
                    ? "bg-[#7EA8EB] text-white"
                    : ""
                }`}
              >
                <BsPersonVideo className="text-3xl" />
              </li>
            </Link>
          </Tooltip>
          {role == "Admin" && (
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
