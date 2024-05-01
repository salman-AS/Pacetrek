import React from 'react';
import { BiSearch, BiNotification, BiLogOut } from 'react-icons/bi';

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// import Dashboard from '../pages/Dashboard';

const ContentHeader = ({ username, Logout }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  console.log(username)
  // const Logout = () => {
  //   console.log(cookies)
  //   removeCookie("token");
  //   console.log(cookies)
  //   // navigate("/admin/login");
  // };

  return (
    <div className="content--header">
      <h1 className="header--title">Welcome back {username}!!</h1>
      <div className="header-activity">
        <div className="search-box">
          <input type="text" placeholder="Search anything here..." />
          <BiSearch className="icon" />
        </div>
        <div className="notify">
          <BiNotification className="icon" />
        </div>
        <BiLogOut className='icon' onClick={Logout} title='Logout' />
      </div>
    </div>
  );
};

export default ContentHeader;