"use server";
import { google } from "googleapis";

async function createCourse(accessToken, courseData) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });

  // Create the course
  const course = {
    name: courseData.name,
    section: courseData.section,
    description: courseData.description,
    room: courseData.room,
    ownerId: courseData.ownerId,
  };

  const res = await classroom.courses.create({ resource: course });
  const createdCourse = res.data;

  console.log(
    `Created course: ${createdCourse.name} (ID: ${createdCourse.id})`
  );

  return createdCourse;
}

export default createCourse;
