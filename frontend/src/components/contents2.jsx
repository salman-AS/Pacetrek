import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/Content.css";
// import Cards from './Cards';
import CalendarComponent from './Calender';
import Cards from './cards2';
import { useNavigate } from 'react-router-dom';

const Contents = ({ username, Logout }) => {
	const navigate = useNavigate()
	const notifClick = () => {
		navigate("/student/Notifications")
	}

	return (
		<div className="contents">
			<ContentHeader username={username} Logout={Logout} navigate={notifClick} />
			<Cards />
			<CalendarComponent />

		</div>
	);
};
export default Contents;