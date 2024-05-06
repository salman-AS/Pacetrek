import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/Content.css";
import Cards from '../components/Cards';
import CalendarComponent from './Caldr';
// import Caldr from './Caldr'

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