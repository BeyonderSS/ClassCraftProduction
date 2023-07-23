'use server'
import { google } from "googleapis";

async function inviteTeachersToCourses(accessToken, courseIds, teachers) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: 'v1', auth });

  for (const courseId of courseIds) {
      for (const teacher of teachers) {
          try {
            const response = await classroom.invitations.create({
              requestBody: {
                courseId: courseId,
                role: 'TEACHER',
                userId: teacher,
              },
            });
      
            console.log(`Invitation sent to teacher ${teacher} for course ${courseId}:`, response.data);
          } catch (error) {
            console.error(`Failed to invite teacher: ${teacher} to course: ${courseId}`, error);
          }
      }
  }
}

export default inviteTeachersToCourses;
