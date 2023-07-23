import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    semCount: {
      type: Number,
      required: true,
    },
    studentEnrolled: {
      type: [String], // Assuming student emails will be stored as strings in this array
      default: [],
    },
    UniversityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subjects: {
      type: mongoose.Schema.Types.Mixed, // Assuming subjects will be stored in an array or an object
      default: {},
    },
  },
  {
    collection: 'Courses',
  }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;
