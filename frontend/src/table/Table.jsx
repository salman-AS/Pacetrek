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


    // Sample student data (replace with your actual data)
    const students = [
        { id: 1, name: "Salman ", email: "Salman@gmail.com" },
        { id: 2, name: "Shahna Sheri", email: "Shana@gmail.com" },
        { id: 3, name: "sahal", email: "sahal@gmail.com" },
        { id: 4, name: "Rida", email: "Rida@gmail.com" },

    ];

    const handleViewClick = (studentId) => {
        // Logic to handle the "View" action for the selected student
        console.log("View clicked for student ID:", studentId);
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
                                    <th className="table-header">Student ID</th>
                                    <th className="table-header">Name</th>
                                    <th className="table-header">Email</th>
                                    <th className="table-header">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td className="table-cell">{student.id}</td>
                                        <td className="table-cell">{student.name}</td>
                                        <td className="table-cell">{student.email}</td>
                                        <td className="table-cell">
                                            <button className="table-button" onClick={() => handleViewClick(student.id)}>
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
