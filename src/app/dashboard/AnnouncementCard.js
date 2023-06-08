import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const AnnouncementCard = ({ announcements }) => {
  return (
    <div className="flex flex-col">
      {announcements.map((announcement) => (
        <motion.div
          key={announcement.id}
          className="my-4 p-4 rounded-lg shadow-md bg-white flex flex-col mx-4"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-semibold py-4">
            {new Date(announcement.creationTime).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p
            className="text-lg overflow-clip"
            dangerouslySetInnerHTML={{
              __html: announcement.text.replace(
                /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: blue;">$1</a>'
              ),
            }}
          ></p>{" "}
          <p className="text-gray-500">Course ID: {announcement.courseId}</p>
          {announcement.materials &&
            announcement.materials.map((material) =>
              material.driveFile ? (
                <a
                  key={material.driveFile.driveFile.id}
                  href={material.driveFile.driveFile.alternateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 mt-2"
                >
                  <FiExternalLink />
                  <span className="ml-1">
                    {material.driveFile.driveFile.title}
                  </span>
                </a>
              ) : null
            )}
        </motion.div>
      ))}
    </div>
  );
};

export default AnnouncementCard;
