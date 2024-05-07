import React, { useEffect, useState } from 'react';
import './profile.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/sidebar2';

function ViewProfile({ profileData }) {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [student, setStudent] = useState({});

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
      "http://localhost:4000/api/student",
      {},
      { withCredentials: true }
    );
    const { status, student, user } = data;
    getStudents()
    console.log(data)
    setStudent(student)
    setUsername(user.username);
    return status
      ? /* toast(`Hello ${user}`, {
	        position: "top-right",
	    }) */console.log(cookies)
      : (removeCookie("token")/* , navigate("/student/login") */);
  };

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

  const getLeaderboardData = () => {
    console.log(students)
    const sortedStudents = students.sort((a, b) => b.score - a.score)
    const newLBdata = sortedStudents.map((student, index) => {
      const formattedStudent = {
        id: student._id,
        admissionNo: student.admissionNo,
        name: student.firstName + ' ' + student.lastName,
        department: student.dept,
        year: student.year,
        rank: index + 1,
        score: student.score
      }
      console.log(index, formattedStudent)
      return formattedStudent
    })
    console.log('here', newLBdata, students)
    setLeaderboardData(newLBdata);
  }

  const [rank, setRank] = useState(0)

  useEffect(() => {
    getStudents()
  }, [])

  useEffect(() => {
    getLeaderboardData()
  }, [students])

  useEffect(() => {
    function isStudent(item) {
      return item.id === student._id;
    }
    console.log(leaderboardData.findIndex(isStudent)+1)
    setRank(leaderboardData.findIndex(isStudent)+1);
  }, [leaderboardData])

  // Dummy profile data
  const dummyProfileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    admissionNo: 'ABC123',
    dob: '1990-01-01',
    year: '3rd',
    department: 'CSE',
    phoneNo: '1234567890',
    cgpa: '3.5',
    rank: '5',
    resume: 'https://example.com/resume.pdf',
    certificates: 'https://example.com/certificates.pdf',
    profilePic: 'https://via.placeholder.com/150', // Placeholder profile picture URL
  };
  // Use dummyProfileData if profileData is not provided

  student.rank = rank
  profileData = student || dummyProfileData;
  const date = new Date (student.dob)
  profileData.dob = date.toLocaleDateString()
  console.log(date.toLocaleDateString())

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">

          <div className="profile-view">
            <h2>View Profile</h2>
            {/* <div className="profile-pic">
              <img src={profileData.profilePic} alt="Profile" />
            </div> */}
            <div>
              <strong>First Name:</strong> {profileData.firstName || 'N/A'}
            </div>
            <div>
              <strong>Last Name:</strong> {profileData.lastName || 'N/A'}
            </div>
            <div>
              <strong>Email:</strong> {profileData.email || 'N/A'}
            </div>
            <div>
              <strong>Admission No:</strong> {profileData.admissionNo || 'N/A'}
            </div>
            <div>
              <strong>Date of Birth:</strong> {profileData.dob || 'N/A'}
            </div>
            <div>
              <strong>Year:</strong> {profileData.year || 'N/A'}
            </div>
            <div>
              <strong>Department:</strong> {profileData.dept || 'N/A'}
            </div>
            <div>
              <strong>Phone Number:</strong> {profileData.phoneNo || 'N/A'}
            </div>
            <div>
              <strong>CGPA:</strong> {profileData.cgpa || 'N/A'}
            </div>
            <div>
              <strong>Rank:</strong> {profileData.rank || 'N/A'}
            </div>
            {/* {profileData.resume && (
              <div>
                <strong>Resume:</strong>{' '}
                <a href={profileData.resume} download>
                  Download Resume
                </a>
              </div>
            )} */}
            {/* {profileData.certificates && (
              <div>
                <strong>Certificates:</strong>{' '}
                <a href={profileData.certificates} download>
                  Download Certificates
                </a>
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>


  );
}

export default ViewProfile;