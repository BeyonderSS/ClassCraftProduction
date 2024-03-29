'use server'
import ytdl from '@distube/ytdl-core';

export async function getYoutubeVideoUrl(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    return format.url;
  } catch (error) {
    throw error;
  }
}

