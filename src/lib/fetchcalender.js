"use server";
import { MongoClient, ObjectId } from "mongodb";

async function getMongoLectures(universityId, courseIds) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");

    // Convert the universityId to an ObjectId
    const universityObjectId = new ObjectId(universityId);

    // Convert the courseIds to an array of ObjectIds
    const courseObjectIds = courseIds.map((id) => new ObjectId(id));

    // Fetch all lecture documents from the Lectures collection that match the provided universityId
    // and have a courseId field that matches any of the courseIds in the array
    const LecturesCollection = database.collection("Lectures");
    const lectures = await LecturesCollection.find({
      university: universityObjectId,
      courseId: { $in: courseObjectIds },
    }).toArray();

    return lectures;
  } catch (error) {
    console.error("MongoDB Error:", error);
    return [];
  } finally {
    client.close();
  }
}

export default getMongoLectures;
