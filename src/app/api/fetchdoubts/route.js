import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const doubtsCollection = database.collection("Doubt");

    const { userObjectId, teacherSubjects,role ,universityId } = await request.json();
    if (role === "Student") {
      const query = {
        universityId:new ObjectId(universityId),
        student: new ObjectId(userObjectId),
      };
      const openDoubts = await doubtsCollection.find(query).toArray();

      return NextResponse.json({ success: true, openDoubts });
    } else if (role === "Teacher") {
      const query = {
        universityId:new ObjectId(universityId),
        subject: { $in: teacherSubjects.map(subjectId => subjectId) },

      };
      const openDoubts = await doubtsCollection.find(query).toArray();
      return NextResponse.json({ success: true, openDoubts });
    } else {
      const query = {
        universityId:new ObjectId(universityId),

      };
      const openDoubts = await doubtsCollection.find(query).toArray();

      return NextResponse.json({ success: true, openDoubts });
      // Handle other roles or conditions if needed
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
