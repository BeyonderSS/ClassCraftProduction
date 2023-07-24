"use server";
import { google } from "googleapis";
import { MongoClient, ObjectId } from "mongodb";

async function createCourse(courseData, adminEmail) {
  try {
    const { courseName, semesterCount, university, subjects, accessToken } =
      courseData;
    console.log(adminEmail);
    const courseDocument = {
      _id: new ObjectId(),
      courseName,
      semCount: semesterCount,
      studentsEnrolled: [], // Modify the property name to studentsEnrolled
      UniversityId: new ObjectId(university),
      subjects: {},
    };

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("ClassCraft");
      const courses = database.collection("Courses");
      const users = database.collection("Users");

      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const classroom = google.classroom({ version: "v1", auth });

      for (const semesterNo of Object.keys(subjects)) {
        const semesterSubjects = subjects[semesterNo];
        courseDocument.subjects[semesterNo] = [];

        for (const subjectName of semesterSubjects) {
          try {
            const roomId = university;
            const section = semesterNo;

            // Create the course in Google Classroom
            const course = {
              name: `${courseName} - ${section}`,
              section: section,
              ownerId: "me",
              room: roomId,
            };
            const res = await classroom.courses.create({ requestBody: course });
            const createdCourse = res.data;

            console.log(
              `Created course: ${createdCourse.name} (ID: ${createdCourse.id})`
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

      // Write the course document to MongoDB
      const result = await courses.insertOne(courseDocument);
      console.log("Course written to MongoDB:", courseDocument);

      // Find the user by adminEmail
      const user = await users.findOne({ email: adminEmail });

      if (user) {
        // Add the user _id to the studentsEnrolled array in the course document
        await courses.updateOne(
          { _id: courseDocument._id },
          { $push: { studentsEnrolled: user._id } }
        );
        console.log(`Course added to user with ID ${user._id}`);

        // Add the course _id to the user's courses array
        await users.updateOne(
          { _id: user._id },
          { $push: { courses: courseDocument._id } }
        );
        console.log(`Course added to user with ID ${user._id}`);
      } else {
        console.warn(`User with email '${adminEmail}' not found.`);
      }

      return { success: true, data: result };
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Failed to create course" };
  }
}

export default createCourse;
