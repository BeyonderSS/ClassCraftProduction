"use server";
import { MongoClient, ObjectId } from "mongodb";

async function getMongoCourses(accessToken, universityId, id) {
  try {
    const [databaseCourses] = await Promise.all([
      listCoursesFromMongodb(universityId, id),
    ]);

    return { databaseCourses };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
}

async function listCoursesFromMongodb(universityId, userId) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const courses = database.collection("Courses");

    // Convert the universityId to an ObjectId
    const universityObjectId = new ObjectId(universityId);

    // Fetch the user document from the Users collection using the provided userId
    const usersCollection = database.collection("Users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    // Extract the userCourseIds object from the user document
    const userCourseIdsObj = user.courses;
    // Convert userCourseIds object to an array of ObjectId values
    const userCourseObjectIds = Object.values(userCourseIdsObj).map(
      (id) => new ObjectId(id)
    );

    console.log(
      "Fetching courses from MongoDB with universityId and userCourseIds:",
      universityObjectId,
      userCourseObjectIds
    );

    // Create a separate condition for each userCourseId using the $or operator
    const userCourseConditions = userCourseObjectIds.map((id) => ({
      _id: id,
    }));

    // Fetch documents where universityId matches and _id is in userCourseIds
    const coursesData = await courses
      .find({
        UniversityId: universityObjectId,
        $or: userCourseConditions,
      })
      .toArray();

    console.log("Courses fetched from MongoDB:", coursesData);

    return coursesData;
  } catch (error) {
    console.error("MongoDB Error:", error);
    return [];
  } finally {
    client.close();
  }
}

export default getMongoCourses;
