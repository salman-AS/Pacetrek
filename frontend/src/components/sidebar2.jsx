import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import {
    BiHome,
    BiHelpCircle,
} from 'react-icons/bi';
import { MdSettingsSuggest } from "react-icons/md";
import { MdOutlineQuiz,
    MdLeaderboard ,
    MdOutlineEventNote,
    MdNotificationsActive} from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import '../styles/Sidebar.css';
const Sidebar = () => {
    const handleClick = () =>{
        console.log("link clicked");
    };
    return(
        <div className="menu">
            <div className="logo">
                <GiSkills className="logo-icon" />
                <h2>PACETREK</h2>
            </div>

            <div className="menu--list">
                <Link to="/student/dashboard" className="item">
                    <BiHome className="icon"/>
                    Dashboard
                </Link>
                <Link to='/student/Profile' className="item">
                    <CgProfile className="icon"/>
                    Profile
                </Link>
                <Link to="/student/SkillDevelopment" className="item">
                    <MdOutlineQuiz className="icon"/>
                    Skill Development
                </Link>
                
                <Link to="/student/PerformanceMatrix" className="item">
                    <MdLeaderboard className="icon"/>
                    Performance Matrix
                </Link>
                <Link to="/student/Eventupdates" className="item">
                    <MdOutlineEventNote className="icon"/>
                    Event Updates
                </Link>
                <Link to="/student/Notifications" className="item">
                    <MdNotificationsActive className="icon"/>
                    Notifications
                </Link>
                <Link to="/student/Profilesettings" className="item">
                    <MdSettingsSuggest  className="icon"/>
                    Profile Settings
                </Link>
                <a href="#" className="item">
                    <BiHelpCircle className="icon"/>
                    Help
                </a>
            </div>
        </div>
    );
};

export default Sidebar