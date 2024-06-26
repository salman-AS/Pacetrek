import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";
import { MdAssuredWorkload, MdQuiz, MdOutlineLeaderboard } from "react-icons/md";

const course = [
    {
        title: "Profile",
        icon: <BsFillPersonFill />,
        link: "/student/Profile"
    },
    {
        title: "Quiz Alerts",
        icon: <MdQuiz />,
        link: "/student/SkillDevelopment"
    },
    {
        title: "Leaderboard",
        icon: <MdOutlineLeaderboard />,
        link: "/student/PerformanceMatrix"
    },
    {
        title: "Events",
        icon: <MdAssuredWorkload />,
        link: "/student/Eventupdates"
    },
];

const Cards = () => {
    return (
        <div className="card--container">
            {course.map((item) => (
                <Link to={item.link} key={item.title} style={{ textDecoration: 'none' }}>
                    <div className="card">
                        <div className="card--cover">{item.icon}</div>
                        <div className="card--title">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Cards;