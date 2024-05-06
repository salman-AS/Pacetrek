import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";
import { MdAssuredWorkload, MdQuiz, MdOutlineLeaderboard } from "react-icons/md";

const course = [
    {
        title: "Profile",
        icon: <BsFillPersonFill />,
        link: "/profile"
    },
    {
        title: "Quiz Alerts",
        icon: <MdQuiz />,
        link: "/SkillDevelopment"
    },
    {
        title: "Leaderboard",
        icon: <MdOutlineLeaderboard />,
        link: "/PerformanceMatrix"
    },
    {
        title: "Events",
        icon: <MdAssuredWorkload />,
        link: "/Eventupdates"
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
