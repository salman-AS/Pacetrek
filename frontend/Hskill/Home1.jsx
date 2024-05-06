import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import '../styles/Skill.css';
import { BsCodeSlash } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import Sidebar from '../components/Sidebar';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const course = [
    {
        title: "Aptitude Reasoning",
        icon: <IoExtensionPuzzleOutline />,
        link: "/test/aptitude", // Define the route for each card
    },
    {
        title: "Course Work",
        icon: <IoBookOutline />,
        link: "/test/coursework",
    },
    {
        title: "Coding",
        icon: <BsCodeSlash />,
        link: "/test/coding",
    },
];

const Home1 = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

   // useEffect(() => {
     //   console.log(cookies)
      //  verifyCookie();
  //  }, [cookies, navigate, removeCookie]);

  //  const verifyCookie = async () => {
      //  console.log(cookies)
      //  if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
            // console.log(cookies)
            // removeCookie("token")
            // navigate("/")
       // }
        // const { data } = await axios.post(
        //     "http://localhost:4000/api/admin",
        //     {},
        //     { withCredentials: true }
        // );
        // const { status, user } = data;

    //     setUsername(user.username);
    //     return status
    //         ? /* toast(`Hello ${user.username}`, {
    //       position: "top-right",
    //     }) */console.log(cookies)
    //         : (removeCookie("token"), navigate("/admin/login"));
    // };

    return (
        <div className="dashboard-body">
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboard--contents">
                    <div className="quizopt-container">
                        <h2 className="quizopt-heading">Skill Development System</h2>
                        <div className="quizopt--container">
                            {course.map((item) => (
                                <Link to={item.link} key={item.title}> {/* Wrap each card with Link */}
                                    <div className="quizopt">
                                        <div className="quizopt--cover">{item.icon}</div>
                                        <div className="quizopt--title">
                                            <h3>{item.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home1;