import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css'; // Import CSS file
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Leaderboard = () => {

  //----------------------------------------------------------------------------

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(cookies)
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const verifyCookie = async () => {
    console.log(cookies)
    if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
      console.log(cookies)
      removeCookie("token")
      navigate("/")
    }
    const { data } = await axios.post(
      "http://localhost:4000/api/admin",
      {},
      { withCredentials: true }
    );
    const { status, user } = data;

    setUsername(user.username);
    return status
      ? console.log(cookies)
      : (removeCookie("token"), navigate("/admin/login"));
  };

  //----------------------------------------------------------------------------

  // State to store leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/student/getStudents",
        {},
        { withCredentials: true }
      )
      console.log(data, data.students)
      setStudents(data.students)
    } catch (error) {
      console.log(error)
    }
  }

  // const getRank = (student) => {
  //   let rank = 0
  //   try {
  //     const sortedStudents = students.sort((a, b) => b.score - a.score)
  //     rank = sortedStudents.indexOf(student) + 1
  //     console.log('getrank',sortedStudents)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log(rank)
  //   return rank
  // }

  const getLeaderboardData = () => {
    console.log(students)
    const sortedStudents = students.sort((a, b) => b.score - a.score)
    const newLBdata = sortedStudents.map((student, index ) => {
      const formattedStudent = {
        id: student._id,
        admissionNo: student.admissionNo,
        name: student.firstName + ' ' + student.lastName,
        department: student.dept,
        year: student.year,
        rank: index+1,
        score: student.score
      }
      console.log(index, formattedStudent)
      return formattedStudent
    })
    console.log('here', newLBdata, students)
    setLeaderboardData(newLBdata);
  }

  useEffect(() => {
    // You can fetch data from an API or any other source here
    getStudents()
    // const mockData = [
    //   { id: 1, name: 'John', department: 'Computer Science', year: 3, rank: 1 },
    //   { id: 2, name: 'Alice', department: 'Engineering', year: 2, rank: 2 },
    //   { id: 3, name: 'Bob', department: 'Mathematics', year: 4, rank: 3 },
    //   // Add more data as needed
    // ];
    // setLeaderboardData(mockData);
  }, [])

  useEffect(() => {
    getLeaderboardData()
  }, [students])

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">

          <div className="leaderboard-container">
            <h2 className="leaderboard-h2">Leaderboard</h2>
            <table className="leaderboard-table">
              <thead>
                <tr className="leaderboard-tr">
                  <th className="leaderboard-th">Rank</th>
                  <th className="leaderboard-th">Admission No</th>
                  <th className="leaderboard-th">Name</th>
                  <th className="leaderboard-th">Department</th>
                  <th className="leaderboard-th">Year</th>
                  <th className="leaderboard-th">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((student) => (
                  <tr className="leaderboard-tr" key={student.id}>
                    <td className="leaderboard-td">{student.rank}</td>
                    <td className="leaderboard-td">{student.admissionNo}</td>
                    <td className="leaderboard-td">{student.name}</td>
                    <td className="leaderboard-td">{student.department}</td>
                    <td className="leaderboard-td">{student.year}</td>
                    <td className="leaderboard-td">{student.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Leaderboard;
