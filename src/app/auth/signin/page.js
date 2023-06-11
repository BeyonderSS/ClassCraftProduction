"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
const SignIn = () => {
  return (
    <div>
      <motion.div
        className="min-h-screen  bg-gradient-to-br from-[#210062] to-[#2196F3] flex flex-col  items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Head>
          <title>Login | Education Platform</title>
        </Head>

        <motion.div
          className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative z-10"
          initial={{ y: "-50%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-full text-center bg-gradient-to-r rounded-lg from-indigo-500 to-blue-700 text-white py-10">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
              <h1 className="flex py-3 justify-center items-center text-3xl font-semibold text-blue-200 animate-pulse">
                ClassCraft
              </h1>
            </div>
            <p className="text-gray-200 mt-2 text-lg">
              Login and Embrace Your Next Chapter
            </p>
          </div>

          <button
            className="mt-6 w-full flex justify-center items-center btn py-2 px-4 font-sans "
            onClick={() => signIn("google")}
          >
            <img src="/google.png" alt="logo" className="h-7 w-9 pr-2 " />
            Sign in with Google
          </button>
        </motion.div>

        <img
          src="/Wave.svg"
          className="absolute bottom-0 left-0 right-0 md:w-full md:h-auto"
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default SignIn;
