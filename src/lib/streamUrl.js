'use server'
import ytdl from 'ytdl-core';

export async function getYoutubeVideoUrl(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    return format.url;
  } catch (error) {
    throw error;
  }
}

