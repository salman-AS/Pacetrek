import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import Sidebar from '../components/Sidebar';
import Contents from '../components/Contents';
// import Basic from '../evaluation/Basic';
import '../App.css';
import '../index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(cookies)
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const verifyCookie = async () => {
    console.log(cookies)
    if (!cookies.token || cookies.token === 'undefined' || cookies.token === undefined) {
      console.log(cookies)
      removeCookie("token")
      navigate("/")
    }
    const { data } = await axios.post(
      "http://localhost:4000/api/admin",
      {},
      { withCredentials: true }
    );
    const { status, user } = data;

    console.log(data)

    setUsername(user);
    return status
      ? /* toast(`Hello ${user}`, {
        position: "top-right",
      }) */console.log(cookies)
      : (removeCookie("token"), navigate("/admin/login"));
  };

  const Logout = () => {
    removeCookie("token");
    navigate("/admin/login");
  };

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">
          <Contents username={username} Logout={Logout} />
          <div className="basic">
          </div>
        </div>
      </div>
      {/* <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer /> */}
    </div>
  );
};

export default Dashboard;