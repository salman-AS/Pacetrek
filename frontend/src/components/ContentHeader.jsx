import React from 'react';
import { BiSearch, BiNotification, BiLogOut } from 'react-icons/bi';

// import Dashboard from '../pages/Dashboard';

const ContentHeader = ({ username, Logout }) => {

	console.log(username)

	return (
		<div className="content--header">
			<h1 className="header--title">Welcome back {username}!!</h1>
			<div className="header-activity">
				<div className="search-box">
					<input type="text" placeholder="Search anything here..." />
					<BiSearch className="icon" />
				</div>
				<div className="notify">
					<BiNotification className="icon" />
				</div>
				<BiLogOut className='icon' onClick={Logout} title='Logout' />
			</div>
		</div>
	);
};

export default ContentHeader;