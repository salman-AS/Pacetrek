import React, { useEffect, useState } from 'react';
import '../styles/Registration.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const StudentReg = () => {
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
            ? /* toast(`Hello ${user.username}`, {
          position: "top-right",
        }) */console.log(cookies)
            : (removeCookie("token"), navigate("/admin/login"));
    };


    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        admissionNo: '',
        dob: '',
        year: '',
        dept: '',
        phoneNo: '',
        cgpa: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
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

        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/student/signup",
                {
                    ...student,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            console.log(data, student)
            if (success) {
                handleSuccess(message);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }

        // onAddStudent(student);
        setStudent({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            admissionNo: '',
            dob: '',
            year: '',
            dept: '',
            phoneNo: '',
            cgpa: ''
        });
    };

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">

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
                                <label htmlFor="phoneNo">Phone Number:</label>
                                <input type="number" id="phoneNo" name="phoneNo" value={student.phoneNo} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Date of birth:</label>
                                <input type="date" id="dob" name="dob" value={student.dob} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="admissionNo">Admission Number:</label>
                                <input type="number" id="admissionNo" name="admissionNo" value={student.admissionNo} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Year:</label>
                                <select id="year" name="year" value={student.year} onChange={handleChange} required>
                                    <option value=''>Select Year</option>
                                    <option value={1}>1st Year</option>
                                    <option value={2}>2nd Year</option>
                                    <option value={3}>3rd Year</option>
                                    <option value={4}>4th Year</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dept">Department:</label>
                                <select id="dept" name="dept" value={student.dept} onChange={handleChange} required>
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
                                <label htmlFor="cgpa">CGPA:</label>
                                <input type="number" id="cgpa" name="cgpa" value={student.cgpa} onChange={handleChange} max={10} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={student.password} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="add-button">Add Student</button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default StudentReg;
