"use client";
import React from "react";
import ReactPlayer from "react-player";

const Lectures = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {" "}
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    </div>
  );
};

export default Lectures;