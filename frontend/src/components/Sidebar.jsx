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
                <h1>PACETREK</h1>
            </div>
            <div className="menu--list">
                <Link to="/dashboard" className={`item ${location.pathname === '/admin/' ? 'active' : ''}`}>
                    <BiHome className="icon"/>
                    Dashboard
                </Link>
                <Link to="/admin/studentreg" className={`item ${location.pathname === '/admin/studentreg' ? 'active' : ''}`}>
                    <BsFillPersonFill className="icon"/>
                    Student Registration
                </Link>
                <Link to="/admin/table" className={`item ${location.pathname === '/admin/table' ? 'active' : ''}`}>
                    <BsClipboardData className="icon" />
                    Student Evaluation
                </Link>
                <Link to="/admin/quizo" className={`item ${location.pathname === '/admin/quizo' ? 'active' : ''}`}>
                    <MdOutlineQuiz className="icon"/>
                    Skill Development
                </Link>
                <Link to="/admin/leaderboard" className={`item ${location.pathname === '/admin/leaderboard' ? 'active' : ''}`}>
                    <MdLeaderboard className="icon"/>
                    Leader Board
                </Link>
                <Link to="/admin/event" className={`item ${location.pathname === '/admin/event' ? 'active' : ''}`}>
                    <MdOutlineEventNote className="icon"/>
                    Event Updates
                </Link>
                <Link to="/admin/notifications" className={`item ${location.pathname === '/admin/notifications' ? 'active' : ''}`}>
                    <MdNotificationsActive className="icon"/>
                    Notifications
                </Link>
                {/* <Link to="/admin/help" className={`item ${location.pathname === '/help' ? 'active' : ''}`}>
                    <BiHelpCircle className="icon"/>
                    Help
                </Link> */}
            </div>
        </div>
    );
};

export default Sidebar;
