import { getYoutubeVideoUrl } from '@/lib/streamUrl';
import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoUrl }) => {
  const [streamUrl, setStreamUrl] = useState('');

  console.log(streamUrl)
  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const videoUrl2 = await getYoutubeVideoUrl(videoUrl);
        setStreamUrl(videoUrl2);
      } catch (error) {
        console.error('Error fetching stream URL:', error);
      }
    };
  
    fetchStreamUrl();
  }, [videoUrl]);
  

  return (
    <video controls>
      {streamUrl && <source src={streamUrl} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
