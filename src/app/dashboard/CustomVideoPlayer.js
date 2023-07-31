import React, { useRef, useState, useEffect } from "react";
import {
  BsPlayFill,
  BsPauseFill,
  BsVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { getYoutubeVideoUrl } from "@/lib/streamUrl";

const CustomVideoPlayer = ({ videoLink }) => {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const controlsAnimation = useAnimation();
  const [streamUrl, setStreamUrl] = useState("");
  let timeoutId = null;

  console.log(streamUrl);
  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const videoUrl2 = await getYoutubeVideoUrl(videoLink);
        setStreamUrl(videoUrl2);
      } catch (error) {
        console.error("Error fetching stream URL:", error);
      }
    };

    fetchStreamUrl();
  }, [videoLink]);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.controls = false;
  //   }

  //   document.addEventListener("fullscreenchange", handleFullScreenChange);
  //   document.addEventListener("keydown", handleKeyPress);

  //   // Add event listeners to prevent right-clicking, screen shots, and video download
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   return () => {
  //     document.removeEventListener("fullscreenchange", handleFullScreenChange);
  //     document.removeEventListener("keydown", handleKeyPress);
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, [videoRef.current]);

  // useEffect(() => {
  //   const handleTimeUpdate = () => {
  //     // Check if the videoRef has been set and is not null
  //     if (videoRef.current) {
  //       const currentTime = videoRef.current.currentTime;
  //       const duration = videoRef.current.duration;
  //       const videoProgress = (currentTime / duration) * 100;
  //       setProgress(videoProgress);
  //     }
  //   };

  //   // Check if the videoRef has been set and is not null
  //   if (videoRef.current) {
  //     videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
  //   }

  //   return () => {
  //     // Check if the videoRef has been set and is not null
  //     if (videoRef.current) {
  //       videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
  //     }
  //   };
  // }, [videoRef.current]);

  // const handleFullScreenChange = () => {
  //   setIsFullScreen(!!document.fullscreenElement);
  // };

  // const handlePlayPause = () => {
  //   if (videoRef.current && videoRef.current.paused) {
  //     videoRef.current.play();
  //     setIsPlaying(true);
  //   } else {
  //     videoRef.current.pause();
  //     setIsPlaying(false);
  //   }
  // };

  // const handleSkipBackward = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime -= 10;
  //   }
  // };

  // const handleSkipForward = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime += 10;
  //   }
  // };

  // const handleVolumeChange = (e) => {
  //   const newVolume = parseFloat(e.target.value);
  //   setVolume(newVolume);
  //   if (videoRef.current) {
  //     videoRef.current.volume = newVolume;
  //   }
  // };

  // const handleMouseMove = () => {
  //   if (streamUrl) {
  //     controlsAnimation.start({ opacity: 1 });
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       controlsAnimation.start({ opacity: 0 });
  //     }, 2000);
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.code === "Space") {
  //     handlePlayPause();
  //   }
  //   if (e.code === "ArrowRight") {
  //     handleSkipForward();
  //   } else if (e.code === "ArrowLeft") {
  //     handleSkipBackward();
  //   }
  // };

  // const handleContextMenu = (e) => {
  //   e.preventDefault();
  // };

  // const handleResetVideo = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = 0;
  //   }
  // };

  // // Utility function to format time in MM:SS format
  // const formatTime = (timeInSeconds) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = Math.floor(timeInSeconds % 60);
  //   return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
  //     2,
  //     "0"
  //   )}`;
  // };

  return (
    streamUrl && (
      // <div
      //   className="relative md:h-[90vh] h-96  aspect-w-16 aspect-h-9 bg-black"
      //   onMouseMove={handleMouseMove}
      //   onMouseLeave={() => {
      //     controlsAnimation.start({ opacity: 0 });
      //     clearTimeout(timeoutId);
      //   }}
      // >
      //   <video
      //     ref={videoRef}
      //     src={streamUrl}
      //     className="absolute inset-0 w-full h-full object-cover"
      //     loop
      //     controls={false}
      //     volume={volume}
      //     onPlay={() => setIsPlaying(true)}
      //     onPause={() => setIsPlaying(false)}
      //     onVolumeChange={(e) => setVolume(e.target.volume)}
      //     onEnded={() => setIsPlaying(false)}
      //   />

      //   <motion.div
      //     ref={controlsRef}
      //     className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-black bg-opacity-70 rounded-md p-4 ${
      //       isFullScreen || controlsAnimation.opacity > 0
      //         ? "opacity-100"
      //         : "opacity-0"
      //     }`}
      //     initial={{ opacity: 0 }}
      //     animate={controlsAnimation}
      //   >
      //     <button onClick={handleSkipBackward} className="text-blue-500 p-2">
      //       <BiLeftArrow size={20} />
      //     </button>

      //     <button onClick={handlePlayPause} className="text-blue-500 p-2">
      //       {isPlaying ? <BsPauseFill size={20} /> : <BsPlayFill size={20} />}
      //     </button>

      //     <button onClick={handleSkipForward} className="text-blue-500 p-2">
      //       <BiRightArrow size={20} />
      //     </button>

      //     {/* volume section  */}
      //     <div className="mx-2 flex justify-center items-center">
      //       {volume > 0 ? (
      //         <button
      //           onClick={() => setVolume(0)}
      //           className="text-blue-500 p-2"
      //         >
      //           <BsVolumeUpFill size={20} />
      //         </button>
      //       ) : (
      //         <button
      //           onClick={() => setVolume(0.7)}
      //           className="text-blue-500 p-2"
      //         >
      //           <BsVolumeMuteFill size={20} />
      //         </button>
      //       )}
      //       <input
      //         type="range"
      //         min={0}
      //         max={1}
      //         step={0.01}
      //         value={volume}
      //         onChange={handleVolumeChange}
      //         className="w-16 h-2 bg-blue-500"
      //       />
      //     </div>
      //   </motion.div>
      //   <div className="absolute bottom-0 left-0 right-0">
      //     {/* Display current time and duration */}
      //     <div className=" p-2 text-gray-600 font-semibold text-sm flex justify-center items-center">
      //       {formatTime(videoRef.current ? videoRef.current.currentTime : 0)} /{" "}
      //       {formatTime(videoRef.current ? videoRef.current.duration : 0)}
      //     </div>
      //     {/* Video progress bar */}
      //     <motion.div
      //       className="h-2 bg-blue-600"
      //       initial={{ scaleX: 0 }}
      //       animate={{ scaleX: progress / 100 }}
      //     />
      //   </div>
      // </div>
      <div>
        <video src={streamUrl} controls controlsList="nodownload noplaybackrate" disablePictureInPicture></video>
      </div>
    )
  );
};

export default CustomVideoPlayer;
