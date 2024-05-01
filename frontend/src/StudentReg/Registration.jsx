import React, { useState } from 'react';
import '../styles/Registration.css';

const StudentReg = ({ onAddStudent }) => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        grade: '',
        department: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddStudent(student);
        setStudent({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            grade: '',
            department: ''
        });
    };

    return (
        <div className="registration-form-container">
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={student.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={student.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={student.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="grade">Grade:</label>
                    <select id="grade" name="grade" value={student.grade} onChange={handleChange} required>
                        <option value="">Select Grade</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <select id="department" name="department" value={student.department} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="Mech">Mech</option>
                        <option value="AI">AI</option>
                        <option value="BArch">BArch</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={student.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="add-button">Add Student</button>
            </form>
        </div>
    );
};

export default StudentReg;
