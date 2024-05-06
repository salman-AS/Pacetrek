import React, { useEffect, useState } from 'react';
import './profilesettings.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/sidebar2';
import { ToastContainer, toast } from 'react-toastify';

function Profile() {

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

    console.log(data)
    setStudent(student)
    setUsername(user.username);
    return status
      ? /* toast(`Hello ${user}`, {
	        position: "top-right",
	    }) */console.log(cookies)
      : (removeCookie("token")/* , navigate("/student/login") */);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    admissionNo: '',
    dob: '',
    year: '',
    department: '',
    phoneNo: '',
    cgpa: '',
    rank: '',
    resume: null,
    certificates: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to backend API
    console.log(formData);
    const updatedStudent = {
      firstName: formData.firstName || student.firstName,
      lastName: formData.lastName || student.lastName,
      email: formData.email || student.email,
      password: formData.password,
      dob: formData.dob || student.dob,
      year: formData.year || student.year,
      dept: formData.dept || student.dept,
      phoneNo: formData.phoneNo || student.phoneNo,
      resume: formData.resume || student.resume,
      certificates: formData.certificates ? student.certificates.push(formData.certificates) : student.certificates,
    }
    console.log(updatedStudent);
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/student/update/${student._id}`,
        {
          updatedStudent
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data)
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '',
        year: '',
        dept: '',
        phoneNo: '',
        resume: null,
        certificates: null,
      });
    } catch (error) {
      console.log(error)
    }
    // Reset form fields after submission if needed
  };

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">

          <div className="form-container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit} autoComplete='off'>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="admissionNo">Admission No:</label>
                <input
                  type="text"
                  id="admissionNo"
                  name="admissionNo"
                  value={formData.admissionNo}
                  onChange={handleChange}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="Mech">Mech</option>
                  <option value="IT">IT</option>
                  <option value="AI">AI</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="MTech">MTech</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phoneNo">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="cgpa">CGPA:</label>
                <input
                  type="text"
                  id="cgpa"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                />
              </div> */}
              {/* <div className="form-group">
                <label htmlFor="rank">Rank:</label>
                <input
                  type="text"
                  id="rank"
                  name="rank"
                  value={formData.rank}
                  onChange={handleChange}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="resume">Upload Resume:</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="certificates">Upload Certificates:</label>
                <input
                  type="file"
                  id="certificates"
                  name="certificates"
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
