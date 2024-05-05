import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './skill.css';
import { BsCodeSlash } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

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
    return (
        <div className="quizopt-container">
            <h2 className="quizopt-heading">Skill Development System</h2>
            <div className="quizopt--container">
            {course.map((item) => (
          <div className="quizopt">
                    <div className="quizopt--cover">{item.icon}</div>
                    <div className="quizopt--title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Quizo;