import { NextResponse } from "next/server";
import { google } from "googleapis";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  const section = searchParams.get("section");
  const description = searchParams.get("description");
  const room = searchParams.get("room");
  const ownerId = searchParams.get("ownerId");
  const accessToken = searchParams.get("accessToken");

  try {
    const createdCourse = await createCourse(accessToken, {
      name,
      section,
      description,
      room,
      ownerId,
    });

    // Write the course to the MongoDB "Courses" collection
    const databaseResponse = await writeCourseToMongoDB(createdCourse);

    return NextResponse.json({
      success: true,
      course: createdCourse,
      MongoDb: databaseResponse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

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

async function writeCourseToMongoDB(course) {
  const uri =
    "mongodb+srv://BeyonderSS:4ZWpSuZpHeRUrPWc@classcrafttest.x2aylu3.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraftTest");
    const courses = database.collection("Courses");
    const batches = database.collection("Batches"); // Add collection for Batches

    const courseDocument = {
      _id: new ObjectId(),
      name: course.name,
      university: course.room, // Update with the university ObjectId when available
      courseId: course.id,
    };

    const result = await courses.insertOne(courseDocument);
    console.log("Course written to MongoDB:", courseDocument);

    // Create a new Batch document
    const batchDocument = {
      _id: new ObjectId(),
      name: course.section,
      course: courseDocument._id, // Set the course ObjectId
    };

    await batches.insertOne(batchDocument);
    console.log("Batch written to MongoDB:", batchDocument);

    // Update the course document with the batch ID
    await courses.updateOne(
      { _id: courseDocument._id },
      { $push: { batches: batchDocument._id } }
    );
    console.log("Course updated with batches:", batchDocument._id);

    return result;
  } finally {
    await client.close();
  }
}
