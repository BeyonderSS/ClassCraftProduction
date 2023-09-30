"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrHelp } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { useSession } from "next-auth/react";
import WifiLoader from "@/app/WifiLoader";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Doubt = () => {
  const { data: session } = useSession();
  const userObjectId = session?.user?.id;
  const teacherSubjects = session?.user?.subjects;
  const role = session?.user?.role;
  const universityId = session?.user?.university;
  const [isLoading, setIsLoading] = useState(false);
  const [doubts, setdoubts] = useState([]);
  // Initialize a loading state using useState
  console.log(teacherSubjects, role);
  useEffect(() => {
    // Check if session user ID matches student ID
    if (userObjectId) {
      // Set loading state to true when the API call starts
      setIsLoading(true);

      // Call the API function when student is defined
      fetch("/api/fetchdoubts", {
        method: "POST",
        body: JSON.stringify({
          userObjectId,
          teacherSubjects,
          role,
          universityId,
        }), // Send the student ID in the request body
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response here

          // Set loading state back to false when the API call is complete
          setIsLoading(false);

          if (data.success) {
            // API call was successful, process the open doubts in data.openDoubts
            setdoubts(data.openDoubts);
            // localStorage.setItem("fetcheDoubts",data.openDoubts)
            console.log("Doubts:", data.openDoubts);
          } else {
            // Handle API error
            console.error("API Error:", data.error);
          }
        })
        .catch((error) => {
          console.error("API Request Error:", error);

          // Set loading state back to false in case of an error
          setIsLoading(false);
        });
    }
  }, [userObjectId]);

  console.log(session);
  async function closeDoubtTicket(doubtObjectId) {
    try {
      const response = await fetch(`/api/doubtticketclosing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doubtObjectId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Doubt ticket successfully closed
          console.log("Doubt ticket closed successfully");
          window.location.reload();

          // Perform any additional actions you need here
        } else {
          console.error("Error closing doubt ticket:", data.message);
          // Handle the error as needed
        }
      } else {
        console.error("Network response was not ok.");
        // Handle network errors as needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle other errors as needed
    }
  }

  if (isLoading) {
    return (
      <article className="h-screen flex justify-center items-center">
        <WifiLoader text={"loding..."} />
      </article>
    );
  } else {
    return (
      <div className="bg-gray-100 min-h-screen py-8 pt-24 lg:pl-24">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Your Doubt</h1>
          {doubts.length === 0 ? (
            <div className=" flex justify-center items-center">
              {" "}
              <h1>It Looks like you have not raised a doubt yet.</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 ">
              {doubts.map((doubt) => (
                <motion.div
                  key={doubt._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-lg overflow-hidden shadow-md h-40 w-auto bg-white hover:shadow-lg z-10"
                >
                  <Link href={`/dashboard/doubt/${doubt._id}`}>
                    <div
                      className={`w-8 h-8 rounded-full absolute top-2 right-2 ${
                        doubt.status === "open" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {doubt.status === "open" ? (
                        <FiCheckCircle className="w-full h-full text-white" />
                      ) : (
                        <FiXCircle className="w-full h-full text-white" />
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        {doubt.messages[0].message}
                      </h2>
                      <p className="text-gray-700">{doubt.description}</p>
                    </div>
                  </Link>
                  {doubt.status === "open" && role != "Teacher" && (
                    <button
                      onClick={() => closeDoubtTicket(doubt._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-b-lg hover:bg-blue-600 flex justify-center items-center w-full absolute bottom-0"
                    >
                      Doubt Solved
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Doubt;
