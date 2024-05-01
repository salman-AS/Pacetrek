import React, { useEffect, useState } from "react";
import '../styles/Table.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Table = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        console.log(cookies)
        verifyCookie();
        getStudents();
    }, [cookies, navigate, removeCookie]);

    const getStudents = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:4000/api/student/getStudents",
                {},
                { withCredentials: true }
            )
            console.log(data)
            setStudents(data.students)
        } catch (error) {
            console.log(error)
        }
    }

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

    const handleViewClick = (student) => {
        // Logic to handle the "View" action for the selected student
        console.log("View clicked for student ID:", student);
    };

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">

                    <div className="table-container">
                        <h1 className="table-heading">Student Evaluation Page</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="table-header">Admission No</th>
                                    <th className="table-header">Name</th>
                                    <th className="table-header">Year</th>
                                    <th className="table-header">Department</th>
                                    <th className="table-header">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student._id}>
                                        <td className="table-cell">{student.admissionNo}</td>
                                        <td className="table-cell">{student.firstName+' '+student.lastName}</td>
                                        <td className="table-cell">{student.year}</td>
                                        <td className="table-cell">{student.dept}</td>
                                        <td className="table-cell">
                                            <button className="table-button" onClick={() => handleViewClick(student)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>



    );
};

export default Table;
