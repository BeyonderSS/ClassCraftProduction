'use server'
import {google} from 'googleapis'

async function listCourses(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({access_token: accessToken});

  const classroom = google.classroom({version: 'v1', auth});
  const res = await classroom.courses.list({});

  const courses = res.data.courses;
  if (!courses || courses.length === 0) {
    console.log('No courses found.');
    return [];
  }

  return courses;
}

export default listCourses;
