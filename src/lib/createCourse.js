"use server";
import { MongoClient, ObjectId } from "mongodb";

async function createCourse(courseData, adminEmail) {
  try {
    const { courseName, semesterCount, university } = courseData;
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

      for (let semesterNo = 0; semesterNo < semesterCount; semesterNo++) {
        const semesterSubjects = courseData.subjects[semesterNo];
        courseDocument.subjects[semesterNo] = [];

        for (const subjectName of semesterSubjects) {
          try {
            // Generate a unique subject ID for each subject
            const uniqueSubjectId = new ObjectId().toString();

            // Add the subject to the course document with the unique subject ID
            courseDocument.subjects[semesterNo].push({
              subjectName,
              Id: uniqueSubjectId,
            });
          } catch (error) {
            console.error("Error adding subject:", error);
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
