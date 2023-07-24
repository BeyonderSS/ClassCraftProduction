"use client";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
  };

  const getCurrentMonthName = () => {
    const options = { month: "long" };
    return currentMonth.toLocaleDateString("en-US", options);
  };

  const goToPrevMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const closePopup = () => {
    setSelectedDate(null);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const isCurrentMonth = (date) => {
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();
    return (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonthIndex
    );
  };

  const isPastDate = (date) => {
    const currentDate = new Date();
    return (
      date <
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="bg-white p-4 rounded-3xl shadow-md flex items-center flex-col">
        <div className="flex items-center mb-6 my-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mr-2"
            onClick={goToPrevMonth}
          >
            <FiChevronLeft size={24} />
          </motion.button>
          <h1 className="text-2xl font-bold">
            {getCurrentMonthName()} {currentMonth.getFullYear()}
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="ml-2"
            onClick={goToNextMonth}
          >
            <FiChevronRight size={24} />
          </motion.button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-gray-500 font-semibold uppercase"
            >
              {day}
            </div>
          ))}
          {Array.from(
            { length: getDaysInMonth() },
            (_, index) => index + 1
          ).map((day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );
            const isCurrentDate = isCurrentMonth(date) && day === selectedDate;
            const isPast = isPastDate(date) && !isCurrentDate;

            return (
              <div
                key={day}
                className={`text-center cursor-pointer rounded-full py-2 ${
                  isCurrentDate
                    ? "bg-blue-500 text-white"
                    : isPast
                    ? "text-gray-400"
                    : "hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="bg-white p-4 rounded-lg"
            >
              <div className="flex justify-end">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closePopup}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FiX size={24} />
                </motion.button>
              </div>
              <h2 className="text-lg font-semibold mb-2">
                {formatDate(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    selectedDate
                  )
                )}
              </h2>
              {/* Add details or content specific to the selected date */}
              {/* For example: */}
              <p>
                This is the content for{" "}
                {formatDate(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    selectedDate
                  )
                )}
                . Replace this with your content.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
