import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const doubtsCollection = database.collection("Doubt");

    const { documentObjectId, sender, message } = await request.json();

    const query = { _id: new ObjectId(documentObjectId) };

    const timestamp = new Date();

    const update = {
      $push: {
        messages: {
          sender,
          message,
          timestamp,
        },
      },
    };

    const result = await doubtsCollection.updateOne(query, update);

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true, message: 'Document updated successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Document not found' });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal server error",
    });
  } finally {
    await client.close();
  }
}
