'use server'
import { execFile } from 'child_process';

export async function getYoutubeVideoUrl(url) {
  return new Promise((resolve, reject) => {
    const ytDlpPath = './node_modules/youtube-dl-exec/bin/yt-dlp';
    const args = [url, '--simulate', '--get-url', '-f', 'best'];

    execFile(ytDlpPath, args, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
}
