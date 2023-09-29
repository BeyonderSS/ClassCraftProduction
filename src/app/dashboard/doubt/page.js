"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrHelp } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { useSession } from "next-auth/react";
import WifiLoader from "@/app/WifiLoader";

const Doubt = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = useSession();
  const student = session?.user?.id;
  const [isLoading, setIsLoading] = useState(false);
const [doubts, setdoubts] = useState([])
 // Initialize a loading state using useState

 useEffect(() => {
   // Check if session user ID matches student ID
   if (student) {
     // Set loading state to true when the API call starts
     setIsLoading(true);

     // Call the API function when student is defined
     fetch("/api/fetchdoubts", {
       method: "POST",
       body: JSON.stringify({ student }), // Send the student ID in the request body
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
           setdoubts(data.openDoubts)
           console.log("Open Doubts:", data.openDoubts);
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
 }, [student]);

  console.log(session);
 
if(isLoading){
  return(<article className="h-screen flex justify-center items-center">
<WifiLoader text={"loding..."}/>
  </article>

  )
}
else{

  return (
    <div className="bg-gray-100 min-h-screen py-8 pt-24 lg:pl-24">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Ask Your Doubt</h1>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 ">
          {doubts.map((doubt) => (
            <Link key={doubt._id} href={`/dashboard/doubt/${doubt._id}`}>
              
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-3xl overflow-hidden h-96  w-auto flex justify-center items-center flex-col"
              >
                <h2 className="text-xl font-semibold mb-2">{doubt.messages[0].message}</h2>
                <p className="text-gray-700">{doubt.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm  bg-gray-900  z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Raise a New Doubt</h1>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPopup(false)}
                >
                  <CgClose size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
};

export default Doubt;
