import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../styles/Quizopt.css';
import { BsCodeSlash } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const course = [
    {
        title: "Aptitude Reasoning",
        icon: <IoExtensionPuzzleOutline />,
        link: "/quizo/Aptitude", // Define the route for each card
    },
    {
        title: "Course Work",
        icon: <IoBookOutline />,
        link: "/quizo/Aptitude",
    },
    {
        title: "Coding",
        icon: <BsCodeSlash />,
        link: "/quizo/Coding",
    },
];

const Quizo = () => {
    return (
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
    );
};

export default Quizo;