import React, { useEffect, useState } from 'react';
import "../styles/Content.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios'
import '../styles/Calender.css'

const CalendarComponent = () => {
	const [events, setEvents] = useState([]); // State to store events

	const getEvents = async () => {
		try {
			const { data } = await axios.get(
				"http://localhost:4000/api/event/getAll",
				{},
				{ withCredentials: true }
			);
			const events = data.events.map((event) => {
				console.log(event.eventDate)
				const formattedEvent = {
					id: event._id,
					title: event.eventName,
					start: event.eventDate.toString().slice(0, 10)
				}
				return formattedEvent
			})
			setEvents(events)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getEvents()
	}, []);

	// Function to handle date click events
	const handleDateClick = async (info) => {

		const title = prompt('Enter event title:');

		if (title) {

			const details = prompt('Enter event details:')

			const newEvent = {
				// id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for the event
				title: title,
				start: info.dateStr // Use the clicked date as the event start date
			};
			console.log(newEvent.start)

			console.log(events)

			const event = {
				eventName: title,
				eventDetails: details,
				eventDate: info.dateStr
			}

			try {
				console.log('here', info.dateStr)
				const { data } = await axios.post(
					"http://localhost:4000/api/event/add",
					{
						...event,
					},
					{ withCredentials: true }
				);
				const { success, message } = data;
				console.log(data)

				const id = data.event._id
				setEvents([...events, { ...newEvent, id }])
			} catch (error) {
				console.log(error);
			}
		}
	};

	// Function to handle event click events
	const handleEventClick = async (clickInfo) => {
		if (window.confirm("Are you sure you want to delete this event?")) {

			console.log(clickInfo.event._def)

			try {
				const id = clickInfo.event._def.publicId
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

			// Remove the clicked event from the calendar
			// clickInfo.event.remove();
			// // Remove the clicked event from the events array in state
			// const updatedEvents = events.filter(event => event.id !== clickInfo.event.id); // Compare event IDs
			// setEvents(updatedEvents); // Update the events array in state
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
