'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import listCoursesWithAnnouncements from '@/lib/listCourses';
import createCourse from '@/lib/createCourse';
import addStudentsToCourse from '@/lib/addStudentsToCourse';
import inviteTeachersToCourse from '@/lib/inviteTeachersToCourse';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const {data: session} =useSession();
  useEffect(() => {
    if(session){
      console.log(session.accessToken)

      async function getCourses(access_token) {
        const accessToken = access_token;
        const courses = await listCoursesWithAnnouncements(accessToken);
        console.log(courses);
        setCourses(courses)
      }
      
      getCourses(session.accessToken);
      
  }
  }, [session]);
console.log(courses)

// useEffect(() => {
//   if (session) {
//     async function createCourse(access_token) {
//       const accessToken = access_token;
//       const courseData = {
//         name: 'Example Course 3rd try',
//         section: 'Section 1',
//         description: 'This is an example course.',
//         room: 'Room 101',
//         ownerId: 'dshantanu2003@gmail.com',
//       };

     

//       const createdCourse = await createCourse(accessToken, courseData, teachers);
//       console.log('Created course:', createdCourse);
//     }

//     createCourse(session.accessToken);
//   }
// }, [session]);




// useEffect(() => {
//   if (session) {
//     (async () => {
//       const accessToken = session.accessToken;
//       const courseId = '613296095428'; // Replace with the actual course ID

//       const students = [
//         'bpuneet2003@gmail.com',
//       ];

//       try {
//         await addStudentsToCourse(accessToken, courseId, students);
//       } catch (error) {
//         console.error('Failed to add students:', error);
//       }
//     })();
//   }
// }, [session]);


// useEffect(() => {
//   if (session) {
//     (async () => {
//       const accessToken = session.accessToken;
//       const courseId = '613296095428'; // Replace with the actual course ID

//       const teachers = [
//         'bpuneet2003@gmail.com',
//       ];

//       try {
//         await inviteTeachersToCourse(accessToken, courseId, teachers);
//       } catch (error) {
//         console.error('Failed to add teachers:', error);
//       }
//     })();
//   }
// }, [session]);



  return (
    <div>
    <h1>Courses</h1>
    {courses.map((course) => (
      <div key={course.id}>
        <h2>{course.name}</h2>
        <p>{course.id}</p>
      </div>
    ))}
  </div>
  );
};

export default CourseList;


