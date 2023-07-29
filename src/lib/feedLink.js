"use server";
import { MongoClient, ObjectId } from "mongodb";

async function feedLink(lectureId, link) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const lecturesCollection = database.collection("Lectures");

    const lectureObjectId = new ObjectId(lectureId);

    // Find the lecture with matching _id and update the youtubeLink field
    const result = await lecturesCollection.updateOne(
      { _id: lectureObjectId },
      { $set: { youtubeLink: link } }
    );

    if (result.matchedCount === 1) {
      // Lecture was found and updated successfully
      console.log(`Successfully updated youtubeLink for lecture with ID: ${lectureId}`);
    } else {
      // Lecture with given ID not found
      console.log(`Lecture with ID ${lectureId} not found.`);
    }

  } catch (error) {
    console.error("MongoDB Error:", error);
    return [];
  } finally {
    client.close();
  }
}

export default feedLink;
