'use server'
import { google } from 'googleapis';
async function createAnnouncement(accessToken, courseId, announcementData) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
  
    const classroom = google.classroom({ version: 'v1', auth });
    const announcement = {
        text: announcementData.text,
        materials: announcementData.materials,
        assigneeMode: announcementData.assigneeMode,
        individualStudentsOptions: announcementData.individualStudentsOptions,
      };
    
      const res = await classroom.courses.announcements.create({
        courseId: courseId,
        resource: announcement,
      });
    
      const createdAnnouncement = res.data;
    
      console.log(`Created announcement: ${createdAnnouncement.text} (ID: ${createdAnnouncement.id})`);
    
      return createdAnnouncement;
    }
    
    export default createAnnouncement;
    