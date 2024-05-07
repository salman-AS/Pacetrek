import React, { useState } from 'react';
import { BiSearch, BiNotification } from 'react-icons/bi';
import NotificationTogglePanel from '../NotificPanel/notif';

const ContentHeader = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="content--header">
      <h1 className="header--title">Dashboard</h1>
      <div className="header-activity">
        <div className="search-box">
          <input type="text" placeholder="Search anything here..." />
          <BiSearch className="icon" />
        </div>
        <div className="notify" onClick={togglePanel}>
          <BiNotification className="icon" />
        </div>
        {isPanelOpen && <NotificationTogglePanel onClose={togglePanel} />}
      </div>
    </div>
  );
};

export default ContentHeader;
