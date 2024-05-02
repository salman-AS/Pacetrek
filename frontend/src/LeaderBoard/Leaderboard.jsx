import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css'; // Import CSS file

const Leaderboard = () => {
  // State to store leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // You can fetch data from an API or any other source here
    const mockData = [
      { id: 1, name: 'John', department: 'Computer Science', year: 3, rank: 1 },
      { id: 2, name: 'Alice', department: 'Engineering', year: 2, rank: 2 },
      { id: 3, name: 'Bob', department: 'Mathematics', year: 4, rank: 3 },
      // Add more data as needed
    ];
    setLeaderboardData(mockData);
  }, []);

  return (
    <div className="leaderboard-container">
    <h2 className="leaderboard-h2">Leaderboard</h2>
    <table className="leaderboard-table">
      <thead>
        <tr className="leaderboard-tr">
          <th className="leaderboard-th">Rank</th>
          <th className="leaderboard-th">Student ID</th>
          <th className="leaderboard-th">Name</th>
          <th className="leaderboard-th">Department</th>
          <th className="leaderboard-th">Year</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((student) => (
          <tr className="leaderboard-tr" key={student.id}>
            <td className="leaderboard-td">{student.rank}</td>
            <td className="leaderboard-td">{student.id}</td>
            <td className="leaderboard-td">{student.name}</td>
            <td className="leaderboard-td">{student.department}</td>
            <td className="leaderboard-td">{student.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )}  
export default Leaderboard;
