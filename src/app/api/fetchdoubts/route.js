import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const doubtsCollection = database.collection("Doubt");

    const { student } = await request.json();

    // Query for open doubts with a specific student ObjectId
    const query = {
      student: new ObjectId(student),
      status: "open",
    };

    // Fetch all documents that match the query
    const openDoubts = await doubtsCollection.find(query).toArray();

    return NextResponse.json({ success: true, openDoubts });
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
