import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import './skill.css';
import { BsCodeSlash } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import Sidebar from '../components/sidebar2';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const course = [
    {
        title: "Aptitude Reasoning",
        icon: <IoExtensionPuzzleOutline />,
        link: "/", // Define the route for each card
    },
    {
        title: "Course Work",
        icon: <IoBookOutline />,
        link: "/",
    },
    {
        title: "Coding",
        icon: <BsCodeSlash />,
        link: "/",
    },
];

const Quizo = () => {

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


    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />

                <div className="dashboard--contents">
                    <div className="quizopt-container">
                        <h2 className="quizopt-heading">Skill Development System</h2>
                        <div className="quizopt--container">
                            {course.map((item) => (
                                <div key={item.title} className="quizopt">
                                    <div className="quizopt--cover">{item.icon}</div>
                                    <div className="quizopt--title">
                                        <h2>{item.title}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quizo;