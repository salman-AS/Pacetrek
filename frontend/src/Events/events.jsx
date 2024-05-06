import React, { useState, useEffect } from 'react';
import './events.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/sidebar2';

const EventReceiver = () => {

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

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/event/getAll",
        {},
        { withCredentials: true }
      );
      console.log(data.events)
      setEvents(data.events)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Fetch events from API or database
    // For now, using dummy data
    // const dummyEvents = [
    //   { id: 1, name: 'Event 1', details: 'Details of Event 1', date: '2024-05-05', time: '10:00 AM' },
    //   { id: 2, name: 'Event 2', details: 'Details of Event 2', date: '2024-05-06', time: '11:00 AM' },
    //   { id: 3, name: 'Event 3', details: 'Details of Event 3', date: '2024-05-07', time: '12:00 PM' },
    // ];
    // setEvents(dummyEvents);
    getEvents()
  }, []);

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">
          <div className="event-receiver-container">
            <h2>Event Updates</h2>
            <div className="event-list">
              {events.map(event => (
                <div key={event._id} className="event">
                  <h3>{event.eventName}</h3>
                  <p>{event.eventDetails}</p>
                  <p>Date: {event.eventDateString}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReceiver;
