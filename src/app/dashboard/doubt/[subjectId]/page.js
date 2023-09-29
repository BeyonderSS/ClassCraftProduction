    "use client";
    import React, { useEffect, useState } from "react";
    import { motion } from "framer-motion";
    import { FaUser, FaClock } from "react-icons/fa"; // Import FaClock for timestamp
    import { useSession } from "next-auth/react";
    
    const SubjectId = (props) => {
      const { data: session } = useSession();
      const [doubtMessages, setDoubtMessages] = useState([]);
      const [sendingMessage, setSendingMessage] = useState("");
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      const sendMessage = async () => {
        try {
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
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          if (data.success) {
            // Message sent successfully, you can update the UI as needed
            setSendingMessage(""); // Clear the input field
            // You might also want to fetch updated messages after sending
            fetchData();
          } else {
            setError("Failed to send the message");
          }
        } catch (error) {
          console.error("Error:", error);
          setError("An error occurred while sending the message.");
        }
      };
    
      useEffect(() => {
        // Define an async function to fetch data from the API
        async function fetchData() {
          try {
            const response = await fetch("/api/fetchdoubtmessages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ documentObjectId: props.params.subjectId }),
            });
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setDoubtMessages(data.messages);
            setLoading(false);
            setError(null);
          } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while fetching data.");
            setLoading(false);
          }
        }
    
        // Call the fetchData function when the component mounts
        fetchData();
      }, [props.params.subjectId]); // Re-run the effect when the subjectId changes
    
      // Render loading state if data is still being fetched
      if (loading) {
        return <div>Loading...</div>;
      }
    
      // Render an error message if an error occurred
      if (error) {
        return <div className="pt-24">Error: {error}</div>;
      }
    
      return (
        <div className="flex flex-col h-screen pt-24 lg:pl-24">
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
                  <FaClock size={16} className="mr-1" />
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4">
            <div className="flex">
              <input
                type="text"
                className="w-full p-2 border rounded-l-md"
                placeholder="Type your message here..."
                value={sendingMessage}
                onChange={(e) => setSendingMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 rounded-r-md"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default SubjectId;
    