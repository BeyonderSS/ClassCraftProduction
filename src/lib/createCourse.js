"use server";
import { google } from "googleapis";
import { MongoClient, ObjectId } from "mongodb";

async function createCourse(courseData) {
  try { 
    const { 
      courseName,
      semesterCount,
      university,
      subjects,
      accessToken,
    } = courseData;

    const courseDocument = {
      _id: new ObjectId(),
      courseName,
      semCount: semesterCount,
      studentEnrolled: {},
      UniversityId: new ObjectId(university),
      subjects: {},
    };

    await createGoogleClassroomCourses(
      accessToken,
      university,
      subjects,
      courseDocument
    );

    // Update the course document with the subject IDs
    const databaseResponse = await writeCourseToMongoDB(courseDocument);

    return { success: true, data: databaseResponse };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Failed to create course" };
  }
}

async function writeCourseToMongoDB(courseDocument) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const courses = database.collection("Courses");

    const result = await courses.insertOne(courseDocument);
    console.log("Course written to MongoDB:", courseDocument);

    return result;
  } finally {
    await client.close();
  }
}

async function createGoogleClassroomCourses(
  accessToken,
  universityId,
  subjects,
  courseDocument
) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });

  for (const semesterNo of Object.keys(subjects)) {
    const semesterSubjects = subjects[semesterNo];
    courseDocument.subjects[semesterNo] = [];

    for (const subjectName of semesterSubjects) {
      try {
        const roomId = universityId;
        const section = semesterNo;

        const createdCourse = await createClassroomCourse(
          classroom,
          roomId,
          subjectName,
          section
        );

        // Add the Google Classroom course ID as the subject ID in the MongoDB document
        courseDocument.subjects[semesterNo].push({
          subjectName,
          Id: createdCourse.id,
        });

        // Wait for a short interval before proceeding to the next course creation
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error creating course:", error);
        throw error;
      }
    }
  }
}

async function createClassroomCourse(classroom, roomId, courseName, section) {
  // Create the course
  const course = {
    name: `${courseName} - ${section}`,
    section: section,
    ownerId: "me",
    room: roomId,
  };

  try {
    const res = await classroom.courses.create({ requestBody: course });
    const createdCourse = res.data;

    console.log(
      `Created course: ${createdCourse.name} (ID: ${createdCourse.id})`
    );

    return createdCourse;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

export default createCourse;
