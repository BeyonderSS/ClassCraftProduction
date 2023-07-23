import { NextResponse } from "next/server";
import { google } from "googleapis";
import { MongoClient, ObjectId } from "mongodb";


export const config = {
  runtime: 'edge',
};

export async function POST(request) {
  try {
    const { courseName, semesterCount, university, subjects, accessToken } =
      await request.json();

    // Write the course to the MongoDB "Courses" collection
    const databaseResponse = await writeCourseToMongoDB(
      courseName,
      semesterCount,
      university,
      subjects,
      accessToken
    );

    return NextResponse.json({ success: true, data: databaseResponse });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to create course",
    });
  }
}

async function writeCourseToMongoDB(
  courseName,
  semesterCount,
  universityId,
  subjects,
  accessToken
) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const courses = database.collection("Courses");

    const courseDocument = {
      _id: new ObjectId(),
      courseName,
      semCount: semesterCount,
      studentEnrolled: {}, // An empty map for student enrollment
      UniversityId: new ObjectId(universityId),
      subjects: {},
    };

    const result = await courses.insertOne(courseDocument);
    console.log("Course written to MongoDB:", courseDocument);

    // Create Google Classroom courses for each subject
    await Promise.all(
      Object.keys(subjects).map(async (semesterNo) => {
        const semesterSubjects = subjects[semesterNo];
        courseDocument.subjects[semesterNo] = [];

        for (const subjectName of semesterSubjects) {
          const roomId = universityId;
          const section = semesterNo;

          const createdCourse = await createClassroomCourse(
            accessToken,
            roomId,
            subjectName,
            section
          );

          // Add the Google Classroom course ID as the subject ID in the MongoDB document
          courseDocument.subjects[semesterNo].push({
            subjectName,
            Id: createdCourse.id,
          });
        }
      })
    );

    // Update the course document with the subject IDs
    await courses.updateOne(
      { _id: courseDocument._id },
      { $set: { subjects: courseDocument.subjects } }
    );
    console.log("Course updated with subject IDs:", courseDocument.subjects);

    return result;
  } finally {
    await client.close();
  }
}

async function createClassroomCourse(accessToken, roomId, courseName, section) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });

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
