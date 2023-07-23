"use server";
import { google } from "googleapis";
import { MongoClient, ObjectId } from "mongodb";

async function getMongoCourses(accessToken, universityId) {
  try {
    const [googleClassroomCourses, databaseCourses] = await Promise.all([
      listCourses(universityId, accessToken),
      listCoursesFromMongodb(universityId, accessToken),
    ]);

    return { googleClassroomCourses, databaseCourses };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
}

async function listCoursesFromMongodb(universityId, accessToken) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const courses = database.collection("Courses");

    // Convert the universityId to an ObjectId
    const universityObjectId = new ObjectId(universityId);

    console.log(
      "Fetching courses from MongoDB with universityId:",
      universityObjectId
    );

    // Fetch documents where universityId matches
    const coursesData = await courses
      .find({ UniversityId: universityObjectId })
      .toArray();

    console.log("Courses fetched from MongoDB:", coursesData);

    // Fetch Google Classroom courses using the provided access token
    const googleClassroomCourses = await listCourses(universityId, accessToken);

    // Map subjects' information to include the corresponding Google Classroom course
    const coursesWithGoogleData = coursesData.map((courseData) => {
      const updatedSubjects = {};
      Object.entries(courseData.subjects).forEach(
        ([semester, subjectsArray]) => {
          updatedSubjects[semester] = subjectsArray.map((subject) => {
            const matchingCourse = googleClassroomCourses.find(
              (course) => course.id === subject.Id
            );
            return {
              ...subject,
              googleClassroomCourse: matchingCourse || null,
            };
          });
        }
      );
      return { ...courseData, subjects: updatedSubjects };
    });

    return coursesWithGoogleData;
  } catch (error) {
    console.error("MongoDB Error:", error);
    return [];
  } finally {
    client.close();
  }
}

async function listCourses(universityId, accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: "v1", auth });
  const res = await classroom.courses.list({});

  const courses = res.data.courses;
  if (!courses || courses.length === 0) {
    console.log("No courses found.");
    return [];
  }

  // Filter courses where course.room matches the universityId
  const filteredCourses = courses.filter(
    (course) => course.room === universityId
  );

  return filteredCourses;
}

export default getMongoCourses;