'use server'
import { google } from "googleapis";

async function inviteTeachersToCourse(accessToken, courseId, teachers) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
  
    const classroom = google.classroom({ version: 'v1', auth });
  
    for (const teacher of teachers) {
            try {
              const response = await classroom.invitations.create({
                requestBody: {
                  courseId: courseId,
                  role: 'TEACHER',
                  userId: teacher,
                },
              });
        
              console.log(`Invitation sent to teacher ${teacher}:`, response.data);
            } catch (error) {
              console.error(`Failed to invite teacher: ${teacher}`, error);
            }
    }
  }
  
  export default inviteTeachersToCourse;