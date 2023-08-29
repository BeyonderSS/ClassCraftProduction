'use server'
import User from '@/app/middleware/User';
import Course from '@/app/middleware/Course';
import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URI;

export default async function updateCourseStudentEnrolled(emails, courseId, universityId, role, subjectIds) {
  try {
    if (!Array.isArray(emails)) {
      throw new Error('Emails must be provided as an array.');
    }

    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ClassCraft",
    });

    let course = await Course.findOne({ _id: courseId });

    if (!course) {
      throw new Error('Course not found.');
    }

    course.studentEnrolled = emails;
    const updatedCourse = await course.save();

    for (const email of emails) {
      let user = await User.findOne({ email });

      if (!user) {
        // If the user does not exist, create a new user
        const newUser = new User({
          email,
          university: universityId,
          role: role || null,
          courses: [new mongoose.Types.ObjectId(courseId)],
          subjects: role === 'Teacher' ? subjectIds || [] : [], // Use "subject" for the field name
        });

        user = await newUser.save();
      } else {
        // Convert the "user.courses" array elements to ObjectIds
        user.courses = user.courses.map(id => new mongoose.Types.ObjectId(id));
        const courseIdObject = new mongoose.Types.ObjectId(courseId);

        // Use toString() to compare ObjectIds as strings
        if (!user.courses.some(id => id.toString() === courseIdObject.toString())) {
          user.courses.push(courseIdObject);
        }

        if (role === 'Teacher') {
          // Add subjectIds to the user's subject array
          user.subjects = subjectIds || []; // Use "subject" for the field name
        }

        // Save the updated user document
        await user.save();
      }
    }

    await mongoose.disconnect();

    return updatedCourse;
  } catch (error) {
    throw new Error(`Error updating course: ${error.message}`);
  }
}
