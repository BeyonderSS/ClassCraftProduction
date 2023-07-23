import inviteStudentsToCourses from '@/lib/addStudentsToCourse';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const InviteForm = () => {
  const [courseIds, setCourseIds] = useState('');
  const [studentEmails, setStudentEmails] = useState('');
    const {data:session}=useSession()
  const handleInvite = async () => {
    const accessToken = session.accessToken; // Replace this with the actual access token

    // Split the input courseIds and studentEmails into arrays
    const courseIdArray = courseIds.split(',').map(id => id.trim());
    const studentEmailArray = studentEmails.split(',').map(email => email.trim());

    try {
      // Call the backend function to invite students to courses
      await inviteStudentsToCourses(accessToken, courseIdArray, studentEmailArray);
    } catch (error) {
      console.error('Failed to invite students:', error);
    }
  };

  return (
    <div>
      <h1>Invite Students to Courses</h1>
      <div>
        <label htmlFor="courseIds">Course IDs (comma-separated):</label>
        <input
          type="text"
          id="courseIds"
          value={courseIds}
          onChange={e => setCourseIds(e.target.value)}
          placeholder="Enter course IDs"
        />
      </div>
      <div>
        <label htmlFor="studentEmails">Student Emails (comma-separated):</label>
        <input
          type="text"
          id="studentEmails"
          value={studentEmails}
          onChange={e => setStudentEmails(e.target.value)}
          placeholder="Enter student emails"
        />
      </div>
      <button onClick={handleInvite}>Invite Students</button>
    </div>
  );
};

export default InviteForm;
