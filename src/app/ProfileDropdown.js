import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { MdOutlineNotifications } from "react-icons/md";
import Link from "next/link";
import { GoSignOut } from "react-icons/go";
import { signOut } from "next-auth/react";
const ProfileDropdown = ({ user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const handleToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false); // Close notification dropdown
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false); // Close profile dropdown
  };
  return (
    <div className="relative">
      <div className="flex  justify-center items-center space-x-4">
        <button onClick={handleNotificationToggle} className="md:block hidden">
          <MdOutlineNotifications className="text-2xl text-gray-600" />
        </button>
        <button onClick={handleToggle} className="rounded-full ">
          <img
            src={user.image}
            alt="Profile"
            className="lg:w-12 lg:h-12 h-10 w-10 rounded-full ring-2 ring-gray-300"
          />
        </button>
      </div>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <div className="px-4 py-3 text-sm text-gray-700 border-b">
                <div>{user.name}</div>
                <div className="font-medium truncate">{user.email}</div>
              </div>
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
              >
                <FiEdit className="inline-block mr-2" />
                Edit Profile
              </Link>
              <button
                onClick={signOut}
                className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
              >
                {" "}
                <GoSignOut className="inline-block mr-2" /> SignOut
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isNotificationOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="p-1 flex justify-center items-center flex-col space-y-2">
              <h1 className="border-b  text-gray-400 w-full flex justify-center items-center">
                Notifications
              </h1>
              <p className="text-sm text-gray-400">No Notifications yet!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProfileDropdown;
