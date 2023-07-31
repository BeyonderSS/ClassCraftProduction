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
    <video src={'https://rr2---sn-ci5gup-civz.googlevideo.com/videoplayback?expire=1690806654&ei=HlXHZJ3THPDFg8UP8NCwCA&ip=171.60.170.25&id=o-APSDyqXAe8GMQuT-i-pnkxaQnGofK-JQMnc6RO7pcm9n&itag=22&source=youtube&requiressl=yes&mh=Ih&mm=31%2C29&mn=sn-ci5gup-civz%2Csn-ci5gup-h55r&ms=au%2Crdu&mv=m&mvi=2&pcm2cms=yes&pl=23&initcwndbps=1248750&spc=Ul2SqyFVzkWFNoCpF3jSIkiv4IQzaYlBroZgNkks8A&vprv=1&svpuc=1&mime=video%2Fmp4&ns=eI3Ykm7TLgD4fv21qz3xN1cO&cnr=14&ratebypass=yes&dur=1071.763&lmt=1690622404203303&mt=1690784718&fvip=2&fexp=24007246%2C24363391%2C51000011&beids=24350018&c=WEB&txp=5532434&n=zuX-vsqvFvxfqw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMejskxdvVy_7Ue1yj920EJf2qWeqLxbbKsFeAjS8W4-AiB9XXsqgzsiyARiyZctQAakcaSmzM7IgfeDLDGCqeeY8A%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgO3C7hi5HGzW695x-KLgi1o0LB24smlgSxjt4lJNYi0UCIQDLk5eFysVGhbrShmaxgnBhVWh9EitcX-EGbolwJ_3-wA%3D%3D'} controls controlsList="nodownload noplaybackrate" disablePictureInPicture>
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
