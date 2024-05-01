import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    BiHome,
    BiHelpCircle,
} from 'react-icons/bi';
import { BsClipboardData , BsFillPersonFill} from "react-icons/bs";
import { MdOutlineQuiz, MdLeaderboard, MdOutlineEventNote, MdNotificationsActive } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import '../styles/Sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    return(
        <div className="menu">
            <div className="logo">
                <GiSkills className="logo-icon" />
                <h2>PACETREK</h2>
            </div>
            <div className="menu--list">
                <Link to="/" className={`item ${location.pathname === '/' ? 'active' : ''}`}>
                    <BiHome className="icon"/>
                    Dashboard
                </Link>
                <Link to="/studentreg" className={`item ${location.pathname === '/studentreg' ? 'active' : ''}`}>
                    <BsFillPersonFill className="icon"/>
                    Student Registration
                </Link>
                <Link to="/table" className={`item ${location.pathname === '/table' ? 'active' : ''}`}>
                    <BsClipboardData className="icon" />
                    Student Evaluation
                </Link>
                <Link to="/quizo" className={`item ${location.pathname === '/quizo' ? 'active' : ''}`}>
                    <MdOutlineQuiz className="icon"/>
                    Skill Development
                </Link>
                <Link to="/leaderboard" className={`item ${location.pathname === '/leaderboard' ? 'active' : ''}`}>
                    <MdLeaderboard className="icon"/>
                    Leader Board
                </Link>
                <Link to="/event" className={`item ${location.pathname === '/event' ? 'active' : ''}`}>
                    <MdOutlineEventNote className="icon"/>
                    Event Updates
                </Link>
                <Link to="/notifications" className={`item ${location.pathname === '/notifications' ? 'active' : ''}`}>
                    <MdNotificationsActive className="icon"/>
                    Notifications
                </Link>
                <Link to="/help" className={`item ${location.pathname === '/help' ? 'active' : ''}`}>
                    <BiHelpCircle className="icon"/>
                    Help
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
