import React, { useState, useEffect } from 'react';
import './events.css';

const EventReceiver = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API or database
    // For now, using dummy data
    const dummyEvents = [
      { id: 1, name: 'Event 1', details: 'Details of Event 1', date: '2024-05-05', time: '10:00 AM' },
      { id: 2, name: 'Event 2', details: 'Details of Event 2', date: '2024-05-06', time: '11:00 AM' },
      { id: 3, name: 'Event 3', details: 'Details of Event 3', date: '2024-05-07', time: '12:00 PM' },
    ];
    setEvents(dummyEvents);
  }, []);

  return (
    <div className="event-receiver-container">
      <h2>Event Updates</h2>
      <div className="event-list">
        {events.map(event => (
          <div key={event.id} className="event">
            <h3>{event.name}</h3>
            <p>{event.details}</p>
            <p>Date: {event.date}, Time: {event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventReceiver;
