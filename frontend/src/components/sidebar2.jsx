import React from 'react';
import {
    BiHome,
    BiHelpCircle,
} from 'react-icons/bi';
import { BsClipboardData } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SiElectronbuilder } from "react-icons/si";
import { MdOutlineQuiz,
    MdLeaderboard ,
    MdOutlineEventNote,
    MdNotificationsActive,} from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import '../styles/Sidebar.css';
const sidebar2 = () => {
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
                    <CgProfile className="icon" />
                    Profile
                </a>
                <a href="#" className="item">
                    <SiElectronbuilder className="icon"/>
                    Skill Development
                </a>
                
                <a href="#" className="item">
                    <MdLeaderboard className="icon"/>
                    Performance Metrics
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

export default sidebar2
