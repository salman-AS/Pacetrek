import React, { useState } from 'react';

const StudentEvaluationPage = () => {
  // State variables to store evaluation data
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [comments, setComments] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit evaluation data to backend or perform necessary actions
    console.log("Student Name:", studentName);
    console.log("Subject:", subject);
    console.log("Grade:", grade);
    console.log("Comments:", comments);
    // Reset form fields
    setStudentName('');
    setSubject('');
    setGrade('');
    setComments('');
  };

  return (
    <div>
      <h1>Student Evaluation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentEvaluationPage;
