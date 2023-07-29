"use server";
import { MongoClient, ObjectId } from "mongodb";

async function fetchUserEmail(universityId, courseId) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");

    // Convert the universityId to an ObjectId
    const universityObjectId = new ObjectId(universityId);

    // Fetch all user documents from the Users collection that match the provided universityId
    const UsersCollection = database.collection("Users");
    const users = await UsersCollection.find({
      university: universityObjectId,
    }).toArray();

    // Initialize an array to store email addresses
    const userEmails = [];

    // Convert the courseId to an ObjectId
    const courseObjectId = new ObjectId(courseId);

    // Loop through each user document and check if any of the ObjectIds in the courses array matches the given courseId
    users.forEach((user) => {
      const courseIds = user.courses.map((course) => course.toString());
      if (courseIds.includes(courseObjectId.toString())) {
        // If the courseId is found in the courses array, store the email in the userEmails array
        userEmails.push(user.email);
      }
    });

    return userEmails;
  } catch (error) {
    console.error("MongoDB Error:", error);
    return [];
  } finally {
    client.close();
  }
}

export default fetchUserEmail;
