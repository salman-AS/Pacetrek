import React, { useEffect, useState } from 'react';
import "./notific.css";
import Sidebar from '../components/sidebar2';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const NotificationPanel = () => {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [student, setStudent] = useState({});

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
      "http://localhost:4000/api/student",
      {},
      { withCredentials: true }
    );
    const { status, student, user } = data;

    console.log(data)
    setStudent(student)
    setUsername(user.username);

    return status
      ? /* toast(`Hello ${user}`, {
      position: "top-right",
  }) */console.log(cookies, 'here')
      : (removeCookie("token")/* , navigate("/student/login") */);
  };


  const [notifications, setNotifications] = useState([
    { id: 1, type: 'events', message: 'New event added: Workshop on AI' },
    { id: 2, type: 'placement', message: 'Placement report for ABC Company released' },
    { id: 3, type: 'quiz', message: 'New quiz added: Data Structures' },
    { id: 2, type: 'placement', message: 'Placed Students list of TCS' },
  ]);

  const getNotifs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/notif/getAll",
        {},
        { withCredentials: true }
      );
      console.log(data.notifications)
      setNotifications(data.notifications)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotifs()
  }, []);


  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">
          <div className="notification-panel">
            <h3>Notifications</h3>
            <ul>
              {notifications.map(notification => (
                <li key={notification._id} className={`notification ${notification.type} `} >
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;