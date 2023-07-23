import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import User from "@/app/middleware/User";

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "ClassCraft", // Specify the database name here
});

const UniversitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: String,
    adminEmail: String,
  },
  {
    collection: "Universities",
  }
);

 const University = mongoose.models.University || mongoose.model("University", UniversitySchema);



export async function POST(request) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const database = client.db("ClassCraft");
    const universities = database.collection("Universities");

    // Extract the data from the request body
    const { adminName, adminEmail, universityName, location, email } = await request.json();

    console.log(request.json);

    // Find or create the university
    let university = await University.findOne({ name: universityName });
    if (!university) {
      university = new University({
        name: universityName,
        location: location,
        adminEmail: adminEmail,
      });

      // Insert the new university into the collection
      await university.save();
      console.log("University written to MongoDB:", university);
    }

    // Find the user by email
    const user = await User.findOne({ email: adminEmail || email });

    if (user) {
      // If the user exists, update university ID and role
      user.university = university._id;
      user.role = "Admin";
      await user.save();
      console.log("User updated in MongoDB:", user);
    } else {
      // If the user does not exist, create a new user object
      const newUser = new User({
        email: adminEmail || email,
        role: "Admin",
        university: university._id,
      });

      // Insert the new user into the collection
      await newUser.save();

      console.log("User written to MongoDB:", newUser);
    }

    return NextResponse.json({ success: true });
  } finally {
    await client.close();
  }
}
