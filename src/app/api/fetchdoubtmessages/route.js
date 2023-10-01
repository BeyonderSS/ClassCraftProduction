import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const doubtsCollection = database.collection("Doubt");

    const { searchParams } = new URL(request.url);
    const documentObjectId = searchParams.get("documentObjectId");

    if (!documentObjectId) {
      return NextResponse.json({
        success: false,
        error: "Missing documentObjectId parameter",
      });
    }

    // Query for a specific document using its ObjectId
    const query = {
      _id: new ObjectId(documentObjectId),
    };

    // Fetch the document that matches the query
    const document = await doubtsCollection.findOne(query);

    if (!document) {
      return NextResponse.json({ success: false, error: "Document not found" });
    }

    // Extract the 'messages' array from the document
    const messages = document.messages || [];
    const status = document.status;
    const title = document.messages[0].message;
    return NextResponse.json({ success: true, messages, status, title });
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
export const revalidate = 0
// false | 'force-cache' | 0 | number