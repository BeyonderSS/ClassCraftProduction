import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI; // Replace with your actual MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const meetingLinks = database.collection("Lectures"); // Assuming the collection name is "Lectures"

    // Extract the data from the request body
    const {
      university,
      courseId,
      date,
      startTime,
      topic,
      subjectId,
      semester,
      meetlink,
      endTime,
      youtubeLink,
    } = await request.json();

    // Create a new meeting link object
    const newMeetingLink = {
      _id: new ObjectId(),
      university: new ObjectId(university), // Use the university provided by the user
      date: new Date(date), // Use the date provided by the user
      courseId: new ObjectId(courseId), // courseId should be a string or a valid ObjectId
      semester: semester, // Use the semester provided by the user
      subjectId: subjectId, // Use the subjectId provided by the user
      meetlink: meetlink,
      youtubeLink: youtubeLink, // Use the YouTube link provided by the user if available
      startTime: startTime, // Use the start time provided by the user
      endTime: endTime, // Calculate endTime: startTime + 60 minutes
      durationInMinutes: 60, // Hard-coded duration in minutes (60 minutes in this example)
      topic: topic, // Use the topic provided by the user
    };

    // Insert the new meeting link into the collection
    await meetingLinks.insertOne(newMeetingLink);

    console.log("Meeting link written to MongoDB:", newMeetingLink);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing meeting link to MongoDB:", error);
    return NextResponse.json({ success: false });
  } finally {
    await client.close();
  }
}
