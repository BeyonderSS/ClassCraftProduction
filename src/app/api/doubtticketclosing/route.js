import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const doubtsCollection = database.collection("Doubt");

    const { doubtObjectId } = await request.json();

    // Find and update the document with the matching _id
    const query = {
      _id: new ObjectId(doubtObjectId),
    };

    const updatedDocument = await doubtsCollection.findOneAndUpdate(
      query,
      { $set: { status: "close" } }, // Update the status to "close"
      { returnDocument: "after" } // Return the updated document
    );

    if (updatedDocument.value) {
      return NextResponse.json({
        success: true,
        message: "Doubt status updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Doubt not found or already closed",
      });
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
