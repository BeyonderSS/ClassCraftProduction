import React from "react";
import { FiDownload } from "react-icons/fi"; // Import the download icon
import { motion } from "framer-motion";

const AnnouncementCard = ({ announcements }) => {
  return (
    <div className="flex flex-col">
      {announcements.map((announcement, index) => (
        <motion.div
          key={index} // Add a unique key for each announcement
          className="my-4 p-4 rounded-lg shadow-md bg-white flex flex-col mx-4"
       
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{announcement.unitName}</h1>
            <a
              href={announcement.fileLink}
              download // Add the download attribute to the anchor tag
              className="flex items-center text-blue-500"
            >
              Download <FiDownload className="ml-1" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnnouncementCard;
