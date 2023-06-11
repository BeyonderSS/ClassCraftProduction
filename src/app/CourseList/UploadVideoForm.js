"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import uploadVideoToYouTube from "@/lib/uploadVideoToYouTube"; 
function UploadVideoForm() {
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const handleUploadVideo = async () => {
    try {
      setLoading(true);

      const videoData = {
        title: "My video title",
        description: "My video description",
        tags: ["tag1", "tag2", "tag3"],
        categoryId: "22", // Category ID for Education
        privacyStatus: "unlisted", // You can set this to 'public', 'unlisted' or 'private'
        path: "/home/beyonder/Videos/Screencasts/Screencast\ from\ 2023-06-11\ 19-33-54.webm",
      };

      const videoResult = await uploadVideoToYouTube(
        session.accessToken,
        videoData
      );

      console.log("Video result:", videoResult);
      setLoading(false);
      setSuccessMessage("Video Uploaded Successfully");
    } catch (error) {
      setSuccessMessage("Failed To Upload Video Please Retry!");

      console.log("Failed to upload video:", error);
    }
  };

  return (
    <div>
      <button onClick={handleUploadVideo}>upload</button>
    </div>
  );
}

export default UploadVideoForm;
