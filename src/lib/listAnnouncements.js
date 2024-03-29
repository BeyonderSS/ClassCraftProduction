"use server";
import { MongoClient, ObjectId } from "mongodb";

async function listAnnouncements(subjectId, courseId) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("ClassCraft");
    const courses = database.collection("Courses");

    const query = {
      _id: new ObjectId(courseId),
    };

    const course = await courses.findOne(query);

    if (!course) {
      return "Course not found";
    }

    let subjectFound = false;
    let notes = [];

    for (const semesterSubjects of Object.values(course.subjects)) {
      const matchingSubject = semesterSubjects.find(
        (subject) => subject.Id === subjectId
      );

      if (matchingSubject) {
        notes = matchingSubject.notes || [];
        subjectFound = true;
        break; // No need to check other semesters
      }
    }

    if (!subjectFound) {
      return "Subject not found";
    }

    return notes;
  } catch (error) {
    return `An error occurred: ${error.message}`;
  } finally {
    client.close();
  }
}

export default listAnnouncements;
