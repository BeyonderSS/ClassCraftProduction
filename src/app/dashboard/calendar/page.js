"use client";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import WifiLoader from "../../../app/WifiLoader";
import fetchGoogleCalendar from "../../../lib/fetchgooglecalender";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const month = currentMonth.getMonth() + 1; // Month is 1-indexed in Google Calendar API
      const fetchCalenderAndLog = async () => {
        setLoading(true);
        const fetchedEvents = await fetchGoogleCalendar(
          session?.accessToken,
          month
        );
        console.log("fetched Events:", fetchedEvents);
        setFetchedEvents(fetchedEvents);
        setLoading(false);
      };
      fetchCalenderAndLog();
    }
  }, [session, currentMonth]);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
  };

  const getCurrentMonthName = () => {
    const options = { month: "long" };
    return currentMonth.toLocaleDateString("en-US", {
      timeZone: "IST", // Use UTC time zone to calculate the month name
      ...options,
    });
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

  const handleDateClick = (day) => {
    const lecturesForSelectedDate = getLecturesForDate(day);
    setSelectedDate({ day, lectures: lecturesForSelectedDate });
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

  const formatTime = (time) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(time).toLocaleTimeString("en-US", options);
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

  const getLecturesForDate = (day) => {
    const selectedDateStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).setHours(0, 0, 0, 0);

    const selectedDateEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).setHours(23, 59, 59, 999);

    return fetchedEvents
      .filter((event) => {
        const eventDate = new Date(event.start.dateTime);
        return eventDate >= selectedDateStart && eventDate <= selectedDateEnd;
      })
      .map((event) => ({
        _id: event.id,
        topic: event.summary,
        date: new Date(event.start.dateTime),
        startTime: new Date(event.start.dateTime),
        endTime: new Date(event.end.dateTime),
        durationInMinutes: Math.floor(
          (new Date(event.end.dateTime) - new Date(event.start.dateTime)) /
            (1000 * 60)
        ),
        meetlink: event.hangoutLink,
      }));
  };
console.log(selectedDate)
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <WifiLoader text={"Loading..."} />
      </div>
    );
  }

  const daysInMonth = getDaysInMonth();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

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
          {Array.from({ length: daysInMonth + firstDayOfMonth }, (_, index) => {
            const day = index + 1 - firstDayOfMonth;
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );
            const isCurrentDate =
              isCurrentMonth(date) && day === selectedDate?.day;
            const isPast = isPastDate(date) && !isCurrentDate;

            const lecturesForDate = getLecturesForDate(day);

            return (
              <div
                key={day}
                className={`text-center cursor-pointer rounded-xl  md:p-2 py-2 ${
                  isCurrentDate
                    ? "bg-blue-500 text-white"
                    : isPast
                    ? "text-gray-400"
                    : "hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day > 0 ? day : ""}
                {lecturesForDate.length > 0 && (
                  <div className="md:text-sm text-xs mt-1">
                    {lecturesForDate.length} Lecture(s)
                  </div>
                )}
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
            className="fixed top-0 left-0 w-full h-full  flex justify-center items-center bg-black bg-opacity-60 scrollbar-thumb-blue-500"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="bg-white p-4 rounded-lg h-96 overflow-y-scroll w-96  scrollbar-thumb-blue-500 scrollbar-thin"
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
                    selectedDate.day
                  )
                )}
              </h2>
              {selectedDate.lectures.map((lecture) => (
                <div key={lecture._id} className="mb-4">
                  <p className="font-bold">{lecture.topic}</p>
                  <p>Date: {formatDate(new Date(lecture.date))}</p>
                  <p>Start Time: {formatTime(new Date(lecture.startTime))}</p>
                  <p>End Time: {formatTime(new Date(lecture.endTime))}</p>
                  <p>Duration: {lecture.durationInMinutes} minutes</p>
                  <a
                    href={lecture.meetlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Join Meet
                  </a>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
