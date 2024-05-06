import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/Content.css";
// import Cards from './Cards';
import CalendarComponent from './Calender';
import Cards from './cards2';

const Contents = ({ username, Logout }) => {
	return (
		<div className="contents">
			<ContentHeader username={username} Logout={Logout} />
			<Cards />
			<CalendarComponent />

		</div>
	);
};
export default Contents;