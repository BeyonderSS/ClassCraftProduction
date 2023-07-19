import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://BeyonderSS:4ZWpSuZpHeRUrPWc@classcrafttest.x2aylu3.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("ClassCraftTest");
    const users = database.collection("Users");
    // Query for a user that has the title 'Back to the Future'
    const query = {};
    const user = await users.findOne(query);

    console.log(user);
    return NextResponse.json({ user });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
