import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={handleToggle} className="rounded-full ">
        <img
          src={user.image}
          alt="Profile"
          className="lg:w-12 lg:h-12 h-10 w-10 rounded-full"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
              >
                Edit Profile
                <FiEdit className="inline-block ml-2" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 
      {isOpen && (
        <motion.div
          onClick={handleToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-10 bg-black opacity-25"
        />
      )} */}
    </div>
  );
};
export default ProfileDropdown;
