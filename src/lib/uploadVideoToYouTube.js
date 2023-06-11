'use server'
import { google } from "googleapis";
import fs from 'fs';

async function uploadVideoToYouTube(accessToken, videoData) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
  
    const youtube = google.youtube({ version: 'v3', auth });
  
    const fileSize = fs.statSync(videoData.path).size;
    const res = await youtube.videos.insert({
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: videoData.title,
          description: videoData.description,
          tags: videoData.tags,
          categoryId: videoData.categoryId,
        },
        status: {
          privacyStatus: videoData.privacyStatus,
        },
      },
      media: {
        body: fs.createReadStream(videoData.path),
      },
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        console.log(`Uploading video: ${progress.toFixed(2)}% done`);
      },
    });
  
    const videoId = res.data.id;
    console.log(`Video uploaded successfully. Video ID: ${videoId}`);
  
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`Video URL: ${videoUrl}`);
  
    return res.data;
  }
  
  export default uploadVideoToYouTube;