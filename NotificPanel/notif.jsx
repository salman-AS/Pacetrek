import React from 'react';
import { BiX } from 'react-icons/bi';
import './notif.css'; // Import CSS file for NotificationPanel

const NotificationTogglePanel = ({ onClose }) => {
  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h2>Notifications</h2>
        <button onClick={onClose}>
          <BiX />
        </button>
      </div>
      <ul>
        <li>Notification 1</li>
        <li>Notification 2</li>
        <li>Notification 3</li>
        <li>Notification 4</li>
        <li>Notification 5</li>
        <li>Notification 6</li>
      </ul>
    </div>
  );
};

export default NotificationTogglePanel;
