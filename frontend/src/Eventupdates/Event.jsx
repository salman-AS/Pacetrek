import React, { useState, useEffect } from 'react';
import '../styles/Event.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const EventForm = () => {
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
      ? /* toast(`Hello ${user.username}`, {
        position: "top-right",
      }) */console.log(cookies)
      : (removeCookie("token"), navigate("/admin/login"));
  };


  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'eventName':
        setEventName(value);
        break;
      case 'eventDetails':
        setEventDetails(value);
        break;
      case 'eventTime':
        setEventTime(value);
        break;
      case 'eventDate':
        setEventDate(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      name: eventName,
      details: eventDetails,
      time: eventTime,
      date: eventDate,
      file: file ? URL.createObjectURL(file) : null,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    // Reset form fields
    setEventName('');
    setEventDetails('');
    setEventTime('');
    setEventDate('');
    setFile(null);
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">

          <div className="event-form-container">
            <div className="event-form">
              <h2>Add Event</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Event Name:
                  <input
                    type="text"
                    name="eventName"
                    value={eventName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Event Details:
                  <input
                    type="text"
                    name="eventDetails"
                    value={eventDetails}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Event Time:
                  <input
                    type="text"
                    name="eventTime"
                    value={eventTime}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Event Date:
                  <input
                    type="text"
                    name="eventDate"
                    value={eventDate}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Upload File:
                  <input
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="previous-events">
              <h2>Uploaded Events</h2>
              {events.map(event => (
                <div key={event.id} className="event">
                  <h3>{event.name}</h3>
                  <p>{event.details}</p>
                  <p>Date: {event.date}, Time: {event.time}</p>
                  {event.file && (
                    <div>
                      <p>Uploaded File:</p>
                      {event.file.includes('.jpg') || event.file.includes('.png') ? (
                        <img src={event.file} alt="Event" />
                      ) : (
                        <a href={event.file} target="_blank" rel="noopener noreferrer">View File</a>
                      )}
                    </div>
                  )}
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default EventForm;
