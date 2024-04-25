import React from 'react';
import {
    BiHome,
    BiHelpCircle,
} from 'react-icons/bi';
import { BsClipboardData } from "react-icons/bs";
import { MdOutlineQuiz,
    MdLeaderboard ,
    MdOutlineEventNote,
    MdNotificationsActive} from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import '../styles/Sidebar.css';
const Sidebar = () => {
    return(
        <div className="menu">
            <div className="logo">
                <GiSkills className="logo-icon" />
                <h2>PACETREK</h2>
            </div>

            <div className="menu--list">
                <a href="#" className="item">
                    <BiHome className="icon"/>
                    Dashboard
                </a>
                <a href="" className="item">
                    <BsClipboardData className="icon" />
                    Student Evaluation
                </a>
                <a href="#" className="item">
                    <MdOutlineQuiz className="icon"/>
                    Quiz & Exams
                </a>
                
                <a href="#" className="item">
                    <MdLeaderboard className="icon"/>
                    Leader Board
                </a>
                <a href="#" className="item">
                    <MdOutlineEventNote className="icon"/>
                    Event Updates
                </a>
                <a href="#" className="item">
                    <MdNotificationsActive className="icon"/>
                    Notifications
                </a>
                <a href="#" className="item">
                    <BiHelpCircle className="icon"/>
                    Help
                </a>
            </div>
        </div>
    );
};

export default Sidebar