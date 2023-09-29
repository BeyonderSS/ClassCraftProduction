import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const doubtsCollection = database.collection("doubt"); // Assuming the collection is named "doubt" in your database

    const { subject, student, teacher, message } = await request.json();

    // Create a new doubt document
    const newDoubt = {
      subject: ObjectId(subject),   // Convert subject to ObjectId
      student: ObjectId(student),   // Convert student to ObjectId
      teacher: ObjectId(teacher),   // Convert teacher to ObjectId
      status: "open",
      messages: [
        {
          sender: ObjectId(student), // Assuming the initial message is from the student
          message: message,
          timestamp: new Date(),     // Use the current date and time
        },
      ],
    };

    // Insert the new doubt document into the collection
    const result = await doubtsCollection.insertOne(newDoubt);

    if (result.insertedId) {
      // Successfully inserted the document
      return NextResponse.json({ success: true });
    } else {
      // Failed to insert the document
      return NextResponse.json({ success: false, error: "Failed to insert doubt document" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" });
  } finally {
    await client.close();
  }
}
