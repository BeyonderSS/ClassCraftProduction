import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const uri =
    "mongodb+srv://BeyonderSS:4ZWpSuZpHeRUrPWc@classcrafttest.x2aylu3.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("ClassCraftTest");
    const users = database.collection("Users");

    // Extract the data from the request body
    const { name, age, email } = await request.json();

    // Create a new user object
    const newUser = {
      name,
      age,
      email,
    };

    // Insert the new user into the collection
    const result = await users.insertOne(newUser);

    console.log(result);
    return NextResponse.json({ success: true });
  } finally {
    await client.close();
  }
}
