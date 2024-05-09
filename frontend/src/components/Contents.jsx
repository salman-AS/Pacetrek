import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/Content.css";
import Cards from '../components/Cards';
import CalendarComponent from './Caldr';
import { useNavigate } from 'react-router-dom';
// import Caldr from './Caldr'

const Contents = ({ username, Logout }) => {
	const navigate = useNavigate()
	const notifClick = () => {
		navigate("/admin/notifications")
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