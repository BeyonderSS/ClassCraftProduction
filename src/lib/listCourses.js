'use server'
import { google } from 'googleapis';

async function listCoursesWithAnnouncements(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: 'v1', auth });
  const res = await classroom.courses.list({});

  const courses = res.data.courses;
  if (!courses || courses.length === 0) {
    console.log('No courses found.');
    return [];
  }

  const coursesWithAnnouncements = await Promise.all(
    courses.map(async (course) => {
      const announcementsRes = await classroom.courses.announcements.list({
        courseId: course.id,
      });
      const announcements = announcementsRes.data.announcements || [];
      return { ...course, announcements };
    })
  );

  return coursesWithAnnouncements;
}

export default listCoursesWithAnnouncements;

