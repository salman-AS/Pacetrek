import React, { useEffect, useState } from 'react';
import "./Notification.css";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { message } from 'antd';

const Notification = () => {
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

    setUsername(user.username);
    return status
      ? console.log(cookies)
      : (removeCookie("token"), navigate("/admin/login"));
  };


  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedType, setSelectedType] = useState('');


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


  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {

    e.preventDefault();

    const notification = {
      type: selectedType,
      message: newMessage
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/notif/add",
        {
          ...notification,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data)
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }

      setNotifications([...notifications, data.notification]);
      setNewMessage('');
      setSelectedType('');
    } catch (error) {
      console.log(error);
    }

  };

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">
          <div>
            <h2 className="notification-heading">Notifications</h2>
            <div className="notification-panel">
              <form onSubmit={handleSubmit} className="notification-input">
                <div className="notification-type-field">
                  <label htmlFor="type">Type:</label>
                  <select id="type" name="type" value={selectedType} onChange={handleTypeSelect} >
                    <option value=''>Select Notification Type</option>
                    <option value='events'>Event</option>
                    <option value='placement'>Placement</option>
                    <option value='quiz'>Quiz</option>
                  </select>
                </div>
                <input
                  required
                  type="text"
                  placeholder="Enter notification message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="add-button">Send Notification</button>
              </form>
              {/* <ul>
                {notifications.map(notification => (
                  <li key={notification.id} className={`notification ${notification.type}`} >
                    {notification.message}
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
          <div className="previous-events">
            <h2>Sent notifications</h2>
            {notifications.map(notification => (
              <li key={notification.id} className={`notification ${notification.type}`} >
                {notification.message}
              </li>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
