"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

const SubjectId = (props) => {
 console.log(props)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there!', isMe: false },
    { id: 2, text: 'Can you help me with this question?', isMe: true },
    { id: 3, text: 'Sure, what do you need help with?', isMe: false },
  ]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isMe: true,
      };

      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen pt-24 lg:pl-24">
      <div className="flex-1 p-4 oveSubjectIdrflow-y-auto">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.isMe ? 'justify-end' : 'justify-start'
              } mb-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {!message.isMe && (
              <div className="mr-2">
                <FaUser size={20} />
              </div>
            )}
            <div
              className={`${
                message.isMe ? 'bg-blue-500 text-white' : 'bg-gray-300'
                } p-2 rounded-md`}
            >
              {message.text}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
