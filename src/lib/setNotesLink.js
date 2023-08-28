"use server";
import { MongoClient, ObjectId } from "mongodb";

async function setNotesLink(
  subjectId,
  unitName,
  fileLink,
  courseId
) {
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

    for (const semesterSubjects of Object.values(course.subjects)) {
      const matchingSubject = semesterSubjects.find(
        (subject) => subject.Id === subjectId
      );

      if (matchingSubject) {
        matchingSubject.notes = matchingSubject.notes || [];
        matchingSubject.notes.push({ unitName, fileLink });
        subjectFound = true;
        break; // No need to check other semesters
      }
    }

    if (!subjectFound) {
      return "Subject not found";
    }

    await courses.updateOne(query, { $set: { subjects: course.subjects } });

    return "Updated notes successfully";
  } catch (error) {
    return `An error occurred: ${error.message}`;
  } finally {
    client.close();
  }
}

export default setNotesLink;
