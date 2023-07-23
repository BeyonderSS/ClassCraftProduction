import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db("ClassCraft");
    const universities = database.collection("Universities"); // Add collection for Universities
    const users = database.collection("Users"); // Add collection for Users

    // Extract the data from the request body
    const { adminName, adminEmail, universityName, location, email } =
      await request.json();

    console.log(request.json);

    // Create a new university object
    const newUniversity = {
      _id: new ObjectId(),
      name: universityName,
      location: location,
      adminEmial: adminEmail,
    };

    // Insert the new university into the collection
    await universities.insertOne(newUniversity);

    console.log("University written to MongoDB:", newUniversity);

    // Create a new user object
    const newUser = {
      _id: new ObjectId(),
      name: adminName,
      email: adminEmail || email, // Use adminEmail or email value
      role: "admin",
      university: newUniversity._id, // Set the university ObjectId
    };

    // Insert the new user into the collection
    const result = await users.insertOne(newUser);

    console.log("User written to MongoDB:", newUser);

    return NextResponse.json({ success: true });
  } finally {
    await client.close();
  }
}