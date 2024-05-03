import React, { useState, useEffect } from 'react';
import '../styles/Event.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';

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
      ? console.log(cookies)
      : (removeCookie("token"), navigate("/admin/login"));
  };

  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  // const [eventTime, setEventTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [file, setFile] = useState(null);

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
    getEvents()
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
      // case 'eventTime':
      //   setEventTime(value);
      //   break;
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

    const event = {
      // id: Date.now(),
      eventName,
      eventDetails,
      // time: eventTime,
      eventDate,
      file: file ? URL.createObjectURL(file) : null,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/event/add",
        {
          ...event,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data, event)
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    // const updatedEvents = [...events, event];
    // setEvents(updatedEvents);
    getEvents()
    // Reset form fields
    setEventName('');
    setEventDetails('');
    // setEventTime('');
    setEventDate('');
    setFile(null);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/event/delete/${id}`,
        {},
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data)
      const updatedEvents = events.filter(event => event._id !== id);
      setEvents(updatedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-body">
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--contents">

          {/* <div className="event-form-container"> */}
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
              {/* <label>
                  Event Time:
                  <input
                    type="text"
                    name="eventTime"
                    value={eventTime}
                    onChange={handleInputChange}
                  />
                </label> */}
              <label>
                Event Date:
                <input
                  type="datetime-local"
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
              <div key={event._id} className="event">
                <h3>{event.eventName}</h3>
                <p>{event.eventDetails}</p>
                <br />
                <p>On {event.eventDateString}</p>
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
                <br />
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            ))}
          </div>
          {/* </div> */}

          <ToastContainer />
        </div>
      </div>
    </div>

  );
};

export default EventForm;
