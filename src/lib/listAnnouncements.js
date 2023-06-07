'use server'
import { google } from 'googleapis';

async function listAnnouncements(accessToken, courseId) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: 'v1', auth });
  const res = await classroom.courses.announcements.list({
    courseId: courseId,
  });

  const announcements = res.data.announcements;
  if (!announcements || announcements.length === 0) {
    console.log('No announcements found.');
    return [];
  }

  return announcements;
}

export default listAnnouncements;
