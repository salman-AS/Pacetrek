import React, { useState } from 'react';
import './profilesettings.css'; // Import your CSS file

function Profile() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to backend API
    console.log(formData);
    // Reset form fields after submission if needed
    setFormData({
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
  };

  return (
    <div className="form-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="admissionNo">Admission No:</label>
          <input
            type="text"
            id="admissionNo"
            name="admissionNo"
            value={formData.admissionNo}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="cgpa">CGPA:</label>
          <input
            type="text"
            id="cgpa"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rank">Rank:</label>
          <input
            type="text"
            id="rank"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
          />
        </div>
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
  );
}

export default Profile;
