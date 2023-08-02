import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";

const NotAuthorizedPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-md"
      >
        <div className="text-center">
          <AiOutlineLock className="w-16 h-16 mx-auto text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800">
            Oops! Not Authorized
          </h1>
        </div>
        <p className="text-gray-600 text-center">
          The secrets of this page are hidden away 🔒
          <br />
          The guards won&apos;t let you in. 🚫
          <br />
          Please charm the administrator for access. 🪄
        </p>
        <Link
          href="/"
          className="block mx-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transform hover:scale-110 transition-transform duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotAuthorizedPage;
