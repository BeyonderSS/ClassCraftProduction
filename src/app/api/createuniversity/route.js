import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  const uri = "mongodb+srv://BeyonderSS:4ZWpSuZpHeRUrPWc@classcrafttest.x2aylu3.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    const database = client.db("ClassCraftTest");
    const universities = database.collection("Universities"); // Add collection for Universities
    const users = database.collection("Users"); // Add collection for Users

    // Extract the data from the request body
    const {
      adminName,
      adminEmail,
      universityName,
      location,
      email
    } = await request.json();

    console.log(request.json);

    // Create a new university object
    const newUniversity = {
      _id: new ObjectId(),
      name: universityName,
      location: location,
    };

    // Insert the new university into the collection
    await universities.insertOne(newUniversity);

    console.log("University written to MongoDB:", newUniversity);

    // Create a new user object
    const newUser = {
      _id: new ObjectId("60ed7f0b7f4b4e10a44b4a01"),
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
