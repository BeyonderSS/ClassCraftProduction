import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = "mongodb+srv://BeyonderSS:4ZWpSuZpHeRUrPWc@classcrafttest.x2aylu3.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    const database = client.db("ClassCraftTest");
    const meetingLinks = database.collection("MeetingLinks"); // Add collection for MeetingLinks

    // Extract the data from the request body
    const {
      courseId,
      meetlink
    } = await request.json();

    console.log(request.json);

    // Create a new meeting link object
    const newMeetingLink = {
      _id: new ObjectId(),
      course: courseId,
      link: meetlink,
      date: new Date() // Current date
    };

    // Insert the new meeting link into the collection
    await meetingLinks.insertOne(newMeetingLink);

    console.log("Meeting link written to MongoDB:", newMeetingLink);

    return NextResponse.json({ success: true });
  } finally {
    await client.close();
  }
}
