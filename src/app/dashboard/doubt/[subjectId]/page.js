"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaClock } from "react-icons/fa"; // Import FaClock for timestamp
import { useSession } from "next-auth/react";
import WifiLoader from "@/app/WifiLoader";

const SubjectId = (props) => {
  const { data: session } = useSession();
  const [doubtMessages, setDoubtMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState("");
  const [status, setStatus] = useState();
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);
  const [messageLoding, setMessageLoding] = useState(false);
  const [error, setError] = useState(null);
  function useChangeValuesEvery3Seconds() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    return count;
  }
  const revalidateValue = useChangeValuesEvery3Seconds();
  console.log(revalidateValue);
  // Define an async function to fetch data from the API
  async function fetchData() {
    try {
      const response = await fetch(
        `/api/fetchdoubtmessages?documentObjectId=${props.params.subjectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDoubtMessages(data.messages);
      setStatus(data.status);
      setTitle(data.title);
      setLoading(false);
      setError(null);
      return data;
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  }
  const sendMessage = async () => {
    try {
      setMessageLoding(true);
      const response = await fetch("/api/sentdoubtmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentObjectId: props.params.subjectId,
          sender: session.user.id, // Use the sender's ID from the session
          message: sendingMessage,
        }),
      });

      if (!response.ok) {
        setMessageLoding(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        // Message sent successfully, you can update the UI as needed
        setSendingMessage(""); // Clear the input field
        // You might also want to fetch updated messages after sending
        fetchData();
        setMessageLoding(false);
      } else {
        setError("Failed to send the message");
        setMessageLoding(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while sending the message.");
      setMessageLoding(false);
    }
  };
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, [props.params.subjectId, revalidateValue]); // Re-run the effect when the subjectId changes

  // Render loading state if data is still being fetched
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <WifiLoader text={"loading..."} />
      </div>
    );
  }

  // Render an error message if an error occurred
  if (error) {
    return <div className="pt-24">Error: {error}</div>;
  }
  return (
    <div className="flex flex-col h-screen pt-24 lg:pl-24">
      <div className="flex justify-center  ">
        <div className="font-bold text-xl bg-blue-500 text-gray-100 rounded-xl p-2 px-4">
          {title}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {doubtMessages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${
              session?.user?.id === message.sender
                ? "justify-end"
                : "justify-start"
            } mb-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {!session?.user?.id === message.sender && (
              <div className="mr-2">
                <FaUser size={20} />
              </div>
            )}
            <div
              className={`${
                session?.user?.id === message.sender
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } p-2 rounded-md`}
            >
              {message.message}
            </div>
            <div className="flex items-center ml-2 text-gray-500">
              {/* <FaClock size={16} className="mr-1" /> */}
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </motion.div>
        ))}
      </div>
      {status == "open" ? (
        <div className="p-4">
          <div className="flex">
            <input
              type="text"
              className="w-full p-2 border rounded-l-md"
              placeholder="Type your message here..."
              value={sendingMessage}
              onChange={(e) => setSendingMessage(e.target.value)}
            />
            {messageLoding ? (
                <button className="bg-blue-500 text-white px-4 rounded-r-md">
                  Sending...
                </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 rounded-r-md"
                onClick={sendMessage}
              >
                Send
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center  py-4 text-gray-200 font-semibold text-lg bg-blue-500">
          You Closed This Doubt!
        </div>
      )}
    </div>
  );
};

export default SubjectId;
