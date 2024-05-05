import React, { useState } from 'react';
import "../styles/Content.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/Calendar.css';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]); // State to store events

  // Function to handle date click events
  const handleDateClick = (info) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for the event
        title: title,
        start: info.dateStr // Use the clicked date as the event start date
      };
      setEvents([...events, newEvent]); // Add the new event to the events array
    }
  };

  // Function to handle event click events
  const handleEventClick = (clickInfo) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Remove the clicked event from the calendar
      clickInfo.event.remove();
      // Remove the clicked event from the events array in state
      const updatedEvents = events.filter(event => event.id !== clickInfo.event.id); // Compare event IDs
      setEvents(updatedEvents); // Update the events array in state
    }
  };

  return (
    <div>
      <h1 className="calendartitle">Calendar</h1>
      <div className="calendar-container">
        <FullCalendar 
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events} // Pass the events array to the 'events' prop
          dateClick={handleDateClick} // Attach the handleDateClick function to the 'dateClick' event
          eventClick={handleEventClick} // Attach the handleEventClick function to the 'eventClick' event
        />
      </div>
    </div>
  );
}

export default CalendarComponent;