'use server'
import { google } from 'googleapis';


async function generateMeeting(accessToken, meetingData) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
  
    const calendar = google.calendar({ version: 'v3', auth });
    const event = {
        summary: meetingData.summary,
        location: meetingData.location,
        description: meetingData.description,
        start: {
          dateTime: meetingData.startDateTime,
          timeZone: meetingData.timeZone,
        },
        end: {
          dateTime: meetingData.endDateTime,
          timeZone: meetingData.timeZone,
        },
        attendees: meetingData.attendees,
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(2),
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      };
    
      const res = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
      });
    
      const createdEvent = res.data;
    
      console.log(`Created meeting: ${createdEvent.summary} (ID: ${createdEvent.id})`);
      console.log(`Meeting URL: ${createdEvent.hangoutLink}`);
    
      return createdEvent;
    }
    
    export default generateMeeting;
      