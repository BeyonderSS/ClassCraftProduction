'use server'
import { google } from 'googleapis';

// async function addStudentsToCourse(accessToken, courseId, students) {
//   const auth = new google.auth.OAuth2();
//   auth.setCredentials({ access_token: accessToken });

//   const classroom = google.classroom({ version: 'v1', auth });

//   // Add students to the existing course
//   for (const student of students) {
//     try {
//       const response = await classroom.courses.students.create({
//         courseId: courseId,
//         requestBody: {
//           userId: student,
//         },
//       });

//       console.log(`API response for student ${student}:`, response);

//       const createdStudent = response.data;
//       if (createdStudent && createdStudent.profile) {
//         console.log(`Added student: ${createdStudent.profile.name.fullName} (ID: ${createdStudent.userId})`);
//       } else {
//         console.error(`Failed to add student: ${student} - No profile data in the response`, createdStudent);
//       }
//     } catch (error) {
//       console.error(`Failed to add student: ${student}`, error);
//     }
//   }
// }

// export default addStudentsToCourse;



async function inviteStudentsToCourse(accessToken, courseId, students) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: 'v1', auth });

  for (const student of students) {
    try {
      const response = await classroom.invitations.create({
        requestBody: {
          courseId: courseId,
          role: 'STUDENT',
          userId: student,
        },
      });

      console.log(`Invitation sent to student ${student}:`, response.data);
    } catch (error) {
      console.error(`Failed to invite student: ${student}`, error);
    }
  }
}

export default inviteStudentsToCourse;
